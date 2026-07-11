# 🎓 Learning Style Prediction System

> An adaptive educational platform that identifies a learner's dominant style — Visual, Aural, Read-Write, or Kinesthetic (VARK) — and tailors content delivery accordingly, using a machine learning classifier trained on behavioural and self-reported data.

[![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Express](https://img.shields.io/badge/Backend-Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Flask](https://img.shields.io/badge/ML_Service-Flask-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![scikit-learn](https://img.shields.io/badge/Model-Random_Forest-F7931E?logo=scikitlearn&logoColor=white)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-Academic_Project-lightgrey)]()

**Repository:** [github.com/Anhu22/Learning_Style_Prediction](https://github.com/Anhu22/Learning_Style_Prediction)

---

## 🎥 Demo

🎬 **Demo Video Coming Soon**

*The demo video will be available on YouTube/Vimeo. Check back soon for a walkthrough of the Learning Style Prediction System.*

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [System Architecture](#system-architecture)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [How It Works](#how-it-works)
7. [Machine Learning Model](#machine-learning-model)
8. [Getting Started](#getting-started)
9. [Environment Variables](#environment-variables)
10. [API Reference](#api-reference)
11. [Roadmap](#roadmap)
12. [Contributing](#contributing)
13. [License](#license)
14. [Acknowledgements](#acknowledgements)

---

## Overview

Every learner absorbs information differently. The **VARK model** — Visual, Aural, Read-Write, and Kinesthetic — provides a widely used framework for categorising these preferences. This project operationalises that framework into a full-stack, ML-driven web application: students interact with style-specific lessons and quizzes, and a trained **Random Forest classifier** predicts their dominant learning style from their responses, returning a confidence breakdown across all four categories.

The result is a personalised learning experience — one that adapts *to* the student, rather than expecting the student to adapt to a single, generic teaching method.

This project was built as a team effort, combining a modern React frontend, a secure Node.js/Express backend, and a dedicated Python-based machine learning microservice.

## Key Features

- 🧠 **ML-Powered Prediction** — Random Forest model returns per-category confidence percentages (Visual / Aural / Read-Write / Kinesthetic), not just a single label.
- 📚 **Style-Specific Learning Modules** — Three lessons and three quizzes for each of the four VARK categories, with live section-time tracking.
- 📊 **Personal Dashboard** — Visual tracking of quiz performance and predicted learning style over time.
- 📝 **Self-Assessment Flow** — Structured questionnaire feeding directly into the prediction pipeline.
- 🔐 **Secure Authentication** — JWT-based login/signup with bcrypt password hashing.
- 🗒️ **Productivity Tools** — Built-in notes and to-do list to support the learning workflow.
- 🌐 **Decoupled Microservice Architecture** — ML inference is isolated from the main application, enabling independent scaling and model iteration.

## System Architecture

The application follows a **three-tier, service-oriented architecture**:

```
┌─────────────────────┐        ┌──────────────────────┐        ┌───────────────────────┐
│      client_front     │  HTTP  │        server           │  HTTP  │       ml-service         │
│   React 19 SPA         │ ─────► │   Express.js API       │ ─────► │    Flask ML API          │
│   (UI / UX Layer)      │ ◄───── │   (Auth, Data, CORS)   │ ◄───── │  (Random Forest Model)  │
└─────────────────────┘        └──────────┬───────────┘        └───────────────────────┘
                                              │
                                              ▼
                                     ┌─────────────────┐
                                     │     MongoDB        │
                                     │  (Users, Results)  │
                                     └─────────────────┘
```

| Tier | Responsibility |
|---|---|
| **Frontend** (`client_front/`) | Renders lessons, quizzes, dashboard, and self-assessment; consumes the backend API |
| **Backend** (`server/`) | Handles authentication, authorisation, and persistence of user results; proxies prediction requests |
| **ML Service** (`ml-service/`) | Exposes a `/predict` endpoint that runs the trained model and returns style probabilities |

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, React Router, Styled Components, Lucide Icons |
| **Backend** | Express.js, MongoDB, Mongoose, JWT, bcrypt |
| **Machine Learning** | Python, Flask, scikit-learn (Random Forest), pandas, joblib |

## Project Structure

```
Learning_Style_Prediction/
├── client_front/              # React frontend
│   ├── src/
│   │   ├── modules/
│   │   │   ├── visual/        # 3 lessons + 3 quizzes
│   │   │   ├── aural/         # 3 lessons + 3 quizzes
│   │   │   ├── read-write/    # 3 lessons + 3 quizzes
│   │   │   └── kinesthetic/   # 3 lessons + 3 quizzes
│   │   ├── dashboard/
│   │   ├── self-assessment/
│   │   ├── notes/
│   │   └── todo/
│   └── package.json
│
├── server/                    # Express.js backend
│   ├── models/                # Mongoose schemas (User, Result, etc.)
│   ├── routes/                # Auth & results API routes
│   ├── middleware/             # JWT auth middleware
│   └── package.json
│
└── ml-service/                 # Flask ML microservice
    ├── Dataset1.csv            # Training dataset
    ├── model.joblib             # Trained Random Forest classifier
    ├── scaler.joblib            # Feature scaler
    ├── imputer.joblib           # Missing-value imputer
    ├── label_encoder.joblib     # VARK label encoder
    ├── app.py                   # Flask entry point / /predict route
    └── requirements.txt
```

## How It Works

1. **Sign Up / Log In** — Students authenticate via a JWT-secured login/signup flow.
2. **Engagement** — The student works through lessons and timed quizzes across the four VARK modules (Visual, Aural, Read-Write, Kinesthetic), plus a structured self-assessment.
3. **Feature Submission** — Quiz scores, section engagement time, and self-assessment responses are packaged and sent to the ML service's `/predict` endpoint.
4. **Inference** — The Flask service applies the saved imputer and scaler, then runs the Random Forest model to generate class probabilities.
5. **Response** — The predicted learning style, along with confidence percentages for all four categories, is returned to the backend.
6. **Persistence** — The Express API stores the result against the authenticated user's profile in MongoDB.
7. **Personalisation** — The dashboard visualises historical predictions and quiz performance, guiding the student toward content aligned with their dominant style.

## Machine Learning Model

- **Algorithm:** Random Forest Classifier (`scikit-learn`)
- **Training Data:** `Dataset1.csv` — 1,000 data points, synthetically generated from an initial set of real, manually collected student responses to preserve underlying response patterns while expanding the training set to a size sufficient for reliable model training
- **Preprocessing Pipeline:**
  - `imputer.joblib` — handles missing values
  - `scaler.joblib` — normalises numerical features
  - `label_encoder.joblib` — encodes/decodes the four VARK class labels
- **Output:** Predicted class label + probability distribution across Visual, Aural, Read-Write, and Kinesthetic categories
- **Serving:** Model artefacts are loaded once at Flask startup and served via a stateless `/predict` REST endpoint

### Model Performance

| Metric | Score |
|---|---|
| **Accuracy** | 91.80% |
| **Precision** | 91.84% |
| **Recall** | 91.80% |
| **F1 Score** | 91.79% |

*Evaluated on a held-out test split of the synthetic dataset.*

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.9
- MongoDB (local instance or Atlas cluster)

### 1. Clone the repository

```bash
git clone https://github.com/Anhu22/Learning_Style_Prediction.git
cd Learning_Style_Prediction
```

### 2. Set up the ML service

```bash
cd ml-service
pip install -r requirements.txt
python app.py
```

### 3. Set up the backend

```bash
cd server
npm install
npm start
```

### 4. Set up the frontend

```bash
cd client_front
npm install
npm start
```

The frontend will typically run on `http://localhost:3000`, the backend on `http://localhost:5000` (or as configured), and the ML service on `http://localhost:5001` (or as configured) — adjust based on your `.env` settings.

## Environment Variables

Create a `.env` file inside `server/` with the following (adjust names to match your actual implementation):

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ML_SERVICE_URL=http://localhost:5001
PORT=5000
```

> ⚠️ Never commit `.env` files to version control. Add `.env` to `.gitignore` if not already present.

## API Reference

### Backend (Express)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate and receive a JWT |
| `POST` | `/api/results` | Submit quiz/assessment results |
| `GET` | `/api/results/:userId` | Retrieve a user's result history |

### ML Service (Flask)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/predict` | Accepts student response features, returns predicted VARK style with confidence scores |

> Update the tables above to reflect the exact route names, request/response bodies, and status codes from your implementation before submission.

## Roadmap

- [ ] Expand the real (non-synthetic) response dataset over time to further improve generalisation
- [ ] Add a confusion matrix and per-class precision/recall breakdown to this README
- [ ] Deploy all three services (e.g. Vercel/Netlify for frontend, Render/Railway for backend, and ML service)
- [ ] Add automated tests for API routes and prediction pipeline
- [ ] Add CI/CD pipeline for build and deployment

## Contributing

This is an academic team project. Contributions from team members follow a standard feature-branch workflow:

```bash
git checkout -b feature/your-feature-name
git commit -m "Add: description of change"
git push origin feature/your-feature-name
```

Open a Pull Request against `main` for review before merging.

## License

This project was developed as an academic major project and is not currently released under an open-source license. All rights are reserved by the project contributors unless otherwise stated.

## Acknowledgements

- The **VARK Learning Styles Model**, for providing the theoretical framework underpinning this project
- The open-source **scikit-learn**, **React**, and **Express.js** communities
- Faculty guidance and support throughout the development of this major project