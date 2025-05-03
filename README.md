# Task Management System

A full-featured task management system designed for small teams to create, assign, track, and manage tasks efficiently.

---

## 📦 Features Implemented

### ✅ User Authentication
- Secure user registration and login.
- Passwords hashed using industry standards.

### ✅ Task Management
- Create, read, update, delete tasks.
- Each task includes: title, description, due date, priority, and status.

### ✅ Team Collaboration
- Assign tasks to registered users.
- Real-time notification system for task assignments.

### ✅ Dashboard
- View tasks:
  - Assigned to the logged-in user.
  - Created by the logged-in user.
  - That are overdue.

### ✅ Search and Filter
- Search by task title or description.
- Filter by:
  - Status (todo, in-progress, done)
  - Priority (low, medium, high)
  - Due Date (overdue, today, upcoming)
  - Created by (me, others)

---

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/kartikeycsjm/task-management-system.git
   cd task-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Visit the app**  
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 💡 Approach Explanation

- **Next.js App Router** used for modern routing and layout.
- **Client Components** (`"use client"`) leveraged for interactivity and dynamic behavior.
- **Axios** used for seamless API communication.
- **Modular Component Design**: Components for Task List, Task Modal, Search, Filters, Notifications.
- **Real-Time UX**: After any CRUD operation, the dashboard refreshes using state updates.
- **Notifications**:
  - Stored in database
  - Fetched on dashboard load
  - Displayed via popover UI

---

## ⚖️ Assumptions & Trade-Offs

- **No real-time sockets**: Notifications are fetched on mount or manually refreshed, no WebSockets used.
- **No pagination**: All tasks are fetched and filtered client-side.
- **Simplified authentication**: Assumes basic JWT/session setup.
- **Single-page refresh logic**: Uses client-side state management, not full page reloads.
- **API with Next.js instead of Express/NestJS**: While Express or NestJS were suggested in the original requirements, I chose to use Next.js API routes. This decision was based on the advantages of tighter integration with the Next.js frontend, reduced boilerplate, and faster prototyping. The implementation remains modular and can be migrated to an Express/NestJS backend in the future with minimal effort.

---

## 📄 License
This project is for educational/demo purposes and does not currently include a license.

---

## 🙋‍♂️ Author

```
Kartikey Mishra  
B.Tech CSE Student | Web Developer  
Email: kartikeymishracsjm@gmail.com  
Portfolio: https://kartikeymishra.vercel.app  
GitHub: https://github.com/kartikeycsjm  
LinkedIn: https://linkedin.com/in/myselfkartikey
```

---