const request = require("supertest");
const express = require("express");
const {
  getUserProfile,
  getRepoDetails,
  createIssue,
} = require("../controllers/githubController");
const axiosInstance = require("../config/axios");

jest.mock("../config/axios");

const app = express();
app.use(express.json());

app.get("/user", getUserProfile);
app.get("/repos/:repoName", getRepoDetails);
app.post("/repos/:repoName/issues", createIssue);
const mockUserData = {
  login: "AkshAI-2030",
  name: "Akshay Arelli",
  bio: "Backend Developer",
  location: "Hyderabad",
  email: "akshayarelli2030@gmail.com",
  twitter_username: "AkshAI_2030",
  html_url: "https://github.com/AkshAI-2030",
  avatar_url: "https://avatars.githubusercontent.com/u/182394219?v=4",
  public_repos: 25,
  followers: 10,
  following: 5,
  created_at: "2024-09-22T05:29:50Z",
};

const mockRepoData = [
  {
    name: "Repo1",
    html_url: "https://github.com/AkshAI-2030/Repo1",
    stargazers_count: 10,
  },
  {
    name: "Repo2",
    html_url: "https://github.com/AkshAI-2030/Repo2",
    stargazers_count: 5,
  },
];

const mockRepoDetails = {
  name: "Repo1",
  description: "Sample repository",
  stargazers_count: 15,
  forks_count: 3,
  html_url: "https://github.com/AkshAI-2030/Repo1",
  open_issues_count: 2,
};

const mockIssueResponse = {
  html_url: "https://github.com/AkshAI-2030/Repo1/issues/1",
};

describe("GitHub API Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user profile data", async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockUserData });
    axiosInstance.get.mockResolvedValueOnce({ data: mockRepoData });

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getUserProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "AkshAI-2030",
        name: "Akshay Arelli",
        public_repos: 25,
        repositories: expect.arrayContaining([
          expect.objectContaining({
            name: "Repo1",
            url: expect.any(String),
            stars: expect.any(Number),
          }),
        ]),
      })
    );
  });

  it("should return repository details", async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockRepoDetails });

    const req = { params: { repoName: "Repo1" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getRepoDetails(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Repo1",
        stars: 15,
        forks: 3,
        issues: 2,
      })
    );
  });

  it("should create an issue and return issue URL", async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: mockIssueResponse });

    const req = {
      params: { repoName: "Repo1" },
      body: { title: "Bug Fix", body: "Fix login issue" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createIssue(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Issue created succesfully",
        issue_url: "https://github.com/AkshAI-2030/Repo1/issues/1",
      })
    );
  });

  it("should return an error if issue title is missing", async () => {
    const req = {
      params: { repoName: "Repo1" },
      body: { body: "Fix login issue" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createIssue(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("GitHub API Integration Tests", () => {
  it("should fetch user profile via API", async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockUserData });
    axiosInstance.get.mockResolvedValueOnce({ data: mockRepoData });

    const res = await request(app).get("/user");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("username", "AkshAI-2030");
  });

  it("should fetch repository details via API", async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: mockRepoDetails });

    const res = await request(app).get("/repos/Repo1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "Repo1");
  });

  it("should create an issue via API", async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: mockIssueResponse });

    const res = await request(app)
      .post("/repos/Repo1/issues")
      .send({ title: "Bug Fix", body: "Fix login issue" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Issue created succesfully");
  });

  it("should return 500 if issue title is missing", async () => {
    const res = await request(app)
      .post("/repos/Repo1/issues")
      .send({ body: "Fix login issue" });

    expect(res.status).toBe(500);
  });
});
