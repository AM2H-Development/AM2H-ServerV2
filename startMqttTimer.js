/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var cfg = require('./cfg/config');

const mqttTimer = require('./modules/mqttTimer');
mqttTimer.setProperties(cfg,()=>{mqttTimer.start();});