# Backend Development Plan: EvalsGenie

## 1️⃣ Executive Summary
This document outlines the backend development plan for **EvalsGenie**, an AI evaluation platform. The backend will be built using **FastAPI (Python 3.13)** and **MongoDB Atlas** (via Motor).

**Key Constraints:**
*   **No Docker**: Run directly on host.
*   **FastAPI & Async**: High performance, non-blocking.
*   **MongoDB Atlas**: Cloud database only.
*   **Manual Verification**: Every task requires a manual test step via the Frontend UI.
*   **Single Branch**: Direct pushes to `main` after verification.

**Sprint Strategy:**
We will execute **6 Sprints (S0-S5)** to deliver a fully functional backend matching the existing frontend.

---

## 2️⃣ In-Scope & Success Criteria

**In-Scope Frontend Features:**
*   **Auth**: Login, Logout, (Signup implicitly required for creating users).
*   **Domain Settings**: Manage domain config (alias, connection details, schema).
*   **Context Management**:
    *   **Agent I/O**: Manage sample inputs/outputs.
    *   **User Stories**: CRUD for user personas/goals.
    *   **Prompts**: Manage system prompts.
    *   **RAG Context**: Upload and list reference documents.
    *   **Training**: Manage few-shot Q&A examples.
*   **Evaluation**:
    *   **Test Sets**: View and manage ground truth datasets.
    *   **Execution**: Trigger evaluation runs (mock execution for now).
    *   **Metrics**: Dashboard with KPIs and charts.

**Success Criteria:**
*   All frontend forms and lists connect to real backend APIs.
*   No hardcoded mock data remains in the active UI paths.
*   Data persists to MongoDB Atlas.
*   Tests pass manually via the browser.

---

## 3️⃣ API Design

**Base Path:** `/api/v1`
**Error Format:** `{ "detail": "Error message" }`

### **Auth**
*   `POST /auth/signup` - Create account (Email/Password).
*   `POST /auth/login` - Get JWT.
*   `POST /auth/logout` - Clear session (frontend side mostly).
*   `GET /auth/me` - Get current user info.

### **Domains**
*   `GET /domains/{id}` - Get domain details.
*   `PUT /domains/{id}` - Update domain configuration.
*   `GET /domains` - List all domains (for sidebar selector).

### **Context & Assets**
*   `GET/POST/DELETE /domains/{id}/agent-io` - Agent Input/Output samples.
*   `GET/POST/DELETE /domains/{id}/user-stories` - User stories.
*   `GET/POST/PUT/DELETE /domains/{id}/prompts` - Prompts management.
*   `GET/POST/DELETE /domains/{id}/training-examples` - Few-shot examples.
*   `GET/POST/DELETE /domains/{id}/documents` - RAG files metadata (POST handles file upload).

### **Evaluation**
*   `GET/POST/PUT/DELETE /domains/{id}/test-sets` - Ground truth questions.
*   `POST /domains/{id}/run-eval` - Trigger evaluation (returns run ID).
*   `GET /domains/{id}/metrics` - Get dashboard stats (KPIs, charts).

---

## 4️⃣ Data Model (MongoDB Atlas)

**Collections:**

1.  **users**
    *   `email` (string, unique)
    *   `password_hash` (string)
    *   `created_at` (datetime)
    *   *Example:* `{ "email": "demo@evalsgenie.com", "password_hash": "..." }`

2.  **domains**
    *   `id` (string, manually assigned or slug)
    *   `alias` (string)
    *   `description` (string)
    *   `dialect` (string: Snowflake, Postgres, etc.)
    *   `secret` (string)
    *   `schema_name` (string)
    *   `retriever_top_k` (int)
    *   `is_active` (bool)
    *   *Example:* `{ "id": "maps", "alias": "Ads Insights", "dialect": "Snowflake" ... }`

3.  **agent_io_samples**
    *   `domain_id` (string)
    *   `input` (json/string)
    *   `output` (json/string)

4.  **user_stories**
    *   `domain_id` (string)
    *   `story` (string)

5.  **prompts**
    *   `domain_id` (string)
    *   `key` (string)
    *   `type` (string)
    *   `content` (string)

