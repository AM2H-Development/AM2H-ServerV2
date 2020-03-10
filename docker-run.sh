cp /usr/share/zoneinfo/Europe/Berlin /etc/localtime
echo "Europe/Berlin" >  /etc/timezone

node /theia/src-gen/backend/main.js /data --hostname=0.0.0.0 --port=4444 &
node startMqttTimer &
node startWebServer &
node /usr/src/node-red/node_modules/node-red/red.js --userDir /data
