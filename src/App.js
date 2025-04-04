// import logo from './logo.svg';
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </AuthProvider>
  );
}

export default App;
