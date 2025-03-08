from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# In-memory storage
users = {}  # Stores users { "username": "secret_key" }
notes = {}  # Stores notes { "username": ["note1", "note2"] }

@app.route("/create_user", methods=["POST"])
def create_user():
    """Create a new user with a secret key."""
    data = request.json
    if "author" not in data or "secret_key" not in data:
        return jsonify({"error": "Missing author or secret key!"}), 400

    # Check if the author already exists
    if data["author"] in users:
        return jsonify({"error": "Author name already exists! Please choose a different name."}), 400

    # Create the new user
    users[data["author"]] = data["secret_key"]
    return jsonify({"message": "User created successfully!"}), 201

@app.route("/check_author", methods=["POST"])  # Changed to POST for consistency
def check_author():
    """Check if an author exists in the system."""
    data = request.json
    if "author" not in data:
        return jsonify({"error": "Author name is required!"}), 400

    # Check if the author exists in the users dictionary
    return jsonify({"exists": data["author"] in users}), 200

@app.route("/add_note", methods=["POST"])
def add_note():
    """Add a note for an existing user."""
    data = request.json
    if "author" not in data or "note" not in data:
        return jsonify({"error": "Missing author or note!"}), 400

    if data["author"] in users:
        notes.setdefault(data["author"], []).append(data["note"])
        return jsonify({"message": "Note added successfully!"}), 201

    return jsonify({"error": "User not found!"}), 404

@app.route("/get_notes", methods=["POST"])
def get_notes():
    """Retrieve notes for a given author."""
    data = request.json
    if "author" not in data or "secret_key" not in data:
        return jsonify({"error": "Missing author or secret key!"}), 400

    if users.get(data["author"]) == data["secret_key"]:
        return jsonify({"notes": notes.get(data["author"], [])}), 200

    return jsonify({"error": "Invalid credentials!"}), 401

if __name__ == "__main__":
    app.run(port=5000, threaded=True)
