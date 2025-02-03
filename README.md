# Task Manager App

## Overview

The **Task Manager App** is a simple, user-friendly application designed to help students and professionals organize their tasks efficiently. It offers a clean interface for creating, viewing, updating, and deleting tasks, making it easier to boost productivity. Accessible from any device, the app ensures smooth task management and better time management.

## Features

- **User Authentication**: Sign up, log in, and log out functionality with JWT-based secure authentication.
- **Task Management**: Create, view, update, and delete tasks.
- **Task Prioritization**: Assign priority levels (High, Medium, Low) to tasks for better time management.
- **Responsive Design**: Fully responsive interface to ensure usability on all devices.
- **User-friendly UI**: A clean, minimalistic interface for seamless task management.

## Tech Stack

### Frontend
- **React.js**: For building reusable UI components.
- **Redux**: For state management.
- **Tailwind CSS**: For responsive design and styling.
- **JavaScript**: For dynamic interaction.
- **React Router**: For routing.
- **React Query**: For server data handling and caching.
- **React Hook Form**: For form handling with validation.
- **React Toastify**: For user notifications.

### Backend
- **Node.js**: Server-side logic.
- **Express.js**: Web framework for API development.
- **MongoDB**: NoSQL database for data storage.
- **JWT (JSON Web Token)**: For secure user authentication.

## Setup

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (if running locally)

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/HarshKataria12/TaskManagement.git
   ```
2. Navigate to the frontend folder:
   ```bash
   cd TaskManagement/frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the frontend server:
   ```bash
   npm start
   ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000).

### Backend

1. Navigate to the backend folder:
   ```bash
   cd TaskManagement/backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will be available at [http://localhost:8800](http://localhost:8800).


## Usage

1. **Sign Up / Log In**: Create an account or log in to start using the app.
2. **Task Creation**: Add tasks with titles, descriptions, and priority levels.
3. **Task Updates**: Edit or delete tasks as needed.
4. **Task Management**: View tasks filtered by priority.
