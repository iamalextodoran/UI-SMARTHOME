import { FETCH_USERS, NEW_USER } from "../actions/types";

const initialState = {
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case NEW_USER:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
