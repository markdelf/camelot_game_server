var manager = module.exports;

manager.configs = [];

manager.get = function (name) {
	if (!manager.configs[name]) {
		manager.configs[name] = require("../config/" + name + ".js");
	}
	return manager.configs[name];  
};
