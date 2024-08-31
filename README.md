# BuZzNet 🌐

BuZzNet is an online social network platform designed to connect users, allowing them to share posts, comments, and reactions with friends and group members. The platform offers various functionalities similar to popular social networks like Facebook.

## Features

### User Functions

- **Registration/Login:** Users can create accounts and log in. 🔑
- **Friend Management:**
  - Send friend requests. 🤝
  - Accept or decline friend requests. ✅❌
  - Unfriend users. 🚫
- **Group Management:**
  - Send group membership requests. 📬
  - Create groups (requires admin approval). 👥
- **Post Management:**
  - Create posts on their home feed and within groups. 📝
  - Add comments to posts. 💬
  - Edit posts and comments. ✏️
  - View post history of changes. 📜
  - Upload multiple photos in posts. 📸
- **Reactions:**
  - React to posts and comments with options: 👍 Like, ❤️ Love, 😂 Haha, or 😠 Angry.

### Group Admin Functions

- Approve membership requests. ✅
- Remove members from groups. ❌
- Delete group posts and comments. 🗑️

### Site Admin Functions

- Approve group creation requests. ✅
- Suspend/resume user accounts. ⏸️▶️
- Delete any posts or comments. 🗑️

### Notifications

- Users receive notifications for friend requests, comments, reactions, and group creation approvals. 🔔

### User Experience Requirements

- Functional user experience during server downtime. ⏳
- Offline caching to allow viewing of previous posts and queuing reactions until online. 💾

## Technical Components

- **Backend:** Express.js
- **Frontend:** React.js
- **Database:** MongoDB

## Object Models

- **User:** Represents a user of the platform.
- **Admin:** Represents administrative users.
- **Group:** Represents user-created groups.
- **Friend:** Represents friendships between users.
- **Member:** Represents memberships in groups.
- **Group Admin:** Represents administrative roles within groups.

## Installation

To run BuZzNet locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lluciiiia/COSC2769_Full_Stack_Development_Group_Assignment.git
   ```

2. **Install dependencies for the backend:**

   ```bash
   cd server
   npm install
   ```

3. **Install dependencies for the frontend:**

   ```bash
   npm install
   ```

4. **Set up your database:**

   - Create a MongoDB database and configure the connection settings in the backend.

5. **Run the backend server:**

   ```bash
   cd server
   npm start
   ```

6. **Run the frontend application:**

   ```bash
   npm run dev
   ```

7. **Access the application:**
   Open your browser and go to `http://localhost:3000`.

## Contributors

This project is a group assignment for the **COSC2769 Full Stack Development** course. 🎓

- **Seokyung Kim (s3939114) <a href="https://github.com/lluciiiia" target="_blank"><img src="https://skillicons.dev/icons?i=github" width="20px" /></a>**
- **@Phat (s3939114)**
- **@Shirin (s3939114)**
- **@Tai (s3939114)**
- **@Duong (s3939114)**
