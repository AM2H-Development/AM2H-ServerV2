#!/bin/sh
# Install by typing:
# wget -q -O - https://raw.githubusercontent.com/AM2H-Development/AM2H-ServerV2/2.1.0/getAM2H-ServerV2.sh | sh

mkdir AM2H-ServerV2
cd AM2H-ServerV2
git clone https://github.com/AM2H-Development/AM2H-ServerV2.git base
# git clone https://github.com/AM2H-Development/AM2H-ServerV2-userdata.git user
cd base
git pull
npm install
cd ../user
git pull
npm install
