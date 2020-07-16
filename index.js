import "./styles.css";

var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

var w = window.innerWidth;
var h = window.innerHeight;
var Xid = 0;
var Yid = 0;
var x = 100;
var y = 50;

var pieceSize = 25;
var color = "#ffffff";

var drag = false;

var xSqur = [];
var ySqur = [];
var cSqur = [];
var sSqur = [];
var l = xSqur.length;

canvas.height = h;
canvas.width = w;

screenRefresh();

function screenRefresh() {
  ctx.fillStyle = "#0f0f2f";
  ctx.fillRect(0, 0, w, h);

  for (var i = 0; i <= l; i++) {
    ctx.fillStyle = cSqur[i];
    ctx.fillRect(xSqur[i] * sSqur[i], ySqur[i] * sSqur[i], sSqur[i], sSqur[i]);
  }
  ctx.fillStyle = color;
  ctx.fillRect(x, y, pieceSize, pieceSize);
}

document.getElementById("screen").addEventListener("mousemove", function(e) {
  var mousePos = getMousePos(canvas, e);
  x = mousePos.x - pieceSize / 2;
  y = mousePos.y - pieceSize / 2;

  Xid = Math.round(x / pieceSize);
  Yid = Math.round(y / pieceSize);
  x = Xid * pieceSize;
  y = Yid * pieceSize;

  if (drag === true) {
    if (!(Xid === xSqur[xSqur.length] && Yid === ySqur[ySqur.length])) {
      l = xSqur.length;
      xSqur[l] = Xid;
      ySqur[l] = Yid;
      cSqur[l] = color;
      sSqur[l] = pieceSize;
    }
  }
  screenRefresh();
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

document.getElementById("screen").addEventListener("mousedown", function(e) {
  drag = true;
  if (
    !(
      Xid === xSqur[xSqur.length] &&
      Yid === ySqur[ySqur.length] &&
      pieceSize === sSqur[sSqur.lenth] &&
      color === cSqur[cSqur.length]
    )
  ) {
    l = xSqur.length;
    xSqur[l] = Xid;
    ySqur[l] = Yid;
    cSqur[l] = color;
    sSqur[l] = pieceSize;
  }
});
document.getElementById("screen").addEventListener("mouseup", function(e) {
  drag = false;
});

window.addEventListener("keyup", function(event) {
  if (event.keyCode === 67) {
    color = prompt("color");
    color = "#" + color;
  }
  if (event.keyCode === 86) {
    pieceSize = prompt("size");
  }
});
