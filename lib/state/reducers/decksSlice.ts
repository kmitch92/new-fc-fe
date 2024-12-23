import { createSlice } from '@reduxjs/toolkit'

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