"use strict";

const {Cc,Cu,Ci,Cm} = require("chrome"),
    {Services} = Cu.import("resource://gre/modules/Services.jsm");
const _ = require("sdk/l10n").get;

const FAVICON_BASE_64 = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwALIQcACygHIDtM+GHsX/kCvNQAAAAAAAAAAA6n4bMPavJN//0ypgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOYwRQDGz3oNuv+OKMv/kCvN/5ArzUAAAAAA6n4bMOp/Gu/7vBj//8ob7//JGiAAAAAAAAAAAAAAAAAAAOYQAADmzwAA5v9GIOb/kCvNv5ArzWCQK80QmnkOINaBFO/pjwv/9cgh//nFGUAAAAAAAAAAAAAAAAAAAAAAGSb7cAcL7P8VFvP/Kiv/YAAAAAAAAAAAAAAAAAAAAACaeQ5wmnkO/8mzMv/l1kdwAAAAAAAAAAAAAAAAAAAAAB0s/88iPv//Ki7/vwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZ/Dr+jhRX/5dZHzwAAAAAAAAAAAAAAAAAAAAAdLP//JEP//ylG/2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRhw9gk4QP/9zQPv8AAAAAAAAAAAAAAAAAAAAAHUP//yZV//8rg/9QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkYcPYKCeEf/D0Rj/AAAAAAAAAAAAAAAAAAAAAB6r/d8lnv7/K4//nwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJOMD5+mqhH/w9EY3wAAAAAAAAAAAAAAAAAAAAAfs/2PIbD9/yqV/P8ktOkwAAAAAAAAAAAAAAAAAAAAAIbjojB8sx7/l9BE/7jXLo8AAAAAAAAAAAAAAAAAAAAAH7n9ICC8/e8ksfX/JLjj7yXA1YAlyMYwOeK5MDniuYA54rnvfd9f/5HtfO+R7XwQAAAAAAAAAAAAAAAAAAAAAAAAAAAgw/xQI8367yTN7v8lzd7/Jc3G/yvUvP8+6cn/TO/M/4fuiu+R7XxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACTf/jAk4vy/MO/6/zj3+f8++/r/RfTl/0X05K9F9OQwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD77+hA++/pAPvv6QD77+hAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AADwYwAA4EEAAMADAADDwwAAx+MAAMfjAADH4wAAx+MAAMPDAADAAwAA4AcAAPAPAAD8PwAA//8AAA==';

var register = function(callback) {
    try {
        Services.search.addEngine(
            "https://www.qwant.com/opensearch.xml",
            0,
            FAVICON_BASE_64,
            false,
            {
                onSuccess: function(engine) {
                    if (callback) {
                        callback();
                    }
                },
                onError: function(errorCode) {
                    
                }
            }
        );
    }
    catch(e) {
    }
}

exports.register = function() {
    Services.search.init(function() {
        if (!(Services.search.getEngineByName('Qwant'))) {
            register(null);
        }
    })
};

function setQwantEngineAsDefault(asDefault) {
    if (asDefault && Services.search.currentEngine.name != 'Qwant') {
        Services.search.currentEngine = Services.search.getEngineByName('Qwant');
    }
    else if (!asDefault && Services.search.currentEngine.name == 'Qwant') {
        Services.search.currentEngine = Services.search.originalDefaultEngine;
    }
}
exports.setAsDefault = function(asDefault) {
    if (!(Services.search.getEngineByName('Qwant'))) {
        register(function(){
            setQwantEngineAsDefault(asDefault);
        });
    }
    else {
        setQwantEngineAsDefault(asDefault);
    }
    
};