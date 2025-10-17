# 📦 Parcel Delivery Management System

A role-based parcel delivery management system built with **Node.js, Express, TypeScript, MongoDB & Mongoose**.

---

## 🚀 Features
- 🔑 Authentication (Register/Login with JWT)
- 👨‍💼 Role-based access control (Admin, Sender, Receiver)
- 📦 Parcel Management (Create, Track, Cancel, Update status)
- 📊 Status Logs (Requested → Approved → Dispatched → In Transit → Delivered)
- 🔎 Public Parcel Tracking with tracking ID

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Zod (Validation)
- JWT Authentication

---

## 📂 Project Structure

---

## 🔑 Roles
- **Admin** → Manage users, parcels, update status  
- **Sender** → Create, cancel, view own parcels  
- **Receiver** → View incoming parcels, confirm delivery  

---

## 🔗 API Endpoints

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Users (Admin only)
- `GET /users`
- `GET /users/:id`
- `PATCH /users/block/:id`
- `DELETE /users/:id`

### Parcels
- `POST /parcels` (Sender)
- `GET /parcels/me` (Sender)
- `PATCH /parcels/cancel/:id` (Sender)
- `GET /parcels/incoming` (Receiver)
- `PATCH /parcels/receive/:id` (Receiver)
- `GET /parcels` (Admin)
- `PATCH /parcels/:id/status` (Admin)

### Public
- `GET /parcels/track/:trackingId`

---

## ⚡ Setup

```bash
git clone <repo-url>
cd Parcel_project
npm install
npm run dev


PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=yourSecret
