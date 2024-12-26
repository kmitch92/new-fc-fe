import { createSlice } from '@reduxjs/toolkit'
import { getCardsToReview, addCardsToDeckById, updateExistingCard, updateNextReviewAndEase, deleteCardByIds } from '@/lib/api/handlers/cardsHandlers'

const initialState = {
    cardsToReview: [],
    paginatedCards: []
}
const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        cardAdded(state, action) {

        },
    }
})

export const { cardAdded } = cardsSlice.actions
export default cardsSlice.reducer