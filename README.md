# 📚 Library Management System

A fully functional and modern **Library Management System** built with **React.js**, designed to streamline the operations of a library. This application supports book management, borrowing, returning, and logging all activities to ensure a seamless user and administrator experience.

---

## 🌐 Live Demo

🟢 Deployed on **Vercel**:
[https://library-management.vercel.app](https://library-management.vercel.app)

> *(Update the link to your actual Vercel deployment)*

---

## 📂 Project Structure

```
Library-Management/
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
node server.js
```

> Runs backend server (check port in `server.js`)

---

## 🔗 Environment Variables

Frontend `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Backend `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
EMAIL_HOST=smtp.yourmail.com
EMAIL_USER=your-email@example.com
EMAIL_PASS=yourpassword
JWT_SECRET=your_jwt_secret
```

---

## 💻 Technologies Used

| Frontend      | Deployment         | Backend          |
| ------------- | ------------------ | ---------------- |
| React.js      | Vercel (Free Tier) | Node.js, Express |
| Tailwind CSS  | GitHub CI/CD       | MySQL/MongoDB    |
| Framer Motion |                    | JWT / Nodemailer |
| Chart.js      |                    | Handlebars Email |

---

## 📸 Screenshots

> *(Add your screenshots below this section, or embed images like this:)*

```
![Dashboard](./src/assets/screenshots/dashboard.png)
![Admin Panel](./src/assets/screenshots/admin_panel.png)
![Borrow Request Page](./src/assets/screenshots/borrow_request.png)
```

---

## 👥 Contribution

Feel free to fork the repository and open a pull request with improvements or fixes!

```bash
git checkout -b feature/your-feature-name
```

---

## 🛪️ License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🧕‍♂️ Maintainer

* 👤 **R. Santhosh Kumar**
  📧 [Email Me](mailto:your-email@example.com)
  🌐 [GitHub Profile](https://github.com/R-Santhoshkumar)

---

## ⭐️ Show Some Love

If you like this project, don’t forget to ⭐️ the repo!
