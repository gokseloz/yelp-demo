/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "src/apis/RestaurantFinder";
import AddReview from "src/components/AddReview";
import Reviews from "src/components/Reviews";
import StarRating from "src/components/StarRating";

const RestaurantDetailsPage = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({} as RestaurantWithReview);

  const getRestaurant = async () => {
    try {
      const response = await RestaurantFinder.get(`/${id}`);
      setRestaurant(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  return (
    <>
      {restaurant.restaurant && (
        <div className="container">
          <h1 className="text-center display-1">
            {restaurant.restaurant.name}
          </h1>
          <div className="text-center">
            {restaurant.restaurant.count ? (
              <>
                <StarRating
                  rating={parseInt(restaurant.restaurant.average_rating)}
                />
                <span
                  className="text-warning d-block-inline"
                  style={{ marginLeft: ".3rem" }}
                >
                  ({restaurant.restaurant.count})
                </span>
              </>
            ) : (
              <>
                <span className="text-warning">0 Reviews</span>
              </>
            )}
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>

          <div className="mt-3">
            <Reviews reviews={restaurant.reviews} />
          </div>

          <AddReview />
        </div>
      )}
    </>
  );
};

export default RestaurantDetailsPage;
