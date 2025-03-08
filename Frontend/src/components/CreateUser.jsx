import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "./Navbar";
import "../styles/createUser.css";

export default function CreateUser() {
  const [author, setAuthor] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the previously entered note (if any)
  const prefilledNote = location.state?.note || "";
  
  const handleCreateUser = async () => {
    if (!author.trim() || !secretKey.trim()) {
      alert("Both Author Name and Secret Key are required!");
      return;
    }
  
    try {
      // Check if the author name already exists
      const response = await axios.post("http://localhost:5000/check_author", { author });
      
      // If the author already exists, show an alert
      if (response.data.exists) {
        alert("Author name already exists. Please choose a different name.");
        return;
      }
  
      // If the author name is available, proceed with creating the user
      await axios.post("http://localhost:5000/create_user", { author, secret_key: secretKey });
      alert("User created successfully!");
  
      // Redirect back to Add Notes page with the previously entered note
      navigate("/", { state: { note: prefilledNote } });
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error occurred while creating user.");
    }
  };
  

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="user-box">
          <h2>Create User</h2>
          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Secret Key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="input-field"
            required
          />
          <button className="submit-button" onClick={handleCreateUser}>Add User</button>
        </div>
      </div>
    </div>
  );
}
