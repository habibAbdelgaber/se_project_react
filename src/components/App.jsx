import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import LandingPage from "./LandingPage/LandingPage";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import NotFound404 from "./NotFound404/NotFound404";
import AddItemModal from "./AddItemModal/AddItemModal";
import DeleteConfirmation from "./DeleteConfirmation/DeleteConfirmation";
import { API_KEY, LATITUDE, LONGITUDE } from "../utils/constants";
import { defaultClothingItems } from "../utils/defaultClothingItems";
import { extractWeatherData } from "../utils/weather";
import { weatherAPI, itemAPI } from "../utils/api";

import Spinner from "./Spinner/Spinner";
import APIError from "./APIError/APIError";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [closeItemModalTick, setCloseItemModalTick] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await weatherAPI.get("weather", {
          params: {
            lat: LATITUDE,
            lon: LONGITUDE,
            units: "imperial",
            appid: API_KEY,
          },
        });

        const extracted = extractWeatherData(response);
        setWeather(extracted);

        setLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  useEffect(() => {
    const getClothesItems = async () => {
      try {
        const items = await itemAPI.get("/items");
        setClothingItems(items);
        console.log(items);
      } catch (error) {
        console.error("Failed to fetch clothes: ", error);
      }
    };
    getClothesItems();
  }, []);

  const openDeleteCardConformation = (item) => {
    setSelectedItem(item);
    setDeleteOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setDeleteOpen(false);
    setCloseItemModalTick((t) => t + 1);
    setSelectedItem(null);
  };

  const handleDeleteConfirmation = async () => {
    if (!selectedItem) return;

    const selKey = selectedItem._id ?? selectedItem.id;

    // If no id, fall back to matching by stable fields
    const match = (i) =>
      selKey
        ? (i._id ?? i.id) !== selKey
        : !(i.name === selectedItem.name && i.link === selectedItem.link);

    // Snapshot for rollback
    const prevItems = clothingItems;

    // UI update
    setClothingItems((prev) => prev.filter(match));

    // Close the modal/UI
    setDeleteOpen(false);
    setCloseItemModalTick((t) => t + 1);
    setSelectedItem(null);

    try {
      if (selKey) {
        await itemAPI.delete(`/items/${selKey}`);
      } else {
        // Block the item deletion if there is no id
        console.warn("No id for item — API delete skipped.");
      }
    } catch (error) {
      console.error("Failed deleting item:", error);
      // Rollback UI on failure
      setClothingItems(prevItems);
    }
  };

  const handleAddItemSubmit = async (item) => {
    try {
      // Create a new item
      const saveItem = await itemAPI.post("/items", item);

      // save item
      setClothingItems((prev) => [saveItem, ...prev]);
      console.log(saveItem);
    } catch (error) {
      console.error("Failed creating new item:", error);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <APIError message={`Error fetching weather: ${error}`} />;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              onOpen={() => setFormOpen(true)}
              currentCity={weather?.city}
            />
          }
        >
          {/* Landing route: shows WeatherCard + Home */}
          <Route
            index
            element={
              <LandingPage
                weather={weather}
                clothingItems={clothingItems}
                onDeleteRequest={openDeleteCardConformation}
                closeItemModalTick={closeItemModalTick}
              />
            }
          />

          {/* Other nested routes */}
          <Route
            path="/profile"
            element={
              <Profile
                weather={weather}
                isOpen={() => setFormOpen(true)}
                clothingItems={clothingItems}
              />
            }
          />
          <Route
            path="home"
            element={<Home weather={weather} clothingItems={clothingItems} />}
          />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
      <AddItemModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onAddItem={handleAddItemSubmit}
      />
      <DeleteConfirmation
        isOpen={deleteOpen}
        item={selectedItem}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDeleteConfirmation}
      />
    </>
  );
}

export default App;
