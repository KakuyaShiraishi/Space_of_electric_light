
var canvas;
var context;
var screenWidth;
var screenHeight;
var step = 0;
var points = [];
var focalLength = 500;
var bgGradient;

window.onload = function(){
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    
    window.onresize = function(){
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
        canvas.width = screenWidth;
        canvas.height = screenHeight;
        bgGradient=context.createRadialGradient(screenWidth /2, screenHeight / 2, screenWidth, screenWidth / 2, screenHeight / 2, 0);
        bgGradient.addColorStop(1, '#40fc5d'/*'#9450df'*/);
        bgGradient.addColorStop(0.4, '#FFF');
    };
    
    generatePoints();
    window.onresize();
    loop();
};

function generatePoints(){
    var i = 1000;
    for(i; i > -1; --i){
        var point3D = {x:(1 - Math.random() * 2) * 600, y:(1 - Math.random() * 2) * 600, z:(1 - Math.random() * 2) * 600, vx:0, vy:0, vz:0};
        points.push(point3D);
    }
}
window.requestAnimFrame = (function(){
                           return  window.requestAnimationFrame ||
                           window.webkitRequestAnimationFrame ||
                           window.mozRequestAnimationFrame ||
                           window.oRequestAnimationFrame ||
                           window.msRequestAnimationFrame ||
                           function( callback ){
                           window.setTimeout(callback, 1000 / 60);
                           };
                           })();

function loop(){
    context.globalAlpha = 0.4;
    context.fillStyle = bgGradient;
    context.fillRect(0, 0, screenWidth, screenHeight);
    context.globalAlpha = 1;
    
    updatePoints();
    renderPoints();
    renderLightening();
    
    step += 0.02;
    requestAnimFrame(loop);
    
    context.font = "30px Arial";
    context.fill();
    
}

function renderPoints(){
    var i = points.length - 1;
    
    for(i; i > -1; --i){
        var point = points[i];
        var scale = focalLength / (point.z + focalLength);
        
        var px = (point.x * scale + (screenWidth / 2));
        var py = point.y * scale + (screenHeight / 2);
        
        drawPoint({x: px, y: py}, scale);
    }
}

function renderLightening(){
    context.globalAlpha = 0.07;
    context.lineWidth = 0.3;
    context.strokeStyle = '#FFF';
    context.strokeStyle = '#91ebbb';
    context.beginPath();
    
    var i = points.length - 1;
    
    for(i; i > -1; --i){
        var point = points[i];
        var scale = focalLength / (point.z + focalLength);
        
        if(i === points.length - 1)
            context.moveTo(point.x * scale + (screenWidth / 2), point.y * scale + (screenHeight / 2));
        else
            context.lineTo(point.x * scale + (screenWidth / 2 ), point.y * scale + (screenHeight / 2));
    }
    
    if(Math.random() > 0.4) {
        context.stroke();
    }
    
    
    context.closePath();
    context.globalAlpha = 1;
}

function updatePoints(){
    var i = points.length - 1;
    
    for(i; i > -1; --i){
        var point = points[i];
        point.x += Math.cos(step * 0.4) * 2;
        point.y += Math.sin(step * 0.8) * 2;
        point.z -= 2;
        
        checkBounds(point);
    }
}

function checkBounds(point){
    if(point.x < -2000)
        point.x = Math.random() * 2000;
    else if
        (point.x > 2000) point.x = Math.random() * -2000;
    
    if(point.y < -2000) 
        point.y = Math.random() * 2000;
    else if
        (point.y > 2000) point.y = Math.random() * -2000;
    
    if(point.z < -500) 
        point.z = Math.random() * 2400 + 200;
}

function drawPoint(point, scale){
    
    if(Math.random()>0.9){
        context.fillStyle = '#FFF';
    }else{
        context.fillStyle = '#000000';
    }
    
    
}