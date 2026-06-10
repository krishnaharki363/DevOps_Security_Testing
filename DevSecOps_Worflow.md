# Automated Dependency Update, Security Scanning & Deployment Pipeline

This project uses **Renovate**, **GitHub Actions**, **Snyk**, and **Vercel** to automatically detect dependency updates, test them, scan for vulnerabilities, and deploy them to production.

---

## 1. Developer Pushes Code to GitHub

A developer pushes code to the repository:

```bash
git push origin main
```

The code is pushed to the `main` branch of the repository.

---

## 2. Renovate Wakes Up

Renovate reads the `renovate.json` configuration file and scans the project's dependencies.

It compares the versions listed in `package.json` against the latest versions available on npm.

Renovate runs on its configured schedule (every weekday) or when manually triggered.

---

## 3. Renovate Finds an Outdated Dependency

For example:

Current version:

```json
"express": "4.17.0"
```

Latest version:

```json
"express": "5.2.1"
```

Renovate automatically:

* Creates a branch:

```text
renovate/express-5.x
```

* Opens a Pull Request:

```text
chore(deps): update express from 4.17.0 to 5.2.1
```

---

## 4. CI Workflow Triggers Automatically

As soon as the Pull Request is created, GitHub detects a `pull_request` event targeting the `main` branch.

This automatically triggers the `ci.yml` workflow.

The workflow runs on a fresh Ubuntu runner provided by GitHub Actions.

---

## 5. Dependency Installation

GitHub checks out the Renovate branch and installs dependencies:

```bash
npm ci
```

This installs all packages exactly as defined in `package-lock.json`.

The updated dependency version is now available inside:

```text
node_modules/
```

---

## 6. Automated Testing

The CI pipeline executes:

```bash
npm test
```

This validates that the updated dependency does not break application functionality.

In a production application, this step would run unit tests, integration tests, and other automated checks.

---

## 7. Security Scanning with Snyk

Snyk authenticates using the repository secret:

```text
SNYK_TOKEN
```

and scans the dependency tree for known vulnerabilities.

The scan evaluates the newly installed dependency version against Snyk's vulnerability database.

Results are:

* Logged in GitHub Actions
* Saved as downloadable artifacts
* Available for auditing and compliance purposes

If any Medium, High, or Critical vulnerability is detected:

```text
CI Fails
PR Blocked
No Merge Occurs
```

---

## 8. Auto-Merge After Successful Validation

If all checks pass:

* Dependency installation succeeds
* Tests pass
* Snyk finds no blocking vulnerabilities

the Auto-Merge job executes.

GitHub CLI performs:

```bash
gh pr merge --squash
```

This:

* Squash merges the Pull Request
* Creates a single clean commit
* Deletes the Renovate branch automatically

---

## 9. CD Workflow Triggers

The squash merge creates a new commit on the `main` branch.

GitHub detects the `push` event and automatically starts the deployment workflow:

```text
cd.yml
```

The deployment runs on a fresh Ubuntu runner.

---

## 10. Vercel Environment Synchronization

The workflow executes:

```bash
vercel pull
```

using:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

This synchronizes:

* Project settings
* Environment variables
* Build configuration

from Vercel into the GitHub Actions runner.

---

## 11. Production Deployment

The workflow deploys the application:

```bash
vercel deploy --prod
```

Vercel:

* Builds the application
* Creates a production deployment
* Distributes it across its global edge network

Deployment information is logged, including:

* Deployment URL
* Commit SHA
* Commit Author
* Deployment Timestamp

---

## 12. Production Goes Live

The updated application is now running in production with the newly approved dependency version.

The entire process is fully automated:

```text
Dependency Release
        ↓
Renovate Detects Update
        ↓
Creates Pull Request
        ↓
CI Pipeline Runs
        ↓
npm ci
        ↓
npm test
        ↓
Snyk Security Scan
        ↓
All Checks Pass
        ↓
Auto Merge
        ↓
Push to Main
        ↓
CD Pipeline Runs
        ↓
Vercel Deployment
        ↓
Production Updated
```

As long as all tests and security checks remain green, dependency updates can move from detection to production deployment without any manual intervention.
