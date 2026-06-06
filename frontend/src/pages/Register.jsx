import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    smoking: "No",
    activity: "High",
    conditions: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            age: Number(formData.age),
            height: Number(formData.height),
            weight: Number(formData.weight)
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Account created successfully!");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="register-page">

      <nav className="navbar">
        <div className="logo-section">
          <div className="logo-box"></div>

          <div>
            <h1>VASOSCAN</h1>
            <p>AI Cardiovascular Intelligence</p>
          </div>
        </div>

        <div className="nav-links">
          <a href="#">Technology</a>
          <a href="#">Features</a>
          <a href="#">Research</a>
          <a href="#">About</a>
        </div>
      </nav>

      <div className="register-container">

        <div className="register-card">

          <h2>Create Account</h2>

          <p className="register-subtitle">
            Create your profile to enable AI-based fingertip micro blood flow analysis and personalized vascular insights.
          </p>

          <div className="form-grid">

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                placeholder="Height"
                value={formData.height}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                placeholder="Weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Smoking Status</label>
              <select
                name="smoking"
                value={formData.smoking}
                onChange={handleChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label>Activity Level</label>
              <select
                name="activity"
                value={formData.activity}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Known Conditions (Optional)</label>
              <textarea
                name="conditions"
                placeholder="Enter known medical conditions"
                value={formData.conditions}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            className="register-btn"
            onClick={handleRegister}
          >
            Create Account
          </button>

          <p className="switch-text">
            Already have an account?{" "}
            <Link to="/" className="link">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

