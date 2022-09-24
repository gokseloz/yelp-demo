import React, { ReactElement } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useGlobalContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const Restaurant = ({
  restaurant,
}: {
  restaurant: Restaurant;
}): ReactElement => {
  const { restaurants, setRestaurants } = useGlobalContext();
  let navigate = useNavigate();

  const deleteRestaurant = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    try {
      await RestaurantFinder.delete(`/${restaurant.id}`);
      setRestaurants(
        restaurants.filter((restaurant: Restaurant) => restaurant.id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updateRestaurant = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleDetailsPage = () => {
    navigate(`/restaurants/${restaurant.id}`);
  };
  return (
    <tr key={restaurant.id} onClick={handleDetailsPage}>
      <td>{restaurant.name}</td>
      <td>{restaurant.location}</td>
      <td>{"$".repeat(restaurant.price_range)}</td>
      <td>
        {restaurant.count ? (
          <>
            <StarRating rating={parseInt(restaurant.average_rating)} />
            <span
              className="text-warning d-block-inline"
              style={{ marginLeft: ".3rem" }}
            >
              ({restaurant.count})
            </span>
          </>
        ) : (
          <>
            <span className="text-warning">0 Reviews</span>
          </>
        )}
      </td>
      <td>
        <button
          className="btn btn-warning"
          onClick={(e) => updateRestaurant(e, restaurant.id)}
        >
          Update
        </button>
      </td>
      <td>
        <button
          onClick={(e) => deleteRestaurant(e, restaurant.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Restaurant;
