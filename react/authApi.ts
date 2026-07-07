import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../index'
import type { User, LoginRequest, LoginResponse, ProfileResponse } from '../../types/auth.type'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
      // add Authorization header with JWT token if available
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<{ token: string; user: User }, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: LoginResponse) => {
        // Decode the token
        const payload = JSON.parse(atob(response.token.split('.')[1]))
        const user: User = {
          id: payload.sub,
          username: payload.username,
          role: payload.role,
        }
        return { token: response.token, user }
      },
    }),

    // Recove profile
    getProfile: builder.query<ProfileResponse, void>({
      query: () => '/profile',
      providesTags: ['User'],
    }),
  }),
})

export const { 
  useLoginMutation,
  useGetProfileQuery,
} = authApi