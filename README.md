# 🎬 Movie Watchlist API

A RESTful backend for browsing movies and managing a personal watchlist. Users can register, log in, explore a catalogue of movies, and track what they plan to watch, are watching, or have completed, with ratings and personal notes.

Built with **Node.js, Express, TypeScript, Prisma, and PostgreSQL**, and secured with **JWT authentication** and **Zod request validation**.

---

## ✨ Features

- 🔐 **Authentication**: register, login, and logout with bcrypt-hashed passwords
- 🪪 **JWT sessions**: tokens are returned in the response and also set as an `httpOnly` cookie
- 🛡️ **Protected routes**: auth middleware accepts a `Bearer` token or the `jwt` cookie
- 🎞️ **Movie catalogue**: list all movies or fetch a single movie by ID
- 📋 **Personal watchlist**: add, view, update, and delete items, or clear the entire list
- 🔒 **Ownership checks**: users can only modify or delete their own watchlist items
- ✅ **Input validation**: request bodies validated with Zod schemas
- 🗄️ **Type-safe database access**: Prisma ORM with cascading deletes
- 🌱 **Seed script**: populate the database with 10 well-known movies

---

## 🧰 Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Runtime          | Node.js                             |
| Language         | TypeScript                          |
| Framework        | Express                             |
| Database         | PostgreSQL                          |
| ORM              | Prisma                              |
| Authentication   | JSON Web Tokens (`jsonwebtoken`)    |
| Password hashing | `bcrypt`                            |
| Validation       | Zod                                 |
| Configuration    | `dotenv`                            |

---

## 📁 Project Structure

```
.
├── prisma/
│   └── schema.prisma            # Data models (User, Movie, WatchListItem)
├── seed/
│   └── seedFile.ts              # Seeds the database with sample movies
├── src/
│   ├── server.ts                # App entry point
│   ├── config/
│   │   └── db.ts                # Prisma client + connect/disconnect helpers
│   ├── controller/
│   │   ├── authController.ts    # register, login, logout
│   │   ├── movieController.ts   # getAllMovies, getMovieById
│   │   └── watchlistController.ts
│   ├── middleware/
│   │   ├── authMiddleware.ts    # JWT verification
│   │   └── validateRequest.ts   # Zod validation middleware
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── movieRoutes.ts
│   │   └── watchlistRoutes.ts
│   ├── utils/
│   │   └── generateToken.ts     # Signs JWT and sets the cookie
│   ├── validators/
│   │   └── watchlistValidators.ts
│   └── generated/prisma/        # Generated Prisma client
└── .env                         # Environment variables (never committed)
```

---

## 🗃️ Database Schema

```
User 1 ────── * WatchListItem * ────── 1 Movie
  │                                      ▲
  └──────────── creates (1 : *) ─────────┘
```

**User**: `id`, `name`, `email` (unique), `password` (hashed), `createdAt`

**Movie**: `id`, `title`, `overview`, `releaseYear`, `genres[]`, `runTime`, `posterUrl`, `createdBy`, `createdAt`

**WatchListItem**: `id`, `userId`, `movieId`, `status`, `rating`, `notes`, `createdAt`, `updatedAt`

- A user can add a given movie to their watchlist **only once** (`@@unique([userId, movieId])`).
- Deleting a user or a movie cascades to the related records.
- `status` is one of: `PLANNED` (default), `WATCHING`, `COMPLETED`, `DROPPED`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (a version that can run TypeScript files directly, or use `tsx`/`ts-node`)
- A running PostgreSQL database
- npm (or yarn / pnpm)

### 1. Clone the repository

```bash
git clone https://github.com/Abdelhakam23/Movie-WatchList-Api.git
cd Movie-WatchList-Api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME"
NODE_ENV="development"
JWT_SECRET="replace-with-a-long-random-secret"
EXPIRES_IN="7d"
```

