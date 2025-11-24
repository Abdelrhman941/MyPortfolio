# 🚀 Ultra-Performance Portfolio

A blazing-fast, GPU-accelerated portfolio website built with React, TypeScript, and Vite. Optimized for **60fps** animations and **Lighthouse score 95+**.

## ✨ Features

### 🎯 Ultra-Performance Optimizations
- ⚡ **Critical CSS Inlined** - Instant first paint
- 🎮 **GPU-Accelerated Animations** - Only `transform` and `opacity`
- 📦 **Code Splitting** - Optimized chunks for better caching
- 🖼️ **Lazy Loading** - Images load with IntersectionObserver
- 🎯 **Passive Event Listeners** - Butter-smooth scrolling
- 🌐 **WebP/AVIF Support** - Modern image formats
- 🌳 **Tree-Shaken** - Zero unused code
- ⚙️ **Preconnect & Preload** - Critical resources optimized

### 🎨 Design & Animations
- 💎 **Glassmorphism UI** - Modern, professional design
- ✨ **Smooth Transitions** - 60fps GPU-accelerated animations
- 👁️ **Intersection Observer** - Elements fade in on scroll
- ⌨️ **TypeWriter Effect** - Dynamic text animations
- 🔄 **Circular Text** - Rotating border animations
- 📱 **Responsive Design** - Mobile-first approach

### 🛠️ Tech Stack
- React 19
- TypeScript
- Vite
- TailwindCSS
- Motion (Framer Motion)
- Blurhash

## 📦 Project Structure

```
portfolio/
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── utils/           # Performance utilities
│   ├── assets/          # Images and static files
│   └── styles/          # Critical CSS
├── resume/              # CV/Resume files
├── App.tsx              # Root component
├── index.tsx            # Entry point
├── index.html           # HTML template
└── vite.config.ts       # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Abdelrhman941/MyPortfolio.git

# Navigate to project directory
cd MyPortfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages
