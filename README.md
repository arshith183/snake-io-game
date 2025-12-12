# 🐍 Snake.io - Multiplayer Snake Game

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://arshith183.github.io/snake-io-game/)
[![GitHub Pages](https://img.shields.io/badge/deployment-GitHub%20Pages-blue)](https://arshith183.github.io/snake-io-game/)
[![License](https://img.shields.io/badge/license-MIT-orange)](LICENSE)

> A modern, competitive Snake game with real-time global leaderboard built with vanilla JavaScript, HTML5 Canvas, and Firebase.

## 🎮 [**Play Now!**](https://arshith183.github.io/snake-io-game/)

## ✨ Features

### Core Gameplay
- 🎯 **Classic Snake Mechanics** - Smooth movement with arrow keys or WASD controls
- 🍎 **Regular Food** - Eat red food to grow and score 10 points
- 💎 **Golden Food** - Special bonus food worth 50 points
- ⚡ **Progressive Difficulty** - Snake speed increases as you grow
- 👀 **Visual Snake** - Animated snake with eyes on the head

### Competitive Features
- 🏆 **Global Leaderboard** - Compete with players worldwide
- 👤 **Player Profiles** - Enter your name and track your high scores
- 🥇 **Top 10 Rankings** - Gold, silver, and bronze medals for top players
- 📊 **Real-time Updates** - Live leaderboard refreshes automatically
- 💾 **Persistent Scores** - All scores saved in Firebase Firestore

### UI/UX
- 🎨 **Modern Design** - Beautiful gradient UI with smooth animations
- 📱 **Responsive Layout** - Works on desktop, tablet, and mobile
- 🔗 **Share Feature** - One-click copy link to share with friends
- ⏸️ **Game Controls** - Start, pause, and restart buttons
- 📈 **Score Display** - Live score and personal best tracking

## 🚀 Tech Stack

### Frontend
- **HTML5** - Structure and canvas element
- **CSS3** - Modern styling with gradients, animations, and flexbox
- **JavaScript (Vanilla)** - Core game logic and DOM manipulation
- **HTML5 Canvas API** - 2D graphics rendering

### Backend & Database
- **Firebase Firestore** - Real-time NoSQL database for scores
- **Firebase SDK** - Cloud integration for leaderboard

### Deployment
- **GitHub Pages** - Free, fast static hosting with CI/CD
- **GitHub Actions** - Automated deployment pipeline

## 📂 Project Structure

```
snake-io-game/
├── index.html          # Main HTML file with game structure
├── style.css           # Complete styling (300+ lines)
├── game.js             # Game logic and Firebase integration (290+ lines)
└── README.md           # Project documentation
```

## 🎯 How to Play

1. **Visit the game**: [https://arshith183.github.io/snake-io-game/](https://arshith183.github.io/snake-io-game/)
2. **Enter your name** in the welcome modal
3. **Click "Start Game"** or press the Start button
4. **Control the snake**:
   - Use **Arrow Keys** (↑ ↓ ← →) or **WASD** keys
   - Eat red food to grow longer (+10 points)
   - Eat golden food for bonus (+50 points)
5. **Avoid**:
   - Hitting the walls
   - Running into yourself
6. **Compete**: Beat your high score and climb the global leaderboard!

## 🛠️ Local Development

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML/CSS/JavaScript
- Text editor (VS Code recommended)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/arshith183/snake-io-game.git
cd snake-io-game
```

2. **Open in browser**
```bash
# Option 1: Open index.html directly
open index.html  # macOS
start index.html  # Windows

# Option 2: Use Live Server (VS Code extension)
# Right-click index.html → "Open with Live Server"
```

3. **Configure Firebase (Optional)**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Firestore Database
   - Copy your Firebase config
   - Replace the config in `index.html` (lines 61-68)

## 🔥 Firebase Setup

To enable your own leaderboard:

1. Create a Firebase project
2. Enable Firestore Database
3. Update security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /scores/{document} {
      allow read: if true;
      allow write: if request.resource.data.score is int 
                   && request.resource.data.playerName is string;
    }
  }
}
```

4. Replace Firebase config in `index.html`

## 📊 Features Breakdown

| Feature | Status | Description |
|---------|--------|-------------|
| Core Gameplay | ✅ | Snake movement, food eating, collision detection |
| Scoring System | ✅ | Points for regular and golden food |
| Local High Score | ✅ | Saved in browser localStorage |
| Global Leaderboard | ✅ | Firebase Firestore integration |
| Player Names | ✅ | Custom name input modal |
| Responsive Design | ✅ | Mobile and desktop support |
| Share Functionality | ✅ | One-click link copy |
| Sound Effects | ⏳ | Coming soon |
| Multiplayer Mode | ⏳ | Future enhancement |

## 🎨 Screenshots

### Game Interface
Clean, modern UI with gradient backgrounds and smooth animations.

### Global Leaderboard
Real-time top 10 players with medal rankings (🥇 🥈 🥉).

### Mobile View
Responsive design adapts to all screen sizes.

## 🚀 Deployment

This project is automatically deployed to GitHub Pages:

1. Push changes to the `main` branch
2. GitHub Actions automatically builds and deploys
3. Live site updates at: https://arshith183.github.io/snake-io-game/

### Manual Deployment
```bash
git add .
git commit -m "Update game features"
git push origin main
```

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Future Enhancements

- [ ] Add sound effects and background music
- [ ] Implement power-ups (speed boost, shield, etc.)
- [ ] Add difficulty levels (easy, medium, hard)
- [ ] Create real-time multiplayer mode
- [ ] Add achievements and badges
- [ ] Implement daily/weekly challenges
- [ ] Add social media sharing buttons
- [ ] Create mobile app version (React Native)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Arshith**
- GitHub: [@arshith183](https://github.com/arshith183)
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn URL]

## 🙏 Acknowledgments

- Inspired by classic Snake games and Slither.io
- Firebase for real-time database capabilities
- GitHub Pages for free hosting
- The open-source community for inspiration

## 📞 Contact

Have questions or suggestions? Feel free to:
- Open an issue on GitHub
- Fork and submit a PR
- Share the game with friends!

---

<div align="center">
  <strong>🎮 Ready to play? <a href="https://arshith183.github.io/snake-io-game/">Start Now!</a></strong>
  <br><br>
  <sub>Built with ❤️ by Arshith | December 2025</sub>
</div>
