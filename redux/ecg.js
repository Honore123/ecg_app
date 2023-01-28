import * as ActionTypes from "./actionTypes";

export const ecg = (
  state = {
    isLoading: false,
    errMess: null,
    data: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.REQUEST_DATA:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };
    case ActionTypes.DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
      };
    case ActionTypes.ADD_DATA:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        data: action.payload,
      };
    case ActionTypes.DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};
