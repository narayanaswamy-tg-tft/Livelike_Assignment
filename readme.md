# Playwright Automated Testing for Automation Exercise

This repository contains automated tests for the website [Automation Exercise](https://automationexercise.com/) using Playwright. The project aims to ensure the reliability and functionality of key features, including login, product search, and cart operations.

## Features

- User login functionality
- Product search and verification
- Adding products to the cart
- CI pipeline integrated with GitHub Actions

## Technologies Used

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Playwright](https://playwright.dev/) - Automation framework
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [GitHub Actions](https://github.com/features/actions) - CI/CD pipeline

## Getting Started

### Prerequisites

- Node.js (version 16 or later)
- Git

### Clone the Repository

```bash
git clone https://github.com/yourusername/repository-name.git
cd repository-name
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add your credentials:

```bash
PASSWORD=your_password_here
```

## Running Tests

You can run the tests locally using the following command:

```bash
npm test
```

## CI Pipeline

This project includes a CI pipeline configured with GitHub Actions that triggers automated tests every time a commit is merged into the `dev` branch.

### CI Configuration

The CI configuration is located in `.github/workflows/ci-pipeline.yml`. It performs the following steps:

- Checks out the code
- Sets up Node.js
- Installs dependencies
- Runs tests
- Downloading and Viewing the Allure Report:
  - Go to the Actions tab in your GitHub repository.
  - Select the workflow run, and download the allure-report artifact from the Artifacts section.
  - Extract the downloaded file if necessary.
  - Serve the allure-report directory locally using a local HTTP server:
    cd path/to/allure-report
    npx http-server
  - Open http://localhost:8000 (or http://localhost:8080 for Node.js) in your browser.

## Folder Structure

```
├── .github
│   └── workflows
│       └── ci-pipeline.yml
├── pages
│   └── loginPage.ts
├── utils
│   └── data.json
├── tests
│   └── login.test.ts
├── config
│   └── config.json
├── .env
├── package.json
└── README.md
```

- Pre-commit Hooks
  This project uses pre-commit hooks to ensure code quality by automatically running checks before any commit. The hooks include formatting with Prettier and linting with ESLint.

  - Setup

    1. If you don't have pre-commit installed globally, you can install it using pip:
       pip install pre-commit
    2. After cloning the repository, run the following command to install the pre-commit hooks:
       pre-commit install
       This will automatically run the hooks every time you make a commit.

    Pre-commit Hooks Configured

    1. Merge Conflict Checker: Prevents committing files with unresolved merge conflicts.
    2. Trailing Whitespace Remover: Removes trailing whitespace.
    3. Prettier: Formats code according to Prettier’s rules.
    4. ESLint: Lints JavaScript, TypeScript, and JSX/TSX files.
