FROM node:lts

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN npx prisma generate

EXPOSE 3000
CMD ["bash", "docker-entrypoint.sh"]