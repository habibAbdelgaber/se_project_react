import { configureStore } from "@reduxjs/toolkit";
import temperatureUnitReducer from "../redux/temperature/temperatureUnitSlice";

export const store = configureStore({
  reducer: {
    temperatureUnit: temperatureUnitReducer,
  },
});
