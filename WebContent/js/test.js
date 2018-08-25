function startTesting() {
	var image = new Image();
	image.onload = onImageLoad;
	image.src = 'image.jpg';
}

function onImageLoad(data) {
	// console.log(data.srcElement);
	cutImageUp(data.srcElement);
}

function cutImageUp(pImage) {
	var numColsToCut = 4;
	var numRowsToCut = 4;
	var widthOfOnePiece = pImage.width / numColsToCut;
	var heightOfOnePiece = pImage.height / numRowsToCut;

	var imagePieces = [];
	for ( var x = 0; x < numColsToCut; ++x) {
		for ( var y = 0; y < numRowsToCut; ++y) {
			var canvas = document.createElement('canvas');
			canvas.width = widthOfOnePiece;
			canvas.height = heightOfOnePiece;
			var context = canvas.getContext('2d');
			context.drawImage(pImage, x * widthOfOnePiece,
					y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0,
					0, canvas.width, canvas.height);

			var lcImagePart = new ImagePart(canvas.toDataURL(), x, y);
			console.log(lcImagePart);
			imagePieces.push(lcImagePart);
		}
	}

	// imagePieces now contains data urls of all the pieces of the image

	// load one piece onto the page
	// var anImageElement = document.getElementById('myImageElementInTheDom');
	// anImageElement.src = imagePieces[0];

	for ( var x = 0; x < imagePieces.length; x++) {
		var anImageElement = document.createElement('img');
		document.body.appendChild(anImageElement);
		anImageElement.src = imagePieces[x].image;
	}
}
