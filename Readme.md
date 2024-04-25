# Book Management API
- This is a simple RESTful API built with Node.js and Express.js for managing book entries. The API offers CRUD operations for book management, user authentication, filtering books by author or publication year, and basic security measures.

## Features

- **User Authentication**: Secure authentication system for users with registration, login, logout, and token refresh functionality.
- **Book Management**: CRUD operations for managing book entries, including title, author, and publication year.
- **Book Filtering**: Filter books by author or publication year to quickly find desired titles.
- **API Documentation**: Clear documentation of API endpoints and their usage for easy integration with client applications.
- **Security Measures**: Implementation of basic security measures, including input validation, to ensure the integrity and safety of user data.
## Installation

1. Clone the repository:
    - git clone < repository-url >

2. Install dependencies:
    - npm install

3. Set up environment variables:
Create a  `.env`  file in the root directory with the following variables:
    ```
    PORT= <port-number>
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET= <your-access-token-secret>
    ACCESS_TOKEN_EXPIRY=<access-token-expiry-in-seconds>
    REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
    REFRESH_TOKEN_EXPIRY=<refresh-token-expiry-in-seconds>
    MONGODB_URL=<your-mongodb-url>
4. Start the server: 
    ``` 
    npm run dev
## Usage 

### -> User Authentication 

1. **Register User**
- Endpoint: `POST /api/v1/users/register`
- Description: Register a new user.
- Request Body: JSON object containing user details (e.g., username, password).

2. **Login User**
- Endpoint: `POST /api/v1/users/login`
- Description: Login an existing user.
- Request Body: JSON object containing user credentials (e.g., username, password).

3. **Logout User**
- Endpoint: `POST /api/v1/users/logout`
- Description: Logout the currently authenticated user.
- Authorization: Requires a valid JWT token.

4. **Refresh Access Token**
- Endpoint: `POST /api/v1/users/refresh-token`
- Description: Refresh the access token.
- Authorization: Requires a valid refresh token.

### -> Book Management

- **Add Book**
- Endpoint: `POST /api/v1/books/add-books`
- Description: Add a new book to the database.
- Authorization: Public route.
- (e.g. title, author, publicationYear).

- **Get All Books**
- Endpoint: `GET /api/v1/books/getbooks`
- Description: Retrieve all books from the database.
- Authorization: Public route.

- **Filter Books**
- Endpoint: `POST /api/v1/books/filterbooks`
- Description: Filter books based on specific criteria .
- (e.g. author, publicationYear).
- Authorization: Public route.

## ** Folder Structure **

# **src/**
- Contains the source code of the application.
- **App.js**: Manages Express app configuration and middleware setup.
- **index.js**: Entry point of the application. Sets up environment variables, connects to the database, and starts the server.
- **constants.js**: Manages application constants.
     - `DB_NAME`: Name of the MongoDB database.

- ## **models/**
    - Contains the User and Book Database models.
- ## **controllers/**
    - Contains controller functions for user-related and book-related operations.
    - `user.controller.js`: User controller functions.
    - `book.controller.js`: Book controller functions.
- ## **utils/**
    - Contains utility functions and classes.
    - `AsyncHandler.js`: Custom asynchronous handler for error handling.
    - `ApiError.js`: Custom API error class.
    - `ApiResponse.js`: Custom API response class.
- ## **db/**
    - Contains database-related files.
    - **index.js**: Manages MongoDB connection. MongoDB URL is stored in the `.env` file.
- ## **routes/**
    - Contains route handlers.
- ## **middlewares/**
    - Contains auth middleware function.

## Middlewares

- **verifyJWT**
- Description: Middleware to verify JWT token for protected routes.

## Contributing

Contributions to this project are welcome! If you have any improvements, bug fixes, or new features to suggest, please feel free to create an issue or submit a pull request.

### How to Contribute

1. **Report Bugs**: If you encounter any bugs or unexpected behavior, please open an issue on GitHub. Provide as much detail as possible, including steps to reproduce the bug, expected behavior, and actual behavior.

2. **Feature Requests**: If you have ideas for new features or enhancements, you can also open an issue to discuss them. Explain the feature you'd like to see and why it would be valuable for the project.

3. **Pull Requests**: If you'd like to contribute code directly, you can fork the repository, create a new branch for your changes, and submit a pull request. Make sure your code follows the project's coding standards and include tests if applicable.

### Code Contribution Guidelines

- Follow the existing code style and conventions.
- Write clear and concise commit messages.
- Keep pull requests focused on a single feature or issue.
- Test your changes thoroughly before submitting a pull request.
- Update documentation as needed.

Thank you for contributing to this project!

## License
 
 - Copyright (c)  2024 K Sankalp Patnaik