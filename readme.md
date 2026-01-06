# Notes Taking REST API

A production-ready REST API for managing personal notes with secure authentication, polyglot persistence, and enterprise-grade architecture patterns.

## Table of Contents

- [Notes Taking REST API](#notes-taking-rest-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Architecture](#architecture)
  - [Database Design](#database-design)
    - [Polyglot Persistence Strategy](#polyglot-persistence-strategy)
    - [Why This Architecture?](#why-this-architecture)
    - [Schema Examples](#schema-examples)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [API Documentation](#api-documentation)
    - [Core Endpoints](#core-endpoints)
      - [Authentication](#authentication)
      - [Notes](#notes)
    - [Generate/Update Swagger Documentation](#generateupdate-swagger-documentation)
  - [Authentication Flow](#authentication-flow)
  - [Environment Configuration](#environment-configuration)
  - [Scripts](#scripts)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **User Management**: Registration, login, and session management
- **Notes CRUD**: Full create, read, update, and delete operations for notes
- **Authorization**: Role-based access control ensuring users can only access their own notes
- **Polyglot Persistence**: Strategic use of PostgreSQL and MongoDB for optimal data management
  - PostgreSQL for user authentication and registration
  - MongoDB for flexible, scalable notes storage
- **Input Validation**: Comprehensive request validation using express-validator
- **Error Handling**: Centralized error handling middleware
- **API Documentation**: Interactive Swagger/OpenAPI documentation

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Relational Database | PostgreSQL |
| Document Database | MongoDB |
| Authentication | JWT + bcrypt |
| Validation | express-validator |
| Documentation | Swagger/OpenAPI |

## Architecture

The application follows a layered architecture pattern for separation of concerns:

```
┌─────────────────────────────────────┐
│           Client Layer              │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│     Authentication Middleware       │
│         (JWT Verification)          │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│         Routes Layer                │
│    (API Endpoints Definition)       │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│       Controllers Layer             │
│   (Request/Response Handling)       │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│        Services Layer               │
│     (Business Logic)                │
└─────────────┬───────────┬───────────┘
              │           │
    ┌─────────▼─────┐   ┌─▼──────────┐
    │  PostgreSQL   │   │  MongoDB   │
    │   (Users)     │   │  (Notes)   │
    └───────────────┘   └────────────┘
```

**Benefits of this architecture:**
- Clear separation of concerns
- Improved testability and maintainability
- Easy to scale and extend
- Simplified debugging

## Database Design

### Polyglot Persistence Strategy

This application implements **polyglot persistence** by using different databases optimized for specific data types:

| Data Type | Database | Rationale |
|-----------|----------|-----------|
| **Users & Authentication** | PostgreSQL | ACID compliance, strong consistency, relational integrity for critical authentication data |
| **Notes** | MongoDB | Schema flexibility, horizontal scalability, fast document retrieval, dynamic fields support |

**Cross-Database Relationship**: Each note document in MongoDB stores the `userId` field that references the PostgreSQL `users.id`, maintaining referential integrity across the polyglot architecture.

### Why This Architecture?

**PostgreSQL for Users**:
- Critical authentication data requires ACID transactions
- Strong consistency for login/registration operations
- Relational model ideal for user credentials and profiles
- Proven reliability for security-sensitive data

**MongoDB for Notes**:
- Notes benefit from flexible schema (varying content types, metadata)
- Optimized for read-heavy workloads (users frequently viewing notes)
- Easy horizontal scaling as note volume grows
- Natural JSON/document structure for notes with tags, formatting, etc.

### Schema Examples

**PostgreSQL Users Table**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**MongoDB Notes Collection**
```javascript
{
  _id: ObjectId,
  userId: Number,        // References PostgreSQL users.id
  title: String,
  content: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
notes-api/
├── src/
│   ├── config/
│   │   ├── postgres.js          # PostgreSQL connection configuration
│   │   └── mongodb.js           # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication endpoints
│   │   └── notesController.js   # Notes CRUD endpoints
│   ├── services/
│   │   ├── authService.js       # Authentication business logic
│   │   └── notesService.js      # Notes business logic
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes
│   │   └── notesRoutes.js       # Notes routes
│   ├── middlewares/
│   │   ├── authMiddleware.js    # JWT verification
│   │   ├── errorHandler.js      # Global error handling
│   │   └── validation.js        # Request validation
│   ├── models/
│   │   ├── User.js              # PostgreSQL user model
│   │   └── Note.js              # MongoDB note model
│   ├── utils/
│   │   ├── jwt.js               # JWT utilities
│   │   └── logger.js            # Logging utilities
│   ├── validations/
│   │   ├── authValidation.js    # Auth input validators
│   │   └── notesValidation.js   # Notes input validators
│   ├── app.js                   # Express app configuration
│   └── server.js                # Server entry point
├── .env.example
├── .gitignore
├── package.json
├── swagger.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TejPrakash18/notes-backend
cd notes-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize databases:
```bash
# Create PostgreSQL database
createdb notes_app

# Run migrations (if applicable)
npm run migrate
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Documentation

Interactive API documentation is available through Swagger UI once the server is running:

```
http://localhost:5000/api-docs
```

### Core Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

#### Notes
- `GET /api/notes` - Get all notes for authenticated user
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

### Generate/Update Swagger Documentation

```bash
npm run swagger
```

## Authentication Flow

1. **User Registration**: User submits credentials to `/api/auth/register`
2. **Password Hashing**: Password is hashed using bcrypt with salt rounds
3. **User Creation**: User record is created in PostgreSQL
4. **Login**: User submits credentials to `/api/auth/login`
5. **Credential Verification**: Server validates credentials against stored hash
6. **Token Generation**: Server generates JWT with user payload
7. **Token Usage**: Client includes JWT in Authorization header for protected routes
8. **Token Verification**: Middleware validates JWT and attaches user info to request
9. **Authorization**: Controller checks user ownership before allowing operations

## Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# PostgreSQL Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=notes_app
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_postgres_password

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/notes_app

# Logging
LOG_LEVEL=info
```

**Important**: Never commit `.env` file to version control. Use `.env.example` as a template.

## Scripts

```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run swagger      # Generate Swagger documentation
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Author**: Tej  
**Specialization**: Backend Development | Node.js | System Design | REST APIs

For questions or support, please open an issue on GitHub.