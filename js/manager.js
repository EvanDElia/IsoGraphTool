var mouseX = 0,
    mouseY = 0;
var mousePressed = false;
var dragging = false;
var nodes = [];
var edges = [];

var c=document.getElementById('canvas');
var renderer = new Renderer(c, 500, 500);
var manager = new Manager(5);


function Manager(n){

	var c = $('canvas');
	c.mousemove(function(e){

	mouseX = e.offsetX;
    mouseY = e.offsetY;
	
    var pageCrds = '('+ e.pageX +', '+ e.pageY +')',
        clientCrds = '('+ e.clientX +', '+ e.clientY +')';
    
    $('.info:first').text('(e.offsetX, e.offsetY) - '+ '(' + mouseX + ', ' + mouseY + ')');
	
    
	});

	$(document).mousedown(function() {
		mousePressed = true;
	}).mouseup(function() {
		mousePressed = false;
		dragging = false;
	});

	
	this.n = n;
	
	var previous;
	
	for (var i = 0; i < n; i++){
		var x =250+100 * Math.cos(3*Math.PI/2 + (2 * Math.PI * i / n));
		var y =250+100 * Math.sin(3*Math.PI/2 + (2 * Math.PI * i / n));
		
		renderer.drawPoint(x, y);
		
		nodes[i] = new DraggableNode(x, y);
		
		previous = new DraggableNode(x,y);
		
		if (nodes.length > 1){
			nodes[i].addDegree(nodes[i - 1]);
			nodes[i - 1].addDegree(x, y);
			edges[i - 1] = new Edge(nodes[i - 1], nodes[i]);
		}
		
		//createNewElement(x, y);
	}
	nodes[0].addDegree(nodes[nodes.length - 1]);
	nodes[nodes.length - 1].addDegree(nodes[0]);
	edges[edges.length] = new Edge(nodes[nodes.length - 1], nodes[0]);
	
	//renderer.drawLine(previous.x, previous.y, 250, 150);
	
	setInterval(function() {
		renderer.cls(0, 0, 500, 500);
			
		for (var i = 0; i < nodes.length; i++){
			nodes[i].update();
			renderer.drawPoint(nodes[i].x, nodes[i].y);
			var num = i.toString();
			renderer.drawText(num, nodes[i].x + 5, nodes[i].y - 5);
		}
		
		for (var i = 0; i < edges.length; i++){
			renderer.drawLine(edges[i].nodeA.x, edges[i].nodeA.y, edges[i].nodeB.x, edges[i].nodeB.y);
		}
				
		/*for (var i = 0; i < nodes.length; i++){//second way I rendered edges
		
			var temp = nodes[i].getConnections();
			
			for (var x = 0; x < temp.length; x++){
				renderer.drawLine(nodes[i].x, nodes[i].y, temp[x].x, temp[x].y);
			}
			
		}*/
		/*
			if (i > 0){ // 1st way I rendered edges
				renderer.drawLine(nodes[i].x, nodes[i].y, nodes[i - 1].x, nodes[i - 1].y);
			}
			else {
				renderer.drawLine(nodes[i].x, nodes[i].y, nodes[nodes.length - 1].x, nodes[nodes.length - 1].y);
			}
			
		*/
		var degreeString = "";
		for (var i = 0; i < nodes.length; i++){
			var temp = nodes[i].getDegree() + ', ';
			degreeString += temp;
		}
		degreeString = degreeString.substr(0, (degreeString.length - 2));
		$('.info:last').text('Degrees of Nodes<' + degreeString + '>');
	}, 30);
	
}

/*function createNewElement(x,y){
	x = x + 547;
	y = y + 30;

	var div = document.getElementById('page');
	var p = document.createElement('p')
	p.style.backgroundColor = "#000000";
	p.style.position = "absolute";
	p.style.top = y.toString().concat("px");
	p.style.left = x.toString().concat("px");
	p.style.height = "10px";
	p.style.width = "10px";
	p.innerHTML = "'";
	div.appendChild(p);
};
*/
//$("p").draggable();

function changeNodes(){
	var n = document.getElementById('n').value;
	
	if (n == ""){
		alert("Looks like you forgot some input.");
		return;
	}
	if (isNaN(n)){
		alert("The values you enter must be numbers");
		return;
	}
	
	nodes = [];
	edges = [];
	
	var previous;
	
	for (var i = 0; i < n; i++){
		var x =250+100 * Math.cos(3*Math.PI/2 + (2 * Math.PI * i / n));
		var y =250+100 * Math.sin(3*Math.PI/2 + (2 * Math.PI * i / n));
		
		renderer.drawPoint(x, y);
		
		
		nodes[i] = new DraggableNode(x, y);
		
		previous = new DraggableNode(x,y);
		
		if (nodes.length > 1){
			nodes[nodes.length - 1].addDegree(nodes[i - 1]);
			nodes[i - 1].addDegree(x, y);
			edges[i - 1] = new Edge(nodes[i - 1], nodes[i]);	
		}
		
		//createNewElement(x, y);
	}
	nodes[0].addDegree(nodes[nodes.length - 1]);
	nodes[nodes.length - 1].addDegree(nodes[0]);
	edges[edges.length] = new Edge(nodes[nodes.length - 1], nodes[0]);

	//renderer.drawLine(previous.x, previous.y, 250, 150);
}

function newNode(){
	var x = document.getElementById('newX').value;
	var y = document.getElementById('newY').value;
	
	document.getElementById('newX').value = "";
	document.getElementById('newY').value = "";
	
	if (x == "" || y == ""){
		alert("Looks like you forgot some input.");
		return;
	}
	if (isNaN(x) || isNaN(y)){
		alert("The values you enter must be numbers");
		return;
	}
	if (x < 0 || y < 0){
		alert("You cannot use a negative number as a coordinate.");
		return;
	}
	if (x > 500 || y > 500){
		alert("You cannot use a value greater than 500.");
		return;
	}
	
	nodes[nodes.length] = new DraggableNode(x, y);
}

function newConnection(){
	var i = document.getElementById('newConnect1').value;
	var connect = document.getElementById('newConnect2').value;
	
	document.getElementById('newConnect1').value = "";
	document.getElementById('newConnect2').value = "";
	
	if (i == "" || connect == ""){
		alert("Looks like you forgot some input.");
		return;
	}
	if (isNaN(i) || isNaN(connect)){
		alert("The values you enter must be numbers");
		return;
	}
	if(i >= nodes.length || connect >= nodes.length){
		alert("One of the nodes you entered is not valid.");
		return;
	}
	if(nodes[i] == nodes[connect]){
		alert("You cannot connect a node to itself");
		return;
	}
	var temp = new Edge(nodes[i], nodes[connect]);
	for (var t = 0; t < edges.length; t++){
		if (temp.equals(edges[t])){
			alert("Those nodes are already connected.");
			return;
		}
	}
	
	nodes[i].addDegree(nodes[connect]);
	nodes[connect].addDegree(nodes[i]);
	edges.push(new Edge(nodes[i], nodes[connect]));
}
