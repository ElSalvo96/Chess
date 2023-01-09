# Chess Web App [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a responsive web app built in React.js that allows users to play chess against each other or against an AI opponent. The app is styled with Tailwind CSS and uses an external JavaScript engine for the chess logic. The app is online [here](https://chess-kiob2.ondigitalocean.app/).

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

## License

This project is released under the MIT License. Users are free to use, modify, and distribute the code as long as they credit the original author and include the license in their copies.
