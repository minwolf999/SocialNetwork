# Social Network Project

## Overview
This project is a **Facebook-like social network** developed for a school assignment. It includes essential features such as user authentication, profiles, posts, groups, real-time chats, and notifications. The application is built with a modern **frontend framework** and a robust **backend system** with a SQLite database, ensuring a functional and responsive user experience.

---

## Features
### 1. **Authentication**
- **User Registration**: Users must provide:
  - Email, Password, First Name, Last Name, Date of Birth
  - Optional fields: Avatar/Image, Nickname, About Me
- **User Login**: Users stay logged in using **sessions and cookies**.
- **Logout**: Available at all times.

### 2. **Followers**
- Follow and unfollow users.
- Follow requests:
  - **Private Profiles**: Follow requests must be accepted.
  - **Public Profiles**: Requests are automatically accepted.

### 3. **User Profiles**
- Public and Private profiles.
- Profile includes:
  - User Information (excluding password)
  - User Activity: Posts and comments
  - Followers and Following lists
- Users can toggle their profile privacy settings.

### 4. **Posts**
- Users can create posts and comments.
- Attach images or GIFs to posts and comments.
- Privacy settings for posts:
  - Public: Visible to all users.
  - Almost Private: Visible to followers only.
  - Private: Visible to selected followers.

### 5. **Groups**
- **Group Management**:
  - Create groups with a title and description.
  - Invite other users or accept join requests.
- **Group Activity**:
  - Members can create posts and comments visible only within the group.
  - Group Chat for real-time messaging.
- **Group Events**:
  - Events include Title, Description, Date/Time, and RSVP options (e.g., Going/Not Going).

### 6. **Chats**
- **Private Messages**:
  - Users can send messages to followers or those they follow.
  - Real-time messaging implemented via **WebSockets**.
  - Support for emojis.
- **Group Chat**:
  - Common chat room for group members.

### 7. **Notifications**
- Users receive notifications for:
  - Follow requests (for private profiles).
  - Group invitations and join requests.
  - Event creation in groups.
- Notifications are separate from private messages for clarity.

---

## Technical Stack

### 1. **Frontend**
- Developed using a JavaScript framework:
  - Options: **Next.js, React.js**.
- Focused on responsiveness, performance, and interaction with the backend.
- Deployed as a **Docker container**.

### 2. **Backend**
- Written in **Go**.
- Features include:
  - User Authentication (using sessions and cookies).
  - Image Handling: Supports JPEG, PNG, and GIF formats.
  - Real-time WebSocket communication for chats.
- Deployed as a **Docker container**.

### 3. **Database**
- **SQLite** is used for structured data storage.
- **Migrations** are implemented to manage database schema:

### 4. **Docker**
The project is containerized into two Docker images:
- **Backend Container**: Serves the server-side logic and connects to the database.
- **Frontend Container**: Serves the client-side application and interacts with the backend.
- Port exposure for communication:
  - Backend exposes required API ports.
  - Frontend serves the UI content to users' browsers.

---

## Installation

### Prerequisites
Ensure the following tools are installed:
- [Docker](https://www.docker.com/)
- [Go](https://golang.org/)
- Node.js & npm (for frontend framework)

### Steps
1. Clone the repository:
   ```bash
   git clone https://zone01normandie.org/git/mmarchet/social-network.git
   cd social-network
   ```
2. Build and run Docker containers:
   ```bash
   bash script.sh
   docker-compose up
   ```
3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8080`

---

## Credits
This project was developed as part of a school assignment. Frameworks, libraries, and tools used are credited to their respective creators.

---

## License
This project is licensed under the MIT License.
