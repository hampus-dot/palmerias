# ⚽ Palmerias FC - Football Team Management Platform

A modern, full-featured football team management platform built with SvelteKit and Tailwind CSS. Designed with inspiration from Dubai Palm and premium sports platforms.

## ✨ Features

### 🏠 Landing Page
- **Hero Section** with gradient animations and modern design
- **Player Showcase** with sortable stats (Goals, Assists, Appearances)
- **League Table** showing current standings for 10 teams
- **Upcoming Matches** preview
- **Contact Section** with team information

### 🔐 Authentication System
- Separate login flows for **Players** and **Managers**
- Role-based dashboards
- Demo credentials:
  - Manager: `manager@palmerias.se` / `manager`
  - Player: Any email/password

### 👔 Manager Dashboard
- **Create Training Sessions** with modal-based forms
- **Schedule Matches** against opponents
- **Team Overview** with quick stats
- **Navigation** to all team features

### 👟 Player View
- **Availability Tracking** for training sessions
- **Match Availability** with Yes/No/Maybe options
- **Schedule Overview** of upcoming events
- **Personal Dashboard**

### 📊 Advanced Analytics

#### Training Attendance Chart
- Individual player attendance percentages
- Overall team attendance rate
- Average players per session
- Most dedicated player highlight

#### Tactical Stats with Scout AI 🤖
- **Form Overview**: Wins, Draws, Losses with percentages
- **Goal Analysis**: Goals scored/conceded per game
- **Home vs Away Performance**: Win rates comparison
- **Fun Insights**: Clean sheets, high-scoring games, goal difference
- **Scout AI Comments**: Automated tactical insights

### 🎯 Full Dashboard Features
- **Player Management**: Complete roster with stats
- **Training Schedule**: Full training calendar
- **Match Calendar**: Past and upcoming matches
- **Detailed Statistics**: Comprehensive team and player stats
- **Sidebar Navigation**: Easy access to all features

## 🛠️ Tech Stack

- **Framework**: SvelteKit (TypeScript)
- **Styling**: Tailwind CSS v4
- **Charts**: Custom SVG-based charts
- **Utilities**: clsx, tailwind-merge
- **Deployment**: Vercel
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/hampus-dot/palmerias.git

# Navigate to project
cd palmerias

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Visit http://localhost:5173
```

### Building for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
palmerias/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Card.svelte
│   │   │   ├── Sidebar.svelte
│   │   │   ├── TrainingAttendanceChart.svelte
│   │   │   └── TacticalStats.svelte
│   │   └── data/
│   │       ├── players.ts
│   │       ├── matches.ts
│   │       ├── training.ts
│   │       ├── league.ts
│   │       └── availability.ts
│   └── routes/
│       ├── (public)/
│       │   ├── +page.svelte          # Landing page
│       │   └── login/
│       │       └── +page.svelte      # Login page
│       └── (auth)/
│           ├── dashboard/            # Team dashboard
│           ├── manager/              # Manager features
│           └── player/               # Player features
├── static/
├── package.json
└── svelte.config.js
```

## 🎨 Design Highlights

- **Modern Gradients**: Blue, purple, and pink color schemes
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Hover effects and transitions
- **Glass Morphism**: Backdrop blur effects
- **Card-Based Layout**: Apple-inspired UI cards
- **Progressive Enhancement**: Works without JavaScript

## 📋 Data Models

### Player
```typescript
{
  id: number
  name: string
  number: number
  position: string
  roles: ('player' | 'coach')[]
  matchesPlayed: number
  goals: number
  assists: number
}
```

### Match
```typescript
{
  id: number
  date: string
  time: string
  opponent: string
  homeAway: 'Hemma' | 'Borta'
  result?: {
    goalsFor: number
    goalsAgainst: number
  }
  location: string
}
```

### Training Session
```typescript
{
  id: number
  date: string
  time: string
  location: string
  type: 'Lagtränning' | 'Matchförberedelse' | 'Taktik' | 'Fysträning'
  attendance: number[]
  notes?: string
}
```

## 🌐 Deployment

This project is configured for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for your own team!

## 🙏 Acknowledgments

- Inspired by Dubai Palm design aesthetic
- Built with modern Svelte 5 features
- Tailwind CSS for rapid styling
- Community feedback and suggestions

## 📞 Contact

For questions or suggestions:
- Email: info@palmeriasfc.se
- Phone: +46 70 123 45 67
- Location: Palmeriavallen, Göteborg

---

**Built with ❤️ for Palmerias FC**
