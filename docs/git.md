# Git Workflow for Contributing to Zapher

## Introduction

This document provides guidelines on how to contribute to the Zapher project using Git. Following these steps ensures a smooth and consistent workflow for all contributors.

## Prerequisites

Before you begin, ensure you have Git installed on your machine. If not, you can download it from [git-scm.com](https://git-scm.com/).

## Fork the Repository

1. Go to the [Zapher repository](https://github.com/yourusername/zapher).
2. Click on the "Fork" button in the upper right corner of the page. This creates a copy of the repository in your GitHub account.

## Clone Your Fork

Clone the forked repository to your local machine:

```bash
git clone https://github.com/yourusername/zapher.git
```

Navigate into the project directory:

```bash
cd zapher
```

## Set Upstream Repository

Add the original repository as an upstream remote to keep your fork updated:

```bash
git remote add upstream https://github.com/originalowner/zapher.git
```

Verify the new remote named `upstream`:

```bash
git remote -v
```

## Create a Branch

Create a new branch for your feature or bugfix:

```bash
git checkout -b my-feature-branch
```

## Make Changes

Make your changes to the codebase. Ensure you follow the project's coding standards and guidelines.

## Commit Changes

Stage your changes:

```bash
git add .
```

Commit your changes with a meaningful commit message:

```bash
git commit -m "Add feature X to improve Y"
```

## Push Changes

Push your changes to your forked repository:

```bash
git push origin my-feature-branch
```

## Create a Pull Request

1. Go to your forked repository on GitHub.
2. Click on the "Compare & pull request" button next to your branch.
3. Provide a descriptive title and detailed description of your changes.
4. Submit the pull request.

## Keeping Your Fork Updated

To keep your fork updated with the latest changes from the original repository, follow these steps:

Fetch the upstream repository:

```bash
git fetch upstream
```

Merge the changes into your local main branch:

```bash
git checkout main
git merge upstream/main
```

Push the updated main branch to your fork:

```bash
git push origin main
```

## Additional Resources

If you're new to Git or need a refresher, here are some useful resources:

- [Pro Git Book](https://git-scm.com/book/en/v2)
- [GitHub Docs](https://docs.github.com/en/github)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)

## Conclusion

Following this Git workflow will help maintain a clean and organized codebase, making it easier for everyone to contribute. If you have any questions or run into issues, feel free to open an issue on the repository or ask for help in our community channels.
