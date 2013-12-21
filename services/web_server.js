var _http = require('http');
var _path = require('path');
var _io = require('socket.io');
var web_server = module.exports;

web_server.http = null;

web_server.socketServer = null;
web_server.autoStart = false;
web_server.configManager = null;
web_server.port = 80;
web_server.settings = null;

/** Initialization functions **/
web_server.init = function(port){
	if (port) {
		this.port = port;
	}
	this.http = _http.createServer();
	this.createSocketServer();	
	if (this.autoStart) {
		this.start();
	}
	return this;
}

web_server.start = function(){
	this.http.listen(this.port);
	web_server.log(this.settings.serverName + ' running at http://127.0.0.1:' + this.port);
	web_server.log('Debug mode: ' + this.settings.debug);
	return this;
}
/** End init functions **/

/** Begin Socket Hooks **/
web_server.createSocketServer = function(){
	this.socketServer = _io.listen(this.http, { log: false });
	this.socketServer.on("connection", this.socket_onConnection);
}

web_server.socket_onConnection = function(socket, afterAuth) {
	web_server.log("Socket connection established.");		
	socket.on("start", web_server.socket_onStartEvent);
	socket.on("disconnect", function(s){ 
		web_server.socket_onDisconnect(socket);
	});
}

web_server.socket_onDisconnect = function(socket) {
	web_server.log("Client Disconnected");
}

web_server.socket_onStartEvent = function(data)
{
	web_server.log("Received start event.");
}

/** End socket hooks **/

/**Getters and setters from here onwards**/

web_server.error = function(message){
	console.log("Web Server Error: " + message);
}

web_server.log = function(message){
	if(web_server.settings.debug) {
		console.log("Web Server Log: " + message);
	}
}

web_server.getConfigManager = function() {
	if (this.configManager) {
		return this.configManager;
	} else {
		this.error("Config manager not injected");
		return false;
	}
}

web_server.setConfigManager = function(configManager) {
	this.configManager = configManager;
	return this;
}

web_server.setAutoStart = function(autoStart) {
	this.autoStart = autoStart;
	return this;
}

web_server.setSettings = function(settings) {
	this.settings = settings;
	return this;
}