<div align="center">
  <img src="public/images/logo-full.png" alt="Logo" width="400" height="auto">
  <p align="center">
    A self-hosted game browser.
  </p>
</div>

<div align="center">
	<strong>🚧 Cartridge is currently in development and is not yet ready for use. Stay tuned! 🚧</strong>
</div>

## About

![Cartridge Screenshot](https://user-images.githubusercontent.com/1876231/169448529-54259dc2-0ad6-44eb-bc3e-df56220a6e64.png)
Cartridge is a convenient browser for your game collection with easy file downloads and automatically imported metadata and images. This project is designed to be self-hosted on your local server.

## Installation

_Coming soon..._

## Folder Structure

Currently, Cartridge requires a specific folder structure to sort games into appropriate platforms. For now, all top-level directories within your ROMs folder should correspond with the slug of the platform on IGDB. Some of these slugs are a little unattractive and thus less appealing for existing collections, but a more robust solution will be implemented as soon as possible.

To find a platform slug, navigate to the platform on IGDB and check the end of the URL. For example, the slug for Nintendo GameCube (https://www.igdb.com/platforms/ngc) is **_NGC_**.

ROM files should all exist immediately within this folder, not within subfolders. The filenames should ideally be as close to the exact game name as found on IGDB, but the scanner will attempt to make a fuzzy match. Matches can be fixed from the admin panel.

## Development

### Requirements

- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- API key from [IGDB](https://api-docs.igdb.com/#about)

### Instructions

1. Clone the repository.

```sh
git clone https://github.com/jamjnsn/cartridge.git
```

2. Install dependencies.

```sh
yarn
```

3. Generate JWT secret and add to `.env`.

```
openssl rand -base64 32
```

4. Create `.env`

```
DB_DATABASE=cartridge
DB_USER=cartridge
DB_PASSWORD=cartridge

DATABASE_URL="postgresql://cartridge:cartridge@localhost:5432/cartridge?schema=public"

JWT_SECRET="<Generated JWT secret here>"

TWITCH_CLIENT_ID=<Your Twitch Client ID>
TWITCH_APP_ACCESS_TOKEN=<Your Twitch Access Token>

GAMES_DIRECTORY=/path/to/games
```

5. Set up database

```
npx prisma migrate reset
```

6. Start dev server

```
yarn dev
```

## Built With

- [Vue](https://vuejs.org/)
- [Express](https://expressjs.com/)
