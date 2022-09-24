/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

type Field = "name" | "location" | "price_range";

const UpdateRestaurant = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({} as Restaurant);

  const getRestaurant = async () => {
    try {
      const response = await RestaurantFinder.get(`/${id}`);
      setRestaurant(response.data.data.restaurant);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  const updateRestaurant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id as Field;
    setRestaurant({ ...restaurant, [field]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const restaurantToBeUpdated = {
      name: restaurant.name,
      location: restaurant.location,
      price_range: restaurant.price_range,
    };

    await RestaurantFinder.put(`/${id}`, restaurantToBeUpdated);
    navigate(`/`);
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="d-flex flex-column gap-4"
    >
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          className="form-control"
          type="text"
          defaultValue={restaurant?.name}
          onChange={(e) => updateRestaurant(e)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          className="form-control"
          type="text"
          defaultValue={restaurant?.location}
          onChange={(e) => updateRestaurant(e)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="priceRange">Price Range</label>
        <input
          id="price_range"
          className="form-control"
          type="number"
          max={5}
          min={1}
          defaultValue={restaurant?.price_range}
          onChange={(e) => updateRestaurant(e)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary align-self-start">
        Submit
      </button>
    </form>
  );
};

export default UpdateRestaurant;
