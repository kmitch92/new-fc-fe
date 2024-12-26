import { createSlice } from '@reduxjs/toolkit'
import { postDeck, getDeckById, getDeckInfoById, getDecksInfoByUserId, updateDeckDetailsById, deleteDeckById } from '@/lib/api/handlers/decksHandlers'

const decksSlice = createSlice({
    name: 'decks',
    initialState: [],
    reducers: {
        deckAdded(state, action) {
        },
    }
})

export const { deckAdded } = decksSlice.actions
export default decksSlice.reducer