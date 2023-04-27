# Chess Web App [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a responsive web app built in React.js that allows users to play chess against each other or against an AI opponent. The app is styled with Tailwind CSS and uses an external JavaScript engine for the chess logic. The app is online [here](https://elsalvo96.github.io/Chess/).

## Installation

To install and run the app, you will need to have Node.js and npm (the Node.js package manager) installed on your machine.

1. Clone the repository to your local machine:

```command
git clone https://github.com/ElSalvo96/Chess.git
```

2. Navigate to the project directory:

```command
cd Chess
```

3. Install the dependencies:

```command
npm install
```

4. Start the app:

```command
npm start
```

## Usage

When you open the app, the game is already set up for human vs. human play and you can move right away. If you want to play against an AI opponent, click on the "Play vs. AI" button. The AI will always play as the black pieces, and you can choose from five different levels of AI difficulty.

**_Please note that while the AI is thinking, your client performance may decrease due to the engine's calculations._**

## Technology Stack

- React.js
- Tailwind CSS
- JavaScript chess engine named [js-chess-engine](https://www.npmjs.com/package/js-chess-engine)

## Testing

To run the test suite for the app, use the following command:

```command
npm test
```

This will run all of the tests defined in the test directory.

## CI / CD Workflow

This project uses GitHub Actions for Continuous Integration and Continuous Deployment. With this workflow, the app will be automatically built, tested, and deployed to the [GitHub Pages](https://pages.github.com/) hosting service when code is pushed to the `master` branch.

The workflow is defined in the `.github/workflows/deploy-on-github-pages.yml` file, and it consists of four jobs:

1. **Test job:** This job checks out the latest version of the code and installs the necessary dependencies using `npm ci`. It then runs the test suite to ensure that everything is working as expected. Furthermore caches the `node_modules` directory to speed up future builds.

2. **Build job:** This job checks out the latest version of the code, installs the necessary dependencies using npm, and builds the project using npm run build. It then uploads the built artifact to the GitHub Actions artifacts, which will be used in the deployment step.

3. **Setup Pages job:** This job sets up the environment for GitHub Pages, which will be used in the deployment step.

4. **Deploy:** If the previous job succeeds, this job deploys the app to GitHub Pages using the built-in `actions/deploy-pages@v2` action. This action automatically sets up the necessary GitHub Pages configuration and deploys the built files from the artifact.

To trigger the workflow, simply push changes to the `master` branch of the repository. The workflow will run automatically and deploy the latest changes to the app.

Note that you will need to configure your GitHub Pages settings to serve the deployed app in order for it to be accessible. This can be done in the repository's settings page, under the "GitHub Pages" section.


## License

This project is released under the MIT License. Users are free to use, modify, and distribute the code as long as they credit the original author and include the license in their copies.

Sure, here's the updated section including a step to run tests: