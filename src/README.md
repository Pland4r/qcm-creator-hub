
# Quiz Application with React & Spring Boot

This is a quiz application that uses React for the frontend and Spring Boot for the backend.

## Frontend (React)

The frontend is built with:
- React + TypeScript
- Vite as a build tool
- TanStack Query for data fetching
- Tailwind CSS & shadcn/ui for styling
- React Router for navigation

## Backend (Spring Boot)

The backend requires a Spring Boot application with the following features:

### API Endpoints

The frontend expects the following REST endpoints:

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user
- `GET /api/auth/me` - Get the current user's information

#### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/{id}` - Get a quiz by ID
- `POST /api/quizzes` - Create a new quiz
- `PUT /api/quizzes/{id}` - Update a quiz
- `DELETE /api/quizzes/{id}` - Delete a quiz

### Spring Boot Setup

1. Create a Spring Boot project with the following dependencies:
   - Spring Web
   - Spring Data JPA
   - Spring Security (for authentication)
   - H2 Database (for development)
   - Spring Validation

2. Data Model:
   - User: id, username, email, password
   - Quiz: id, title, description, technology, createdAt
   - Question: id, quizId, text
   - Option: id, questionId, text, isCorrect

3. Security:
   - JWT authentication
   - CORS configuration to allow requests from the React app

4. Database:
   - Configure JPA repositories
   - Set up relationships between entities

## Running the Application

1. Start the Spring Boot backend:
   ```
   ./mvnw spring-boot:run
   ```
   The backend will run on http://localhost:8080

2. Start the React frontend:
   ```
   npm run dev
   ```
   The frontend will run on http://localhost:5173

## Development

For best results during development:
1. Start the Spring Boot server first
2. Start the React application
3. Make sure CORS is properly configured in the Spring Boot app

## Production

For production:
1. Build the React app with `npm run build`
2. Configure the Spring Boot app to serve the static files from the build folder
3. Deploy the Spring Boot application to your production environment
