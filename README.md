

## 🛍️ E-Commerce Dashboard

A **full-stack multi-vendor eCommerce platform** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.
It includes authentication with **JWT** and **Google OAuth**, **Cloudinary** integration for image uploads, and a **CI pipeline** powered by **GitHub Actions**.

---

### 🧠 Tech Stack

| Layer            | Technologies                             |
| ---------------- | ---------------------------------------- |
| **Frontend**     | React.js (Vite), Tailwind CSS            |
| **Backend**      | Node.js, Express.js                      |
| **Database**     | MongoDB Atlas                            |
| **Auth**         | JWT, Google OAuth 2.0                    |
| **File Storage** | Cloudinary                               |
| **CI/CD**        | GitHub Actions                           |

---

### 📁 Project Structure

```
EcomerceDashboard/
│
├── frontend/               # React + Vite app
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/                # Node.js + Express API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── package.json
│
└── .github/
    └── workflows/
        └── ecommerce-ci.yml   # Continuous Integration pipeline
```

---

### 🔐 Environment Variables

Create a `.env` file inside the **backend** folder and add the following values:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SALT_ROUND=10
PORT=5000
```

> ⚠️ These values are securely stored in **GitHub Secrets** for CI/CD runs.

---

### 💻 Running the Project Locally

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ecomerce-dashboard.git
cd ecomerce-dashboard
```

#### 2️⃣ Run the Backend

```bash
cd backend
npm install
npm start
```

Backend will run on: **[http://localhost:5000](http://localhost:5000)**

#### 3️⃣ Run the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on: **[http://localhost:5173](http://localhost:5173)**

---

### 🧪 Running Tests

You can run tests for both frontend and backend:

#### Frontend:

```bash
cd frontend
npm test
```

#### Backend:

```bash
cd backend
npm test
```

> In CI, GitHub Actions automatically installs dependencies, runs tests, and builds the project on each push or pull request.

---

### ⚙️ CI/CD Pipeline (GitHub Actions)

Your current workflow (`.github/workflows/ecommerce-ci.yml`) automatically:

1. Installs all dependencies (frontend + backend)
2. Runs backend and frontend tests
3. Builds the frontend
4. Validates code on pull requests to `main`

This helps ensure the code is stable before merging into production.

> 🧩 Currently, only **CI** (testing & build) is active.
> You can later extend it for **CD (deployment)** on platforms like:
>
> * **Frontend:** Vercel or Netlify
> * **Backend:** Render or Railway

---

### ✨ Features

* 🔐 JWT-based authentication
* 🔑 Google OAuth login
* 🛍️ Vendor and customer roles
* 📦 Product management (CRUD operations)
* ☁️ Cloudinary image uploads
* 🎨 Modern UI with Tailwind + ShadCN
* ⚙️ GitHub Actions for CI pipeline

---

### 🚀 Next Steps: Full CI/CD Setup

Once your project is stable and you’re ready to host it online, here’s how to extend it:

#### **1️⃣ Frontend Deployment (Vercel or Netlify)**

* Connect your GitHub repo on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
* Choose the `/frontend` directory as the root.
* Set build command:

  ```bash
  npm run build
  ```
* Output directory:

  ```bash
  dist
  ```
* Add all frontend environment variables (e.g., `VITE_API_URL`).

#### **2️⃣ Backend Deployment (Render or Railway)**

* Create a new web service on [Render](https://render.com/) or [Railway](https://railway.app/).
* Connect your GitHub repo.
* Set the root directory to `/backend`.
* Start command:

  ```bash
  npm start
  ```
* Add all backend environment variables from `.env`.

#### **3️⃣ GitHub Actions Deployment (Optional)**

Once hosting is set, you can create a new file:

```
.github/workflows/deploy.yml
```

This will automatically:

* Run your CI checks (build/test)
* Deploy to Vercel/Render **after merge to `main`**

This gives you a **complete CI/CD pipeline** — from testing → build → deployment 🚀

---

### 🧑‍💻 Author

**👤 Ch Shahzad**
💼 MERN Stack Developer & DevOps Engineer
📍 Islamabad, Pakistan
📧 Choudhuryshahzad5068@gmail.com

