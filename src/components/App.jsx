import { useState } from "react";
import Layout from "./Layout/Layout";
import WeatherCard from "./WeatherCard/WeatherCard";
import Home from "./Home/Home";
import ClothingForm from "./ClothingForm/ClothingForm";

function App() {
  const [formOpen, setFormOpen] = useState(false);

  const openform = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);
  return (
    <>
      <Layout onOpen={openform}>
        <WeatherCard />
        <Home />
      </Layout>
      <ClothingForm isOpen={formOpen} onClose={closeForm} />
    </>
  );
}

export default App;
