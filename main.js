process.on("SIGINT", function(){
	console.log("Shutting down gracefully");
	process.exit(0);
});

process.on("uncaughtException", function(err){
	console.error("Uncaught exception: " + err);
	Server.start();
})

var ConfigManager = require ("./services/configuration");

var settings = ConfigManager.get("settings");
var Server = require("./services/web_server");

Server.setSettings(settings).init(settings.listenPort);
Server.setConfigManager(ConfigManager);
Server.start();