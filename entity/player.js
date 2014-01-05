function Player(opts) {
	this.id = opts.id;
	this.name = opts.name;
}

Player.prototype = {
	id: 0,
	name: "Unnamed Player",
	socket: null
};