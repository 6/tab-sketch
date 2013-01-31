var canvas, ctx, brushSizeEl;
var drawing = false;

fillToMaximum = function() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
};

setContextStyles = function(brushSize) {
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = brushSize * 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
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
  brushSizeEl = document.getElementById('brush-size');

  fillToMaximum();
  setContextStyles(brushSizeEl.value);

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

  canvas.addEventListener('mouseup', function() {
    drawing = false;
  });

  document.getElementById('reset').addEventListener('mouseup', function() {
    fillToMaximum();
    setContextStyles(brushSizeEl.value);
  });

  brushSizeEl.addEventListener('change', function(e) {
    setContextStyles(e.currentTarget.value);
  });

  document.body.className += " loaded";
});
