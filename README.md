# AM2H-Server V2 (c)2017,2018,2019,2020
dev-2.1.0

Setup Docker environment (Theia/Node.js/NPM):
* git clone https://github.com/AM2H-Development/AM2H-ServerV2.git
* cd AM2H-ServerV2/Docker
* docker-compose -p AM2H-ServerV2 up -d

[
Stop Container:
* docker-compose -p AM2H-ServerV2 down
]

Install the AM2H-ServerV2 app in Node.js / NPM environment (e.g. open Theia terminal):
* wget -q -O - https://raw.githubusercontent.com/AM2H-Development/AM2H-ServerV2/2.1.0/bin/getAM2H-ServerV2.sh | bash -s https://github.com/AM2H-Development/AM2H-ServerV2-userdata.git

Rename user/cfg/config.sample.js to config.js

Start the apps locally (in Theia terminal):
* node startMqttTimer {cfgname} &
* node startWebServer {cfgname} &

Start the apps in Docker container:
* docker run --name AM2H-MqqtTimer -w /home/project/ -u root -it -d -v am2h-serverv2_AM2H-ServerV2_data:/home/project:cached --entrypoint node am2h/nodejs-theia:latest /home/project/AM2H-ServerV2/base/startMqttTimer.js
* docker run --name AM2H-ServerV2_Webserver -w /home/project/ -u root -it -d -p 3333:3000 -v am2h-serverv2_AM2H-ServerV2_data:/home/project:cached --entrypoint node am2h/nodejs-theia:latest /home/project/AM2H-ServerV2/base/startWebServer.js
