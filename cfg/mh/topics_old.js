/* 
 * List all topics
 */

/*
 * cleanup available units:
 * Key          Short
 * years	y
 * quarters	Q
 * months	M
 * weeks	w
 * days         d
 * hours	h
 * minutes	m
 * seconds	s
 */




const t = require('../../topicsLogger');
t.addLogger({   topic:"mh/l/h1/state/t01",  // Topic to log
                condition:"every", // Condition: all, every (s), atLeast (s), atMost(s), onEvent (trigger)
                interval:5, // for every, atLeast, atMost
                newonly:false // optional: log only new values
            }).addCleanup({ unit:"seconds",
                            lifespan:30
                        });

t.addLogger({   topic:"mh/l/h1/state/t02",  // Topic to log
                condition:"atLeast", // Condition: all, every (s), atLeast (s), atMost(s), onEvent (trigger)
                interval:5, // for every, atLeast, atMost
                newonly:false // optional: log only new values
            }).addCleanup({ unit:"seconds",
                            lifespan:30
                        });

t.addLogger({   topic:"mh/l/m01/state/c01",  // Topic to log
                condition:"onEvent", // Condition: all, every (s), atLeast (s), atMost(s), onEvent (trigger)
                trigger:"mh/event/timer/",
                newonly:false // optional: log only new values
            }).addCleanup({ unit:"seconds",
                            lifespan:30
                        });
