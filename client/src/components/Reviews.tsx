import StarRating from "./StarRating";

const Reviews = (props: { reviews: Review[] }) => {
  return (
    <div className="container row row-cols-3 mb-2 gap-3">
      {props.reviews.map((review) => (
        <div
          key={review.id}
          className="card text-white bg-primary mr-2"
          style={{ maxWidth: "30%" }}
        >
          <div className="card-header d-flex justify-content-between">
            <span>{review.name}</span>
            <span>
              <StarRating rating={review.rating} />
            </span>
          </div>
          <div className="card-body">
            <p className="card-text">{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
