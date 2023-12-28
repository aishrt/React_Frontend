import { Button } from "@mui/material";
import errorImg from "../../assets/error.jpg";
import { useNavigate } from "react-router-dom";
import storage from "../../utils/storage";
import { ContentLayout } from "../../layout/ContentLayout";
function NotFound() {
  const token = storage.getToken();

  const navigate = useNavigate();
  return (
    <ContentLayout title="Not Found">
      <div className="container">
        <div className="make-center mt-2">
          <img className="errorImg" src={errorImg} alt="errorimage" />
          {token ? (
            <Button variant="contained" onClick={() => navigate("/profile")}>
              Refresh
            </Button>
          ) : (
            <Button variant="contained" onClick={() => navigate("/")}>
              Refresh
            </Button>
          )}
        </div>
      </div>
    </ContentLayout>
  );
}

export default NotFound;
