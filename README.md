# Flap Frenzy

Welcome to Flap Frenzy, an immersive and interactive WebXR experience built on top of the [WebXR Template App](https://github.com/meta-quest/webxr-samples) where players navigate their character through a series of shrinking target rings. By physically flapping their arms and adopting different poses, players can control their character's movement in the game, offering a dynamic and engaging experience.

![Alt Text](./src/assets/flapfrenzy.gif)

> This experience is developed by [Felix Z](https://twitter.com/felix_trz) and funded by [Meta](https://meta.com/)
> Assets from [Synty Studio](https://www.syntystudios.com/)'s free [POLYGON - Starter Pack](https://syntystore.com/products/polygon-starter-pack)

## Table of Contents
- [How to Play](#how-to-play)
- [Getting Started](#getting-started)
- [File Structure and Guide](#file-structure-and-guide)
- [Contributing](#contributing)
- [License](#license)

## How to Play
- **Arm Flapping**: Flap your arms to make the character ascend in the game.
- **Glide**: Extend your arms horizontally to glide. This helps the character maintain altitude more easily.
- **Dive**: Tuck your arms beside your body to dive, causing the character to lose altitude quickly.
- **Objective**: The main goal is to pass through as many target rings as possible. As you progress, the size of the target rings will shrink, increasing the challenge.

## Getting Started
1. Clone the repository:
   ```
   git clone https://github.com/felixtrz/flap-frenzy.git
   ```
2. Navigate to the project directory:
   ```
   cd flap-frenzy
   ```
3. Install the required dependencies (if any).
4. Run the game locally.

## File Structure and Guide

### 1. `index.js`: The entry point of the game.
- Initializes the game and sets up the necessary configurations.
- Sets up the game loop which continuously updates and renders the game elements.

### 2. `game.js`: Contains the main game logic.
- Manages the overall game state, including starting, pausing, and ending the game.
- Handles user input, updates game elements, and renders them on the screen.

### 3. `flap.js`: Defines the behavior of the flapping mechanism.
- Manages the flapping mechanism of the player's character.
- Determines the character's ascent when the player interacts and its descent due to gravity.

### 4. `player.js`: Manages the player's character.
- Responsible for the player's character behavior, including movement and collision detection.
- Renders the character on the screen.

### 5. `scene.js`: Handles the game scenes.
- Manages the different scenes in the game, such as the background and obstacles.
- Updates and renders these elements on the screen.

### 6. `landing.js`: Manages the landing page of the game.
- Handles the game's landing page displayed before the game starts.
- Contains options like "Start Game", "Settings", and "High Scores".

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.
