# 📚 Library Management System

A fully functional and modern **Library Management System** built with **React.js**, designed to streamline the operations of a library. This application supports book management, borrowing, returning, and logging all activities to ensure a seamless user and administrator experience.

> **Note:** As this is an organizational project, I couldn't upload the exact version due to ethical concerns. This repository contains a sample version and not the original implementation. The live website deployed on Vercel does not include the dashboard functionality because it requires data fetched from the backend, which hasn't been deployed. However, the complete source code for both frontend and backend is available in this repository. All gallery images, logos, and visuals used in this repository are randomly sourced and not from the original project due to ethical constraints. Please clone and run locally to access all features.

---

## 🌐 Live Demo

🟢 Deployed on **Vercel**:
[library-management-git-main-r-santhoshkumars-projects.vercel.app](library-management-git-main-r-santhoshkumars-projects.vercel.app)


---

## 📂 Project Structure

```
Library-Management/
├── screenshots/            # UI Screenshots for README
├── backend/                # Node.js backend
│   ├── controller/         # Route controllers
│   ├── handlebars/         # Handlebars email templates
│   ├── mailer/             # Nodemailer configuration
│   ├── middleware/         # Auth & middleware logic
│   ├── models/             # Database models
│   ├── route/              # Express route handlers
│   └── server.js           # Backend entry point
├── frontend/              # React frontend
│   ├── public/             # index.html, manifest, images
│   ├── src/
│   │   ├── assets/     # Static assets like logos
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # All main page views
│   │   ├── App.js     # Root React component
│   │   └── index.js   # Entry point for React
│   ├── tailwind.config.js  # Tailwind CSS config
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
├── LICENSE
└── README.md
```

---

## 🛠️ Features

* 🔐 **Admin Panel**

  * Add/Delete/Search Books
  * Issue & Return Books
  * View Activity Logs

* 👤 **User Panel**

  * Request Book Borrow/Return
  * View Issued Books
  * Status Tracking

* 📊 **Dashboard**

  * Graphs & Stats (Chart.js)
  * Book Status Summary (Available, Issued, Due, etc.)

* 🛋️ **Data Handling**

  * Connects to backend with database (e.g., MySQL/MongoDB)
  * Uses JWT for secure routes (optional)

* ✉️ **Email Notifications**

  * Uses Nodemailer + Handlebars to send borrow/return alerts

* 📱 **Responsive UI**

  * Designed with TailwindCSS + Framer Motion

---

## 🚀 Deployment

This app is deployed using [**Vercel**](https://vercel.com/), directly linked with GitHub for automatic CI/CD.

> **Auto-Deploy**: Every push to `main` branch redeploys your site!

---

## ⚙️ Installation & Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/R-Santhoshkumar/Library-Management.git
cd Library-Management/frontend
```

### 2. Install Frontend Dependencies

```bash
npm install
npm start
```

> Runs on `http://localhost:3000`

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
npm start
```

> Runs backend server (check port in `server.js`)

---

## 💻 Technologies Used

| Frontend      | Deployment         | Backend          |
| ------------- | ------------------ | ---------------- |
| React.js      | Vercel (Free Tier) | Node.js, Express |
| Tailwind CSS  | GitHub CI/CD       | MySQL            |
| Framer Motion |                    | JWT / Nodemailer |
| Chart.js      |                    | Handlebars Email |

---

## 📸 Screenshots

> Screenshots are located outside the project directory in the repository root for clarity and access.

### 🏠 Home Page

### 🧾 About Us Page

### 🖼️ About Us Gallery Section

### 🔐 Admin Login

### 📊 Dashboard View

### 🛠️ Services Option

### 📬 Book Request Service

### 📚 E-Library

---

---

## 🛪️ License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Maintainer

* 👤 **R. Santhosh Kumar**
  📧 [Email Me](mailto:dr.r.santhoshkumar@gmail.com)
  🌐 [GitHub Profile](https://github.com/R-Santhoshkumar)

---

## ⭐️ Show Some Love

If you like this project, don’t forget to ⭐️ the repo!
