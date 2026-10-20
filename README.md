# Freelance Project Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) app to track freelance projects: client, budget, deadline and status, with search, filter, sort, edit and light/dark theme support.

## Features

- Add, edit, delete projects and mark them Completed / Pending
- Summary cards: Total Projects, Total Budget, Completed, Overdue
- Status pills with "Overdue by N days" / "Due today"
- Search by client or project title; filter tabs (All, Pending, Completed, Overdue) with counts
- Sort by Budget or Deadline
- Inline form validation, success/error toasts, delete confirmation dialog
- Budgets in Indian format (₹1,00,000) and readable dates (07 Jul 2026)
- Responsive layout (table becomes cards below 700px)
- Light, dark and system theme (saved in localStorage)
- Accessible: labels, ARIA attributes, visible focus states

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Create React App (react-scripts 5), Axios, plain CSS (variables + media queries) |
| Backend | Node.js, Express 5, Mongoose, cors, dotenv |
| Database | MongoDB |
| Testing | Jest, React Testing Library |

## Architecture

```
React frontend (localhost:3000)  --HTTP JSON (Axios)-->  Express API (localhost:5000)  --Mongoose-->  MongoDB
```

### Project structure

```
freelance-project-tracker/
├── backend/
│   ├── controllers/projectController.js   # getProjects, createProject, updateProject, deleteProject
│   ├── models/Project.js                  # Mongoose schema
│   ├── routes/projectRoutes.js            # REST routes mounted at /projects
│   ├── server.js                          # Express entry: CORS, JSON, MongoDB connect
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.jsx        # Container: search, filter, sort, edit/delete state
    │   │   ├── ProjectForm.jsx      # Add-project form with validation
    │   │   ├── ProjectTable.jsx     # Sortable table + mobile cards
    │   │   ├── SummaryCards.jsx
    │   │   ├── Toolbar.jsx          # Search + filter tabs
    │   │   ├── StatusBadge.jsx
    │   │   ├── EditProjectModal.jsx
    │   │   ├── ConfirmDialog.jsx
    │   │   ├── Modal.jsx
    │   │   └── Toast.jsx
    │   ├── api.js                   # Axios instance
    │   ├── App.js                   # Fetches projects, theme toggle
    │   ├── utils.js                 # getStatusInfo, formatBudget, formatDate, validateProject
    │   ├── index.css / App.css      # Theme tokens and styles
    │   └── index.js
    └── package.json
```

### Data model (`Project`)

| Field | Type | Notes |
|---|---|---|
| clientName | String | required |
| projectTitle | String | required |
| budget | Number | required |
| deadline | Date | required |
| isCompleted | Boolean | default `false` |

### API (base URL `http://localhost:5000`)

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Health check |
| GET | `/projects` | List all projects |
| POST | `/projects` | Create a project |
| PUT | `/projects/:id` | Update a project (any field, including `isCompleted`) |
| DELETE | `/projects/:id` | Delete a project |

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB database (local, or a free MongoDB Atlas cluster)

### 1. Clone

```bash
git clone https://github.com/NagSahithiVemavarapu/freelance-project-tracker.git
cd freelance-project-tracker
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```
MONGO_URI=your_mongodb_connection_string
```

Start the server (port 5000):

```bash
npm start
```

### 3. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm start
```

Open http://localhost:3000.

### Other commands

```bash
npm run build         # frontend production build
npm test              # frontend tests
```

## Known Limitations

- The API base URL is hardcoded to `http://localhost:5000` in `frontend/src/api.js`. Use an environment variable (`REACT_APP_API_URL`) for deployment.
- CORS is open to all origins. Restrict it before deploying.
- No authentication; all projects are visible to anyone who can reach the API.
- Validation relies on Mongoose schema rules only.

## Roadmap

- User login and per-user projects
- Server-side validation and pagination
- Backend tests
- Deployment (Render / Vercel + MongoDB Atlas)

## Author

Nag Sahithi Vemavarapu — [GitHub](https://github.com/NagSahithiVemavarapu) · [LinkedIn](https://www.linkedin.com/in/nagsahithi-vemavarapu)
