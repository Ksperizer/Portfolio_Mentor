import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { PokemonApi } from '../types/pokemonApi.type'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://tyradex.app/api/v1' 
  }),
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    // recove all pokemons
    getAllPokemons: builder.query<PokemonApi[], void>({
      query: () => '/pokemon',
      // filter valide pokemon 
      transformResponse: (response: PokemonApi[]) => 
        response.filter(p => p.pokedex_id > 0),
      providesTags: ['Pokemon'],
    }),

    // recove pokemon by id
    getPokemonById: builder.query<PokemonApi, number | string>({
      query: (id) => `/pokemon/${id}`,
      providesTags: (result, error, id) => [{ type: 'Pokemon', id }],
    }),

    // recove pokemons by generation
    getPokemonsByGeneration: builder.query<PokemonApi[], number>({
      query: () => '/pokemon',
      transformResponse: (response: PokemonApi[], meta, generation) =>
        response.filter(p => p.pokedex_id > 0 && p.generation === generation),
    }),
  }),
})

// export hooks for usage in functional components
export const { 
  useGetAllPokemonsQuery,
  useGetPokemonByIdQuery,
  useGetPokemonsByGenerationQuery,
} = pokemonApi