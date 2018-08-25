function gameStart() {
	Crafty.init(640, 480);

	Crafty.scene("main", function() {
		//generateWorld();
		console.log("bla");

		Crafty.background("#000");
		Crafty.e("2D, DOM, Text").attr({
			w : 100,
			h : 20,
			x : 150,
			y : 120
		}).text("Loading").css({
			"text-align" : "center",
			"color" : "#FFFFFF"
		});

	});

	// the loading screen that will display while our assets load
	Crafty.scene("loading", function() {
		// load takes an array of assets and a callback when complete
		Crafty.load(function() {
			Crafty.scene("main"); // when everything is loaded, run the main
			// scene
		});

		// black background with some loading text
		Crafty.background("#000");
		Crafty.e("2D, DOM, Text").attr({
			w : 100,
			h : 20,
			x : 150,
			y : 120
		}).text("Loading").css({
			"text-align" : "center"
		});
	});

	// automatically play the loading scene
	Crafty.scene("main");

}
