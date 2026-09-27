// ---------- live figure: Boltzmann allocation with beta and hard cap ----------
(function () {
  var svg = document.getElementById('alloc-figure');
  if (!svg) return;
  var beta = document.getElementById('beta');
  var betaOut = document.getElementById('beta-out');
  var cap = document.getElementById('cap');
  var NS = 'http://www.w3.org/2000/svg';

  // eight agents with fixed contribution scores (illustrative only)
  var scores = [1.00, 0.86, 0.72, 0.60, 0.49, 0.38, 0.27, 0.15];
  var CAP = 0.25;
  var W = 480, H = 300, padL = 44, padB = 34, padT = 14, padR = 10;
  var plotW = W - padL - padR, plotH = H - padT - padB;
  var n = scores.length, gap = 10, bw = (plotW - gap * (n - 1)) / n;

  function softmax(b) {
    var m = Math.max.apply(null, scores);
    var e = scores.map(function (s) { return Math.exp(b * (s - m)); });
    var z = e.reduce(function (a, c) { return a + c; }, 0);
    return e.map(function (v) { return v / z; });
  }
  // clip any share above CAP, redistribute the excess to the rest, repeat until stable
  function hardcap(p) {
    var q = p.slice();
    for (var it = 0; it < 20; it++) {
      var excess = 0, free = 0;
      q.forEach(function (v) { if (v > CAP) { excess += v - CAP; } else { free += v; } });
      if (excess < 1e-9) break;
      q = q.map(function (v) {
        if (v > CAP) return CAP;
        return free > 0 ? v + excess * (v / free) : v;
      });
    }
    return q;
  }

  function draw() {
    var b = parseFloat(beta.value);
    betaOut.textContent = 'β = ' + b.toFixed(1);
    var p = softmax(b);
    if (cap.checked) p = hardcap(p);
    var yMax = 0.8;
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // axes
    var axis = el('line', { x1: padL, y1: padT + plotH, x2: W - padR, y2: padT + plotH, stroke: '#D6DBD4' });
    svg.appendChild(axis);
    [0, 0.2, 0.4, 0.6, 0.8].forEach(function (t) {
      var y = padT + plotH - (t / yMax) * plotH;
      svg.appendChild(el('line', { x1: padL - 4, y1: y, x2: padL, y2: y, stroke: '#D6DBD4' }));
      var lab = el('text', { x: padL - 8, y: y + 4, 'text-anchor': 'end', 'font-size': 12, fill: '#46525B' });
      lab.textContent = (t * 100).toFixed(0) + '%';
      svg.appendChild(lab);
    });

    // cap line
    if (cap.checked) {
      var yc = padT + plotH - (CAP / yMax) * plotH;
      svg.appendChild(el('line', { x1: padL, y1: yc, x2: W - padR, y2: yc, stroke: '#B9761E', 'stroke-dasharray': '4 4' }));
      var cl = el('text', { x: W - padR, y: yc - 6, 'text-anchor': 'end', 'font-size': 12, fill: '#B9761E' });
      cl.textContent = 'cap ' + (CAP * 100).toFixed(0) + '%';
      svg.appendChild(cl);
    }

    // bars
    p.forEach(function (v, i) {
      var h = (v / yMax) * plotH;
      var x = padL + i * (bw + gap);
      var y = padT + plotH - h;
      svg.appendChild(el('rect', { x: x, y: y, width: bw, height: h, fill: '#0E6B60', rx: 2 }));
      var t = el('text', { x: x + bw / 2, y: padT + plotH + 16, 'text-anchor': 'middle', 'font-size': 12, fill: '#46525B' });
      t.textContent = 'a' + (i + 1);
      svg.appendChild(t);
      var s = el('text', { x: x + bw / 2, y: padT + plotH + 29, 'text-anchor': 'middle', 'font-size': 11, fill: '#7A848A' });
      s.textContent = scores[i].toFixed(2);
      svg.appendChild(s);
    });
  }

  function el(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  beta.addEventListener('input', draw);
  cap.addEventListener('change', draw);
  draw();
})();
