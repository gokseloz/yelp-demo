import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "src/apis/RestaurantFinder";

type Field = "name" | "rating" | "review";

const AddReview = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [review, setReview] = useState({
    name: "",
    rating: 1,
    review: "",
  });

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const field = e.target.id as Field;
    setReview({ ...review, [field]: e.target.value });
  };

  const addReview = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await RestaurantFinder.post(`/${id}/addReview`, review);
      setReview({
        name: "",
        rating: 1,
        review: "",
      });
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-2">
      <form
        action=""
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        onSubmit={addReview}
      >
        <div className="d-flex align-items-center" style={{ gap: "1rem" }}>
          <div className="form-group flex-grow-2" style={{ flexGrow: 3 }}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
              value={review.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="form-group" style={{ flexGrow: 1 }}>
            <label htmlFor="name">Rating</label>
            <select
              id="rating"
              className="form-control"
              value={review.rating}
              onChange={(e) => handleChange(e)}
              required
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            className="form-control"
            value={review.review}
            onChange={(e) => handleChange(e)}
            required
          ></textarea>
        </div>
        <button className="btn btn-primary" style={{ alignSelf: "start" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
