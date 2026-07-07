import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from '../api/pokemonApi'
import { authApi } from './api/authApi'
import teamReducer from './slice/teamSlice'
import authReducer from './slice/authSlice'

export const store = configureStore({
    reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        team: teamReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(pokemonApi.middleware)
            .concat(authApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
