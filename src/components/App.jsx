import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Main from "./Main/Main";
import Profile from "./Profile/Profile";
import NotFound404 from "./NotFound404/NotFound404";
import AddItemModal from "./AddItemModal/AddItemModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import LoginModal from "./LoginModal/LoginModal";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import DeleteConfirmation from "./DeleteConfirmation/DeleteConfirmation";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import { getWeather, extractWeatherData } from "../utils/weatherApi";
import { getItems, addItem, deleteItem, addCardLike, removeCardLike } from "../utils/api";
import { updateUserProfile } from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Spinner from "./Spinner/Spinner";

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

function App() {
  const { currentUser, isLoggedIn, handleSignIn, handleSignUp, handleUpdateUser } = useContext(CurrentUserContext);

  const [formOpen, setFormOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [clothingItems, setClothingItems] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [closeItemModalTick, setCloseItemModalTick] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setFormOpen(false);
    setSignUpOpen(false);
    setSignInOpen(false);
    setEditProfileOpen(false);
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getWeather()
      .then((data) => {
        const extracted = extractWeatherData(data);
        setWeather(extracted);
      })
      .catch((err) => {
        console.error("Failed to fetch weather:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error("Failed to fetch clothes: ", err);
        setClothingItems(placeholderClothingItems);
      });
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

  const handleDeleteConfirmation = () => {
    if (!selectedItem) return;

    const selectedItemId = selectedItem._id ?? selectedItem.id;

    const prevItems = clothingItems;

    setClothingItems((prev) =>
      prev.filter((i) => (i._id ?? i.id) !== selectedItemId)
    );

    setDeleteOpen(false);
    setCloseItemModalTick((t) => t + 1);
    setSelectedItem(null);

    if (selectedItemId) {
      deleteItem(selectedItemId).catch((err) => {
        console.error("Failed deleting item:", err);
        setClothingItems(prevItems);
      });
    }
  };

  const handleAddItemSubmit = (item) => {
    const makeRequest = () => {
      return addItem(item).then((savedItem) => {
        setClothingItems((prev) => [savedItem, ...prev]);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const likeRequest = isLiked ? removeCardLike(id) : addCardLike(id);
    likeRequest
      .then((updatedCard) => {
        setClothingItems((prev) =>
          prev.map((item) =>
            (item._id ?? item.id) === (updatedCard._id ?? updatedCard.id)
              ? updatedCard
              : item
          )
        );
      })
      .catch((err) => {
        console.error("Failed toggling like:", err);
      });
  };

  const handleOpenAddItem = () => {
    if (!isLoggedIn) {
      setSignInOpen(true);
      return;
    }
    setFormOpen(true);
  };

  const handleSignUpSubmit = (data) => {
    const makeRequest = () => {
      return handleSignUp(data);
    };
    handleSubmit(makeRequest);
  };

  const handleSignInSubmit = (data) => {
    const makeRequest = () => {
      return handleSignIn(data);
    };
    handleSubmit(makeRequest);
  };

  const handleEditProfileSubmit = (data) => {
    const makeRequest = () => {
      return updateUserProfile(data).then((updated) => {
        handleUpdateUser(updated);
      });
    };
    handleSubmit(makeRequest);
  };

  const switchToSignIn = () => {
    setSignUpOpen(false);
    setSignInOpen(true);
  };

  const switchToSignUp = () => {
    setSignInOpen(false);
    setSignUpOpen(true);
  };

  if (loading) return <Spinner />;

  const userClothingItems = isLoggedIn && currentUser
    ? (clothingItems ?? []).filter(
        (item) => item.owner === currentUser._id || item.owner?._id === currentUser._id
      )
    : [];

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              onOpen={handleOpenAddItem}
              currentCity={weather?.city}
              onSignIn={() => setSignInOpen(true)}
              onSignUp={() => setSignUpOpen(true)}
            />
          }
        >
          <Route
            index
            element={
              <Main
                weather={weather}
                clothingItems={clothingItems}
                onDeleteRequest={openDeleteCardConformation}
                closeItemModalTick={closeItemModalTick}
                onCardLike={handleCardLike}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile
                  weather={weather}
                  onAddItem={handleOpenAddItem}
                  clothingItems={userClothingItems}
                  onDeleteRequest={openDeleteCardConformation}
                  closeItemModalTick={closeItemModalTick}
                  onEditProfile={() => setEditProfileOpen(true)}
                  onCardLike={handleCardLike}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
      <AddItemModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onAddItem={handleAddItemSubmit}
        isLoading={isLoading}
      />
      <RegisterModal
        isOpen={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        onSignUp={handleSignUpSubmit}
        onSwitchToSignIn={switchToSignIn}
        isLoading={isLoading}
      />
      <LoginModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSignIn={handleSignInSubmit}
        onSwitchToSignUp={switchToSignUp}
        isLoading={isLoading}
      />
      <EditProfileModal
        isOpen={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        onEditProfile={handleEditProfileSubmit}
        isLoading={isLoading}
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
