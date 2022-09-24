interface IStarRating {
  rating: number;
}

const StarRating = (props: IStarRating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= props.rating) {
      stars.push(<i key={i} className="fa-solid fa-star text-warning"></i>);
    } else if (
      i === Math.ceil(props.rating) &&
      !Number.isInteger(props.rating)
    ) {
      stars.push(<i key={i} className="fa-regular fa-star-half-stroke text-warning"></i>);
    } else {
      stars.push(<i key={i} className="fa-regular fa-star text-warning"></i>);
    }
  }
  return <>{stars}</>;
};

export default StarRating;
