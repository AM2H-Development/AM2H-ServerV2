#!/bin/sh
# Update remote repositories

cd /home/project/AM2H-ServerV2
cd base
git add .
git commit -m Update
git push

cd ../user
git add .
git commit -m Update
git push