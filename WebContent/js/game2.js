circleActor = gamvas.Actor.extend({
	create : function(name, x, y) {
		this._super(name, x, y);
		var st = gamvas.state.getCurrentState();
		this.setFile(st.resource.getImage("circle.png"));
		this.restitution = 0.5;
		this.bodyCircle(this.position.x, this.position.y, 16);
	}
});

triangleActor = gamvas.Actor.extend({
	create : function(name, x, y) {
		this._super(name, x, y);
		var st = gamvas.state.getCurrentState();
		this.setFile(st.resource.getImage("triangle.png"));
		this.restitution = 0.5;
		this.bodyPolygon(this.position.x, this.position.y, [ [ 16, 0 ],
				[ 32, 32 ], [ 0, 32 ] ], 16, 16);
		this.setRotation(Math.random() * 2 * Math.PI);
	}
});

wallActor = gamvas.Actor.extend({
	create : function(name, x, y, w, h) {
		this._super(name, x, y);
		var st = gamvas.state.getCurrentState();
		if (w > h) {
			this.setFile(st.resource.getImage("horizontal.png"));
		} else {
			this.setFile(st.resource.getImage("vertical.png"));
		}
		this.bodyRect(this.position.x, this.position.y, w, h,
				gamvas.physics.STATIC);
	}
});

mainState = gamvas.State.extend({
	init : function() {
		this.counter = 0;
		gamvas.physics.pixelsPerMeter = 128;
		gamvas.physics.resetWorld(0, 9.8, false);
		this.addActor(new triangleActor('tri', 13, -32));
		this.addActor(new circleActor('test', 0, 0));
		this.addActor(new circleActor('test2', 6, -32));
		this.addActor(new circleActor('test3', -17, 40));
		this.addActor(new wallActor('ground', 0, 230, 640, 20));
		this.addActor(new wallActor('top', 0, -230, 640, 20));
		this.addActor(new wallActor('left', -310, 0, 20, 480));
		this.addActor(new wallActor('right', 310, 0, 20, 480));
	},

	draw : function(t) {
		if (gamvas.key.isPressed(gamvas.key.LEFT)) {
			this.camera.rotate(-0.7 * Math.PI * t);
		}
		if (gamvas.key.isPressed(gamvas.key.RIGHT)) {
			this.camera.rotate(0.7 * Math.PI * t);
		}
		if (gamvas.key.isPressed(gamvas.key.UP)) {
			if (this.camera.zoomFactor < 1.5) {
				this.camera.zoom(0.7 * t);
			}
		}
		if (gamvas.key.isPressed(gamvas.key.DOWN)) {
			if (this.camera.zoomFactor > 0.1) {
				this.camera.zoom(-0.7 * t);
			}
		}
		var r = this.camera.rotation;
		var vec = new gamvas.Vector2D(0, 9.8);
		gamvas.physics.setGravity(vec.rotate(-r));
	},

	onMouseDown : function(b, x, y) {
		if (b == gamvas.mouse.LEFT) {
			var worldMouse = this.camera.toWorld(x, y);
			if (Math.random() < 0.5) {
				this.addActor(new triangleActor('tri' + this.counter,
						worldMouse.x, worldMouse.y));
			} else {
				this.addActor(new circleActor('circle' + this.counter,
						worldMouse.x, worldMouse.y));
			}
			this.counter++;
		}
	}
});

gamvas.event.addOnLoad(function() {
	gamvas.state.addState(new mainState('main'));
	gamvas.start('gameCanvas', true);
});