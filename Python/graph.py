from .config import settings

def init_constraints(driver):
    """Crée les contraintes au démarrage (idempotent)."""
    with driver.session() as s:
        s.run("CREATE CONSTRAINT person_tmdb IF NOT EXISTS "
              "FOR (p:Person) REQUIRE p.tmdbId IS UNIQUE")
        s.run("CREATE CONSTRAINT movie_tmdb IF NOT EXISTS "
              "FOR (m:Movie) REQUIRE m.tmdbId IS UNIQUE")
        s.run("CREATE CONSTRAINT genre_name IF NOT EXISTS "
              "FOR (g:Genre) REQUIRE g.name IS UNIQUE")
        s.run("CREATE CONSTRAINT company_tmdb IF NOT EXISTS "
              "FOR (c:ProductionCompany) REQUIRE c.tmdbId IS UNIQUE")
        s.run("CREATE CONSTRAINT country_iso IF NOT EXISTS "
              "FOR (co:Country) REQUIRE co.isoCode IS UNIQUE")
        # Migration: set existing movies type to "movie" if not set
        s.run("MATCH (m:Movie) WHERE m.type IS NULL SET m.type = 'movie'")


#MARK: Requêtes Cypher
_MERGE_MOVIE = """
MERGE (m:Movie {tmdbId: $id})
SET m.title        = $title,
    m.releaseDate  = $release_date,
    m.overview     = $overview,
    m.posterPath   = $poster_path,
    m.backdropPath = $backdrop_path,
    m.rating       = $vote_average,
    m.type         = $type
WITH m
UNWIND $genres AS g
  MERGE (genre:Genre {name: g})
  MERGE (m)-[:BELONGS_TO_GENRE]->(genre)
"""

_MERGE_CAST = """
MATCH (m:Movie {tmdbId: $movie_id})
UNWIND $cast AS c
  MERGE (p:Person {tmdbId: c.id})
  SET p.name = c.name
  MERGE (p)-[r:ACTED_IN]->(m)
  SET r.character = c.character, r.order = c.order
"""

_MERGE_DIRECTORS = """
MATCH (m:Movie {tmdbId: $movie_id})
UNWIND $directors AS d
  MERGE (p:Person {tmdbId: d.id})
  SET p.name = d.name
  MERGE (p)-[:DIRECTED]->(m)
"""


#MARK: Collaborations
_MERGE_COLLABORATIONS = """
MATCH (m:Movie {tmdbId: $movie_id})<-[:ACTED_IN]-(p1:Person)
MATCH (m)<-[:ACTED_IN]-(p2:Person)
WHERE id(p1) < id(p2)
MERGE (p1)-[r:COLLABORATED_WITH]-(p2)
  ON CREATE SET r.movie_count = 1
  ON MATCH  SET r.movie_count = coalesce(r.movie_count, 1) + 1
"""

_MERGE_COMPANIES = """
MATCH (m:Movie {tmdbId: $movie_id})
UNWIND $companies AS c
  MERGE (pc:ProductionCompany {tmdbId: c.id})
  SET pc.name     = c.name,
      pc.logoPath = c.logo_path
  MERGE (m)-[:PRODUCED_BY]->(pc)
"""

_MERGE_COUNTRIES = """
MATCH (m:Movie {tmdbId: $movie_id})
UNWIND $countries AS c
  MERGE (co:Country {isoCode: c.iso_3166_1})
  SET co.name = c.name
  MERGE (m)-[:PRODUCED_IN]->(co)
"""


#MARK: Fonctions publiques
def list_movies(driver):
    with driver.session() as s:
        result = s.run("""
            MATCH (m:Movie)
            OPTIONAL MATCH (m)-[:BELONGS_TO_GENRE]->(g:Genre)
            WITH m, collect(g.name) AS genres
            RETURN m.tmdbId     AS id,
                   m.title       AS title,
                   m.overview    AS overview,
                   m.posterPath  AS poster_path,
                   m.backdropPath AS backdrop_path,
                   coalesce(m.type, "movie") AS type,
                   genres
            ORDER BY m.title
        """)
        return [dict(r) for r in result]


def upsert_movie(driver, details: dict, credits: dict, cast_limit: int, media_type: str = "movie"):
    movie_id = details["id"]

    genres = [g["name"] for g in details.get("genres", [])]

    cast = [
        {
            "id":        c["id"],
            "name":      c["name"],
            "character": c.get("character", ""),
            "order":     c.get("order", 0),
        }
        for c in credits.get("cast", [])[:cast_limit]
    ]

    directors = [
        {"id": c["id"], "name": c["name"]}
        for c in credits.get("crew", [])
        if c.get("job") == "Director" or c.get("job") == "Executive Producer"
    ]
    if "created_by" in details:
        for creator in details["created_by"]:
            directors.append({"id": creator["id"], "name": creator["name"]})

    companies = [
        {
            "id":        c["id"],
            "name":      c.get("name", ""),
            "logo_path": c.get("logo_path") or "",
        }
        for c in details.get("production_companies", [])
    ]

    countries = []
    for c in details.get("production_countries", []):
        if "iso_3166_1" in c:
            countries.append({"iso_3166_1": c["iso_3166_1"], "name": c.get("name", "")})
    if not countries and "origin_country" in details:
        countries = [{"iso_3166_1": code, "name": code} for code in details["origin_country"]]

    title = details.get("title") or details.get("name")
    release_date = details.get("release_date") or details.get("first_air_date")

    with driver.session() as s:
        # 1. Film/Série + genres
        s.run(
            _MERGE_MOVIE,
            id=movie_id,
            title=title,
            release_date=release_date,
            overview=details.get("overview"),
            poster_path=details.get("poster_path"),
            backdrop_path=details.get("backdrop_path"),
            vote_average=details.get("vote_average"),
            type=media_type,
            genres=genres,
        )
        # 2. Cast
        s.run(_MERGE_CAST, movie_id=movie_id, cast=cast)
        # 3. Réalisateurs
        s.run(_MERGE_DIRECTORS, movie_id=movie_id, directors=directors)
        # 4. Collaborations acteur-acteur
        s.run(_MERGE_COLLABORATIONS, movie_id=movie_id)
        # 5. Sociétés de production
        if companies:
            s.run(_MERGE_COMPANIES, movie_id=movie_id, companies=companies)
        # 6. Pays de production
        if countries:
            s.run(_MERGE_COUNTRIES, movie_id=movie_id, countries=countries)

    return {
        "movie":      movie_id,
        "cast":       len(cast),
        "directors":  len(directors),
        "companies":  len(companies),
        "countries":  len(countries),
    }