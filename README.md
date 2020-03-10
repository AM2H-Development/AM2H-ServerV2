# AM2H-Server V2 (c)2017,2018,2019
dev-2.1.0

Rename cfg/config.sample.js to config.{cfgname}.js

create the log directory according to the config setting e.g. "./var/logfiles" for "./var" or "./logfiles" for "."

in the console cd to project directory

npm update

node startMqttTimer {cfgname}

node startWebServer {cfgname}
