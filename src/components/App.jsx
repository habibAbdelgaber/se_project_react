import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Main from "./Main/Main";
import Profile from "./Profile/Profile";
import NotFound404 from "./NotFound404/NotFound404";
import AddItemModal from "./AddItemModal/AddItemModal";
import DeleteConfirmation from "./DeleteConfirmation/DeleteConfirmation";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import { API_KEY, LATITUDE, LONGITUDE } from "../utils/constants";
import { extractWeatherData } from "../utils/weather";
import { weatherAPI, itemAPI } from "../utils/api";

const placeholderClothingItems = [
  { _id: "placeholder-1", name: "T-Shirt", weather: "hot", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop" },
  { _id: "placeholder-2", name: "Shorts", weather: "hot", imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=500&fit=crop" },
  { _id: "placeholder-3", name: "Sunglasses", weather: "very hot", imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop" },
  { _id: "placeholder-4", name: "Light Jacket", weather: "warm", imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop" },
  { _id: "placeholder-5", name: "Jeans", weather: "warm", imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop" },
  { _id: "placeholder-6", name: "Sweater", weather: "cool", imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop" },
  { _id: "placeholder-7", name: "Hoodie", weather: "cool", imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop" },
  { _id: "placeholder-8", name: "Winter Coat", weather: "cold", imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop" },
  { _id: "placeholder-9", name: "Scarf", weather: "cold", imageUrl: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=500&fit=crop" },
  { _id: "placeholder-10", name: "Beanie", weather: "cold", imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=500&fit=crop" },
];

import Spinner from "./Spinner/Spinner";
import APIError from "./APIError/APIError";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [clothingItems, setClothingItems] = useState(null);
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
        setClothingItems(placeholderClothingItems);
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
          {/* Main route: shows WeatherCard + main */}
          <Route
            index
            element={
              <Main
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
                onDeleteRequest={openDeleteCardConformation}
                closeItemModalTick={closeItemModalTick}
              />
            }
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
      <ThemeToggle />
    </>
  );
}

export default App;
