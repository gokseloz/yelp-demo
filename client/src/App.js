import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantDetailsPage from "./routes/RestaurantDetailsPage";
import UpdatePage from "./routes/UpdatePage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import "./App.css";

function App() {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants/:id/update" element={<UpdatePage />} />
            <Route
              path="/restaurants/:id"
              element={<RestaurantDetailsPage />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