6.  **rag_documents**
    *   `domain_id` (string)
    *   `filename` (string)
    *   `size` (string)
    *   `uploaded_at` (string/datetime)
    *   *Note:* Store file content in GridFS or just metadata if file storage isn't critical yet. For this MVP, storing metadata + saving file to local `uploads/` folder is sufficient.

7.  **training_examples**
    *   `domain_id` (string)
    *   `question` (string)
    *   `type` (string)
    *   `tables` (list[string])

8.  **test_sets**
    *   `domain_id` (string)
    *   `question` (string)
    *   `ground_truth` (string)
    *   `difficulty` (string)
    *   `last_status` (string: pass/fail/warn)

9.  **eval_runs** (Optional for Metrics)
    *   `domain_id` (string)
    *   `scores` (object: { factuality: 88, ... })
    *   `kpis` (object: { hallucination_rate: 1.2, ... })

---

## 5️⃣ Frontend Audit & Feature Map

| Page | Route | Backend Need | Auth? |
| :--- | :--- | :--- | :--- |
| **Login** | `/login` | `POST /auth/login` | No |
| **Domain General** | `/domain/:id` | `GET/PUT /domains/:id` | Yes |
| **Agent IO** | `/domain/:id/agent-io` | `GET/POST/DELETE /agent-io` | Yes |
| **User Stories** | `/domain/:id/user-stories` | `GET/POST/DELETE /user-stories` | Yes |
| **Prompts** | `/domain/:id/prompts` | `GET/POST/PUT/DELETE /prompts` | Yes |
| **RAG Context** | `/domain/:id/rag-context` | `GET /documents`, `POST /documents` (upload) | Yes |
| **Sample Q&A** | `/domain/:id/training` | `GET/POST/PUT/DELETE /training-examples` | Yes |
| **Test Sets** | `/domain/:id/test-sets` | `GET /test-sets`, `POST /run-eval` | Yes |
| **Metrics** | `/domain/:id/metrics` | `GET /metrics` | Yes |

---

## 6️⃣ Configuration & ENV Vars

*   `APP_ENV`: `development`
*   `PORT`: `8000`
*   `MONGODB_URI`: `mongodb+srv://...` (Atlas Connection)
*   `JWT_SECRET`: `change-me-in-prod`
*   `JWT_EXPIRES_IN`: `86400`
*   `CORS_ORIGINS`: `http://localhost:5000` (Vite default) or `*` for dev.

---

## 7️⃣ Testing Strategy (Manual via Frontend)

*   **Validation:** Use the actual React Frontend.
*   **Process:**
    1.  Implement Backend Endpoint.
    2.  Update Frontend API call (replace mock).
    3.  **Manual Test:** Perform the action in the UI.
    4.  **Verify:** Check persistence (refresh page) and Console Network tab.
    5.  **Commit.**

---

## 🔟 Dynamic Sprint Plan & Backlog

### 🧱 S0 – Environment Setup & Frontend Connection

**Objectives:**
*   Initialize FastAPI project structure.
*   Connect to MongoDB Atlas.
*   Establish global error handling and CORS.
*   Replace dummy `mock-data.ts` references in frontend logic where possible (prepare for API calls).

**Tasks:**
*   Create `main.py` with FastAPI app and `/healthz` endpoint.
    *   *Manual Test:* Visit `http://localhost:8000/healthz` -> returns `{status: "ok"}`.
    *   *User Test:* "Start backend and curl health endpoint."
*   Configure `database.py` with `motor` and `MONGODB_URI`.
    *   *Manual Test:* `/healthz` checks DB ping.
    *   *User Test:* "Ensure logs show successful Mongo connection."
*   Add CORS middleware allowing frontend origin.
    *   *Manual Test:* Frontend fetch to backend doesn't show CORS error.
    *   *User Test:* "Check browser console for CORS errors."
*   Create `.gitignore` and initialize Git.
    *   *Manual Test:* `git status` shows clean ignore list.

**Post-sprint:** Push to `main`.

---

### 🧩 S1 – Auth & User Management

**Objectives:**
*   Secure the application.
*   Allow user creation and login.

