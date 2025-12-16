# EvalsGenie - AI Evaluation Platform

A full-stack AI evaluation platform for managing domains, test sets, and metrics. Built with React (Frontend) and FastAPI (Backend).

## 🚀 Features

- **Authentication**: Secure JWT-based authentication with signup and login
- **Domain Management**: Create and configure multiple evaluation domains
- **Context Management**:
  - Agent Input/Output samples
  - User Stories
  - System Prompts
  - Training Examples (Few-shot learning)
- **RAG Context**: Upload and manage reference documents
- **Evaluation & Metrics**:
  - Test Sets management
  - Evaluation runs
  - Live metrics dashboard with KPIs

## 🛠️ Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **Wouter** for routing
- **React Query** for state management
- **Tailwind CSS** for styling
- **Shadcn/ui** components

### Backend
- **FastAPI** (Python 3.9+)
- **MongoDB Atlas** for database
- **Motor** for async MongoDB operations
- **JWT** for authentication
- **bcrypt** for password hashing

## 📋 Prerequisites

- Node.js 16+ and npm
- Python 3.9+
- MongoDB Atlas account (or local MongoDB)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd EvalsGenieUI
```

### 2. Frontend Setup

```bash
cd client
npm install
```

### 3. Backend Setup

```bash
cd client/server
pip install -r requirements.txt
```

### 4. Environment Configuration

Create a `.env` file in `client/server/`:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/?appName=YourApp
JWT_SECRET=your-secret-key-change-this-in-production
```

## 🚀 Running the Application

### Start the Backend

```bash
cd client/server
python -m uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

### Start the Frontend

```bash
cd client
npm run dev:client
```

The frontend will be available at `http://localhost:5173`

## 📁 Project Structure

```
EvalsGenieUI/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utilities and API client
│   │   └── hooks/           # Custom React hooks
│   ├── server/              # Backend application
│   │   ├── main.py          # FastAPI app entry point
│   │   ├── auth.py          # Authentication routes
│   │   ├── domains.py       # Domain management
│   │   ├── context.py       # Context assets management
│   │   ├── documents.py     # RAG document management
│   │   ├── evaluation.py    # Evaluation & metrics
│   │   ├── models.py        # Pydantic models
│   │   └── database.py      # MongoDB connection
│   └── public/              # Static assets
└── README.md
```

## 🔐 Authentication

The application uses JWT-based authentication:

1. **Signup**: Create a new account at `/signup`
2. **Login**: Authenticate at `/login`
3. **Protected Routes**: All domain routes require authentication

## 📊 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Create new user
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/auth/me` - Get current user info

### Domains
- `GET /api/v1/domains` - List all domains
- `GET /api/v1/domains/{id}` - Get domain details
- `PUT /api/v1/domains/{id}` - Update domain
- `POST /api/v1/domains` - Create domain

### Context Assets
- `GET/POST/DELETE /api/v1/domains/{id}/agent-io` - Agent I/O samples
- `GET/POST/DELETE /api/v1/domains/{id}/user-stories` - User stories
- `GET/POST/PUT/DELETE /api/v1/domains/{id}/prompts` - Prompts
- `GET/POST/DELETE /api/v1/domains/{id}/training-examples` - Training examples

### Documents
- `GET /api/v1/domains/{id}/documents` - List documents
- `POST /api/v1/domains/{id}/documents` - Upload document
- `DELETE /api/v1/domains/{id}/documents/{doc_id}` - Delete document

### Evaluation
- `GET/POST/DELETE /api/v1/domains/{id}/test-sets` - Test sets
- `POST /api/v1/domains/{id}/run-eval` - Run evaluation
- `GET /api/v1/domains/{id}/metrics` - Get metrics

## 🧪 Development

### Backend Development

The backend uses FastAPI with automatic reload:

```bash
cd client/server
python -m uvicorn main:app --reload --port 8000
```

### Frontend Development

The frontend uses Vite with HMR:

```bash
cd client
npm run dev:client
```

## 📝 Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - Token expiration time (default: 86400)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- Ensure MongoDB Atlas connection string is properly configured
- bcrypt version 4.0.1 is required for compatibility

## 📧 Contact

For questions or support, please open an issue on GitHub.