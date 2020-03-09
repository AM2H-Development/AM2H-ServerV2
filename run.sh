node /theia/src-gen/backend/main.js /data --hostname=0.0.0.0 --port=4444 &
node /usr/src/node-red/node_modules/node-red/red.js --userDir /data &
node startMqttTimer
node startWebServer
