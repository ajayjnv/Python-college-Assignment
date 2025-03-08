import { useState } from "react";
import axios from "axios";
import NavBar from "./Navbar";
import "../styles/displayNotes.css";

export default function DisplayNotes() {
  const [author, setAuthor] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [notes, setNotes] = useState([]);
  const [showBook, setShowBook] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for controlling popup visibility
  const [currentPage, setCurrentPage] = useState(0);

  const handleFetchNotes = async () => {
    try {
      const response = await axios.post("http://localhost:5000/get_notes", { author, secret_key: secretKey });
      setNotes(response.data.notes);
      setShowBook(true);
      setShowPopup(false); // Close the popup after valid details
    } catch (error) {
      alert("Invalid author or secret key");
    }
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleNext = () => {
    if (currentPage < notes.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="main-container">
        {!showBook ? (
          <div className="user-box-container">
            <button className="submit-button-box" onClick={handleOpenPopup}>Open Diary</button>
          </div>
        ) : (
          <div className="note-display-box">
            <h2>{author}'s Diary</h2>

            <div className="note-card">
              <h3>Page {currentPage + 1}</h3>
              <p className="note-content">{notes[currentPage]}</p>
            </div>

            {/* Pagination Buttons */}
            <div className="pagination-buttons">
              <button className="prev-button" onClick={handlePrevious} disabled={currentPage === 0}>
                Previous
              </button>
              <button className="next-button" onClick={handleNext} disabled={currentPage === notes.length - 1}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="popup-overlay-box">
          <div className="popup-container-box">
            <h2>Enter Author Details</h2>
            <input
              type="text"
              placeholder="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="input-field-box"
            />
            <input
              type="password"
              placeholder="Secret Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="input-field-box"
            />
            <div className="popup-buttons-box">
              <button className="submit-button-box" onClick={handleFetchNotes}>Submit</button>
              <button className="cancel-button-box" onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
