# Study Material Platform

Secure Study Material Sharing Platform for Engineering Students.

## Tech Stack
- **Backend**: Spring Boot 3.4, JWT, MySQL, Hibernate
- **Frontend**: Angular 19, Angular Material, Firebase Storage

## Getting Started

### Prerequisites
- Java 17+
- Node.js 20+
- MySQL Server

### Backend Setup
1. Configure MySQL in `backend/src/main/resources/application.yml`
2. Run `mvn spring-boot:run`

### Frontend Setup
1. CD to `frontend`
2. Run `npm install`
3. Update Firebase config in `frontend/src/environments/environment.ts`
4. Run `ng serve`

## Features
- Role-based access (Admin, Student)
- Material filtering by Course/Branch/Subject
- Secure file upload to Firebase
- Admin approval workflow
