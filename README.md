# 📚 Fable – Ebook Sharing Platform

> A modern full-stack ebook marketplace where readers can discover and purchase ebooks, writers can publish and manage their work after verification, and admins can oversee the entire platform through role-based dashboards.

**🌐 Live Demo:** https://fable-client-gamma.vercel.app/

---

# 📖 Project Overview

Fable is a full-stack MERN-based ebook sharing platform built with **Next.js**, **Express.js**, **MongoDB**, **Better Auth**, and **Stripe**.

The platform is designed to connect readers with independent writers through a secure and user-friendly digital marketplace. Readers can browse, purchase, bookmark, and read ebooks, while writers can upload and manage their own publications after completing a one-time verification payment. An admin dashboard provides complete control over users, ebooks, and transactions.

The project demonstrates modern full-stack development practices including authentication, authorization, payment integration, protected routes, image upload, responsive UI, and interactive dashboards.

---

# 🚀 Problem Solving & Learning Experience

Building Fable helped me strengthen my real-world full-stack development skills. Throughout the project I solved several practical engineering challenges, including:

- Designing a scalable role-based authentication and authorization system using Better Auth and JWT.
- Implementing protected routes while preserving user sessions after page refresh.
- Integrating Stripe Checkout for secure ebook purchases.
- Handling image uploads with ImgBB API.
- Building reusable dashboard components for User, Writer, and Admin roles.
- Managing complex CRUD operations across multiple collections.
- Creating dynamic search, filtering, sorting, and pagination.
- Handling loading states, skeleton loaders, custom error pages, and API error feedback.
- Structuring a production-ready Next.js App Router project with reusable components and layouts.
- Improving responsive UI/UX across desktop, tablet, and mobile devices.

---

# ✨ Key Features

### 🔐 Authentication & Authorization

- Email & Password Authentication
- Google Login with Better Auth
- JWT Authentication
- Protected Routes
- Role-Based Dashboard
  - Reader
  - Writer
  - Admin

### 📚 Ebook Marketplace

- Browse all ebooks
- Search by title or writer
- Filter by genre
- Sort by price and newest
- Pagination
- Ebook Details Page
- Bookmark ebooks
- Purchase ebooks with Stripe
- Purchased ebook library

### ✍️ Writer Dashboard

- Add Ebook
- Edit Ebook
- Delete Ebook
- Publish / Unpublish Ebook
- Sales History
- Manage Own Books

### 👑 Admin Dashboard

- Manage Users
- Change User Roles
- Manage All Ebooks
- Publish / Unpublish Books
- Delete Books
- View Transactions
- Analytics Dashboard
- Sales Charts

### 🎨 UI & UX

- Fully Responsive Design
- Framer Motion Animations
- Skeleton Loaders
- Custom 404 Page
- Runtime Error Boundary
- Toast Notifications
- Modern Dashboard UI
- Dark Mode Support

---

# 🛠️ Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- HeroUI
- Framer Motion
- Recharts
- Lucide React
- Better Auth Client
- Stripe.js
- React Hot Toast
- Next Themes

---

## Backend

- Node.js
- Express.js
- MongoDB
- Better Auth
- JWT (JOSE)
- Stripe
- CORS
- Dotenv

---

## External Services

- MongoDB Atlas
- Stripe Payment Gateway
- ImgBB Image Hosting
- Vercel
- Render / Node Server

---

# ⚙️ Installation Guide

## 1. Clone the repositories

### Client

```bash
git clone https://github.com/jihadsoyon/fable-client.git
```

### Server

```bash
git clone https://github.com/jihadsoyon/fable-server.git
```

---

## 2. Install dependencies

### Client

```bash
cd fable-client
npm install
```

### Server

```bash
cd fable-server
npm install
```

---

## 3. Create Environment Variables

### Client (.env.local)

```env
NEXT_PUBLIC_API_URL=your_server_url

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key

NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key
```

---

### Server (.env)

```env
PORT=5000

MONGO_DB_URI=your_mongodb_uri

BETTER_AUTH_SECRET=your_secret

BETTER_AUTH_URL=http://localhost:5000

CLIENT_URL=http://localhost:3000

STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## 4. Run the project

### Start Server

```bash
npm run dev
```

---

### Start Client

```bash
npm run dev
```

---

Open:

```
http://localhost:3000
```

---

# 👨‍💻 Developer

**Jihad Soyon**

GitHub:
https://github.com/jihadsoyon

Portfolio:
https://jihad-soyon.netlify.app

---

⭐ If you like this project, consider giving it a star on GitHub.
