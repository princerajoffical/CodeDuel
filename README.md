# ⚔️ CodeDuel

CodeDuel is a real-time, head-to-head competitive programming platform where developers duel each other to solve algorithmic challenges. Features include real-time waiting rooms, automated ELO rating updates, an integrated compiler editor, high-contrast cream-and-black styling, and personal battle dashboards.

---
#Report 
[CODEDUEL REPORT.pdf](https://github.com/user-attachments/files/30274703/CODEDUEL.REPORT.pdf)



## ✨ Features

- **Real-Time Matchmaking:** Create custom waiting rooms, set language constraints, select difficulty levels, and share room keys to invite competitors.
- **Dynamic Coding Arena:** Work inside a fully-featured Monaco Editor (VS Code core) with tab triggers, syntax highlighting, and multiple language templates (C++, Java, Python, JavaScript, C).
- **Backend-Driven Question Bank:** Problems are selected randomly from a pre-seeded collection of 24 algorithmic challenges (spanning Easy, Medium, and Hard difficulties).
- **Competitive Elo Rating:** Elo ratings adjust dynamically based on match results, with rating protection built-in for uncompleted or cancelled matches.
- **Personal Dashboard:** Track matches played, wins, losses, ELO graphs, and recent battle histories from the perspective of the logged-in user.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18 (Vite template)
- **Styling:** Vanilla CSS + Tailwind CSS (v4)
- **Editor:** `@monaco-editor/react`
- **Sockets:** `socket.io-client`
- **Icons:** `lucide-react`
- **HTTP Client:** `axios`

### Backend
- **Server:** Node.js + Express
- **Real-Time Layer:** Socket.IO
- **Database:** MongoDB + Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) + bcrypt
- **Execution Sandbox:** vm-sandbox + optional remote Judge0 REST connection

---

## 📂 Folder Structure

```text
CodeDuel/
├── client/              # Frontend React application (Vite)
│   ├── src/
│   │   ├── components/  # Presentation UI & Arena Panels
│   │   ├── context/     # Auth and Theme state contexts
│   │   ├── hooks/       # Custom React hooks (useJudge, useRoomSocket)
│   │   ├── pages/       # Page components (Dashboard, Arena, Auth)
│   │   ├── services/    # REST API endpoints (userService, matchService)
│   │   └── sockets/     # Global Socket client definition
│   └── .env.example     # Frontend environment template
│
├── server/              # Backend Express application
│   ├── src/
│   │   ├── config/      # MongoDB connection
│   │   ├── controllers/ # Auth, Rooms, and Judge endpoints
│   │   ├── models/      # Mongoose Models (User, Room, Match, Problem)
│   │   ├── routes/      # Express API routes
│   │   ├── services/    # Room logic controllers
│   │   ├── sockets/     # Server-side Socket.IO room socket managers
│   │   └── utils/       # Problem seeder, ID generators
│   └── .env.example     # Backend environment template
│
├── .gitignore           # Global git ignore configuration
├── .env.example         # Root level env placeholder variables
└── README.md            # Project documentation (this file)
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v16.x or higher)
- npm or yarn
- MongoDB cluster URI

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/princerajoffical/CodeDuel.git
cd CodeDuel

# Install root, client, and server dependencies
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 2. Configure Environment Variables
Copy `.env.example` at the root to both client and server directories:

#### Server Environment (`server/.env`):
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_signing_key
```

#### Client Environment (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## 💻 Running Locally

You can run client and server processes concurrently from their folders:

### Start Backend Server
```bash
cd server
npm run dev
```
*Note: The server will automatically connect to MongoDB and seed the database with the standard 24 algorithmic challenges if the collection is empty.*

### Start Frontend Client
```bash
cd client
npm run dev
```

The React app will launch at `http://localhost:5173`. Open two different browsers (or incognito windows) to register two accounts and test head-to-head match battles!

---

## 🔒 Security Audit & Credentials
All API paths, MongoDB secrets, and WebSocket paths have been secured. Secrets are consumed dynamically via `.env` environments which are blocked from tracking inside `.gitignore`.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE details.

## 👤 Author
- **Prince Raj** (princerajoffical)
