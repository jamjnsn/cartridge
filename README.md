<div align="center">
  <img src="public/images/logo-full.png" alt="Logo" width="400" height="auto">
  <p align="center">
    A self-hosted game browser.
  </p>
</div>

## About

![Cartridge Screenshot](https://user-images.githubusercontent.com/1876231/169448529-54259dc2-0ad6-44eb-bc3e-df56220a6e64.png)
Cartridge is a convenient browser for your game collection with easy file downloads and automatically imported metadata and images. This project is designed to be self-hosted on your local server.

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

## Built With

- [Vue](https://vuejs.org/)
- [Express](https://expressjs.com/)
