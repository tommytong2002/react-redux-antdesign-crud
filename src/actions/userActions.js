import axios from "axios";

export function fetchUser() {
  return function(dispatch){
    axios.get("http://rest.learncode.academy/api/nenjotsu/users")
      .then((response) => {
        dispatch({type: "FETCH_USER_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_USER_REJECTED", payload: err})
      })
  }
}

export function createUser(payload) {
  return function(dispatch) {
    axios.post("http://rest.learncode.academy/api/nenjotsu/users", payload)
      .then((response) => {
        payload.id = response.data.id;
        dispatch({type: "CREATE_USER_FULFILLED", payload: payload})//the new item is returned with an ID
      })
      .catch((err) => {
        dispatch({type: "CREATE_USER_REJECTED", payload: err})
      })
  }
}

export function updateUser(payload) {
  console.log(payload)
  return function(dispatch) {
    axios.put("http://rest.learncode.academy/api/nenjotsu/users/"+payload.id, payload.data)
      .then(() => {

        dispatch({type: "UPDATE_USER_FULFILLED"})

        axios.get("http://rest.learncode.academy/api/nenjotsu/users")
          .then((response) => {
            dispatch({type: "FETCH_USER_FULFILLED", payload: response.data})
          })
          .catch((err) => {
            dispatch({type: "FETCH_USER_REJECTED", payload: err})
          })
      })
      .catch((err) => {
        dispatch({type: "UPDATE_USER_REJECTED", payload: err})
      })
  }
}

export function deleteUser(payload) {
  console.log(payload)
  return function(dispatch) {
    axios.delete("http://rest.learncode.academy/api/nenjotsu/users/"+payload)
      .then((response) => {

        console.log(response)

        dispatch({type: "DELETE_USER_FULFILLED", payload: payload })

        /*axios.get("http://rest.learncode.academy/api/nenjotsu/users")
          .then((response) => {
            dispatch({type: "FETCH_USER_FULFILLED", payload: response.data })
          })
          .catch((err) => {
            dispatch({type: "FETCH_USER_REJECTED", payload: err})
          })*/
      })
      .catch((err) => {
        dispatch({type: "UPDATE_USER_REJECTED", payload: err})
      })
  }
}
