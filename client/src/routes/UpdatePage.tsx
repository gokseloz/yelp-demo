import UpdateRestaurant from "../components/UpdateRestaurant";
import { useNavigate } from "react-router-dom";

const UpdatePage = () => {
  let navigate = useNavigate();
  return (
    <>
      <h1 className="text-center">Update Restaurant</h1>
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <UpdateRestaurant />
    </>
  );
};

export default UpdatePage;
