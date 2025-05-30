# User Registration App

This project consists of two parts:

---

## Backend Setup (Node.js + PostgreSQL)

### Prerequisites

- Node.js installed
- PostgreSQL installed and running
- Create a database (e.g., `users`)
- Create a `.env` file with the following variables:

## .ENV details

PORT=8000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_DATABASE=users

### Installation and Running

1. Install dependencies:

```bash
npm install
```

2. Run the server:

```bash
node server.js
```

3. The server will run on http://localhost:8000.
