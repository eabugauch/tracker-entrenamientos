# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based fitness tracking application called "Tracker Entrenamientos" - a 4-week intensive training program focused on pull-ups (dominadas) and overall fitness progress. The app is built as a Progressive Web App (PWA) using Create React App.

## Essential Commands

### Development
- `npm start` - Start development server at http://localhost:3000
- `npm test` - Run tests in interactive watch mode
- `npm run build` - Create production build in `build/` directory

### Deployment
- `npm run deploy:vercel` - Build and deploy to Vercel
- `npm run deploy:netlify` - Build and deploy to Netlify

### Testing
- `npm test` - Interactive test runner
- `npm test -- --coverage` - Run tests with coverage report
- `npm test -- --watchAll=false` - Run tests once without watch mode

## Architecture Overview

### Technology Stack
- **React** v19.1.0 (no TypeScript)
- **State Management**: React hooks (useState, useEffect)
- **Data Persistence**: localStorage
- **Icons**: lucide-react
- **Testing**: Jest + React Testing Library
- **Build Tool**: Create React App (react-scripts)

### Application Structure
The entire application logic resides in a single component (`src/App.js`, 816 lines). This monolithic structure includes:

1. **Training Plans**: 6-day weekly workout schedules across 4 weeks
2. **Exercise Types**: Dominadas (pull-ups), weight training, functional circuits
3. **Data Tracking**: 
   - Exercise performance (reps, sets, weight)
   - Body weight monitoring
   - Energy levels (1-10 scale)
   - Training notes
4. **Features**:
   - Progress dashboard with statistics
   - Data export to JSON
   - Mobile-optimized interface
   - PWA capabilities for offline use

### Data Model
All data is stored in localStorage with the following structure:
- Training entries by date
- Exercise performance metrics
- Body weight history
- Energy level tracking
- Custom notes per session

## Important Configuration

### Environment Variables
Located unusually in `src/.env`:
```
GENERATE_SOURCEMAP=false
DISABLE_ESLINT_PLUGIN=true
REACT_APP_TITLE="Tracker Entrenamientos"
REACT_APP_VERSION="1.0.0"
```

### Build Configuration
- ESLint is disabled during builds (`DISABLE_ESLINT_PLUGIN=true`)
- Source maps are disabled for production
- PWA manifest configured in `public/manifest.json`

## Development Guidelines

### Code Organization
Currently, all application logic is in `src/App.js`. When modifying:
1. Maintain the existing Spanish comments and variable names
2. Preserve the workout plan structure and progression logic
3. Ensure localStorage keys remain consistent for data persistence

### Mobile-First Approach
The app is optimized for mobile devices. Any UI changes should:
- Maintain touch-friendly interfaces
- Preserve responsive design patterns
- Keep the PWA functionality intact

### Testing Approach
- Test file exists but contains outdated default test
- When adding tests, use React Testing Library patterns
- Focus on user interactions and data persistence logic