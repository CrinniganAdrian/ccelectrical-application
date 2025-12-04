# CC Electrical Application

Full-stack electrical services management application with React frontend and Spring Boot backend.

## 🏗️ Project Structure

This is a **monorepo** containing both frontend and backend applications:

```
ccelectrical-application/
├── frontend/          # React.js frontend application
├── backend/           # Spring Boot backend API
├── README.md          # This file
└── .gitignore         # Root-level gitignore
```

## 📋 Table of Contents

- [Project Presentation](#project-presentation)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Running the Application](#running-the-application)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Development](#development)

## 📊 Project Presentation

View the CC Electrical Service project presentation to understand the application's features and capabilities:

**[CC Electrical Service - First Draft Presentation](https://docs.google.com/presentation/d/14KGhTZ78wvEmXd0Btv7zvS-6npPHuSMu/edit?rtpof=true&sd=true)**

> **Note:** This is the first draft of the presentation. The application is currently being updated with new features and improvements. An updated presentation with the latest information will be added in the future.

## 🚀 Getting Started

### Prerequisites

**For Frontend:**
- Node.js (v14+ recommended)
- npm or yarn

**For Backend:**
- Java JDK 8 or higher
- Maven
- MySQL database

## 🎨 Frontend Setup

The frontend is a React.js application with JWT authentication.

### Installation

```bash
cd frontend
npm install
```

### Configuration

The frontend connects to the backend API. Update API URLs in:
- `frontend/.env` file
- Or use the provided PowerShell scripts: `switch-api-urls.ps1`

### Running Frontend

```bash
cd frontend
npm start
```

The application will run on `http://localhost:3000`

### Frontend Features

- User authentication (Login/Register)
- Items management (CRUD operations)
- Projects management (CRUD operations)
- Services management (CRUD operations)
- Favorites system
- Role-based access control (Admin, User)
- Responsive UI with modern design

For more details, see [frontend/README.md](frontend/README.md)

## ⚙️ Backend Setup

The backend is a Spring Boot REST API with JWT authentication and MySQL database.

### Installation

No installation required - Maven will download dependencies automatically.

### Database Configuration

1. Create a MySQL database:
```sql
CREATE DATABASE ccelectrical_db;
```

2. Update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ccelectrical_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Running Backend

**Using Maven Wrapper (Recommended):**
```bash
cd backend
./mvnw spring-boot:run
```

**Using installed Maven:**
```bash
cd backend
mvn spring-boot:run
```

The API will run on `http://localhost:8080`

### Backend Features

- JWT-based authentication and authorization
- RESTful API endpoints
- MySQL database integration
- Spring Security configuration
- Role-based access control
- CRUD operations for Items, Projects, and Services
- User management and favorites system

For more details, see [backend/README.md](backend/README.md)

## 🏃 Running the Application

### Development Mode

1. **Start the Backend** (Terminal 1):
```bash
cd backend
./mvnw spring-boot:run
```

2. **Start the Frontend** (Terminal 2):
```bash
cd frontend
npm start
```

3. **Access the Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - API Docs: http://localhost:8080/api/test

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

The production build will be in `frontend/build/`

**Backend:**
```bash
cd backend
./mvnw clean package
```

The JAR file will be in `backend/target/spring-boot-security-jwt.jar`

## 🏛️ Architecture

### Frontend Architecture
- **Framework:** React 18
- **Routing:** React Router v5
- **State Management:** Context API with Reducers
- **HTTP Client:** Axios
- **Styling:** CSS + Bootstrap
- **Authentication:** JWT tokens stored in localStorage

### Backend Architecture
- **Framework:** Spring Boot 2.6.1
- **Security:** Spring Security with JWT
- **ORM:** Spring Data JPA (Hibernate)
- **Database:** MySQL
- **Build Tool:** Maven
- **Java Version:** 1.8+

### Authentication Flow

1. User submits credentials to `/api/auth/signin`
2. Backend validates and returns JWT token
3. Frontend stores token in localStorage
4. Subsequent requests include token in Authorization header
5. Backend validates token for protected routes

## 🛠️ Technologies

### Frontend Stack
- React 18.2.0
- React Router 5.3.0
- Axios 0.27.2
- Bootstrap 4.6.1
- Font Awesome icons
- EmailJS (for contact forms)

### Backend Stack
- Spring Boot 2.6.1
- Spring Security
- Spring Data JPA
- MySQL Connector
- JWT (io.jsonwebtoken)
- Lombok
- Maven

## 👩‍💻 Development

### Adding New Features

1. **Backend API Endpoint:**
   - Add controller in `backend/src/main/java/com/ccelectrical/springjwt/controllers/`
   - Add model in `backend/src/main/java/com/ccelectrical/springjwt/models/`
   - Add repository in `backend/src/main/java/com/ccelectrical/springjwt/repository/`

2. **Frontend Component:**
   - Add component in `frontend/src/components/` or `frontend/src/pages/`
   - Add route in `frontend/src/App.js`
   - Add service call in appropriate service file

### Testing

**Frontend:**
```bash
cd frontend
npm test
```

**Backend:**
```bash
cd backend
./mvnw test
```

### Code Style

- Frontend: Uses ESLint with React configuration
- Backend: Follows Java standard naming conventions

## 📝 API Documentation

Main API endpoints:

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user

### Items
- `GET /api/items` - Get all items
- `POST /api/items` - Create item (Admin only)
- `PUT /api/items/{id}` - Update item (Admin only)
- `DELETE /api/items/{id}` - Delete item (Admin only)

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (Admin only)
- `PUT /api/projects/{id}` - Update project (Admin only)
- `DELETE /api/projects/{id}` - Delete project (Admin only)

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (Admin only)
- `PUT /api/services/{id}` - Update service (Admin only)
- `DELETE /api/services/{id}` - Delete service (Admin only)

### Favorites
- `GET /api/favourites` - Get user favorites
- `POST /api/favourites` - Add to favorites
- `DELETE /api/favourites/{id}` - Remove from favorites

## 🔧 Troubleshooting

### Common Issues

**Frontend won't start:**
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Check if port 3000 is already in use

**Backend won't start:**
- Verify MySQL is running
- Check database credentials in `application.properties`
- Ensure Java 8+ is installed: `java -version`

**CORS errors:**
- Backend has CORS configured for `http://localhost:3000`
- Update `WebSecurityConfig.java` if using different port

## 📦 Deployment

### Frontend Deployment
- Build: `npm run build`
- Deploy `build/` folder to static hosting (Netlify, Vercel, AWS S3, etc.)
- Update API URL to production backend

### Backend Deployment
- Build: `./mvnw clean package`
- Deploy JAR file to cloud provider (AWS, Heroku, etc.)
- Configure production database
- Set production JWT secret

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly (both frontend and backend)
4. Submit a pull request

## 📜 License

[Add your license here]

## 📞 Contact

[Add contact information]

---

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [JWT Authentication Guide](https://jwt.io/introduction)

---

**Note:** This monorepo was created on December 3, 2025, combining the previously separate frontend and backend repositories. For frontend git history, see `FRONTEND_GIT_HISTORY.txt`.

