import type { RouteObject } from 'react-router-dom'
import RootLayout from '../router/RootLayout'
import GenerationSelector from '../pages/generationsSelector'
import PokemonList from '../pages/PokemonList'
import PokemonDetailPage from '../pages/PokemonDetailPage'
import NotFound from '../pages/NotFound'
import LoginPage from '../pages/LoginPage'

const myRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <GenerationSelector />, 
      },
      {
        path: 'generation/:genId',         
        element: <PokemonList />,
      },
      {
        path: 'pokemon/:id',
        element: <PokemonDetailPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]

export default myRoutes