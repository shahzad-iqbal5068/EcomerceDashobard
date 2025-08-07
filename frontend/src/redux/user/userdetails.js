import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    userDetail: null,
}

export  const UserSlice = createSlice({
    name:'user',
    initialState,

    reducers : {
        setUserDetail:(state,action)=>{
            // console.log("shajajj",action.payload);
            state.userDetail = action.payload
        } 
    }
});
export const { setUserDetail } = UserSlice.actions

export default UserSlice.reducer