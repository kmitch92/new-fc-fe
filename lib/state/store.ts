import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import decksReducer from './reducers/decksSlice'
import cardsReducer from './reducers/cardsSlice'

export const store = configureStore({
    reducer: {
        users: userReducer,
        decks: decksReducer,
        cards: cardsReducer,
    }
})