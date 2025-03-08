import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="logo">MY DIARY</h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/create-user" className="nav-link">Create User</Link>
        <Link to="/display-notes" className="nav-link">Display Diary</Link>
      </div>
    </nav>
  );
}
