import * as types from '../types/auth.type'

const initialState = {
    user: '',
    token: null
  };
  
  const authReducer = (state = initialState, action: any) => {
    // Handle your actions and update state accordingly
    switch (action.type) {
      // Add your action types here
      case types.LOGIN_SUCCESS:return{
        ...state as {},
        token:action.payload.token,
        user:action.payload.user
    }
      default:
        return state;
    }
  };
  
  export default authReducer;
  