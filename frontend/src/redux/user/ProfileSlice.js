import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    profileImage:null,
};

export const ProfileSlice= createSlice({
  name: 'profile',
  initialState,

  reducers: {
    setProfileImage:(state,action)=>{
        state.profileImage = action.payload
    } 
  }
})

// Export the generated action creators for use in components
export const { setProfileImage } = ProfileSlice.actions

// Export the slice reducer for use in the store configuration
export default ProfileSlice.reducer