**Tasks:**
*   Create `User` model and `auth.py` router.
*   Implement `POST /api/v1/auth/signup`.
    *   *Manual Test:* Use Postman/Curl to create a user.
    *   *User Test:* "Create a user `demo@evalsgenie.com`."
*   Implement `POST /api/v1/auth/login` (return JWT).
    *   *Manual Test:* Update `src/pages/login.tsx` to call API. Login successfully.
    *   *User Test:* "Log in via UI and get redirected to domain page."
*   Implement `GET /api/v1/auth/me` (Protected).
    *   *Manual Test:* Verify Sidebar shows user email.
    *   *User Test:* "Check sidebar footer for correct user info."

**Post-sprint:** Push to `main`.

---

### 🧩 S2 – Domain Configuration

**Objectives:**
*   Make the "Domain General" page functional.

**Tasks:**
*   Create `Domain` model.
*   Implement `GET /api/v1/domains/{id}` and `PUT /api/v1/domains/{id}`.
*   Connect `src/pages/domain/general.tsx` to API.
    *   *Manual Test:* Change "Dialect" to "PostgreSQL", save, refresh page. Value should persist.
    *   *User Test:* "Edit domain description and verify persistence."
*   Implement `GET /api/v1/domains` for Sidebar list.
    *   *Manual Test:* Sidebar shows list of available domains (seed one if needed).
    *   *User Test:* "Verify sidebar domain name matches DB."

**Post-sprint:** Push to `main`.

---

### 🧩 S3 – Context Assets (Stories, Prompts, IO)

**Objectives:**
*   Enable CRUD for all "Context" submenu items.

**Tasks:**
*   **Agent I/O:** Implement CRUD for `agent_io_samples`.
    *   *Manual Test:* Add a sample in `AgentIO` page, delete it.
    *   *User Test:* "Add a sample, refresh, ensure it's still there."
*   **User Stories:** Implement CRUD for `user_stories`.
    *   *Manual Test:* Add a user story, verify list updates.
    *   *User Test:* "Create 'As a user...' story and verify."
*   **Prompts:** Implement CRUD for `prompts`.
    *   *Manual Test:* Edit a prompt text in `DomainPrompts` page.
    *   *User Test:* "Update a system prompt and save."
*   **Training Examples:** Implement CRUD for `training_examples`.
    *   *Manual Test:* Add a question/answer pair in `DomainTraining`.
    *   *User Test:* "Add a new training example."

**Post-sprint:** Push to `main`.

---

### 🧩 S4 – RAG Document Management

**Objectives:**
*   Handle file uploads for RAG context.

**Tasks:**
*   Implement `POST /api/v1/domains/{id}/documents` (Multipart upload).
    *   Save file to local `uploads/` dir (MVP) and metadata to Mongo.
*   Implement `GET /api/v1/domains/{id}/documents` list.
*   Connect `src/pages/domain/rag-context.tsx` to API.
    *   *Manual Test:* Upload a small PDF. Verify it appears in the list.
    *   *User Test:* "Upload a file and verify it appears in the list with correct size."
*   Implement Delete Document.
    *   *Manual Test:* Click trash icon, file disappears.

**Post-sprint:** Push to `main`.

---

### 🧩 S5 – Evaluation & Metrics

**Objectives:**
*   Manage Test Sets and view Metrics.

**Tasks:**
*   **Test Sets:** Implement CRUD for `test_sets` collection.
    *   *Manual Test:* Add a test case in `TestSets` page.
    *   *User Test:* "Create a new evaluation question."
*   **Run Eval:** Implement `POST /run-eval`.
    *   *Logic:* For now, just mark random pass/fail updates to `test_sets` to simulate a run.
    *   *Manual Test:* Click "Run Evaluation", see status badges change.
    *   *User Test:* "Trigger a run and observe status updates."
*   **Metrics:** Implement `GET /metrics`.
    *   *Logic:* Aggregate data from `test_sets` or return stored metrics.
    *   *Manual Test:* `MetricsDashboard` loads data from backend.
    *   *User Test:* "Verify dashboard numbers match backend data."

**Post-sprint:** Push to `main`.
