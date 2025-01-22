# Social Network API

## Description
This project is a back-end application for a social network web application, designed to handle user and thought data efficiently. It provides API endpoints to create, read, update, and delete users, thoughts, and reactions. The application is built using Node.js, Express.js, and MongoDB, with Mongoose as the ODM.

## Features
- **User Management**: Create, read, update, and delete users.
- **Thought Management**: Create, read, update, and delete thoughts.
- **Reactions**: Add and delete reactions to thoughts.
- **Friend Management**: Add and remove friends.

## Technologies Used
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/social-network-api
   ```

## Usage
To start the server and test the API:

1. Start the development server:
   ```bash
   npm run start
   ```
2. Use Insomnia or Postman to test the following API endpoints.

## API Endpoints

### Users
- **Get all users**: `GET /api/users`
- **Get a single user by ID**: `GET /api/users/:userId`
- **Create a new user**: `POST /api/users`
  ```json
  {
    "username": "johndoe",
    "email": "johndoe@example.com"
  }
  ```
- **Update a user by ID**: `PUT /api/users/:userId`
- **Delete a user by ID**: `DELETE /api/users/:userId`
- **Add a friend**: `POST /api/users/:userId/friends/:friendId`
- **Remove a friend**: `DELETE /api/users/:userId/friends/:friendId`

### Thoughts
- **Get all thoughts**: `GET /api/thoughts`
- **Get a single thought by ID**: `GET /api/thoughts/:thoughtId`
- **Create a new thought**: `POST /api/thoughts`
  ```json
  {
    "thoughtText": "This is a thought.",
    "username": "johndoe",
    "userId": "1234567890abcdef"
  }
  ```
- **Update a thought by ID**: `PUT /api/thoughts/:thoughtId`
- **Delete a thought by ID**: `DELETE /api/thoughts/:thoughtId`
- **Add a reaction**: `POST /api/thoughts/:thoughtId/reactions`
  ```json
  {
    "reactionBody": "Great thought!",
    "username": "janedoe"
  }
  ```
- **Remove a reaction**: `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`

## Videos
Here are demonstration videos showcasing how each route works:

1. **User Routes**: [Watch Video](https://drive.google.com/file/d/17SIREtrCWD0AY20XEe-C3xc0YMsFClF3/view)
   - Demonstrates creating, reading, updating, and deleting users.
2. **Thought Routes**: [Watch Video](https://drive.google.com/file/d/1sGUrxwiwY2f-5dqtXGr_Vbsrj_g_PcpL/view)
   - Shows how to manage thoughts, including creating, reading, updating, and deleting them.
3. **Friend Routes**: [Watch Video](https://drive.google.com/file/d/1SOCwlSxh1gtyiv355rnbl7IhQTr_-k3G/view)
   - Covers adding and removing friends.
4. **Reaction Routes**: [Watch Video](https://drive.google.com/file/d/1TL98bTdWdhu4O_Q8vQzA8X1OVL5XOITD/view)
   - Highlights how to add and remove reactions to thoughts.

## Tests
To test the API, use a tool like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).

### Example: Deleting a Reaction
1. **Endpoint**:
   ```
   DELETE /api/thoughts/<thoughtId>/reactions/<reactionId>
   ```
2. Replace `<thoughtId>` and `<reactionId>` with actual values from your database.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes.

## Questions
For any questions, please reach out to:
- **Author**: Juan Girelli
- **Email**: juangirelli@gmail.com

