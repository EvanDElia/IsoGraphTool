function Edge(a,b){
	if(a == b){
		throw("BOTH EDGE NODES CANNOT BE EQUAL");
	}
	this.nodeA = a;
	this.nodeB = b;
}

Edge.prototype.equals = function(edge){
	return 	(this.nodeA == edge.nodeA && this.nodeB == edge.nodeB) ||
			(this.nodeA == edge.nodeB && this.nodeB == edge.nodeA);
};

Edge.prototype.containsNode = function(node){
	return this.nodeA == node || this.nodeB == node;
};

Edge.prototype.isAdjacentEdge = function(edge){
	if(this == edge){
		return false;
	}
	return this.containsNode(edge.nodeA) || this.containsNode(edge.nodeB);
};
