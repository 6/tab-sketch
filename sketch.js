var canvas, ctx, brushSizeEl, drawing;

fillToMaximum = function() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
};

setContextStyles = function(brushSize) {
  ctx.strokeStyle = "rgb(0, 0, 0)";
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
  drawing = false;

  fillToMaximum();
  setContextStyles(brushSizeEl.value);

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

  document.getElementById('save').addEventListener('mouseup', function() {
    canvas.toBlob(function(blob) {
      saveAs(blob, "tab-sketch.png");
    });
  });

  brushSizeEl.addEventListener('change', function(e) {
    setContextStyles(e.currentTarget.value);
  });

  document.body.className += " loaded";
};

window.addEventListener('load', onLoad);
