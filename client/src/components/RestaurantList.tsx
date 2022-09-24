/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useGlobalContext } from "../context/RestaurantsContext";
import Restaurant from "./Restaurant";

const RestaurantList = () => {
  const { restaurants, getAllRestaurants } = useGlobalContext();

  useEffect(() => {
    getAllRestaurants();
  }, []);

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col" className="bg-primary">
              Restaurant
            </th>
            <th scope="col" className="bg-primary">
              Location
            </th>
            <th scope="col" className="bg-primary">
              Price Range
            </th>
            <th scope="col" className="bg-primary">
              Ratings
            </th>
            <th scope="col" className="bg-primary">
              Edit
            </th>
            <th scope="col" className="bg-primary">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants
              .sort((a: Restaurant, b: Restaurant) => a.id - b.id)
              .map((restaurant: Restaurant) => {
                return (
                  <Restaurant key={restaurant.id} restaurant={restaurant} />
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
