import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import { HelmetProvider } from "react-helmet-async";
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppRoutes />
      </Router>
    </HelmetProvider>
  );
}

export default App;
