function DraggableNode(x, y) {
	this.degree = 0;
	this.connectedNodes = [];
    var that = this;
    var startX = 0,
        startY = 0;
    var drag = false;
    
    this.x = x;
    this.y = y;
    this.update = function() {
        if (mousePressed ) {
				
                var left = that.x - 10
                var right = that.x + 10; //10 could be replaced with image width
                var top = that.y - 10;
                var bottom = that.y + 10; //10 could be image height
                if (!drag) {
                    startX = mouseX - that.x;
                    startY = mouseY - that.y;
                }
                if (mouseX < right && mouseX > left && mouseY < bottom && mouseY > top) {
                    if (!dragging){
						dragging = true;
                        drag = true;
                    }
                }
        } else {
             
            drag = false;
        }
        if (drag) {
            that.x = mouseX - startX;
            that.y = mouseY - startY;
        }
        renderer.drawPoint(that.x, that.y);
    }
}

DraggableNode.prototype.addDegree = function(x){
	this.degree++;
	this.connectedNodes.push(x);
};

DraggableNode.prototype.getConnections = function(){
	//this method is pretty much obsolete
	return this.connectedNodes;
}

DraggableNode.prototype.getDegree = function(){
	return this.degree;
};
