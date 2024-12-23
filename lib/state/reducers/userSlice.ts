import { ISessionUser } from '@/lib/api/types/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ISessionUser | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    newUser(state, action) {
      state = action.payload.user
    },
  }
})

export const { newUser } = userSlice.actions
export default userSlice.reducer