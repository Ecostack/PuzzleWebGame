function ImagePart(pImage, pX, pY, pWidth, pHeight) {
	this.image = pImage;
	this.width = pWidth;
	this.height = pHeight;
	this.correctPos = {
		X : pX,
		Y : pY
	};
	this.actualPos = {
		X : pX,
		Y : pY
	};
}