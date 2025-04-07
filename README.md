# NACLO Platform

A full-stack web application for managing the **North American Computational Linguistics Open competition (NACLO)** — including registration, user roles, site assignments, contest tracking, and more.

This project is built using:

- **Frontend**: Next.js (TypeScript), MUI (Material UI)
- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL
- **Email**: Resend (production-ready transactional email)
- **Deployment**: Render (for both frontend and backend)

---

## ✨ Features

- Role-based login and dashboards (Student, Host, Organizer, Webmaster)
- Student registration with field-level validation and site selection
- Email confirmation before login (via Resend)
- Forgot/reset password flow
- Site management and user administration
- Production deployment with secure CORS and environment configs

---

## 📁 Project Structure

```
naclo-platform/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── ...
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── utils/
│   ├── public/
│   ├── .env.local
│   └── package.json
```

---

## 🚀 Deployment

- 🔗 **Frontend**: [https://naclo-frontend.onrender.com](https://naclo-frontend.onrender.com)
- 🔗 **Backend**: [https://naclo-platform.onrender.com](https://naclo-platform.onrender.com)

---

## 🛠️ Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/kristinkor/naclo-platform.git
cd naclo-platform
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

Inside `.env`, add:

```ini
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
RESEND_API_KEY=your_resend_key
EMAIL_FROM=naclo@yourdomain.com
```

Then:

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Create .env.local
cp .env.example .env.local
```

Inside `.env.local`, set:

```ini
NEXT_PUBLIC_API_URL=https://naclo-platform.onrender.com
```

Then:

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing Registration

1. Register a new student account using the frontend form.
2. Check your email inbox (Resend will deliver to real addresses).
3. Click the confirmation link.
4. Login with your credentials.

---

## 🧱 Prisma Schema (Simplified)

- **User**: core account info shared across all roles
- **Student**: extended profile (birthdate, grade, site, etc.)
- **Site**: contest site data linked to hosts/students
- **Role**: defines type (Student, Host, Organizer, Webmaster)

---

## 📌 Roadmap

- [x] User/Student separation
- [x] Role-based login
- [x] Email confirmation
- [x] Forgot/reset password
- [ ] Contest signup and tracking
- [ ] Admin panel
- [ ] Mobile optimization

---

## 🤝 Acknowledgments

Special thanks to the NACLO team and organizers for their guidance and support.

---

## 📬 Contact

Feel free to reach out if you'd like to test the system or provide feedback!

---

Let me know if you'd like this copied to a file or exported to markdown/pdf!
