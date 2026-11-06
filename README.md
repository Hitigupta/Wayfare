# Wayfare – Travel Listing Platform

A full-stack travel listing application built using Node.js, Express.js, MongoDB and EJS. Wayfare allows users to explore travel stays, create property listings, manage existing listings and share reviews.

## Features

- **Listing Management:** Create, view, edit and delete property listings.
- **Review System:** Add ratings and comments to property listings.
- **Database Relationships:** Connect listings and reviews using MongoDB ObjectId references and Mongoose population.
- **Server-side Validation:** Validate incoming listing and review data using Joi schemas.
- **Error Handling:** Centralized Express error handling with custom error classes and asynchronous middleware.
- **Dynamic Rendering:** Generate pages using EJS templates, layouts and reusable partials.
- **Flash Notifications:** Display success messages using Express sessions and connect-flash.

## Tech Stack

| Category | Technologies |
|---|---|
| Runtime | Node.js |
| Backend | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Frontend | EJS, HTML, CSS, JavaScript |
| Styling | Bootstrap |
| Validation | Joi |
| Middleware | express-session, connect-flash |

## Project Structure

```text
Wayfare/
├── Models/
│   ├── Listing.js
│   └── review.js
├── routes/
│   ├── listing.js
│   └── reviews.js
├── views/
│   ├── includes/
│   ├── layouts/
│   └── listings/
├── public/
│   ├── css/
│   └── js/
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── init/
├── schema.js
├── app.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB running locally

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Hitigupta/Wayfare.git
```

2. Navigate to the project directory:

```bash
cd Wayfare
```

3. Install dependencies:

```bash
npm install
```

4. Start the application:

```bash
npm run dev
```

5. Open the application:

```text
http://localhost:8080
```

## Application Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/listings` | View all listings |
| GET | `/listings/new` | Open listing creation form |
| POST | `/listings` | Create a listing |
| GET | `/listings/:id` | View listing details |
| GET | `/listings/:id/edit` | Edit listing form |
| PUT | `/listings/:id` | Update a listing |
| DELETE | `/listings/:id` | Delete a listing |
| POST | `/listing/:id/reviews` | Add a review |

