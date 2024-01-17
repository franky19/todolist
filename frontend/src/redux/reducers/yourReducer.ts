// src/redux/reducers/yourReducer.ts

const initialState = {
    // Define your initial state here
  };
  
  const YourReducer = (state = initialState, action: any) => {
    // Handle your actions and update state accordingly
    switch (action.type) {
      // Add your action types here
      default:
        return state;
    }
  };
  
  export default YourReducer;
  