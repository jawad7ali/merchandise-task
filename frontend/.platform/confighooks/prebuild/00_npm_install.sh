#!/bin/sh
set -e
EXIT_CODE=0

cd /var/app/staging
runuser -u webapp -- npm i --omit=dev || EXIT_CODE=$?
echo "npm install exited with code $EXIT_CODE"