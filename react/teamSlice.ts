import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { PokemonApi } from '../../types/pokemonApi.type'

const MAX_TEAM_SIZE = 6

interface TeamState {
  team: PokemonApi[]
}

const initialState: TeamState = {
  team: [],
}

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    // Ajouter un Pokémon à l'équipe
    addToTeam: (state, action: PayloadAction<PokemonApi>) => {
      if (state.team.length >= MAX_TEAM_SIZE) return
      
      const alreadyInTeam = state.team.some(
        p => p.pokedex_id === action.payload.pokedex_id
      )
      
      if (!alreadyInTeam) {
        state.team.push(action.payload)
      }
    },
    
    // Retirer un Pokémon de l'équipe
    removeFromTeam: (state, action: PayloadAction<number>) => {
      state.team = state.team.filter(p => p.pokedex_id !== action.payload)
    },
    
    // Vider l'équipe
    clearTeam: (state) => {
      state.team = []
    },
    
    // Réorganiser l'équipe (pour drag & drop futur)
    reorderTeam: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload
      const [removed] = state.team.splice(fromIndex, 1)
      state.team.splice(toIndex, 0, removed)
    },
  },
})

export const { addToTeam, removeFromTeam, clearTeam, reorderTeam } = teamSlice.actions
export default teamSlice.reducer

// Selectors
export const selectTeam = (state: { team: TeamState }) => state.team.team
export const selectTeamCount = (state: { team: TeamState }) => state.team.team.length
export const selectIsTeamFull = (state: { team: TeamState }) => state.team.team.length >= MAX_TEAM_SIZE
export const selectIsInTeam = (pokemonId: number) => (state: { team: TeamState }) => 
  state.team.team.some(p => p.pokedex_id === pokemonId)