# My Diary Project
 📌 Project Objective
The My Diary Project is a secure digital journal that allows users to write, save, and manage their personal diary entries. Users can create an account, add notes, and view them later with proper authentication.

## 🛠 Tech Stack Used
- **Frontend:** React.js, HTML, CSS
- **Backend:** Python (Flask)
- **Database:** In-memory storage (for simplicity, can be extended to a database like MongoDB or PostgreSQL)
- **Authentication & Security:** Secret key-based authentication
- **State Management:** useState, useEffect (React Hooks)
- **Routing:** React Router
- **HTTP Requests:** Axios

## ✨ Features
- 🔐 **User Authentication:** Secure user management with author verification.
- 📝 **Add & Edit Notes:** Users can add and edit their diary entries.
- 📖 **View Diary Entries:** Users can navigate through diary pages.
- 🔎 **Secure Access:** Only authorized users can access their personal diary.
- 🎨 **Responsive UI:** A user-friendly and responsive design.

## 🚀 Steps to Run the Project

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/my-diary.git
cd my-diary
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Backend Server
Navigate to the backend directory and install dependencies:
```sh
cd backend
pip install -r requirements.txt
```
Create a `.env` file in the backend directory and add:
```
PORT=5000
```
Start the backend server:
```sh
python app.py
```

### 4️⃣ Start the Frontend
Navigate back to the root directory and run:
```sh
npm start
```

### 5️⃣ Open in Browser
Visit `http://localhost:5173` to access the application.


---

💡 Feel free to contribute by submitting pull requests or reporting issues!

📧 Contact: [Your Email or GitHub Profile]
