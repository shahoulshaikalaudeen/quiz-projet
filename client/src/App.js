import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl">Bienvenue</h1>
      <LogoutButton />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
