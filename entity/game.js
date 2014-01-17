function Game(opts){}

Game.prototype = {
	rules: null,
	players: {
		p1: null,
		p2: null
	},
	turn: {
		counter: 0,
		label: "Waiting for an opponent",
		player: null
	},
	open: function(rules) {
		var that = this;
		this.rules = rules;
	},
	addPlayer: function(player) {
		var gameFull = false;
		if(!this.players.p1) {
			this.players.p1 = player;
		}
		if(!this.players.p2) {
			this.players.p2 = player;
		}
		if(this.players.p1 && this.players.p2) {
			gameFull = true;
		}
		if(gameFull) {
			this.changeTurn();
		}
	},
	changeTurn: function() {
		this.turn.counter++;
		if(!this.turn.player){
			this.turn.player = this.players.p1;
		} else if (this.turn.player.id == this.players.p1.id) {
			this.turn.player = this.players.p2;
		} else {
			this.turn.player = this.players.p1;
		}
		this.turn.label = this.turn.player.name + "'s move";
		//notify each player (socket) of turn counter
		return this.turn;
	}
};

return new Game();