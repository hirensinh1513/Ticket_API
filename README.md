Ticket Management System
A comprehensive ticket management system built with Node.js, Express, MongoDB, JWT, bcryptjs, Helmet, CORS, Swagger, and Rate Limiter. This system supports role-based access control to manage permissions for admins, managers, and employees.

Ticket Management System
A comprehensive ticket management system built with Node.js, Express, MongoDB, JWT, bcryptjs, Helmet, CORS, Swagger, and Rate Limiter. This system supports role-based access control to manage permissions for admins, managers, and employees.

Role-based Access Control:
Admins: Full access to all routes.
Managers: Can view and update all tickets.
Employees: Can create and view their own tickets.
Secure Authentication: Using JWT and bcryptjs for password hashing.
Security Best Practices: Helmet for setting various HTTP headers, CORS for handling cross-origin requests.
API Documentation: Swagger for detailed API documentation.
Rate Limiting: To prevent abuse by limiting the number of requests.
Requirements
Node.js (v14 or later)
MongoDB
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/hirensinh1513/ticket-management-system.git
cd ticket-management-system
Install the dependencies:

bash
Copy code
npm install
Configuration
Create a .env file in the root directory and add the following environment variables:

env
Copy code
PORT=3000
MONGO_URI=mongodb://localhost:27017/ticket_management
JWT_SECRET=your_jwt_secret
Ensure MongoDB is running on your machine or configure the MONGO_URI to point to your MongoDB instance.

Running the Application
Start the application:

bash
Copy code
npm start
The application will be running on http://localhost:3000.

API Documentation
Swagger is used to provide detailed API documentation. After running the application, you can access the Swagger documentation at http://localhost:3000/api-docs.

Security
Authentication: JWT is used for authenticating users.
Password Hashing: bcryptjs is used to hash passwords before storing them in the database.
HTTP Headers: Helmet is used to set various HTTP headers for security purposes.
Cross-Origin Requests: CORS is configured to handle cross-origin requests.
Rate Limiting: A rate limiter is implemented to prevent abuse.
