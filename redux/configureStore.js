import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import { auth } from "./auth";
import { ecg } from "./ecg";

const config = {
  key: "root",
  storage: AsyncStorage,
  debug: true,
};

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      auth,
      ecg,
    }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
