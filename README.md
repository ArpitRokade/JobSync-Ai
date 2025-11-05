# JobSync AI

```
jobsync-ai
├─ backend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes 
│  │  └─ upload.js
│  ├─ server.js
│  └─ utils
│     └─ analyze.js
├─ frontend
│  ├─ .env
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ index.html
│  └─ src
│     ├─ App.js
│     ├─ component
│     │  └─ AuthForm.jsx
│     ├─ index.css
│     ├─ index.js
│     └─ pages
│        ├─ DashboardPage.js
│        ├─ LoginPage.js
│        ├─ SignupPage.js
│        └─ UploadPage.js
└─ README.md
```

---

## 🚀 How to Run JobSync AI

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/jobsync-ai.git
cd jobsync-ai
```

### 2. Setup Backend

```bash
cd backend
npm install
npm start
```

This will start the backend server (Node.js + Express).

### 3. Setup Frontend

Open a **new terminal** window/tab:

```bash
cd frontend
npm install
npm start
```

This will start the React frontend.

---

## Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 💡 Features

- **Sign up / Log in**
- **Upload a Resume** (.pdf/.docx)
- **Paste or Upload a Job Description**
- **Get a Match Score, Missing Skills, and Course Recommendations Instantly**
