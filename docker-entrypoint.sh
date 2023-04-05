#!/bin/bash

echo "🌈 Checking Prisma migration"
npx prisma migrate deploy

echo "🌱 Making sure database is seeded"
npx prisma db seed

echo "💻 Starting server"
npx yarn dev