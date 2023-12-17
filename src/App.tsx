import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import { HelmetProvider } from "react-helmet-async";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ToastContainer />
        <AppRoutes />
      </Router>
    </HelmetProvider>
  );
}

export default App;
