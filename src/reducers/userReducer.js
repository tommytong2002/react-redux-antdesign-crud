export default function reducer(state={
    user: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_USER": {
        return {...state, fetching: true}
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
      case "CREATE_USER_FULFILLED": {
        return {
          ...state,
          user: [...state.user, action.payload],
        }
      }
      case "UPDATE_USER_FULFILLED": {
        return state
      }
      case "DELETE_USER_FULFILLED": {
        console.log(action.payload)
        console.log(state.user)
        let index = state.user.findIndex((x) => x.id == action.payload); 
        console.log("index", index)
        state.user.splice(index, 1)
        console.log("spliced", state.user)
        return {
          user: state.user
          //state.user.slice(index + 1),
        }

        
        //return state
      }

      default: {
        return state
        break;
      }
    }

    //return state
}
