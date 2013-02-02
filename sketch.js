var canvas, ctx, brushSizeEl, brushColorEl, drawing;

fillToMaximum = function() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
};

setContextStyles = function(brushSize, brushColor) {
  ctx.strokeStyle = brushColor;
  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
};

x = function(e) {
  return e.layerX - canvas.offsetLeft;
};

y = function(e) {
  return e.layerY - canvas.offsetTop;
};

onLoad = function() {
  if(document.body.clientWidth === 0 && document.body.clientHeight === 0)
    // Not actually loaded yet, wait a few more ms
    return window.setTimeout(onLoad, 25);

  canvas = document.getElementById('sketch');
  ctx = canvas.getContext('2d');
  brushSizeEl = document.getElementById('brush-size');
  brushColorEl = document.getElementById('brush-color');
  drawing = false;

  fillToMaximum();
  setContextStyles(brushSizeEl.value, brushColorEl.value);

  canvas.addEventListener('mousedown', function(e) {
    drawing = false;
    ctx.beginPath();
    ctx.moveTo(x(e), y(e));
    drawing = true;
  });

  canvas.addEventListener('mousemove', function(e) {
    if(drawing) {
      ctx.lineTo(x(e), y(e));
      ctx.stroke();
    }
  });

  canvas.addEventListener('mouseup', function() {
    drawing = false;
  });

  brushSizeEl.addEventListener('change', function(e) {
    setContextStyles(brushSizeEl.value, brushColorEl.value);
  });

  brushColorEl.addEventListener('change', function(e) {
    setContextStyles(brushSizeEl.value, brushColorEl.value);
  });

  Mousetrap.bind(['command+s', 'ctrl+s'], function(e) {
    e.preventDefault();
    canvas.toBlob(function(blob) {
      saveAs(blob, "tab-sketch.png");
    });
  });

  document.body.className += " loaded";
};

window.addEventListener('load', onLoad);
