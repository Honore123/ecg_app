import { Alert } from "react-native";
import * as ActionTypes from "./actionTypes";
import { baseUrl } from "../shared/baseUrl";

/*
Login action creator by @HNR
*/
export const loginUser = (creds) => (dispatch) => {
  dispatch(requestLogin());
  return fetch(baseUrl + "users/login", {
    method: "post",
    body: JSON.stringify(creds),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error("Wrong credentials");
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.user) {
        dispatch(receiveLogin(response));
        dispatch(fetchData(response.token, response.user.id));
      } else {
        var error = new Error("Error " + response.message);
        error.message = response;
        throw error;
      }
    })
    .catch((error) => {
      dispatch(loginError(error.message));
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => console.log("confirmed"),
        },
      ]);
    });
};

export const requestLogin = () => ({
  type: ActionTypes.REQUEST_LOGIN,
});
export const receiveLogin = (response) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: response,
});
export const loginError = (errmess) => ({
  type: ActionTypes.LOGIN_FAILURE,
  payload: errmess,
});

/* Logout */

export const logoutUser = (token) => (dispatch) => {
  dispatch(requestLogout());
  const bearer = "Bearer " + token;
  return fetch(baseUrl + "users/logout", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: bearer,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error("Error while logging out!");
          error.message = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.message) {
        dispatch(receiveLogout());
      } else {
        var error = new Error("Error " + response.message);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      dispatch(logoutError(error.message));
      Alert.alert("Logout Error", error.message, [
        {
          text: "OK",
          onPress: () => console.log("confirmed"),
        },
      ]);
    });
};

export const requestLogout = () => ({
  type: ActionTypes.REQUEST_LOGOUT,
});
export const receiveLogout = () => ({
  type: ActionTypes.LOGOUT_SUCCESS,
});
export const logoutError = (errmess) => ({
  type: ActionTypes.LOGOUT_FAILURE,
  payload: errmess,
});

/* Fetching ecg data*/

export const fetchData = (token, userId) => (dispatch) => {
  dispatch(requestData());
  const bearer = "Bearer " + token;
  return fetch(baseUrl + "data/" + userId, {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.message = error;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((data) => {
      dispatch(dataReceived());
      dispatch(addData(data));
    })
    .catch((error) => {
      dispatch(dataFailed(error.message));
      Alert.alert("Error!", error.message, [
        {
          text: "OK",
          onPress: () => console.log("clicked ok"),
        },
      ]);
    });
};

export const requestData = () => ({
  type: ActionTypes.REQUEST_DATA,
});
export const dataReceived = () => ({
  type: ActionTypes.DATA_SUCCESS,
});
export const dataFailed = (errmess) => ({
  type: ActionTypes.DATA_FAILURE,
  payload: errmess,
});

export const addData = (response) => ({
  type: ActionTypes.ADD_DATA,
  payload: response,
});
