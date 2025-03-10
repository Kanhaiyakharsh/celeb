import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("Clearing old session data...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("kycStatus");
    localStorage.clear();
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting login with:", { email, password });

    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id);

        login(data.token, data.user);

        setIsLoggedIn(true);
        console.log("Stored user:", localStorage.getItem("user"));

      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  // UseEffect to Redirect after State Update
  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.role === "Admin") {
        navigate("/admin-dashboard");
      } else if (storedUser?.role === "Manager") {
        navigate("/manager-dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isLoggedIn, navigate]); // Runs when isLoggedIn changes

  return (
    <section className="has-background-black">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half my-6">
            <form onSubmit={handleSubmit} className="box">
              <h1 className="title has-text-centered">Login</h1>

              <div className="field">
                <label htmlFor="email" className="label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="password" className="label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="role" className="label">Select Role</label>
                <div className="select is-fullwidth">
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="User">User</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="button is-primary is-fullwidth">
                {isLoggedIn ? "Redirecting..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
