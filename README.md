# iMark
iMark – the Map-based Information Distribution System

- You post an event based on the location, and this event is displayed on the map.
- There are many topics (categories), like marketplace, jobs, rental market and sports and so on.
- You can search related events to view, and share and favourite them.

## Features
- Information distribution management
    - Post an event
    - Update an event
    - Delete an event
    - Query events
- Category management
    - Create a category
    - Edit a category
    - Delete a category
    - Search categories
- User management
    - Add a user
    - Change the password
    - Block a user
    - Delete a user
    - Change a role
    - Update a profile
- Favorite management
    - Follow an event
    - Unfollow an event
- Map interaction
    - View all events
    - Locate an event on the map
    - Share an event to social media
    - Favorite an event
- Log in
- Log out
- Sign up

## Configuration

### Development environment
Create a file `.env` in the root directory, and configure the following environment variables:
- MongoDB

```bash
MONGODB_URI=
```

## Getting Started

First, install node modules:
```bash
npm install
```

Second, run the development server:

```bash
npm run dev
```

Server is running at [http://localhost:3000](http://localhost:3000).

## Deployment

```bash
npm run build
```

## Testing

```bash
npm run test
```