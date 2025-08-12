import { createSlice } from "@reduxjs/toolkit";

const temperatureUnitSlice = createSlice({
  name: "temperatureUnit",
  initialState: "F", // Default unit is Fahrenheit
  reducers: {
    currentTemperatureUnit: (state) => (state === "F" ? "C" : "F"),
    setTemperatureUnit: (_, action) => action.payload,
  },
});

export const { currentTemperatureUnit, setTemperatureUnit } =
  temperatureUnitSlice.actions;
export default temperatureUnitSlice.reducer;
