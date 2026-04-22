# Personal Budget Angular

Angular version of the Personal Budget class project. The repo contains an Angular frontend and a separate Express API server that returns budget data from JSON files.

## Features

- Angular single-page frontend.
- Routed pages for home, about, login, charts, contact, and 404 handling.
- Budget data fetched from a local Express API.
- Chart.js and D3 budget visualizations.
- Separate frontend and backend folders.

## Stack

- Angular 16
- TypeScript
- RxJS
- Chart.js
- D3
- Node.js
- Express
- JSON files

## Project Structure

```text
personal-budget/       Angular application
personal-budget/src/   Angular source code
server/                Express API server
server/budget.json     Primary budget dataset
server/budget2.json    Alternate budget dataset
old_code/              Earlier/reference code
```

## Frontend Routes

```text
/          Home
/about     About
/login     Login
/chart     Chart.js budget chart
/d3chart   D3 budget chart
/contact   Contact
/**        404 page
```

## API Routes

The Angular app fetches from:

```text
http://localhost:3000/budget
```

Server routes:

```text
GET /budget       Returns budget.json
GET /new_budget   Returns budget2.json
GET /new_chart    Serves public/new_chart.html from the server folder
GET /hello        Demo health-check route
```

## Run Locally

Start the API:

```powershell
cd server
npm install
npm start
```

Start the Angular app in another terminal:

```powershell
cd personal-budget
npm install
npm start
```

Open:

```text
http://localhost:4200
```

## Notes

- The frontend API URL is currently hardcoded in `personal-budget/src/app/data.service.ts`.
- Build output and Angular cache files may exist locally; review the working tree before publishing.
