const axiosInstance = require("../config/axios");

const getUserProfile = async (req, res) => {
  try {
    const { data: user } = await axiosInstance.get("/user");
    console.log(user);
    const { data: repos } = await axiosInstance.get("/user/repos");

    return res.status(200).json({
      username: user.login,
      name: user.name,
      bio: user.bio,
      location: user.location,
      email: user.email,
      twitter: user.twitter_username,
      github_url: user.html_url,
      avatar_url: user.avatar_url,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      account_created: user.created_at,
      repositories: repos.map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        stars: repo.stargazers_count,
      })),
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while fetching userdetails",
      error: err.message,
    });
  }
};

const getRepoDetails = async (req, res) => {
  try {
    const { repoName } = req.params;
    const { data: repo } = await axiosInstance.get(
      `/repos/${process.env.GITHUB_USERNAME}/${repoName}`
    );
    res.status(200).json({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      issues: repo.open_issues_count,
      url: repo.html_url,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Repo doesn't exists", error: err.message });
  }
};

const createIssue = async (req, res) => {
  try {
    const { repoName } = req.params;
    const { title, body } = req.body;

    const { data: issue } = await axiosInstance.post(
      `/repos/${process.env.GITHUB_USERNAME}/${repoName}/issues`,
      { title, body }
    );

    res.status(201).json({
      message: "Issue created succesfully",
      issue_url: issue.html_url,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while creating issue", error: err.message });
  }
};

module.exports = { getRepoDetails, getUserProfile, createIssue };
