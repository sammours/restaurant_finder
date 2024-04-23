/*
 * Copyright (c) 2015 Dave Alden  (http://github.com/dpa99c)
 * Copyright (c) 2015 Oscar A. Padró (https://github.com/opadro)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 */

var ln = {},
    common = launchnavigator,
    debugEnabled = false;

// Empty object for cross-platform compatibility
ln.LAUNCH_MODE = {};

/**
 * Enables debug log output from the plugin to the JS and native consoles. By default debug is disabled.
 * @param {boolean} enabled - Whether to enable debug.
 * @param {function} success - callback to invoke on successfully setting debug.
 * @param {function} error - callback to invoke on error while setting debug. Will be passed a single string argument containing the error message.
 */
ln.enableDebug = function(enabled, success, error){
    debugEnabled = enabled;
};

/**
 * Determines if the given app is installed and available on the current device.
 * @param {string} appName - name of the app to check availability for. Define as a constant using ln.APP
 * @param {function} success - callback to invoke on successful determination of availability. Will be passed a single boolean argument indicating the availability of the app.
 * @param {function} error - callback to invoke on error while determining availability. Will be passed a single string argument containing the error message.
 */
ln.isAppAvailable = function(appName, success, error){
    common.util.validateApp(appName);
    success(appName === common.APP.BING_MAPS); // Bing Maps is always available on Windows
};

/**
 * Returns a list indicating which apps are installed and available on the current device.
 * @param {function} success - callback to invoke on successful determination of availability. Will be passed a key/value object where the key is the app name and the value is a boolean indicating whether the app is available.
 * @param {function} error - callback to invoke on error while determining availability. Will be passed a single string argument containing the error message.
 */
ln.availableApps = function(success, error){
    var apps = {};
    apps[common.APP.BING_MAPS] = true;
    success(apps);
};

/**
 * Opens navigator app to navigate to given destination, specified by either place name or lat/lon.
 * If a start location is not also specified, current location will be used for the start.
 *
 * @param {string/number[]} destination (required) - destination location to use for navigation.
 * Either:
 * - a {string} containing the address. e.g. "Buckingham Palace, London"
 * - an {array}, where the first element is the latitude and the second element is a longitude, as decimal numbers. e.g. [50.1, -4.0]
 *
 * @param {object} options (optional) - optional parameters:
 *
 * - {function} successCallback - A callback to invoke when the navigation app is successfully launched.
 *
 * - {function} errorCallback - A callback to invoke if an error is encountered while launching the app.
 * A single string argument containing the error message will be passed in.
 *
 * - {string} app - name of the navigation app to use for directions.
 * For Windows, the only allowed value is launchnavigator.APP.BING_MAPS, as launching other apps is not possible.
 *
 * - {string} destinationName - nickname to display in app for destination. e.g. "Bob's House".
 *
 * - {mixed} start - start location to use for navigation. If not specified, the current location of the device will be used.
 * Either:
 *      - a {string} containing the address. e.g. "Buckingham Palace, London"
 *      - an {array}, where the first element is the latitude and the second element is a longitude, as decimal numbers. e.g. [50.1, -4.0]
 *
 * - {string} startName - nickname to display in app for start. e.g. "My Place".
 *
 * - {string} transportMode - transportation mode for navigation.
 * Defaults to "driving" if not specified.
 *
 * - {boolean} enableGeolocation - if false, the plugin will NOT attempt to use the geolocation plugin to determine the current device position when the start location parameter is omitted. Defaults to true.
 *
 */
ln.navigate = function(destination, options) {
    options = common.util.conformNavigateOptions(arguments);

    var url ="bingmaps:?rtp=";

    if(!destination){
        var errMsg = "No destination was specified";
        if(options.errorCallback){
            options.errorCallback(errMsg);
        }
        throw new Error(errMsg);
    }

    if(!options.app) options.app = common.APP.BING_MAPS;
    options.enableGeolocation = typeof options.enableGeolocation !== "undefined" ? options.enableGeolocation : true;
    common.util.validateApp(options.app);

    var msg = "Using " + common.APP_NAMES[common.APP.BING_MAPS] + " to navigate";

    var doNavigate = function(url){
        url += "~";
        destination = common.util.extractCoordsFromLocationString(destination);
        msg += " to ";
        if(typeof(destination) === "object"){
            if(typeof destination.length === "undefined") throw "destination must be a string or an array";
            url += "pos." + destination[0] + "_" + destination[1];
            msg += destination[0] + ',' + destination[1];
            if(options.destinationName){
                url += "_" + options.destinationName;
                msg += " (" + options.destinationName + ")";
            }
        }else{
            url += "adr." + destination;
            msg += destination;
        }

        if(options.transportMode){
            common.util.validateTransportMode(options.transportMode);
            url += "&mode=" + options.transportMode.charAt(0);
            msg += " by " + options.transportMode;
        }

        if(debugEnabled){
            console.log("LaunchNavigator: "+msg);
        }

        try{
            var uri = new Windows.Foundation.Uri(url);
            Windows.System.Launcher.launchUriAsync(uri)
                .done(options.successCallback, options.errorCallback);
        }catch(e){
            if(options.errorCallback) options.errorCallback(e);
        }
    };

    msg += " from ";
    if(options.start){
        options.start = common.util.extractCoordsFromLocationString(options.start);
        if(typeof(options.start) === "object"){
            if(typeof options.start.length === "undefined") throw "start must be a string or an array";
            url += "pos." + options.start[0] + "_" + options.start[1];
            msg += options.start[0] + ',' + options.start[1];
            if(options.startName){
                url += "_" + options.startName;
                msg += " (" + options.startName + ")";
            }
            doNavigate(url);
        }else{
            url += "adr." + options.start;
            msg += options.start;
            doNavigate(url);
        }
    }else if(options.enableGeolocation && navigator.geolocation){ // if cordova-plugin-geolocation is available/enabled
        msg += "current location";
        navigator.geolocation.getCurrentPosition(function(position){ // attempt to use current location as start position
            url += "pos." + position.coords.latitude + "_" + position.coords.longitude + "_" + "Current location";
            doNavigate(url);
        },function(error){
            doNavigate(url);
        },{
            maxAge: 60000,
            timeout: 500
        });
    }else{
        msg += "current location";
        doNavigate(url);
    }
};

/******************
 * Console wrapper
 ******************/
ln.console = {};

ln.console.log = function(msg){
    if(window.console && window.console.log){
        console.log(msg);
    }
};

ln.console.warn = function(msg){
    if(window.console && window.console.warn){
        console.warn(msg);
    }
};

module.exports = ln;
