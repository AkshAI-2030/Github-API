const express = require("express");
const router = express.Router();
const {
  getRepoDetails,
  getUserProfile,
  createIssue,
} = require("../controllers/githubController");
const validateIssue = require("../validations");

router.get("/", getUserProfile);
router.get("/:repoName", getRepoDetails);
router.post("/:repoName/issues", validateIssue, createIssue);

module.exports = router;
