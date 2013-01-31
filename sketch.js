var canvas, ctx;
var drawing = false;

reRender = function() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = 9;
};

x = function(e) {
  return e.layerX - canvas.offsetLeft;
};

y = function(e) {
  return e.layerY - canvas.offsetTop;
};

window.addEventListener('load', function() {
  canvas = document.getElementById('sketch');
  ctx = canvas.getContext('2d');

  reRender();

  canvas.addEventListener('mousedown', function(e) {
    drawing = false;
    ctx.beginPath();
    ctx.moveTo(x(e), y(e));
    drawing = true;
  });

  canvas.addEventListener('mousemove', function(e) {
    if(drawing){
      ctx.lineTo(x(e), y(e));
      ctx.stroke();
    }
  });

  canvas.addEventListener('mouseup', function () {
    drawing = false;
  });
});
