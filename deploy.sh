#!/usr/bin/env bash

NAME="CA2"
DROPLET_URL="134.122.64.238"

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./build/* root@$DROPLET_URL:/var/www/$NAME

