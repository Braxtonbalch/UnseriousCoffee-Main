#!/usr/bin/env bash
set -e

echo "Checking that the site builds..."
npm run build

echo
echo "Build succeeded."
read -p "Commit message: " msg

if [ -z "$msg" ]; then
  echo "Aborting: commit message is required."
  exit 1
fi

git add .
git commit -m "$msg"
git push

echo
echo "Done! Pushed to GitHub. Vercel will now build and deploy main."

