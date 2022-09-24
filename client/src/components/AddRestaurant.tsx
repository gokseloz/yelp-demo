import React from "react";
import { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useGlobalContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const [restaurant, setRestaurant] = useState<CreateRestaurant>({
    name: "",
    location: "",
    price_range: 1,
  });

  const { restaurants, setRestaurants } = useGlobalContext();

  const addRestaurant = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", restaurant);
      setRestaurants([...restaurants, response.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4">
      <form action="" className="container">
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              onChange={(e) =>
                setRestaurant({ ...restaurant, name: e.target.value })
              }
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="location"
              onChange={(e) =>
                setRestaurant({ ...restaurant, location: e.target.value })
              }
            />
          </div>
          <div className="col">
            <select
              typeof="number"
              className="form-select"
              placeholder="price range"
              defaultValue={0}
              onChange={(e) =>
                setRestaurant({
                  ...restaurant,
                  price_range: parseInt(e.target.value),
                })
              }
            >
              <option value="0" disabled>
                Price Range
              </option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col flex-grow-0">
            <button className="btn btn-primary" onClick={addRestaurant}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
