import { useState, useEffect, createContext } from "react";
import { useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";

const RestaurantsContext = createContext();

const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);

  const getAllRestaurants = async () => {
    try {
      const response = await RestaurantFinder.get("/");
      setRestaurants(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  return (
    <RestaurantsContext.Provider
      value={{ restaurants, setRestaurants, getAllRestaurants }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(RestaurantsContext);
};

export { RestaurantsContext, RestaurantsContextProvider };
