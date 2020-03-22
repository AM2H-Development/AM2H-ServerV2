#!/bin/sh
# Update remote repositories
git config --global user.name "AM2H"
git config --global user.email "am2h@qxf.de"

cd /home/project/AM2H-ServerV2
cd base
git add .
git commit -m Update
git push

cd ../user
git add .
git commit -m Update
git push