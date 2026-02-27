# Environment Configuration Setup

This document explains how to configure the application using environment variables.

## Overview

The application uses environment variables for configuration across both backend (Spring Boot) and frontend (Angular). All sensitive credentials are stored in a `.env` file which is excluded from version control.

## Quick Setup

### 1. Create `.env` file

Copy the `.env.example` to `.env` and fill in your actual values:

```bash
cp .env.example .env
```

### 2. Backend Configuration

The backend automatically loads variables from the `.env` file. You need to add `dotenv` support to your Spring application.

#### Add Dependency to `pom.xml`:

```xml
<dependency>
    <groupId>io.github.cdimascio</groupId>
    <artifactId>dotenv-java</artifactId>
    <version>3.0.0</version>
</dependency>
```

#### Update `PlatformApplication.java`:

```java
package com.studymaterial.platform;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PlatformApplication {

    public static void main(String[] args) {
        // Load .env file
        Dotenv dotenv = Dotenv.load();
        
        // Set environment variables as system properties
        dotenv.entries().forEach(entry -> 
            System.setProperty(entry.getKey(), entry.getValue())
        );
        
        SpringApplication.run(PlatformApplication.class, args);
    }
}
```

### 3. Frontend Configuration

For Angular, environment variables are loaded at build time. 

#### Development:
```bash
cd frontend
npm install
npm start
```

The `environment.ts` file will load from `.env` if available.

#### Production Build:
```bash
export API_URL=https://api.example.com/api
export FIREBASE_API_KEY=your_key
export FIREBASE_AUTH_DOMAIN=your_domain
# ... set other variables

npm run build --prod
```

Or create a `.env.production` file:
```bash
API_URL=https://api.example.com/api
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_domain
```

## Environment Variables Reference

### Database Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | localhost | Database host |
| `DB_PORT` | 3306 | Database port |
| `DB_NAME` | study_material_db | Database name |
| `DB_USERNAME` | root | Database username |
| `DB_PASSWORD` | - | Database password (required) |
| `DB_DRIVER` | com.mysql.cj.jdbc.Driver | JDBC driver |

### Application Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_PORT` | 8080 | Application port |
| `APP_PROFILE` | dev | Spring profile (dev/prod) |
| `APP_BASE_URL` | http://localhost:8080 | Base URL for the application |

### JWT Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `JWT_SECRET` | - | JWT signing secret (required) |
| `JWT_EXPIRATION` | 86400000 | Token expiration in milliseconds |

### Firebase Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `FIREBASE_API_KEY` | - | Firebase API key |
| `FIREBASE_AUTH_DOMAIN` | - | Firebase auth domain |
| `FIREBASE_PROJECT_ID` | - | Firebase project ID |
| `FIREBASE_STORAGE_BUCKET` | - | Firebase storage bucket |
| `FIREBASE_MESSAGING_SENDER_ID` | - | Firebase messaging sender ID |
| `FIREBASE_APP_ID` | - | Firebase app ID |
| `FIREBASE_MEASUREMENT_ID` | - | Firebase measurement ID |

### Email Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `MAIL_HOST` | smtp.gmail.com | SMTP server host |
| `MAIL_PORT` | 587 | SMTP port |
| `MAIL_USERNAME` | - | Email username/address |
| `MAIL_PASSWORD` | - | Email password (use app-specific password) |
| `MAIL_FROM` | noreply@studycorner.com | From address for emails |
| `MAIL_SMTP_AUTH` | true | Enable SMTP authentication |
| `MAIL_SMTP_STARTTLS_ENABLE` | true | Enable STARTTLS |
| `MAIL_SMTP_CONNECTION_TIMEOUT` | 5000 | Connection timeout (ms) |
| `MAIL_SMTP_TIMEOUT` | 5000 | Socket timeout (ms) |
| `MAIL_SMTP_WRITE_TIMEOUT` | 5000 | Write timeout (ms) |

### File Upload Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `MAX_FILE_SIZE` | 50MB | Maximum file size |
| `MAX_REQUEST_SIZE` | 50MB | Maximum request size |

## Running the Application

### Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

Or build and run:
```bash
mvn clean package
java -jar target/platform-0.0.1-SNAPSHOT.jar
```

### Frontend (Angular)

```bash
cd frontend
npm install
npm start
```

Access the application at `http://localhost:4200`

## Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use `.env.example`** - For documentation of required variables
3. **Rotate secrets regularly** - Especially JWT_SECRET and database passwords
4. **Use strong passwords** - Especially for database and email credentials
5. **Review .env access** - Ensure proper file permissions (600)
6. **Use app-specific passwords** - For Gmail and other services
7. **Keep secrets out of code** - Always use environment variables

## Docker Deployment

If using Docker, you can pass environment variables:

```bash
docker-compose up --build
```

Ensure your `.env` file is in the root directory for docker-compose to load it.

## Troubleshooting

### Backend won't start
- Check `.env` file exists and is readable
- Verify database credentials are correct
- Check database is running and accessible
- Review logs for specific errors

### Firebase authentication fails
- Verify Firebase credentials are correct
- Check Firebase project settings
- Ensure CORS is configured in Firebase
- Verify auth domain matches Firebase project

### Frontend can't connect to backend
- Check `API_URL` is correct
- Verify backend is running on `APP_BASE_URL`
- Check CORS settings in Spring Boot
- Review network requests in browser DevTools
