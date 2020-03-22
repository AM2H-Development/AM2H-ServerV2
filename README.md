# AM2H-Server V2 (c)2017,2018,2019,2020
dev-2.1.0

Setup Docker environment (Theia/Node.js/NPM):
* git clone https://github.com/AM2H-Development/AM2H-ServerV2.git
* cd AM2H-ServerV2/Docker
* docker-compose up -d

Install the AM2H-ServerV2 app in Node.js / NPM environment (e.g. open Theia terminal):
wget -q -O - https://raw.githubusercontent.com/AM2H-Development/AM2H-ServerV2/2.1.0/bin/getAM2H-ServerV2.sh | bash -s https://github.com/AM2H-Development/AM2H-ServerV2-userdata.git

Rename user/cfg/config.sample.js to config.js

Start the apps:
* node startMqttTimer {cfgname} &
* node startWebServer {cfgname} &
