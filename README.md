# Flap Frenzy

Welcome to Flap Frenzy, an immersive and interactive WebXR experience built on top of the [WebXR Template App](https://github.com/meta-quest/webxr-samples). In this game, players navigate their character through a series of shrinking target rings by physically flapping their arms and adopting different poses. This dynamic and engaging experience is designed to get you moving and test your coordination and timing skills.

![Flap Frenzy Gameplay](./src/assets/flapfrenzy.gif)

> Developed by [Felix Z](https://twitter.com/felix_trz) | Funded by [Meta](https://meta.com/) | Assets by [Synty Studio](https://www.syntystudios.com/)

## Table of Contents

- [How to Play](#how-to-play)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Guide for Developers](#guide-for-developers)
- [Contributing](#contributing)
- [License](#license)

## How to Play

- **Arm Flapping**: Flap your arms to make the character ascend.
- **Glide**: Extend your arms horizontally to glide and maintain altitude.
- **Dive**: Tuck your arms to dive and lose altitude quickly.
- **Objective**: Pass through as many target rings as possible. The rings decrease in size as you advance, increasing the difficulty.

## Getting Started

To set up your development environment and start playing Flap Frenzy, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/felixtrz/flap-frenzy.git
   ```
2. Navigate to the project directory:
   ```sh
   cd flap-frenzy
   ```
3. Install the required dependencies using npm:
   ```sh
   npm install
   ```
4. To start a local development server, run:
   ```sh
   npm run serve
   ```
   This will compile the project and open it in your default web browser.
5. To create a production build, run:
   ```sh
   npm run build
   ```
   The build artifacts will be stored in the `dist/` directory.

## Project Structure

This section outlines the structure of the project files and their respective roles within the application.

### `index.js`

- **Purpose**: The entry point of the game application.
- **Contents**:
  - Initialization code for game systems.
  - Starts the game loop and rendering process.

### `global.js`

- **Purpose**: Defines global constants and components used throughout the game.
- **Contents**:
  - `GlobalComponent`: A component that holds references to the renderer, camera, and scene.
  - Constants: Paths for textures, scoring keys, and game state parameters.

### `landing.js`

- **Purpose**: Manages the landing page interface, particularly the VR and Web launch buttons.
- **Contents**:
  - `InlineSystem`: A system that sets up and manages the UI elements on the landing page.

### `player.js`

- **Purpose**: Sets up the player's state and input handling.
- **Contents**:
  - `PlayerComponent`: Represents the player's state and attributes.
  - `PlayerSystem`: Manages the player's interactions and updates.

### `scene.js`

- **Purpose**: Initializes the main scene, camera, and renderer.
- **Contents**:

  - `setupScene`: A function that creates and configures the scene, camera, and lighting.

### `flap.js`

- **Purpose**: Handles the flapping mechanism and related game logic.
- **Contents**:
  - `FlapSystem`: Manages the player's flapping interaction and movement.

### `game.js`

- **Purpose**: Contains the main game logic, including score management and state transitions.
- **Contents**:
  - `GameSystem`: Handles the game's logic and state management.

## Guide for Developers

### Initialization and Entry Point

- **Global Setup**: Begin by understanding `global.js` for an overview of the game's configuration.
- **Starting the Game**: `index.js` initializes the game systems and starts the game loop.

### Core Game Functionality

- **Scene Setup**: `scene.js` is responsible for the visual setup of the game.
- **Player Initialization**: `player.js` sets up the player's avatar and handles input.
- **Game State Management**: `game.js` oversees the game's logic, including scoring and game states.
- **Flapping Mechanics**: `flap.js` focuses on the player's movement and flapping controls.

### User Interface

- **Landing Page UI**: `landing.js` manages the UI on the landing page, including VR and Web launch buttons.

### Working with the Code

- To adjust global settings, modify `global.js`.
- For changes to the game's startup sequence, update `index.js`.
- To change the scene's visual elements, edit `scene.js`.
- For gameplay mechanics and logic, refer to `game.js` and `flap.js`.
- For UI adjustments, `landing.js` is the file to look at.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.
