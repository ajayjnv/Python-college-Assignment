import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./Navbar";
import "../styles/addNotes.css";

export default function AddNotes() {
    const navigate = useNavigate();
    const location = useLocation();
    const prefilledNote = location.state?.note || "";

    const [author, setAuthor] = useState("");
    const [note, setNote] = useState(prefilledNote);
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString());
    }, []);

    const handleAddNote = async () => {
        if (!author.trim()) {
            alert("Author name is required!");
            return;
        }

        if (!note.trim()) {
            alert("Note is required!");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/check_author`, {
                author: author
              });
            const authorExists = response.data.exists;

            if (!authorExists) {
                alert("Author does not exist! Redirecting to create user page...");
                navigate("/create-user", { state: { note } });
                return;
            }

            await axios.post("http://localhost:5000/add_note", { author, note });
            alert("Successfully added page");
            setNote("");
            setAuthor("");
        } catch (error) {
            console.error("Error checking author:", error);
            alert("Error occurred while checking author.");
        }
    };

    return (
        <div>
            <NavBar />

            {/* Notes Container */}
            <div className="add-notes-container">
                {/* Header */}
                <div className="add-notes-header">
                    <h2 className="header-title">My Writings</h2>
                </div>

                {/* Textarea */}
                <textarea
                    className="diary-page"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Start writing here..."
                    required
                ></textarea>

                {/* Footer */}
                <div className="add-notes-footer">
                    <span className="current-date">{currentDate}</span>
                    <input
                        type="text"
                        className="author-input"
                        placeholder="Author Name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />

                    <button className="add-notes-btn" onClick={handleAddNote}>
                        Add Page
                    </button>
                </div>
            </div>

            {/* Add Note Button */}

        </div>
    );
}
