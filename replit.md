# WTWR (What to Wear)

## Overview
A React-based weather application that suggests clothing based on current weather conditions. Built with Vite, React 19, Redux Toolkit, and React Router.

## Project Structure
- `src/components/` - React components (App, Header, Main, Profile, etc.)
- `src/redux/` - Redux store configuration
- `src/utils/` - Utility functions and API handlers
- `src/styles/` - CSS variables and base styles
- `src/assets/` - Images and icons
- `db.json` - Mock data for clothing items (used with json-server if backend is running)

## Key Technologies
- Vite 7 (build tool)
- React 19
- Redux Toolkit + React Redux
- React Router DOM
- Lucide React (icons)

## Development
- Frontend runs on port 5000
- Uses OpenWeatherMap API for weather data (API key in .env)
- Item API expects backend on port 3001 (optional, for CRUD operations on clothing items)

## Recent Changes
- January 17, 2026: Added dark/light mode theme toggle
  - Created ThemeToggle component with fixed position in bottom-right corner
  - Added CSS variables for dark theme in variables.css
  - Footer has contrasting colors (inverts between dark/light modes)
  - Theme preference saved to localStorage
- January 17, 2026: Configured for Replit environment
  - Updated vite.config.js to use port 5000, host 0.0.0.0, allowedHosts: true
  - Fixed case-sensitive import in Profile.jsx (SideBar vs Sidebar)
