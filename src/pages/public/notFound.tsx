import { Button } from "@mui/material";
import errorImg from "../../assets/error.jpg";
import { useNavigate } from "react-router-dom";
import storage from "../../utils/storage";
function NotFound() {
  const token = storage.getToken();

  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="make-center mt-2">
          <img className="errorImg" src={errorImg} alt="errorimage" />
          {token ? (
            <Button variant="contained" onClick={() => navigate("/profile")}>
              Refresh
            </Button>
          ) : (
            <Button variant="contained" onClick={() => navigate("/home")}>
              Refresh
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default NotFound;
