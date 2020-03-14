module.exports = function(cfg) {
const DEBUGLEVEL='debug';
const PRODUCTION='info';

var winston = require('winston');
winston.setLevels(winston.config.syslog.levels);
// { emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }

winston.loggers.add('main', {
    console: {
        level: DEBUGLEVEL,
        colorize: true,
        label: 'main'
    },
    file: {
        level:DEBUGLEVEL,
        filename: '../user/logfiles/main.log'
    }
  });

winston.loggers.add('http', {
    console: {
        level: DEBUGLEVEL,
        colorize: true,
        label: 'http'
    },
    file: {
        level:DEBUGLEVEL,
        filename: '../user/logfiles/http.log'
    }
  });

winston.loggers.add('db', {
    console: {
        level: DEBUGLEVEL,
        colorize: true,
        label: 'db'
    },
    file: {
        level:DEBUGLEVEL,
        filename: '../user/logfiles/db.log'
    }
  });

winston.loggers.add('sockets', {
    console: {
        level: DEBUGLEVEL,
        colorize: true,
        label: 'sockets'
    },
    file: {
        level:DEBUGLEVEL,
        filename: '../user/logfiles/sockets.log'
    }
  });

winston.loggers.add('mqtt', {
    console: {
        level: PRODUCTION,
        colorize: true,
        label: 'mqtt'
    },
    file: {
        level:PRODUCTION,
        filename: '../user/logfiles/mqtt.log'
    }
  });

winston.loggers.add('timer', {
    console: {
        level: DEBUGLEVEL,
        colorize: true,
        label: 'timer'
    },
    file: {
        level:DEBUGLEVEL,
        filename: '../user/logfiles/timer.log'
    }
  });

winston.loggers.add('topicsLogger', {
    console: {
        level: DEBUGLEVEL,
        colorize: true,
        label: 'topicsLogger'
    },
    file: {
        level:DEBUGLEVEL,
        filename: '../user/logfiles/tlog.log'
    }
  });
    
};