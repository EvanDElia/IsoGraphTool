function Renderer(canvas,width,height){
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");

	this.canvas.width = width;
	this.canvas.height = height;

	console.log(this.canvas);
}

Renderer.prototype.cls = function(x,y,w,h){
	this.context.clearRect(x,y,w,h);
};

Renderer.prototype.drawPoint = function(x,y){
	this.context.fillRect(x - 5,y - 5,10,10);
};

Renderer.prototype.drawLine = function(x1,y1,x2,y2){
	//this.context.strokeLine(x1,y1,x2,y2);
	
	this.context.beginPath();
	this.context.moveTo(x1,y1);
	this.context.lineTo(x2,y2);
	this.context.stroke();
};

Renderer.prototype.drawText = function(string, x, y){
	this.context.font = "bold 16px Arial";
	this.context.fillText(string, x, y);
};

Renderer.prototype.createImg = function(){
	var image = this.canvas.toDataURL("image/png")//.replace("image/png", "image/octet-stream");
	window.location.href = image;
};
