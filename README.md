# 🚀 GitHub API Integration - Node.js

A **Node.js** project that integrates with the **GitHub API** to:

✅ Fetch authenticated **GitHub user profile**  
✅ Retrieve details of a **specific repository**  
✅ **Create issues** in a repository  
✅ Implement **error handling and validation**  
✅ Includes **Unit & Integration tests** using Jest & Supertest  

---

## 📂 **Project Structure**  

```
📦 github-api-node
├── 📁 config
│   ├── axios.js             # Axios configuration for GitHub API requests
├── 📁 controllers
│   ├── githubController.js  # API logic for fetching user/repo details & creating issues
├── 📁 __tests__
│   ├── githubController.test.js  # Unit and Integration tests
├── 📁 routes
│   ├── githubRoutes.js      # Express routes
├── 📁 middleware
│   ├── validation.js        # Request validation middleware
├── server.js                # Express server entry point
├── package.json             # Dependencies & scripts
├── .env                     # GitHub API credentials
└── README.md                # Project documentation
```

---

## 🛠️ **Setup & Installation**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/AkshAI-2030/Github-API.git
cd Github-API
```

### **2️⃣ Install Dependencies**  
```sh
npm install
```

### **3️⃣ Create a `.env` File**  
```
GITHUB_ACCESS_TOKEN=your_personal_access_token
GITHUB_USERNAME=your_github_username
```
📌 **Generate a GitHub Personal Access Token:**  
👉 **Settings → Developer Settings → Personal Access Tokens**

---

## 🚀 **Run the Server**  
```sh
npm run dev 
or
node server.js
```
- API will run on **http://localhost:3000/**  

---

## API Endpoints

### 1. Get User Profile
**Endpoint:**
```
GET /api/v1/github/
```
**Response:**
```json
{
    "username": "AkshAI-2030",
    "name": "AkshAI Arelli",
    "bio": "👋 Hey there, I'm Akshay Arelli!",
    "location": "Hyderabad",
    "email": "akshayarelli2030@gmail.com",
    "twitter": "AkshAI_2030",
    "github_url": "https://github.com/AkshAI-2030",
    "avatar_url": "https://avatars.githubusercontent.com/u/182394219?v=4",
    "public_repos": 26,
    "followers": 0,
    "following": 0,
    "account_created": "2024-09-22T05:29:50Z"
}
```

### 2. Get Repository Details
**Endpoint:**
```
GET /api/v1/github/{repoName}
```
**Example Response:**
```json
{
    "name": "Backend-6-MockTest",
    "description": "Created with StackBlitz ⚡️",
    "language": "JavaScript",
    "stars": 0,
    "forks": 0,
    "issues": 2,
    "url": "https://github.com/AkshAI-2030/Backend-6-MockTest",
    "created_at": "2025-01-02T10:17:02Z",
    "updated_at": "2025-02-28T12:09:41Z"
}
```

### 3. Create an Issue
**Endpoint:**
```
POST /api/v1/github/{repoName}/issues
```
**Request Body:**
```json
{
    "title": "Im testing ",
    "body": "I'm testing body"
}
```
**Response:**
```json
{
    "message": "Issue created successfully",
    "issue_url": "https://github.com/AkshAI-2030/Backend-6-MockTest/issues/3"
}
```

---

## 🧪 **Running Tests**  
This project includes **unit and integration tests** using **Jest & Supertest**.  

### **Run All Tests**  
```sh
npm run test
```

### **📌 Test Coverage**  
✔ **Unit Tests** (Mocking Axios)  
✔ **Integration Tests** (Using Supertest)  
✔ **Error Handling** (API failure handling)  
✔ **Validation Tests** (Ensuring request fields are valid)  

---
