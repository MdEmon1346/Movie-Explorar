# 🎬 Movie Explorer

A responsive Movie Explorer application built with React and the TVMaze API. Users can browse shows, search by title, sort results, and view detailed information in an interactive modal.

## Features

- Responsive navigation bar with mobile menu
- Home page with hero section and CTA
- All Shows catalog using `GET /shows`
- Title search using `GET /search/shows?q=:query`
- Responsive CSS Grid movie/show cards
- Poster, title, release year and rating
- Interactive details modal
- Close button, outside-click close and Escape-key close
- Loading skeletons and error handling
- Empty search state
- Sorting by rating, name and newest release

## Technology

- React
- JavaScript (ES6+)
- CSS
- React Router
- TVMaze API
- Vite

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, normally `http://localhost:5173/`.

## Build

```bash
npm run build
```

## API

TVMaze documentation: https://www.tvmaze.com/api
