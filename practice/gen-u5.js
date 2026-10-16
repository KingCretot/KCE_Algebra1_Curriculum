/* Unit 5 — Systems of Equations & Inequalities */
(function (K) {
  var ri = K.ri, rnz = K.rnz, pick = K.pick, n = K.n, P = K.poly, X = K.x, Y = K.y, Q = K.Q, mc = K.mc, M = K.MINUS, m = K.m, fr = K.frx, R = K.R;
  var SL = [R(1), R(2), R(3), R(-1), R(-2), R(-3), R(1, 2), R(-1, 2), R(1, 3), R(-1, 3), R(2, 3), R(-2, 3), R(3, 2), R(-3, 2)];
  function eq(mm, bb) { return m(K.lineEq(mm, bb)); }
  function std(a, b, c) { return m(P([[a, X], [b, Y]]) + ' = ' + n(c)); }
  function sys(e1, e2) { return '<div class="callout" style="display:inline-block">' + e1 + '<br>' + e2 + '</div>'; }
  function ptOpts(x, y) { return [K.pt(y, x), K.pt(-x, y === 0 ? 1 : y), K.pt(x, -y === y ? y + 2 : -y)]; }
  function ptExtra(x, y) { return function () { return K.pt(x + rnz(-2, 2), y + rnz(-2, 2)); }; }
  function sub(a) { return a < 0 ? '(' + n(a) + ')' : n(a); }
  function cp(c) { return c === 1 ? ' + ' : c === -1 ? ' ' + M + ' ' : (c < 0 ? ' ' + M + ' ' + (-c) : ' + ' + c); } // signed coefficient before '('
  function lead(c) { return c === 1 ? '' : c === -1 ? M : n(c); }
  // a random integer system with solution (x, y), standard form
  function stdSys(x, y, needElim) {
    var a1, b1, a2, b2;
    do { a1 = rnz(-5, 5); b1 = rnz(-5, 5); a2 = rnz(-5, 5); b2 = rnz(-5, 5); } while (a1 * b2 - a2 * b1 === 0 || (needElim && (Math.abs(a1) === Math.abs(a2) || Math.abs(b1) === Math.abs(b2))));
    return [a1, b1, a1 * x + b1 * y, a2, b2, a2 * x + b2 * y];
  }

  /* ---------- 5.1 Solving by Graphing ---------- */
  function lineThrough(x, y) { // slope from list, line through (x,y) with intercept in range
    for (var t = 0; t < 50; t++) { var mm = pick(SL), b = mm.mul(-x).add(y); if (b.isInt() && Math.abs(b.val()) <= 6) return [mm, b]; }
    return [R(1), R(y - x)];
  }
  var u51 = [
    [
      function () {
        var x = ri(-4, 4), y = ri(-4, 4), L1 = lineThrough(x, y), L2;
        do { L2 = lineThrough(x, y); } while (L2[0].eq(L1[0]));
        var g = K.plane({ x: [-6, 6], y: [-6, 6], lines: [{ m: L1[0], b: L1[1], color: K.COL.blue }, { m: L2[0], b: L2[1], color: K.COL.red }] });
        return Q({ q: 'The graph shows a system of two linear equations. What is the solution of the system?', graph: g, mc: mc(K.pt(x, y), ptOpts(x, y), ptExtra(x, y)), why: ['The solution of a system is the point where the lines <b>intersect</b>.', 'The lines cross at ' + K.pt(x, y) + '.', 'That point is on both lines, so it makes both equations true.'] });
      },
      function () {
        var x = ri(-5, 5), y = ri(-5, 5), s = stdSys(x, y);
        var cands = [[x, y]], g = 0;
        while (cands.length < 4 && g++ < 200) { var c = [x + rnz(-3, 3), y + rnz(-3, 3)]; if (!cands.some(function (q) { return q[0] === c[0] && q[1] === c[1]; })) { // keep ones satisfying at most the first eq
          if (!(s[0] * c[0] + s[1] * c[1] === s[2] && s[3] * c[0] + s[4] * c[1] === s[5])) cands.push(c); } }
        return Q({ q: 'Which ordered pair is the solution of the system?' + '<div class="center">' + sys(std(s[0], s[1], s[2]), std(s[3], s[4], s[5])) + '</div>', mc: mc(K.pt(x, y), cands.slice(1).map(function (c) { return K.pt(c[0], c[1]); })), why: ['Test each point in <b>both</b> equations.', K.pt(x, y) + ': ' + m(K.lin([[s[0], n(x)], [s[1], n(y)]]) + ' = ' + n(s[2])) + ' ✔ and ' + m(K.lin([[s[3], n(x)], [s[4], n(y)]]) + ' = ' + n(s[5])) + ' ✔.', 'The other points fail at least one equation.'] });
      }
    ],
    [
      function () {
        var x = ri(-4, 4), y = ri(-4, 4), L1 = lineThrough(x, y), L2;
        do { L2 = lineThrough(x, y); } while (L2[0].eq(L1[0]));
        return Q({ q: 'Solve the system by graphing (or by setting the expressions equal):<div class="center">' + sys(eq(L1[0], L1[1]), eq(L2[0], L2[1])) + '</div>', graph: K.plane({ x: [-6, 6], y: [-6, 6], lines: [{ m: L1[0], b: L1[1] }, { m: L2[0], b: L2[1], color: K.COL.red }] }), mc: mc(K.pt(x, y), ptOpts(x, y), ptExtra(x, y)), why: ['Graph both lines; the intersection is the solution.', 'Algebra check: set ' + m(P([[L1[0], X], [L1[1], '']]) + ' = ' + P([[L2[0], X], [L2[1], '']])) + ', which gives ' + m('<i>x</i> = ' + n(x)) + '.', 'Then ' + m('<i>y</i> = ' + n(y)) + '. Solution: ' + K.pt(x, y) + '.'] });
      },
      function () {
        var x = ri(-5, 5), y = ri(-5, 5), s = stdSys(x, y), px = x + rnz(-2, 2), py = y + rnz(-2, 2);
        var e1 = s[0] * px + s[1] * py === s[2], e2 = s[3] * px + s[4] * py === s[5];
        var right = e1 && e2 ? 'Yes, it satisfies both equations' : e1 ? 'No, it satisfies only the first equation' : e2 ? 'No, it satisfies only the second equation' : 'No, it satisfies neither equation';
        var all = ['Yes, it satisfies both equations', 'No, it satisfies only the first equation', 'No, it satisfies only the second equation', 'No, it satisfies neither equation'];
        return Q({ q: 'Is ' + K.pt(px, py) + ' a solution of the system?<div class="center">' + sys(std(s[0], s[1], s[2]), std(s[3], s[4], s[5])) + '</div>', mc: mc(right, all.filter(function (z) { return z !== right; })), why: ['First equation: ' + m(K.lin([[s[0], n(px)], [s[1], n(py)]]) + ' = ' + n(s[0] * px + s[1] * py)) + (e1 ? ' ✔' : ', not ' + n(s[2])) + '.', 'Second equation: ' + m(K.lin([[s[3], n(px)], [s[4], n(py)]]) + ' = ' + n(s[3] * px + s[4] * py)) + (e2 ? ' ✔' : ', not ' + n(s[5])) + '.', 'A solution must make <b>both</b> equations true.'] });
      }
    ],
    [
      function () {
        var r1 = ri(2, 6), b1 = ri(10, 30), r2 = r1 + ri(1, 4), w = ri(2, 8), b2 = b1 + r1 * w - r2 * w;
        if (b2 < 0) return u51[2][1]();
        var tot = b1 + r1 * w;
        var g = K.plane({ x: [0, 12], y: [0, 70], stepY: 10, labY: 10, step: 1, lab: 2, firstQuadrant: true, xlab: 'Weeks', ylab: 'Height (cm)', lines: [{ m: r1, b: b1, color: K.COL.blue, from: 0, label: 'A' }, { m: r2, b: b2, color: K.COL.red, from: 0, label: 'B' }], pts: [{ x: w, y: tot }] , noXY: true });
        if (tot > 70) return u51[2][1]();
        return Q({ q: 'Plant A starts at ' + b1 + ' cm and grows ' + r1 + ' cm per week (blue). Plant B starts at ' + b2 + ' cm and grows ' + r2 + ' cm per week (red). When will they be the same height, and what height?', graph: g, mc: mc('Week ' + w + ', ' + tot + ' cm', ['Week ' + tot + ', ' + w + ' cm', 'Week ' + (w + 1) + ', ' + (tot + r1) + ' cm', 'Week 0, ' + b1 + ' cm']), why: ['The lines intersect at ' + K.pt(w, tot) + '.', 'Check: A = ' + m(b1 + ' + ' + r1 + '(' + w + ') = ' + tot) + '; B = ' + m(b2 + ' + ' + r2 + '(' + w + ') = ' + tot) + '.', 'So after ' + w + ' weeks both plants are ' + tot + ' cm.'] });
      },
      function () {
        var x = ri(-4, 4), y = ri(-4, 4), L1 = lineThrough(x, y), L2;
        do { L2 = lineThrough(x, y); } while (L2[0].eq(L1[0]));
        var k = rnz(-5, 5);
        return Q({ q: 'If ' + '(<i>a</i>, <i>b</i>)' + ' is the solution of the system below, what is ' + m('<i>a</i> + <i>b</i>') + '?<div class="center">' + sys(eq(L1[0], L1[1]), eq(L2[0], L2[1])) + '</div>', mc: K.mcNum(x + y, [x - y, x * y, y - x]), why: ['Set the right sides equal: ' + m(P([[L1[0], X], [L1[1], '']]) + ' = ' + P([[L2[0], X], [L2[1], '']])) + '.', 'Solve: ' + m('<i>x</i> = ' + n(x)) + '. Substitute back: ' + m('<i>y</i> = ' + n(y)) + '.', m('<i>a</i> + <i>b</i> = ' + n(x) + ' + ' + sub(y) + ' = ' + n(x + y)) + '.'] });
      }
    ]
  ];
  K.lesson('5.1', { title: 'Solving Systems by Graphing', std: 'MA.912.AR.9.1', levels: u51 });

  /* ---------- 5.2 Substitution ---------- */
  var u52 = [
    [
      function () {
        var x = ri(-6, 6), y, mm = rnz(-4, 4), b = ri(-6, 6); y = mm * x + b;
        var a = rnz(-4, 5), c = rnz(-4, 4); if (a + c * mm === 0) a = a + 1; if (a === 0) a = 2;
        var d = a * x + c * y;
        return Q({ q: 'Solve by substitution:<div class="center">' + sys(m('<i>y</i> = ' + P([[mm, X], [b, '']])), std(a, c, d)) + '</div>', mc: mc(K.pt(x, y), ptOpts(x, y), ptExtra(x, y)), why: ['Replace ' + Y + ' in the second equation with ' + m(P([[mm, X], [b, '']])) + ': ' + m(P([[a, X]]) + cp(c) + '(' + P([[mm, X], [b, '']]) + ') = ' + n(d)) + '.', 'Simplify: ' + m(P([[a + c * mm, X], [c * b, '']]) + ' = ' + n(d)) + ', so ' + m('<i>x</i> = ' + n(x)) + '.', 'Then ' + m('<i>y</i> = ' + K.lin([[mm, n(x)]]) + K.plusK(b) + ' = ' + n(y)) + '. Solution ' + K.pt(x, y) + '.'] });
      },
      function () {
        var x = ri(-6, 6), y = ri(-6, 6), k = rnz(-5, 5), s = y + k * 0;
        // x = y + k form
        var kk = x - y, a = rnz(-4, 4), c = rnz(-4, 4); if (a + c === 0) c += 1; if (c === 0) c = 3;
        var d = a * x + c * y;
        return Q({ q: 'Solve by substitution:<div class="center">' + sys(m('<i>x</i> = ' + P([[1, Y], [kk, '']])), std(a, c, d)) + '</div>', mc: mc(K.pt(x, y), ptOpts(x, y), ptExtra(x, y)), why: ['Replace ' + X + ' with ' + m(P([[1, Y], [kk, '']])) + ': ' + m(lead(a) + '(' + P([[1, Y], [kk, '']]) + ')' + K.coef(c, false) + '<i>y</i> = ' + n(d)) + '.', 'Simplify: ' + m(P([[a + c, Y], [a * kk, '']]) + ' = ' + n(d)) + ', so ' + m('<i>y</i> = ' + n(y)) + '.', 'Then ' + m('<i>x</i> = ' + n(y) + K.plusK(kk) + ' = ' + n(x)) + '. Solution ' + K.pt(x, y) + '.'] });
      }
    ],
    [
      function () {
        var x = ri(-5, 5), y = ri(-5, 5), b1 = rnz(-4, 4), a2 = rnz(-4, 4), b2 = rnz(-4, 4);
        // first eq: x + b1 y = c1 (x coefficient 1 so isolate x)
        if (a2 * b1 - b2 === 0) b2 += 1; if (b2 === 0) b2 = 2;
        var c1 = x + b1 * y, c2 = a2 * x + b2 * y;
        return Q({ q: 'Solve the system:<div class="center">' + sys(std(1, b1, c1), std(a2, b2, c2)) + '</div>', mc: mc(K.pt(x, y), ptOpts(x, y), ptExtra(x, y)), why: ['Isolate ' + X + ' in the first equation: ' + m('<i>x</i> = ' + P([[-b1, Y], [c1, '']])) + '.', 'Substitute into the second: ' + m(lead(a2) + '(' + P([[-b1, Y], [c1, '']]) + ')' + K.coef(b2, false) + '<i>y</i> = ' + n(c2)) + ', which simplifies to ' + m(P([[b2 - a2 * b1, Y], [a2 * c1, '']]) + ' = ' + n(c2)) + '.', 'So ' + m('<i>y</i> = ' + n(y)) + ' and ' + m('<i>x</i> = ' + n(x)) + '.'] });
      },
      function () {
        var x = ri(-6, 6), y = ri(-6, 6), mm = rnz(-3, 3), b = y - mm * x, a = rnz(-5, 5), c = rnz(-5, 5);
        if (a + c * mm === 0) a += 1; if (a === 0) a = 2;
        var d = a * x + c * y;
        var ask = K.coin() ? 'x' : 'y';
        return Q({ q: 'In the solution ' + '(' + X + ', ' + Y + ')' + ' of the system below, what is the value of ' + (ask === 'x' ? X : Y) + '?<div class="center">' + sys(m('<i>y</i> = ' + P([[mm, X], [b, '']])), std(a, c, d)) + '</div>', mc: K.mcNum(ask === 'x' ? x : y, [ask === 'x' ? y : x, ask === 'x' ? -x : -y, ask === 'x' ? x + 1 : y - 1]), why: ['Substitute: ' + m(P([[a, X]]) + cp(c) + '(' + P([[mm, X], [b, '']]) + ') = ' + n(d)) + '.', m(P([[a + c * mm, X], [c * b, '']]) + ' = ' + n(d)) + ', so ' + m('<i>x</i> = ' + n(x)) + ' and ' + m('<i>y</i> = ' + n(y)) + '.', 'The question asks for ' + (ask === 'x' ? X : Y) + ': ' + n(ask === 'x' ? x : y) + '.'] });
      }
    ],
    [
      function () {
        var A = ri(8, 15), S = ri(4, A - 2), a = ri(10, 40), s = ri(10, 40), tot = a + s, money = A * a + S * s;
        return Q({ q: 'A theater sold ' + tot + ' tickets for a total of $' + money + '. Adult tickets cost $' + A + ' and student tickets cost $' + S + '. How many adult tickets were sold?', mc: K.mcNum(a, [s, tot - Math.round(money / A), Math.round(money / (A + S))]), why: ['Let <i>a</i> = adult and <i>s</i> = student tickets: ' + m('<i>a</i> + <i>s</i> = ' + tot) + ' and ' + m(A + '<i>a</i> + ' + S + '<i>s</i> = ' + money) + '.', 'Substitute ' + m('<i>s</i> = ' + tot + ' ' + M + ' <i>a</i>') + ': ' + m(A + '<i>a</i> + ' + S + '(' + tot + ' ' + M + ' <i>a</i>) = ' + money) + '.', m((A - S) + '<i>a</i> + ' + (S * tot) + ' = ' + money) + ', so ' + m((A - S) + '<i>a</i> = ' + (money - S * tot)) + ' and ' + m('<i>a</i> = ' + a) + '.'] });
      },
      function () {
        var n1 = ri(5, 15), d1 = ri(5, 15), q = ri(5, 15), tot = n1 + d1, val = 5 * n1 + 10 * d1;
        return Q({ q: 'A jar has ' + tot + ' nickels and dimes worth $' + (val / 100).toFixed(2) + ' in all. How many dimes are in the jar?', mc: K.mcNum(d1, [n1, Math.round(val / 10), tot - Math.round(val / 10) > 0 ? tot - Math.round(val / 10) : d1 + 2]), why: ['Let <i>n</i> = nickels, <i>d</i> = dimes: ' + m('<i>n</i> + <i>d</i> = ' + tot) + ' and ' + m('5<i>n</i> + 10<i>d</i> = ' + val) + ' (in cents).', 'Substitute ' + m('<i>n</i> = ' + tot + ' ' + M + ' <i>d</i>') + ': ' + m('5(' + tot + ' ' + M + ' <i>d</i>) + 10<i>d</i> = ' + val) + '.', m((5 * tot) + ' + 5<i>d</i> = ' + val) + ', so ' + m('<i>d</i> = ' + d1) + '.'] });
      }
    ]
  ];
  K.lesson('5.2', { title: 'Solving Systems by Substitution', std: 'MA.912.AR.9.1', levels: u52 });

  /* ---------- 5.3 Elimination ---------- */
  var u53 = [
    [
      function () {
        var x = ri(-6, 6), y = ri(-6, 6), a1 = rnz(-5, 5), b = ri(1, 5), a2 = rnz(-5, 5); if (a1 + a2 === 0) a2 = a2 + 1; if (a2 === 0) a2 = 2;
        var c1 = a1 * x + b * y, c2 = a2 * x - b * y;
        return Q({ q: 'Solve by elimination:<div class="center">' + sys(std(a1, b, c1), std(a2, -b, c2)) + '</div>', mc: mc(K.pt(x, y), ptOpts(x, y), ptExtra(x, y)), why: ['The ' + Y + '-terms are opposites (' + m(P([[b, Y]])) + ' and ' + m(P([[-b, Y]])) + '), so <b>add</b> the equations: ' + m(P([[a1 + a2, X]]) + ' = ' + n(c1 + c2)) + '.', 'So ' + m('<i>x</i> = ' + n(x)) + '.', 'Substitute into the first equation: ' + m(K.lin([[a1, n(x)]]) + K.coef(b, false) + '<i>y</i> = ' + n(c1)) + ', so ' + m('<i>y</i> = ' + n(y)) + '.'] });
      },
      function () {
        var x = ri(-6, 6), y = ri(-6, 6), a = ri(1, 5), b1 = rnz(-5, 5), b2 = rnz(-5, 5); if (b1 === b2) b2 = b1 + 1; if (b2 === 0) b2 = 3;
        var c1 = a * x + b1 * y, c2 = a * x + b2 * y;
        return Q({ q: 'Solve by elimination:<div class="center">' + sys(std(a, b1, c1), std(a, b2, c2)) + '</div>', mc: mc(K.pt(x, y), ptOpts(x, y), ptExtra(x, y)), why: ['The ' + X + '-terms match, so <b>subtract</b> the second equation from the first: ' + m(P([[b1 - b2, Y]]) + ' = ' + n(c1 - c2)) + '.', 'So ' + m('<i>y</i> = ' + n(y)) + '.', 'Substitute: ' + m(P([[a, X]]) + K.lin([[b1, n(y)]], true) + ' = ' + n(c1)) + ', so ' + m('<i>x</i> = ' + n(x)) + '.'] });
      }
    ],
    [
      function () {
        var x = ri(-5, 5), y = ri(-5, 5), a1 = rnz(-4, 4), b1 = rnz(-4, 4), k = pick([2, 3, -2, -3]), a2 = -a1 * k + rnz(-3, 3), b2 = -b1 * k;
        if (a2 === 0 || a1 * b2 - a2 * b1 === 0) return u53[1][1]();
        var c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
        return Q({ q: 'Solve the system:<div class="center">' + sys(std(a1, b1, c1), std(a2, b2, c2)) + '</div>', mc: mc(K.pt(x, y), ptOpts(x, y), ptExtra(x, y)), why: ['Multiply the first equation by ' + n(k) + ' so the ' + Y + '-terms are opposites: ' + m(P([[a1 * k, X], [b1 * k, Y]]) + ' = ' + n(c1 * k)) + '.', 'Add it to the second equation: ' + m(P([[a1 * k + a2, X]]) + ' = ' + n(c1 * k + c2)) + (a1 * k + a2 === 1 ? '.' : ', so ' + m('<i>x</i> = ' + n(x)) + '.'), 'Substitute back to get ' + m('<i>y</i> = ' + n(y)) + '.'] });
      },
      function () {
        var x = ri(-5, 5), y = ri(-5, 5), s;
        do { s = stdSys(x, y, true); } while (Math.abs(s[0]) === 1 && Math.abs(s[3]) === 1);
        var L = K.lcm(Math.abs(s[0]), Math.abs(s[3])), k1 = L / s[0], k2 = -L / s[3];
        return Q({ q: 'Solve the system:<div class="center">' + sys(std(s[0], s[1], s[2]), std(s[3], s[4], s[5])) + '</div>', mc: mc(K.pt(x, y), ptOpts(x, y), ptExtra(x, y)), why: ['Make the ' + X + '-coefficients opposites: multiply the first equation by ' + n(k1) + ' and the second by ' + n(k2) + '.', 'Add: ' + m(P([[s[1] * k1 + s[4] * k2, Y]]) + ' = ' + n(s[2] * k1 + s[5] * k2)) + ', so ' + m('<i>y</i> = ' + n(y)) + '.', 'Substitute to get ' + m('<i>x</i> = ' + n(x)) + '. Solution ' + K.pt(x, y) + '.'] });
      }
    ],
    [
      function () {
        var x = ri(-6, 6), y = ri(-6, 6), s = stdSys(x, y);
        var k1 = ri(1, 3), k2 = ri(1, 3);
        return Q({ q: 'If ' + '(' + X + ', ' + Y + ')' + ' is the solution of the system below, what is ' + m(P([[k1, X], [k2, Y]])) + '?<div class="center">' + sys(std(s[0], s[1], s[2]), std(s[3], s[4], s[5])) + '</div>', mc: K.mcNum(k1 * x + k2 * y, [k1 * y + k2 * x, x + y, k1 * x - k2 * y]), why: ['Solve the system first (elimination works well): ' + m('<i>x</i> = ' + n(x)) + ', ' + m('<i>y</i> = ' + n(y)) + '.', 'Check in both equations: ' + m(n(s[0] * x + s[1] * y) + ' = ' + n(s[2])) + ' and ' + m(n(s[3] * x + s[4] * y) + ' = ' + n(s[5])) + ' ✔.', 'Then ' + m(P([[k1, X], [k2, Y]]).replace(/<i>x<\/i>/, '(' + n(x) + ')').replace(/<i>y<\/i>/, '(' + n(y) + ')') + ' = ' + n(k1 * x + k2 * y)) + '.'] });
      },
      function () {
        var a = ri(2, 5), b = ri(1, 4), p1 = ri(2, 6), p2 = ri(2, 6), price1 = a * p1 + b * p2;
        var c = ri(1, 4), d = ri(2, 5); if (a * d - b * c === 0) d += 1;
        var price2 = c * p1 + d * p2;
        return Q({ q: a + ' smoothies and ' + b + ' muffin' + (b > 1 ? 's' : '') + ' cost $' + price1 + '. ' + c + ' smoothie' + (c > 1 ? 's' : '') + ' and ' + d + ' muffins cost $' + price2 + '. How much does one smoothie cost?', mc: K.mcNum(p1, [p2, Math.round(price1 / (a + b)), p1 + 1]), why: ['Write the system: ' + m(P([[a, '<i>s</i>'], [b, '<i>m</i>']]) + ' = ' + price1) + ' and ' + m(P([[c, '<i>s</i>'], [d, '<i>m</i>']]) + ' = ' + price2) + '.', 'Eliminate <i>m</i>: multiply the first by ' + d + ' and the second by ' + b + ', then subtract: ' + m(P([[a * d - b * c, '<i>s</i>']]) + ' = ' + n(price1 * d - price2 * b)) + '.', m('<i>s</i> = ' + p1) + '. One smoothie costs $' + p1 + ' (and a muffin costs $' + p2 + ').'] });
      }
    ]
  ];
  K.lesson('5.3', { title: 'Solving Systems by Elimination', std: 'MA.912.AR.9.1', levels: u53 });

  /* ---------- 5.4 Special Cases ---------- */
  var u54 = [
    [
      function () {
        var mm = pick(SL), b1 = ri(-6, 6), kind = pick(['none', 'inf', 'one']);
        var m2 = kind === 'one' ? mm.add(pick([1, -1, 2])) : mm, b2 = kind === 'none' ? b1 + rnz(-4, 4) : kind === 'inf' ? b1 : ri(-6, 6);
        var e2 = kind === 'inf' ? (function () { var k = pick([2, 3, -2]); var d = mm.d; return m(P([[mm.mul(k * d).neg(), X], [k * d, Y]]) + ' = ' + R(b1 * k * d).html()); })() : eq(m2, b2);
        var name = { none: 'No solution', inf: 'Infinitely many solutions', one: 'Exactly one solution' }[kind];
        return Q({ q: 'How many solutions does the system have?<div class="center">' + sys(eq(mm, b1), e2) + '</div>', mc: mc(name, ['No solution', 'Infinitely many solutions', 'Exactly one solution', 'Exactly two solutions'].filter(function (z) { return z !== name; })), why: [kind === 'inf' ? 'Solve the second equation for ' + Y + ': it becomes ' + eq(mm, b1) + ', the same line.' : 'Compare slopes and ' + Y + '-intercepts.', kind === 'none' ? 'Same slope (' + mm.html() + '), different ' + Y + '-intercepts: parallel lines never meet. No solution.' : kind === 'inf' ? 'Same slope and same intercept: the lines are identical, so there are infinitely many solutions.' : 'Different slopes (' + mm.html() + ' and ' + m2.html() + '): the lines cross exactly once.'] });
      },
      function () {
        var kind = pick(['none', 'inf']), c = rnz(-9, 9), d = kind === 'none' ? c + rnz(-5, 5) : c;
        var right = kind === 'none' ? 'No solution; the lines are parallel' : 'Infinitely many solutions; the lines are the same';
        return Q({ q: 'While solving a system, all the variables cancel and you get ' + m(n(c) + ' = ' + n(d)) + '. What does this mean?', mc: mc(right, [kind === 'none' ? 'Infinitely many solutions; the lines are the same' : 'No solution; the lines are parallel', 'The solution is ' + K.pt(c, d), 'You made a mistake; every system has one solution']), why: [kind === 'none' ? m(n(c) + ' = ' + n(d)) + ' is <b>false</b>, so no values work: no solution (parallel lines).' : m(n(c) + ' = ' + n(d)) + ' is always <b>true</b>, so every point on the line works: infinitely many solutions (same line).'] });
      }
    ],
    [
      function () {
        var a = rnz(-4, 4), b = rnz(-4, 4), c = ri(-8, 8), k = pick([2, 3, -2, -3]), kind = pick(['none', 'inf', 'one']);
        var a2 = a * k, b2 = b * k, c2 = kind === 'inf' ? c * k : c * k + rnz(-4, 4);
        if (kind === 'one') { b2 = b2 + pick([1, -1]); if (b2 === 0) b2 = 2; c2 = ri(-8, 8); }
        var name = { none: 'No solution', inf: 'Infinitely many solutions', one: 'Exactly one solution' }[kind];
        return Q({ q: 'How many solutions does the system have?<div class="center">' + sys(std(a, b, c), std(a2, b2, c2)) + '</div>', mc: mc(name, ['No solution', 'Infinitely many solutions', 'Exactly one solution', 'Exactly two solutions'].filter(function (z) { return z !== name; })), why: kind === 'one' ? ['The second equation is <b>not</b> a multiple of the first on the left side, so the slopes differ.', 'Different slopes mean exactly one solution.'] : ['Multiply the first equation by ' + n(k) + ': ' + m(P([[a * k, X], [b * k, Y]]) + ' = ' + n(c * k)) + '.', 'The left sides now match the second equation. ' + (kind === 'inf' ? 'The right sides match too (' + n(c * k) + '), so it is the same line: infinitely many solutions.' : 'But the right sides differ (' + n(c * k) + ' vs. ' + n(c2) + '), so subtracting gives a false statement: no solution.')] });
      },
      function () {
        var mm = pick(SL), b = ri(-5, 5), kind = K.coin() ? 'none' : 'inf';
        var b2 = kind === 'none' ? b + rnz(-4, 4) : b, mv = K.R(mm).val(); if (kind === 'none' && (Math.max(mv * -6 + b2, mv * 6 + b2) < -5 || Math.min(mv * -6 + b2, mv * 6 + b2) > 5)) b2 = b + (b2 > b ? -2 : 2);
        var g = K.plane({ x: [-6, 6], y: [-6, 6], lines: [{ m: mm, b: b }, { m: mm, b: b2, color: kind === 'inf' ? K.COL.red : K.COL.red, dash: kind === 'inf' }] });
        var right = kind === 'none' ? 'No solution, because the lines are parallel' : 'Infinitely many solutions, because the lines are the same';
        return Q({ q: 'The graph shows both equations of a system' + (kind === 'inf' ? ' (one line is drawn dashed on top of the other)' : '') + '. How many solutions are there?', graph: g, mc: mc(right, [kind === 'none' ? 'Infinitely many solutions, because the lines are the same' : 'No solution, because the lines are parallel', 'Exactly one solution, at the ' + Y + '-intercept', 'Exactly two solutions']), why: [kind === 'none' ? 'The lines have the same slope but never touch: no solution.' : 'Both equations graph as the same line, so every point on it is a solution.'] });
      }
    ],
    [
      function () {
        var a = rnz(-4, 4), b = rnz(-4, 4), c = ri(-8, 8), k = pick([2, 3, 4, -2, -3]);
        var want = K.coin() ? 'none' : 'inf';
        // second: (k a) x + (k b) y = t; ask for t value giving infinite, or ask for coefficient p making no solution
        if (want === 'inf') {
          return Q({ q: 'For what value of <i>t</i> does the system have <b>infinitely many</b> solutions?<div class="center">' + sys(std(a, b, c), m(P([[a * k, X], [b * k, Y]]) + ' = <i>t</i>')) + '</div>', mc: K.mcNum(c * k, [c, c + k, -c * k === c * k ? c * k + 2 : -c * k]), why: ['The left side of the second equation is ' + n(k) + ' times the left side of the first.', 'For the same line, the right side must also be ' + n(k) + ' times ' + n(c) + ': ' + m('<i>t</i> = ' + n(c * k)) + '.'] });
        }
        var p = a * k;
        return Q({ q: 'For what value of <i>p</i> does the system have <b>no solution</b>?<div class="center">' + sys(std(a, b, c), m('<i>px</i>' + K.coef(b * k, false) + '<i>y</i> = ' + n(c * k + pick([-3, -2, -1, 1, 2, 3]))))+ '</div>', mc: K.mcNum(p, [a, -p === p ? p + 1 : -p, b * k]), why: ['No solution means parallel lines: same slope, different intercepts.', 'The ' + Y + '-coefficient ' + n(b * k) + ' is ' + n(k) + ' times ' + n(b) + ', so the ' + X + '-coefficient must be ' + n(k) + ' times ' + n(a) + ': ' + m('<i>p</i> = ' + n(p)) + '.', 'The right side is not ' + n(k) + ' times ' + n(c) + ', so the lines are parallel, not the same.'] });
      },
      function () {
        var r = ri(3, 8), f1 = ri(10, 30), f2 = f1 + ri(5, 20);
        return Q({ q: 'Two phone plans charge $' + r + ' per gigabyte. Plan A has a $' + f1 + ' monthly fee and Plan B has a $' + f2 + ' monthly fee. If you solve the system to find when the plans cost the same, what happens?', mc: mc('There is no solution; Plan B always costs $' + (f2 - f1) + ' more', ['The plans cost the same after ' + (f2 - f1) + ' gigabytes', 'There are infinitely many solutions; the plans are identical', 'The plans cost the same at 0 gigabytes']), why: ['Plan A: ' + m('<i>C</i> = ' + r + '<i>g</i> + ' + f1) + '. Plan B: ' + m('<i>C</i> = ' + r + '<i>g</i> + ' + f2) + '.', 'Same rate (slope), different starting fees: parallel lines.', 'Setting them equal gives ' + m(f1 + ' = ' + f2) + ', which is false. No solution: B is always $' + (f2 - f1) + ' more.'] });
      }
    ]
  ];
  K.lesson('5.4', { title: 'Special Cases — No Solution & Infinite Solutions', std: 'MA.912.AR.9.1', levels: u54 });

  /* ---------- 5.5 Systems of Inequalities ---------- */
  var IS = K.ineqSym;
  function sat(mm, bb, sym, x, y) { var r = R(mm).mul(x).add(bb).val(); return sym === '<' ? y < r : sym === '>' ? y > r : sym === '<=' ? y <= r : y >= r; }
  function yI(mm, bb, sym) { return m('<i>y</i> ' + IS[sym] + ' ' + P([[mm, X], [bb, '']])); }
  function half(mm, bb, sym) { var above = sym === '>' || sym === '>='; var mv = R(mm).val(), bv = R(bb).val(); return above ? { a: mv, b: -1, c: -bv } : { a: -mv, b: 1, c: bv }; }
  function twoIneq() {
    var m1 = pick(SL), m2; do { m2 = pick(SL); } while (m2.eq(m1));
    return { m1: m1, b1: ri(-3, 3), s1: pick(['<', '>', '<=', '>=']), m2: m2, b2: ri(-3, 3), s2: pick(['<', '>', '<=', '>=']) };
  }
  function sysGraph(T) {
    return K.plane({ x: [-6, 6], y: [-6, 6], shade: [{ parts: [half(T.m1, T.b1, T.s1), half(T.m2, T.b2, T.s2)], color: K.COL.purple, op: 0.3 }], lines: [{ m: T.m1, b: T.b1, dash: T.s1.length === 1, color: K.COL.blue }, { m: T.m2, b: T.b2, dash: T.s2.length === 1, color: K.COL.red }] });
  }
  function pickPts(T, needGood) {
    var good = null, bad = [], g = 0;
    while ((!good || bad.length < 3) && g++ < 800) {
      var x = ri(-5, 5), y = ri(-5, 5);
      var r1 = R(T.m1).mul(x).add(T.b1).val(), r2 = R(T.m2).mul(x).add(T.b2).val();
      if (Math.abs(y - r1) < 0.6 || Math.abs(y - r2) < 0.6) continue;
      var ok = sat(T.m1, T.b1, T.s1, x, y) && sat(T.m2, T.b2, T.s2, x, y);
      if (ok) { if (!good) good = [x, y]; } else if (!bad.some(function (q) { return q[0] === x && q[1] === y; })) bad.push([x, y]);
    }
    return { good: good, bad: bad };
  }
  var u55 = [
    [
      function () {
        var T = twoIneq(), pp = pickPts(T);
        if (!pp.good) return u55[0][0]();
        return Q({ q: 'Which point is a solution of the system?<div class="center">' + sys(yI(T.m1, T.b1, T.s1), yI(T.m2, T.b2, T.s2)) + '</div>', mc: mc(K.pt(pp.good[0], pp.good[1]), pp.bad.slice(0, 3).map(function (p) { return K.pt(p[0], p[1]); })), why: ['A solution must make <b>both</b> inequalities true.', 'Check ' + K.pt(pp.good[0], pp.good[1]) + ': first, ' + m(n(pp.good[1]) + ' ' + IS[T.s1] + ' ' + R(T.m1).mul(pp.good[0]).add(T.b1).html()) + ' ✔; second, ' + m(n(pp.good[1]) + ' ' + IS[T.s2] + ' ' + R(T.m2).mul(pp.good[0]).add(T.b2).html()) + ' ✔.', 'Each other point fails at least one inequality.'] });
      },
      function () {
        var T = twoIneq(), pp = pickPts(T);
        if (!pp.good) return u55[0][1]();
        return Q({ q: 'The purple region is the solution set of a system of inequalities. Which point is a solution?', graph: sysGraph(T), mc: mc(K.pt(pp.good[0], pp.good[1]), pp.bad.slice(0, 3).map(function (p) { return K.pt(p[0], p[1]); })), why: ['The solution set is where the two shaded regions <b>overlap</b> (purple).', K.pt(pp.good[0], pp.good[1]) + ' is inside the purple region.', 'The other points are outside it (they fail at least one inequality).'] });
      }
    ],
    [
      function () {
        var T = twoIneq();
        var right = sys(yI(T.m1, T.b1, T.s1), yI(T.m2, T.b2, T.s2));
        var w1 = sys(yI(T.m1, T.b1, K.flipSym[T.s1]), yI(T.m2, T.b2, T.s2)), w2 = sys(yI(T.m1, T.b1, T.s1), yI(T.m2, T.b2, K.flipSym[T.s2])), w3 = sys(yI(T.m1, T.b1, K.flipSym[T.s1]), yI(T.m2, T.b2, K.flipSym[T.s2]));
        return Q({ q: 'Which system is shown by the graph? (Blue and red are the boundary lines; purple is the solution region.)', graph: sysGraph(T), mc: mc(right, [w1, w2, w3]), why: ['Blue line: ' + m('<i>y</i> = ' + P([[T.m1, X], [T.b1, '']])) + ', ' + (T.s1.length === 1 ? 'dashed' : 'solid') + '. Red line: ' + m('<i>y</i> = ' + P([[T.m2, X], [T.b2, '']])) + ', ' + (T.s2.length === 1 ? 'dashed' : 'solid') + '.', 'The purple region is ' + ((T.s1 === '>' || T.s1 === '>=') ? 'above' : 'below') + ' the blue line and ' + ((T.s2 === '>' || T.s2 === '>=') ? 'above' : 'below') + ' the red line.', 'So the system is ' + yI(T.m1, T.b1, T.s1) + ' and ' + yI(T.m2, T.b2, T.s2) + '.'] });
      },
      function () {
        var T = twoIneq();
        var x = ri(-4, 4), y1 = R(T.m1).mul(x).add(T.b1);
        if (!y1.isInt() || Math.abs(y1.val()) > 6) return u55[1][1]();
        var onFirst = [x, y1.val()], inSecond = sat(T.m2, T.b2, T.s2, x, y1.val());
        var inc1 = T.s1.length === 2;
        var ok = inc1 && inSecond;
        var right = ok ? 'Yes; it is on a solid boundary and satisfies the other inequality' : !inc1 ? 'No; it is on a dashed boundary, so it is not included' : 'No; it does not satisfy the second inequality';
        return Q({ q: 'The point ' + K.pt(onFirst[0], onFirst[1]) + ' lies on the boundary line ' + m('<i>y</i> = ' + P([[T.m1, X], [T.b1, '']])) + '. Is it a solution of the system?<div class="center">' + sys(yI(T.m1, T.b1, T.s1), yI(T.m2, T.b2, T.s2)) + '</div>', mc: mc(right, ['Yes; it is on a solid boundary and satisfies the other inequality', 'No; it is on a dashed boundary, so it is not included', 'No; it does not satisfy the second inequality', 'Yes; every point on a boundary is a solution'].filter(function (z) { return z !== right; })), why: ['First inequality uses ' + IS[T.s1] + ', so its boundary is ' + (inc1 ? 'solid (points on it count).' : 'dashed (points on it do not count).'), 'Second inequality: ' + m(n(onFirst[1]) + ' ' + IS[T.s2] + ' ' + R(T.m2).mul(x).add(T.b2).html()) + ' is ' + (inSecond ? 'true.' : 'false.'), ok ? 'Both conditions hold, so it is a solution.' : 'So it is not a solution.'] });
      }
    ],
    [
      function () {
        var ph = ri(8, 12), pl = ri(4, 7), hrs = ri(15, 25), need = 10 * ri(12, 20);
        // x + y <= hrs ; ph x + pl y >= need
        var good = null, bad = [], g = 0;
        while ((!good || bad.length < 3) && g++ < 600) {
          var a = ri(0, hrs), b = ri(0, hrs);
          var ok = a + b <= hrs && ph * a + pl * b >= need;
          if (ok && !good && a + b > hrs * 0.6) good = [a, b];
          else if (!ok && Math.abs(a + b - hrs) < 6 && !bad.some(function (q) { return q[0] === a && q[1] === b; })) bad.push([a, b]);
        }
        if (!good) return u55[2][1]();
        return Q({ q: 'Mia can work at most ' + hrs + ' hours a week. She earns $' + ph + '/hour tutoring (<i>t</i>) and $' + pl + '/hour at a store (<i>s</i>), and needs at least $' + need + '. So ' + m('<i>t</i> + <i>s</i> ≤ ' + hrs) + ' and ' + m(ph + '<i>t</i> + ' + pl + '<i>s</i> ≥ ' + need) + '. Which schedule works?', mc: mc(good[0] + ' hours tutoring and ' + good[1] + ' at the store', bad.slice(0, 3).map(function (p) { return p[0] + ' hours tutoring and ' + p[1] + ' at the store'; })), why: ['Check both conditions.', good[0] + ' + ' + good[1] + ' = ' + (good[0] + good[1]) + ' hours (at most ' + hrs + ' ✔). Earnings: ' + m(ph + '(' + good[0] + ') + ' + pl + '(' + good[1] + ') = ' + (ph * good[0] + pl * good[1])) + ' dollars (at least ' + need + ' ✔).', 'Each other schedule breaks one of the rules: too many hours or not enough money.'] });
      },
      function () {
        var T = twoIneq();
        // which inequality could be added? Instead: test region membership with first-quadrant context removed. Ask number of boundary lines that are dashed
        var dash = (T.s1.length === 1 ? 1 : 0) + (T.s2.length === 1 ? 1 : 0);
        var right = dash === 0 ? 'Both lines solid' : dash === 2 ? 'Both lines dashed' : (T.s1.length === 1 ? 'The first line dashed, the second solid' : 'The first line solid, the second dashed');
        var all = ['Both lines solid', 'Both lines dashed', 'The first line dashed, the second solid', 'The first line solid, the second dashed'];
        return Q({ q: 'When you graph this system, which boundary lines are solid and which are dashed?<div class="center">' + sys(yI(T.m1, T.b1, T.s1), yI(T.m2, T.b2, T.s2)) + '</div>', mc: mc(right, all.filter(function (z) { return z !== right; })), why: ['Use a solid line for ' + '≤ or ≥ (the boundary is included) and a dashed line for &lt; or &gt;.', 'First: ' + IS[T.s1] + ' → ' + (T.s1.length === 1 ? 'dashed' : 'solid') + '. Second: ' + IS[T.s2] + ' → ' + (T.s2.length === 1 ? 'dashed' : 'solid') + '.'] });
      }
    ]
  ];
  K.lesson('5.5', { title: 'Graphing Systems of Inequalities', std: 'MA.912.AR.9.4', levels: u55 });

  /* ---------- 5.6 Systems in Context ---------- */
  var u56 = [
    [
      function () {
        var A = ri(6, 12), S = ri(3, A - 1), tot = ri(30, 80), money = 10 * ri(30, 60);
        var right = sys(m('<i>a</i> + <i>s</i> = ' + tot), m(A + '<i>a</i> + ' + S + '<i>s</i> = ' + money));
        return Q({ q: 'A school sold ' + tot + ' tickets and collected $' + money + '. Adult tickets cost $' + A + ' and student tickets cost $' + S + '. Which system models this? (<i>a</i> = adult tickets, <i>s</i> = student tickets)', mc: mc(right, [sys(m('<i>a</i> + <i>s</i> = ' + money), m(A + '<i>a</i> + ' + S + '<i>s</i> = ' + tot)), sys(m('<i>a</i> + <i>s</i> = ' + tot), m(S + '<i>a</i> + ' + A + '<i>s</i> = ' + money)), sys(m(A + '<i>a</i> + <i>s</i> = ' + tot), m('<i>a</i> + ' + S + '<i>s</i> = ' + money))]), why: ['One equation counts tickets: ' + m('<i>a</i> + <i>s</i> = ' + tot) + '.', 'The other counts money: price × number for each type, ' + m(A + '<i>a</i> + ' + S + '<i>s</i> = ' + money) + '.'] });
      },
      function () {
        var w = ri(2, 6), c = ri(3, 9);
        var right = 'No, because you cannot buy a negative number of items';
        return Q({ q: 'Solving a system about buying notebooks (<i>n</i>) and pens (<i>p</i>) gives ' + m('<i>n</i> = ' + w) + ' and ' + m('<i>p</i> = ' + M + c) + '. Is this a viable solution?', mc: mc(right, ['Yes, because it satisfies both equations', 'Yes, because ' + w + ' is positive', 'No, because ' + w + ' is not a multiple of ' + c]), why: ['A solution must make sense in the real situation.', 'You cannot buy ' + M + c + ' pens, so the solution is <b>not viable</b>, even if it satisfies the equations.'] });
      }
    ],
    [
      function () {
        var bus = ri(30, 50), van = ri(8, 14), nb = ri(2, 6), nv = ri(2, 8), veh = nb + nv, people = bus * nb + van * nv;
        return Q({ q: 'A school uses ' + veh + ' vehicles to carry ' + people + ' students. Each bus holds ' + bus + ' students and each van holds ' + van + '. All seats are filled. How many buses were used?', mc: K.mcNum(nb, [nv, Math.round(people / bus), veh - nb === nb ? nb + 1 : veh - nb]), why: ['System: ' + m('<i>b</i> + <i>v</i> = ' + veh) + ' and ' + m(bus + '<i>b</i> + ' + van + '<i>v</i> = ' + people) + '.', 'Substitute ' + m('<i>v</i> = ' + veh + ' ' + M + ' <i>b</i>') + ': ' + m(bus + '<i>b</i> + ' + van + '(' + veh + ' ' + M + ' <i>b</i>) = ' + people) + '.', m((bus - van) + '<i>b</i> = ' + (people - van * veh)) + ', so ' + m('<i>b</i> = ' + nb) + ' buses.'] });
      },
      function () {
        var pc = ri(3, 6), pp = ri(5, 9), budget = 10 * ri(5, 9), minItems = ri(8, 12);
        // c + p >= minItems, pc c + pp p <= budget ; viable combos
        var good = null, bad = [], g = 0;
        while ((!good || bad.length < 3) && g++ < 600) {
          var c = ri(0, 15), p = ri(0, 12);
          var ok = c + p >= minItems && pc * c + pp * p <= budget;
          if (ok && !good) good = [c, p]; else if (!ok && c + p >= minItems - 3 && !bad.some(function (q) { return q[0] === c && q[1] === p; })) bad.push([c, p]);
        }
        if (!good) return u56[1][0]();
        return Q({ q: 'For a party, Lee needs <b>at least</b> ' + minItems + ' snack packs. Chips cost $' + pc + ' each and popcorn costs $' + pp + ' each. Lee can spend <b>at most</b> $' + budget + '. Which purchase meets both conditions?', mc: mc(good[0] + ' chips and ' + good[1] + ' popcorn', bad.slice(0, 3).map(function (q) { return q[0] + ' chips and ' + q[1] + ' popcorn'; })), why: ['Conditions: ' + m('<i>c</i> + <i>p</i> ≥ ' + minItems) + ' and ' + m(pc + '<i>c</i> + ' + pp + '<i>p</i> ≤ ' + budget) + '.', good[0] + ' + ' + good[1] + ' = ' + (good[0] + good[1]) + ' packs ✔; cost ' + m(pc + '(' + good[0] + ') + ' + pp + '(' + good[1] + ') = ' + (pc * good[0] + pp * good[1])) + ' dollars ✔.', 'Each other choice has too few packs or costs too much.'] });
      }
    ],
    [
      function () {
        var t = pick([2, 3, 4, 5, 6]), head = pick([1, 2]), r1 = t * ri(Math.ceil(40 / t), Math.floor(60 / t)), r2 = r1 + r1 * head / t;
        return Q({ q: 'A truck leaves a depot at ' + r1 + ' mph. ' + head + ' hour' + (head > 1 ? 's' : '') + ' later, a car leaves the same depot on the same road at ' + r2 + ' mph. How many hours after the <b>car</b> leaves will it catch the truck?', mc: K.mcNum(t, [t + head, head, Math.round(r1 * head / r2)]), why: ['When they meet, they have gone the same distance. Let <i>t</i> = car’s hours; the truck has driven ' + m('<i>t</i> + ' + head) + ' hours.', m(r1 + '(<i>t</i> + ' + head + ') = ' + r2 + '<i>t</i>') + ', so ' + m((r1 * head) + ' = ' + (r2 - r1) + '<i>t</i>') + '.', m('<i>t</i> = ' + t) + ' hours.'] });
      },
      function () {
        var pa = 0.1 * ri(1, 3), pb = 0.1 * ri(5, 8), target = 0.1 * ri(4, 5), total = 10 * ri(2, 6);
        pa = K.round(pa, 1); pb = K.round(pb, 1); target = K.round(target, 1);
        if (!(pa < target && target < pb)) return u56[2][0]();
        var x = total * (pb - target) / (pb - pa); // liters of A
        x = K.round(x, 4);
        if (Math.abs(x - Math.round(x)) > 1e-9) return u56[2][0]();
        var y = total - x;
        return Q({ q: 'A chemist mixes a ' + n(pa * 100) + '% acid solution with a ' + n(pb * 100) + '% acid solution to make ' + total + ' liters of a ' + n(target * 100) + '% solution. How many liters of the ' + n(pa * 100) + '% solution are needed?', mc: K.mcNum(x, [y, total / 2 === x ? x + 2 : total / 2, Math.round(total * target)]), why: ['System: ' + m('<i>a</i> + <i>b</i> = ' + total) + ' and ' + m(n(pa) + '<i>a</i> + ' + n(pb) + '<i>b</i> = ' + n(K.round(target * total, 4))) + ' (liters of acid).', 'Substitute ' + m('<i>b</i> = ' + total + ' ' + M + ' <i>a</i>') + ': ' + m(n(pa) + '<i>a</i> + ' + n(pb) + '(' + total + ' ' + M + ' <i>a</i>) = ' + n(K.round(target * total, 4))) + '.', m(n(K.round(pb - pa, 4)) + '<i>a</i> = ' + n(K.round(pb * total - target * total, 4))) + ', so ' + m('<i>a</i> = ' + n(x)) + ' liters.'] });
      },
      function () {
        var A = ri(8, 14), S = ri(4, 7), tot = ri(30, 50), money;
        if (K.coin()) money = A * ri(5, tot - 5) + S * 0; // placeholder, replaced below
        var aa = ri(5, tot - 5); money = K.coin() ? A * aa + S * (tot - aa) : (K.coin() ? A * tot + S * ri(3, 8) * 2 : A * aa + S * (tot - aa) + pick([1, 2, 3]));
        var a = (money - S * tot) / (A - S), s = tot - a;
        var viable = a === Math.round(a) && a >= 0 && s >= 0;
        var right = viable ? 'Yes: ' + a + ' adult and ' + s + ' student tickets' : (a < 0 || s < 0 ? 'No: the solution has a negative number of tickets' : 'No: the solution is not a whole number of tickets');
        return Q({ q: 'A club claims it sold ' + tot + ' tickets for exactly $' + money + ', with adult tickets at $' + A + ' and student tickets at $' + S + '. Is this possible?', mc: mc(right, viable ? ['No: the solution has a negative number of tickets', 'No: the solution is not a whole number of tickets', s !== a ? 'Yes: ' + s + ' adult and ' + a + ' student tickets' : 'Yes: ' + (a + 1) + ' adult and ' + (s - 1) + ' student tickets'] : ['Yes: it satisfies the equations, so it is possible', right.indexOf('negative') > 0 ? 'No: the solution is not a whole number of tickets' : 'No: the solution has a negative number of tickets', 'Yes: ' + (Math.round(tot / 2) + 1) + ' adult and ' + (tot - Math.round(tot / 2) - 1) + ' student tickets']), why: ['System: ' + m('<i>a</i> + <i>s</i> = ' + tot) + ' and ' + m(A + '<i>a</i> + ' + S + '<i>s</i> = ' + money) + '.', 'Solving: ' + m(P([[A - S, '<i>a</i>']]) + ' = ' + n(money - S * tot)) + ', so ' + m('<i>a</i> = ' + n(K.round(a, 3))) + ' and ' + m('<i>s</i> = ' + n(K.round(s, 3))) + '.', viable ? 'Both are whole numbers and not negative, so it is possible.' : 'Ticket counts must be whole, non-negative numbers, so the claim is not possible.'] });
      }
    ]
  ];
  K.lesson('5.6', { title: 'Systems in Context — Constraints & Viable Solutions', std: 'MA.912.AR.9.6', levels: u56 });
  K.review(5, 'Unit 5 Review: Systems of Equations & Inequalities');
})(typeof window !== 'undefined' ? window.KCEP : globalThis.KCEP);