| Variable       | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `DATABASE_URL` | PostgreSQL connection string                                 |
| `NODE_ENV`     | `development` enables verbose Prisma query logs              |
| `JWT_SECRET`   | Secret used to sign and verify JWTs. Keep it private         |
| `EXPIRES_IN`   | Token lifetime, for example `7d`, `12h`                      |

> ⚠️ **Never commit your `.env` file.** Make sure it is listed in `.gitignore`.

### 4. Set up the database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. (Optional) Seed sample movies

The seed script attaches movies to an existing user, so register a user first, then set the `userId` constant inside the seed file to that user's ID before running it.

```bash
npx tsx seed/seedFile.ts
```

### 6. Run the server

```bash
npm run dev
```

The API will be available at **`http://localhost:5001`**.

---

## 📡 API Reference

Base URL: `http://localhost:5001`

### 🔐 Auth: `/auth`

| Method | Endpoint          | Description              | Auth |
| ------ | ----------------- | ------------------------ | ---- |
| POST   | `/auth/register`  | Create a new account     | No   |
| POST   | `/auth/login`     | Log in and receive a JWT | No   |
| POST   | `/auth/logout`    | Clear the auth cookie    | No   |

**Register**: `POST /auth/register`

```json
{
  "name": "Ahmed",
  "email": "ahmed@example.com",
  "password": "your-password"
}
```

**Login**: `POST /auth/login`

```json
{
  "email": "ahmed@example.com",
  "password": "your-password"
}
```

**Success response**

```json
{
  "status": "success",
  "message": "User logged in successfully",
  "user": { "id": "uuid", "email": "ahmed@example.com" },
  "token": "<jwt>"
}
```

### 🎞️ Movies: `/movies`

| Method | Endpoint       | Description        | Auth |
| ------ | -------------- | ------------------ | ---- |
| GET    | `/movies`      | List all movies    | No   |
| GET    | `/movies/:id`  | Get a movie by ID  | No   |

### 📋 Watchlist: `/watchlist`

All watchlist endpoints require authentication.

| Method | Endpoint          | Description                         |
| ------ | ----------------- | ----------------------------------- |
| GET    | `/watchlist`      | Get the current user's watchlist    |
| POST   | `/watchlist`      | Add a movie to the watchlist        |
| PUT    | `/watchlist/:id`  | Update status, rating, or notes     |
| DELETE | `/watchlist/:id`  | Remove a single item                |
| DELETE | `/watchlist`      | Clear the entire watchlist          |

**Add to watchlist**: `POST /watchlist`

```json
{
  "movieId": "movie-uuid",
  "status": "PLANNED",
  "rating": 9,
  "notes": "Recommended by a friend"
}
```

**Validation rules**

- `movieId`: required, valid UUID
- `status`: optional, one of the allowed statuses
- `rating`: optional integer between **1** and **10**
- `notes`: optional string

### 🔑 Authenticating requests

Send the token in the `Authorization` header:

```
Authorization: Bearer <your-jwt>
```

The middleware also reads the `jwt` cookie when a header is not provided.

### ⚠️ Error format

Errors are returned as JSON with an appropriate HTTP status code:

```json
{ "Error": "Movie Not Found" }
```

| Code | Meaning                                  |
| ---- | ---------------------------------------- |
| 400  | Validation error or duplicate entry      |
| 401  | Missing, invalid, or expired token       |
| 403  | Trying to modify another user's item     |
| 404  | Resource not found                       |
| 500  | Internal server error                    |

---

## 🔒 Security Notes

- Passwords are hashed with **bcrypt** (10 salt rounds) and never returned by the API.
- JWT cookies are `httpOnly`, `sameSite: strict`, and `secure` in production.
- Watchlist operations verify that the item belongs to the authenticated user.
- All secrets live in environment variables, never in source code.

---

## 🗺️ Roadmap

- [ ] Endpoints to create, update, and delete movies
- [ ] Pagination, search, and filtering by genre / year
- [ ] Refresh tokens
- [ ] Rate limiting and security headers
- [ ] Automated tests
- [ ] Swagger / OpenAPI documentation

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.
