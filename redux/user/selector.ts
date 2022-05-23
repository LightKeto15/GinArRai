import { RootState } from "..";


  export function getUser(state: RootState) {
    return state.userReducer.user;
  }

  export function getUID (state:RootState)
  {
    return state.userReducer.user?.uid
  }

  export function getUserAuthError(state: RootState) {
    return state.userReducer.error;
  }