Team-Task-Manager

A full-stack web application for managing team tasks with role-based access control.

 Tech Stack

Frontend: React.js, Vite, Tailwind CSS
Backend: Node.js, Express.js
Database: PostgreSQL with Prisma ORM
Authentication: JWT + bcrypt
Deployment: Railway

 Features

- User authentication (Sign Up / Login)
- Role-based access control (Admin / Member)
- Project management (Create, Edit, Delete)
- Task management (Create, Assign, Edit, Delete, Change Status)
- Dashboard with analytics and charts
- Search and filtering
- Responsive design

Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (local or Railway instance)
- npm or yarn

 Local Development

 Backend Setup

1. Navigate to the backend directory:
   bash
   cd backend
  

2. Install dependencies:
   bash
   npm install
   

3. Create a `.env` file in the backend directory (already exists, update as needed):
   env
   DATABASE_URL="postgresql://user:password@localhost:5432/team_task_manager?schema=public"
   JWT_SECRET="your-secret-key-change-this-in-production"
   PORT=5000
   NODE_ENV="development"
   

4. Generate Prisma client:
   bash
   npx prisma generate
 

5. Run migrations:
   bash
   npx prisma migrate dev
   

6. Start the backend server:
   bash
   npm run dev
 Frontend Setup

1. Navigate to the frontend directory:
   bash
   cd frontend
  

2. Install dependencies:
   bash
   npm install
   

3. Start the development server:
   bash
   npm run dev
   

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

 Deployment on Railway

 Step 1: Create Railway Project

1. Go to [Railway](https://railway.app)
2. Create a new project
3. Add a PostgreSQL database to your project

Step 2: Set Environment Variables

In your Railway project settings, add the following environment variables:

- DATABASE_URL` (from your Railway PostgreSQL instance)
- JWT_SECRET` (a secure secret key)
- NODE_ENV="production"`

 Step 3: Deploy Backend

1. Connect your repository to Railway
2. Railway will automatically detect and deploy your backend

 Step 4: Deploy Frontend

Option 1: Deploy frontend separately on Railway or Vercel

Option 2: Serve frontend from backend (configure accordingly)


 Project Structure

project
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── index.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── railway.json
└── README.md
 

 API Endpoints

 Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile

 Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (Admin only)
- `PUT /api/projects/:id` - Update project (Admin only)
- `DELETE /api/projects/:id` - Delete project (Admin only)
- `POST /api/projects/:id/members` - Add member to project (Admin only)

Tasks
- GET /api/tasks` - Get all tasks
- GET /api/tasks/:id` - Get task by ID
- POST /api/tasks` - Create task (Admin only)
- PUT /api/tasks/:id` - Update task (Admin only)
- DELETE /api/tasks/:id` - Delete task (Admin only)
- PATCH /api/tasks/:id/status` - Update task status

 Dashboard
- GET /api/dashboard/stats` - Get dashboard statistics


 User Roles

 Admin
- Create, edit, delete projects
- Invite members to projects
- Create, edit, delete tasks
- Assign tasks to members
- View all tasks and projects
- Access dashboard analytics

 Member
- View assigned projects
- View assigned tasks
- Update task status
- View dashboard

