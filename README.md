# FULL STACK SHOP APPLICATION

## Project Overview
Admin Product Management System with Spring Boot Backend and React Frontend.

## Tech Stack

### Backend
- Java 21
- Spring Boot 3.2
- Spring Data JPA / Hibernate
- MySQL Database
- Lombok
- Maven

### Frontend
- React 18
- Vite
- Axios

## Features

### Backend API
- CRUD operations for products
- Input validation using Bean Validation
- DTO pattern for data transfer
- Global exception handling
- CreatedAt and UpdatedAt timestamps

### Frontend
- Add, Edit, Delete, View, and Search Products
- Responsive grid layout
- Alert messages for validation

## Project Structure
FULL-STACK-SHOP/
├── backend/ # Spring Boot Application
└── frontend/ # React Application


## How to Run

### Prerequisites
- Java 21
- MySQL
- Node.js

### 1. Setup Database
--sql
CREATE DATABASE shop_db;

## 2. Configure Backend
Update backend/src/main/resources/application.properties with your MySQL password

## 3. Run Backendcd backend
mvn spring-boot:run

## 4. Run Frontend
cd frontend
npm install
npm run dev

## API Endpoints

Method	Endpoint	Description
POST	/api/products	Create product
GET	/api/products	Get all products
GET	/api/products/{id}	Get product by ID
PUT	/api/products/{id}	Update product
DELETE	/api/products/{id}	Delete product
GET	/api/products/search?name=	Search products


## Links
GitHub: https://github.com/Kavita-Musundi

LinkedIn: https://linkedin.com/in/kavita-musundi-762379343

