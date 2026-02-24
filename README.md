# WTWR (What to Wear)

## Overview
A React-based weather application that suggests clothing based on current weather conditions. Built with Vite, React 19, Redux Toolkit, and React Router. Includes user authentication with JWT tokens.

## Project Structure
- `src/components/` - React components (App, Header, Main, Profile, etc.)
- `src/contexts/` - React context providers (CurrentUserContext for auth)
- `src/hooks/` - Custom hooks (useForm, useFormValidation)
- `src/utils/` - Utility functions (api.js, auth.js, token.js, constants.js, weather.js)
- `src/styles/` - CSS variables and base styles
- `src/assets/` - Images and icons
- `src/app/` - Redux store configuration

## Key Technologies
- Vite 7 (build tool)
- React 19
- Redux Toolkit + React Redux
- React Router DOM
- Lucide React (icons)
- Google Fonts: Space Grotesk

## Authentication
- JWT token stored in localStorage for persistent sessions
- `src/utils/token.js` - get/set/remove token from localStorage
- `src/utils/auth.js` - signup, signin, getUserProfile, updateUserProfile API calls
- `src/contexts/CurrentUserContext.jsx` - provides currentUser, isLoggedIn, auth handlers
- Protected routes: /profile requires login
- Only logged-in users can add clothing items
- Only item owners can delete their items
- SignUp, SignIn, EditProfile modals built with ModalWithForm pattern

## API Endpoints (Backend on port 3001)
- POST /signup - register new user
- POST /signin - login user (returns JWT token)
- GET /users/me - get current user profile (auth required)
- PATCH /users/me - update profile (auth required)
- GET /items - get all clothing items (public)
- POST /items - create item (auth required)
- DELETE /items/:id - delete item (auth required, owner only)

## Development
- Frontend runs on port 5000
- Uses OpenWeatherMap API for weather data (API key in .env)
- Item API expects backend on port 3001 (falls back to placeholder items if unavailable)

## User Preferences
- Font: Space Grotesk (Google Fonts)
- Dark/light theme toggle (saved to localStorage)
- Header: full-width background, content constrained to 136rem max-width with 4rem padding

## Recent Changes
- February 24, 2026: Implemented full authentication system
  - SignUp (name, avatar, email, password), SignIn, EditProfile, SignOut
  - CurrentUserContext for auth state management
  - Protected profile route, auth-gated add/delete
  - Token persistence in localStorage
- February 11, 2026: Improved Profile page styling
  - Sidebar with card design, accent-colored avatar ring, styled nav links
  - Edit Profile and Sign Out buttons in sidebar
- January 17, 2026: Added dark/light mode theme toggle
- January 17, 2026: Configured for Replit environment
