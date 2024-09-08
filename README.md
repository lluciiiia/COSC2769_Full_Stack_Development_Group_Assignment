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
   Open your browser and go to `http://localhost:5173`.

## Contributors

This project is a group assignment for the **COSC2769 Full Stack Development** course. 🎓

- **Seokyung Kim (s3939114) <a href="https://github.com/lluciiiia" target="_blank"><img src="https://skillicons.dev/icons?i=github" width="20px" /></a>**
- **Huynh Tan Phat (s3929218) <a href="https://github.com/phatgg221" target="_blank"><img src="https://skillicons.dev/icons?i=github" width="20px" /></a>**
- **Shirin Shujaa (s3983427) <a href="https://github.com/shirin44" target="_blank"><img src="https://skillicons.dev/icons?i=github" width="20px" /></a>**
- **Ngo Van Tai (s3974892) <a href="https://github.com/TaiVanNgo" target="_blank"><img src="https://skillicons.dev/icons?i=github" width="20px" /></a>**
- **Huynh Thai Duong (s3978955) <a href="https://github.com/TDuong04" target="_blank"><img src="https://skillicons.dev/icons?i=github" width="20px" /></a>**
## Demo video
https://rmiteduau-my.sharepoint.com/personal/s3983427_rmit_edu_vn/_layouts/15/stream.aspx?id=%2Fpersonal%2Fs3983427%5Frmit%5Fedu%5Fvn%2FDocuments%2FBuZzNet%2Emov&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E39f8e123%2D96e4%2D4c83%2D842e%2D449dbb26d946 
