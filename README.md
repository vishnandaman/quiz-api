# Online Quiz Application API

## 1. Project Description

This project is a backend API for a simple online quiz application. It provides a set of RESTful endpoints to manage and take quizzes.

### Core Features:

- **Quiz Management:** Create quizzes and add questions with multiple-choice options.
- **Quiz Taking:** Fetch questions for a specific quiz and submit answers to receive a score.
- **Quiz Listing:** Retrieve a list of all available quizzes.

### Technology Stack:

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Middleware:** `body-parser` for handling JSON request bodies.

---

## 2. Setup and Local Execution

Follow these instructions to get the project running on your local machine.

### Prerequisites:

- [Node.js](https://nodejs.org/) installed (which includes npm).
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally.

### Installation & Setup:

1.  **Clone the repository** (or use your existing local folder):

    ```bash
    git clone <your-repository-link>
    cd verto_qui_api
    ```

2.  **Install dependencies:**
    Open a terminal in the project root and run:

    ```bash
    npm install
    ```

3.  **Ensure MongoDB is running:**
    Make sure your local MongoDB server is active. The application will try to connect to `mongodb://localhost:27017/quizdb` by default.

4.  **Start the server:**
    Run the following command to start the application:
    ```bash
    node server.js
    ```
    You should see the following output in your console, indicating the server is ready:
    ```
    MongoDB connected
    Server running on port 3000
    ```
    The API is now accessible at `http://localhost:3000`.

---

## 3. Running Test Cases

**Note:** Unit tests have not been implemented for this project yet.

If a testing framework like Jest were added, you would typically run the tests using a command defined in `package.json`:

```bash
npm test
```

The tests would focus on the business logic within the controller functions, especially the `submitQuiz` endpoint, to ensure scoring is calculated correctly.

---

## 4. Assumptions and Design Choices

- **Stateless API:** The API is stateless. All data required for processing a request is either provided in the request itself or retrieved from the database. No session data is stored on the server.
- **Data Modeling:**
  - Quizzes and Questions are stored in separate collections for a clean separation of concerns. A `Quiz` document contains an array of ObjectIDs that reference documents in the `Question` collection.
  - In the `Question` model, each multiple-choice option is a subdocument within an `options` array. This allows each option to have its own unique `_id`, which is used to identify the correct answer via the `correctOptionId` field.
- **No Authentication:** The API is public and does not implement any user authentication or authorization. All endpoints are open.
- **Error Handling:** Basic error handling is implemented. The API returns appropriate HTTP status codes (e.g., `400` for bad requests, `404` for not found, `500` for server errors) with a descriptive JSON message.
- **Security:** When fetching quiz questions for a user to answer, the `correctOptionId` is explicitly removed from the response payload to prevent clients from easily seeing the correct answer.
