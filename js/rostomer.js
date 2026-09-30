/* Макеты ростомера 970 × 155 мм (1 единица = 1 мм). Используется страницей rostomer.html и экспортом. */
(function () {
  var P600 = '#7638b0', P700 = '#67378a', P900 = '#2e1b5b', L300 = '#cdbbe3', L100 = '#efe8f7', W = '#ffffff';
  var NS = 'http://www.w3.org/2000/svg';
  var R = window.ROSTOMER = { birdHref: 'img/bird.png' };

  function el(name, attrs, parent) { var e = document.createElementNS(NS, name); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function text(parent, x, y, s, size, fill, anchor, weight) { var t = el('text', { x: x, y: y, 'font-size': size, fill: fill, 'text-anchor': anchor || 'middle', 'font-weight': weight || 700, 'font-family': 'Comfortaa, sans-serif' }, parent); t.textContent = s; return t; }
  function bird(parent, x, y, w, opacity, white) { var im = el('image', { x: x, y: y, width: w, height: w * 533 / 612, opacity: opacity == null ? 1 : opacity }, parent); im.setAttribute('href', R.birdHref); im.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', R.birdHref); if (white) im.setAttribute('style', 'filter:brightness(0) invert(1)'); return im; }

  function scale(parent, o) {
    o = o || {}; var base = o.base || 115, col = o.color || P600, num = o.num || P900, to = o.to == null ? 95 : o.to;
    el('rect', { x: 0, y: base, width: 970, height: 1.2, fill: col }, parent);
    for (var cm = 0; cm <= to; cm++) {
      var x = cm * 10, h = cm % 10 === 0 ? 16 : cm % 5 === 0 ? 11 : 6, sw = cm % 10 === 0 ? 1.6 : cm % 5 === 0 ? 1.2 : 0.8;
      el('rect', { x: x - sw / 2, y: base - h, width: sw, height: h, fill: col }, parent);
      if (cm % 10 === 0 && cm > 0 && !o.circles) text(parent, x, base - 21, cm, 13, num);
      if (cm % 10 === 0 && cm > 0 && o.circles) { el('circle', { cx: x, cy: base - 28, r: 9.5, fill: P600 }, parent); text(parent, x, base - 24.4, cm, 10, W); }
    }
    text(parent, 962, base - 21, 'см', 8, num, 'end', 600);
  }
  function defsGrad(svg, id, c1, c2) { var d = el('defs', {}, svg); var g = el('linearGradient', { id: id, x1: 0, y1: 0, x2: 1, y2: 0 }, d); el('stop', { offset: '0%', 'stop-color': c1 }, g); el('stop', { offset: '100%', 'stop-color': c2 }, g); }
  function cloud(parent, x, y, s, fill) { var g = el('g', { transform: 'translate(' + x + ' ' + y + ') scale(' + s + ')', fill: fill }, parent); el('circle', { cx: 0, cy: 0, r: 7 }, g); el('circle', { cx: 8, cy: -3, r: 9 }, g); el('circle', { cx: 18, cy: 0, r: 7 }, g); el('rect', { x: -6, y: 0, width: 30, height: 7, rx: 3.5 }, g); }

  function v1(svg, zoom) {
    el('rect', { x: 0, y: 0, width: 970, height: 155, fill: L100 }, svg);
    el('rect', { x: 0, y: 0, width: 970, height: 14, fill: P600 }, svg);
    el('rect', { x: 0, y: 140, width: 970, height: 15, fill: L300 }, svg);
    if (!zoom) { bird(svg, 830, 22, 70); text(svg, 815, 52, 'Детская клиника', 8, P700, 'end', 600); text(svg, 815, 70, 'Колибри', 17, P600, 'end'); }
    text(svg, 12, 56, 'РОСТОМЕР', 9, P700, 'start', 600);
    scale(svg, {});
  }
  function v2(svg, zoom) {
    defsGrad(svg, 'g2', P600, '#b9a3dd');
    el('rect', { x: 0, y: 0, width: 970, height: 155, fill: 'url(#g2)' }, svg);
    el('path', { d: 'M 0 82 C 200 66, 400 84, 600 74 S 850 58, 970 66', fill: 'none', stroke: W, 'stroke-width': 1.4, 'stroke-dasharray': '4 5', opacity: .75 }, svg);
    var marks = [[50, 'новорождённый'], [61, '3 мес'], [67, '6 мес'], [75, '1 год'], [87, '2 года']];
    marks.forEach(function (m, i) { var x = m[0] * 10, y = [58, 50, 42, 34, 26][i]; el('line', { x1: x, y1: y, x2: x, y2: 82, stroke: W, 'stroke-width': 1, opacity: .9 }, svg); el('circle', { cx: x, cy: y, r: 3.2, fill: W }, svg); text(svg, x, y - 6, m[0] + ' см · ' + m[1], 7, W, 'middle', 700); });
    if (!zoom) { bird(svg, 915, 6, 48, 1, true); text(svg, 12, 30, 'Колибри', 13, W, 'start'); text(svg, 12, 41, 'растём вместе', 7, W, 'start', 600); }
    scale(svg, { color: W, num: W });
  }
  function v3(svg, zoom) {
    el('rect', { x: 0, y: 0, width: 970, height: 155, fill: L100 }, svg);
    [[60, 30, 1.2], [230, 22, .9], [420, 34, 1.4], [610, 20, 1], [790, 32, 1.1], [930, 24, .8]].forEach(function (c) { cloud(svg, c[0], c[1], c[2], W); });
    el('path', { d: 'M 0 60 Q 120 30 250 55 T 500 55 T 750 55 T 970 50', fill: 'none', stroke: L300, 'stroke-width': 1.2, 'stroke-dasharray': '3 4' }, svg);
    for (var cm = 10; cm <= 90; cm += 10) { var x = cm * 10; var y = cm % 20 === 0 ? 62 : 44; bird(svg, x - 11, y - 8, 22, 1); }
    if (!zoom) { text(svg, 12, 28, 'Детская клиника «Колибри»', 8, P700, 'start', 600); text(svg, 958, 28, 'Как я вырос!', 9, P600, 'end'); }
    scale(svg, { circles: true });
  }
  function v4(svg, zoom) {
    el('rect', { x: 0, y: 0, width: 970, height: 155, fill: P900 }, svg);
    el('rect', { x: 0, y: 150, width: 970, height: 5, fill: P600 }, svg);
    if (!zoom) { bird(svg, 20, 8, 75, .15, true); bird(svg, 850, 12, 62, 1, true); text(svg, 835, 46, 'Детская клиника', 7.5, L300, 'end', 600); text(svg, 835, 64, 'Колибри', 16, W, 'end'); text(svg, 110, 60, 'ростомер', 9, L300, 'start', 600); }
    scale(svg, { color: W, num: L300 });
  }

  R.variants = [
    { id: 1, name: 'классика', build: v1, zoomFrom: 0 },
    { id: 2, name: 'вехи-роста', build: v2, zoomFrom: 400 },
    { id: 3, name: 'птички-и-облака', build: v3, zoomFrom: 0 },
    { id: 4, name: 'тёмный', build: v4, zoomFrom: 0 }
  ];
  R.build = function (svg, i, zoom) { while (svg.firstChild) svg.removeChild(svg.firstChild); svg.setAttribute('viewBox', (zoom ? R.variants[i].zoomFrom : 0) + ' 0 ' + (zoom ? 300 : 970) + ' 155'); R.variants[i].build(svg, zoom); };
})();
