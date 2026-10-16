/* Unit 2 — Solving Inequalities */
(function (K) {
  var ri = K.ri, rnz = K.rnz, pick = K.pick, n = K.n, P = K.poly, X = K.x, Y = K.y, Q = K.Q, mc = K.mc, M = K.MINUS, m = K.m, fr = K.frx;
  var S = K.ineqSym, FL = K.flipSym;
  var LE = '≤', GE = '≥';
  function ix(sym, k) { return m('<i>x</i> ' + S[sym] + ' ' + n(k)); }
  function words(sym) { return { '<': 'less than', '>': 'greater than', '<=': 'less than or equal to', '>=': 'greater than or equal to' }[sym]; }
  function nlFor(sym, k, lo, hi) { return K.numberLine({ min: lo, max: hi, pts: [{ x: k, open: sym === '<' || sym === '>' }], rays: [{ from: k, dir: (sym === '>' || sym === '>=') ? 1 : -1 }] }); }

  /* ---------- 2.1 One-Variable & Compound Inequalities ---------- */
  var u21 = [
    [
      function () {
        var a = ri(2, 8), k = ri(-8, 9), b = rnz(-12, 12), sym = pick(['<', '>', '<=', '>=']);
        var c = a * k + b;
        var right = ix(sym, k);
        return Q({ q: 'Solve the inequality: ' + m(P([[a, X], [b, '']]) + ' ' + S[sym] + ' ' + n(c)), mc: mc(right, [ix(FL[sym], k), ix(sym, (c + b) / a === Math.round((c + b) / a) ? (c + b) / a : k + 2), ix(sym, -k === k ? k - 3 : -k)], function () { return ix(sym, k + rnz(-4, 4)); }), why: [(b > 0 ? 'Subtract ' + b : 'Add ' + Math.abs(b)) + ' on both sides: ' + m(P([[a, X]]) + ' ' + S[sym] + ' ' + n(c - b)) + '.', 'Divide both sides by ' + a + '. Dividing by a <b>positive</b> number keeps the sign the same: ' + right + '.'] });
      },
      function () {
        var k = ri(-6, 6), sym = pick(['<', '>', '<=', '>=']);
        var lo = k - 5, hi = k + 5;
        return Q({ q: 'Which inequality is shown on the number line?', graph: nlFor(sym, k, lo, hi), mc: mc(ix(sym, k), [ix(FL[sym], k), ix({ '<': '<=', '<=': '<', '>': '>=', '>=': '>' }[sym], k), ix(FL[{ '<': '<=', '<=': '<', '>': '>=', '>=': '>' }[sym]], k)]), why: ['The circle is at ' + n(k) + '. ' + ((sym === '<' || sym === '>') ? 'An <b>open</b> circle means ' + n(k) + ' is <b>not</b> included (&lt; or &gt;).' : 'A <b>closed</b> (filled) circle means ' + n(k) + ' <b>is</b> included (' + LE + ' or ' + GE + ').'), 'The arrow points ' + ((sym === '>' || sym === '>=') ? 'right, toward greater numbers' : 'left, toward smaller numbers') + '. So the inequality is ' + ix(sym, k) + '.'] });
      }
    ],
    [
      function () {
        var a = -ri(2, 7), k = ri(-7, 8), b = rnz(-12, 12), sym = pick(['<', '>', '<=', '>=']);
        var c = a * k + b;
        var right = ix(FL[sym], k);
        return Q({ q: 'Solve: ' + m(P([[a, X], [b, '']]) + ' ' + S[sym] + ' ' + n(c)), mc: mc(right, [ix(sym, k), ix(FL[sym], -k === k ? k + 3 : -k), ix(sym, -k === k ? k - 2 : -k)], function () { return ix(FL[sym], k + rnz(-4, 4)); }), why: [(b > 0 ? 'Subtract ' + b : 'Add ' + Math.abs(b)) + ': ' + m(P([[a, X]]) + ' ' + S[sym] + ' ' + n(c - b)) + '.', 'Divide by ' + n(a) + '. Dividing by a <b>negative</b> number <b>flips</b> the inequality sign: ' + right + '.', 'Check with a number: try ' + m('<i>x</i> = ' + n(k + ((FL[sym] === '>' || FL[sym] === '>=') ? 1 : -1))) + ' in the original. It works.'] });
      },
      function () {
        var a = ri(2, 5), b = rnz(-6, 6), c = ri(1, 4), k = ri(-6, 6), sym = pick(['<', '>', '<=', '>=']);
        if (c === a) c = a + 1;
        // a(x + b) sym c x + d, solution x sym' k
        var d = a * (k + b) - c * k;
        var coef = a - c; // positive since c<a? ensure sign known
        var res = coef > 0 ? sym : FL[sym];
        var right = ix(res, k);
        return Q({ q: 'Solve: ' + m(a + '(' + P([[1, X], [b, '']]) + ') ' + S[sym] + ' ' + P([[c, X], [d, '']])), mc: mc(right, [ix(FL[res], k), ix(res, -k === k ? k + 2 : -k), ix(res, k + (coef > 0 ? 1 : -1) * 2)], function () { return ix(pick([res, FL[res]]), k + rnz(-4, 4)); }), why: ['Distribute: ' + m(P([[a, X], [a * b, '']]) + ' ' + S[sym] + ' ' + P([[c, X], [d, '']])) + '.', 'Subtract ' + m(P([[c, X]])) + ' from both sides and move the constant: ' + m(P([[coef, X]]) + ' ' + S[sym] + ' ' + n(d - a * b)) + '.', 'Divide by ' + n(coef) + (coef < 0 ? ' and flip the sign because it is negative' : '') + ': ' + right + '.'] });
      }
    ],
    [
      function () {
        var a = ri(2, 5), lo = ri(-6, 1), hi = lo + ri(3, 8), b = rnz(-9, 9);
        var L = a * lo + b, H = a * hi + b;
        var st = pick([['<', '<'], ['<=', '<='], ['<=', '<'], ['<', '<=']]);
        var ans = m(n(lo) + ' ' + S[st[0]] + ' <i>x</i> ' + S[st[1]] + ' ' + n(hi));
        return Q({ q: 'Solve the compound inequality: ' + m(n(L) + ' ' + S[st[0]] + ' ' + P([[a, X], [b, '']]) + ' ' + S[st[1]] + ' ' + n(H)), mc: mc(ans, [m(n(L - b) + ' ' + S[st[0]] + ' <i>x</i> ' + S[st[1]] + ' ' + n(H - b)), m(n(lo) + ' ' + S[st[1] === '<' ? '<=' : '<'] + ' <i>x</i> ' + S[st[0] === '<' ? '<=' : '<'] + ' ' + n(hi)), m(n((L + b) / a) + ' ' + S[st[0]] + ' <i>x</i> ' + S[st[1]] + ' ' + n((H + b) / a))], function () { return m(n(lo + rnz(-2, 2)) + ' ' + S[st[0]] + ' <i>x</i> ' + S[st[1]] + ' ' + n(hi + rnz(-2, 2))); }), why: ['Do the same step to <b>all three parts</b>.', (b > 0 ? 'Subtract ' + b : 'Add ' + Math.abs(b)) + ': ' + m(n(L - b) + ' ' + S[st[0]] + ' ' + a + '<i>x</i> ' + S[st[1]] + ' ' + n(H - b)) + '.', 'Divide all three parts by ' + a + ': ' + ans + '.'] });
      },
      function () {
        var cost = ri(3, 9), fee = ri(10, 30), budget = fee + cost * ri(5, 15) + ri(0, cost - 1);
        var maxn = Math.floor((budget - fee) / cost);
        return Q({ q: 'A gym charges a $' + fee + ' sign-up fee plus $' + cost + ' per class. Jordan wants to spend <b>no more than</b> $' + budget + '. What is the greatest number of classes Jordan can take?', mc: K.mcNum(maxn, [maxn + 1, Math.floor(budget / cost), Math.ceil((budget - fee) / cost) === maxn ? maxn - 1 : Math.ceil((budget - fee) / cost)]), why: ['Write the inequality: ' + m(fee + ' + ' + cost + '<i>c</i> ' + LE + ' ' + budget) + '.', 'Subtract ' + fee + ': ' + m(cost + '<i>c</i> ' + LE + ' ' + (budget - fee)) + '.', 'Divide by ' + cost + ': ' + m('<i>c</i> ' + LE + ' ' + K.n(K.round((budget - fee) / cost, 2))) + '.', 'Classes come in whole numbers, so the greatest is ' + maxn + '.'] });
      },
      function () {
        var lo = ri(60, 70), hi = lo + ri(8, 15), f = function (c) { return c * 9 / 5 + 32; };
        var cl = 5 * ri(2, 5), ch = cl + 5 * ri(1, 3);
        var Fl = f(cl), Fh = f(ch);
        return Q({ q: 'A greenhouse must stay between ' + n(Fl) + '°F and ' + n(Fh) + '°F, inclusive. Using ' + m('<i>F</i> = ' + fr('9', '5') + '<i>C</i> + 32') + ', which inequality gives the allowed Celsius temperatures <i>C</i>?', mc: mc(m(n(cl) + ' ' + LE + ' <i>C</i> ' + LE + ' ' + n(ch)), [m(n(cl) + ' &lt; <i>C</i> &lt; ' + n(ch)), m(n(K.round((Fl - 32) * 9 / 5, 1)) + ' ' + LE + ' <i>C</i> ' + LE + ' ' + n(K.round((Fh - 32) * 9 / 5, 1))), m(n(Fl - 32) + ' ' + LE + ' <i>C</i> ' + LE + ' ' + n(Fh - 32))]), why: ['Write ' + m(n(Fl) + ' ' + LE + ' ' + fr('9', '5') + '<i>C</i> + 32 ' + LE + ' ' + n(Fh)) + '. "Inclusive" means the ends count, so use ' + LE + '.', 'Subtract 32 from all parts: ' + m(n(Fl - 32) + ' ' + LE + ' ' + fr('9', '5') + '<i>C</i> ' + LE + ' ' + n(Fh - 32)) + '.', 'Multiply all parts by ' + fr('5', '9') + ': ' + m(n(cl) + ' ' + LE + ' <i>C</i> ' + LE + ' ' + n(ch)) + '.'] });
      }
    ]
  ];
  K.lesson('2.1', { title: 'One-Variable & Compound Inequalities', std: 'MA.912.AR.2.6', levels: u21 });

  /* ---------- 2.2 Writing Two-Variable Inequalities ---------- */
  function lin2(a, b, sym, c, vx, vy) { return m(P([[a, vx], [b, vy]]) + ' ' + S[sym] + ' ' + n(c)); }
  function yIneq(mm, bb, sym) { return m('<i>y</i> ' + S[sym] + ' ' + P([[mm, X], [bb, '']])); }
  var u22 = [
    [
      function () {
        var A = ri(6, 15), Sd = ri(3, A - 1), B = 10 * ri(10, 30);
        var phr = pick([['at most', '<='], ['no more than', '<='], ['at least', '>='], ['a minimum of', '>=']]);
        var ctx = phr[1] === '<=' ? 'The club can spend ' + phr[0] + ' $' + B + '.' : 'The club needs to raise ' + phr[0] + ' $' + B + '.';
        var verb = phr[1] === '<=' ? 'buy' : 'sell';
        var vx = '<i>a</i>', vy = '<i>s</i>';
        return Q({ q: 'A drama club will ' + verb + ' adult tickets for $' + A + ' each and student tickets for $' + Sd + ' each. ' + ctx + ' Let <i>a</i> = adult tickets and <i>s</i> = student tickets. Which inequality models this?', mc: mc(lin2(A, Sd, phr[1], B, vx, vy), [lin2(A, Sd, FL[phr[1]], B, vx, vy), lin2(Sd, A, phr[1], B, vx, vy), lin2(A, Sd, phr[1] === '<=' ? '<' : '>', B, vx, vy)]), why: ['Money from each type = price × number: ' + m(A + '<i>a</i>') + ' and ' + m(Sd + '<i>s</i>') + '.', '"' + phr[0] + '" means ' + (phr[1] === '<=' ? 'the total can equal $' + B + ' or be less: ' + LE : 'the total can equal $' + B + ' or be more: ' + GE) + '.', 'So ' + lin2(A, Sd, phr[1], B, vx, vy) + '.'] });
      },
      function () {
        var sym = pick(['<', '>', '<=', '>=']);
        var opts = mc(sym === '<=' || sym === '>=' ? 'Solid, because points on the line are solutions' : 'Dashed, because points on the line are not solutions', [sym === '<=' || sym === '>=' ? 'Dashed, because points on the line are not solutions' : 'Solid, because points on the line are solutions', 'Solid, because the inequality has a ' + Y + '-intercept', 'Dashed, because the slope is negative']);
        var mm = rnz(-3, 3), bb = ri(-4, 4);
        return Q({ q: 'When you graph ' + yIneq(mm, bb, sym) + ', should the boundary line be solid or dashed?', mc: opts, why: ['A <b>solid</b> line is used for ' + LE + ' or ' + GE + ', because "or equal to" means points on the line count.', 'A <b>dashed</b> line is used for &lt; or &gt;, because points on the line do not count.', 'This inequality uses ' + S[sym] + ', so the line is ' + (sym.length === 2 ? 'solid' : 'dashed') + '.'] });
      }
    ],
    [
      function () {
        var mm = pick([K.R(1), K.R(2), K.R(-1), K.R(-2), K.R(1, 2), K.R(-1, 2), K.R(3), K.R(-3), K.R(2, 3), K.R(-2, 3)]), bb = ri(-4, 4), sym = pick(['<', '>', '<=', '>=']);
        var above = sym === '>' || sym === '>=';
        var g = K.plane({ x: [-6, 6], y: [-6, 6], lines: [{ m: mm, b: bb, dash: sym.length === 1 }], shade: [regionShade(mm, bb, sym)] });
        var alt = { '<': '<=', '<=': '<', '>': '>=', '>=': '>' };
        return Q({ q: 'Which inequality is shown by the graph?', graph: g, mc: mc(yIneq(mm, bb, sym), [yIneq(mm, bb, FL[sym]), yIneq(mm, bb, alt[sym]), yIneq(mm.neg(), bb, sym)]), why: ['The boundary line crosses the ' + Y + '-axis at ' + n(bb) + ' and has slope ' + mm.html() + ', so it is ' + m('<i>y</i> = ' + P([[mm, X], [bb, '']])) + '.', 'The line is ' + (sym.length === 1 ? '<b>dashed</b>, so use &lt; or &gt;.' : '<b>solid</b>, so use ' + LE + ' or ' + GE + '.'), 'The shading is ' + (above ? '<b>above</b> the line, so ' + Y + ' is greater.' : '<b>below</b> the line, so ' + Y + ' is less.') + ' Answer: ' + yIneq(mm, bb, sym) + '.'] });
      },
      function () {
        var h = ri(10, 18), k = ri(8, h - 1), need = 10 * ri(15, 40);
        return Q({ q: 'Lena earns $' + h + ' per hour tutoring (<i>t</i>) and $' + k + ' per hour at a café (<i>c</i>). She wants to earn <b>more than</b> $' + need + ' this month. Which inequality shows this?', mc: mc(lin2(h, k, '>', need, '<i>t</i>', '<i>c</i>'), [lin2(h, k, '>=', need, '<i>t</i>', '<i>c</i>'), lin2(h, k, '<', need, '<i>t</i>', '<i>c</i>'), lin2(k, h, '>', need, '<i>t</i>', '<i>c</i>')]), why: ['Earnings: ' + m(h + '<i>t</i> + ' + k + '<i>c</i>') + '.', '"More than" does not include the amount itself, so use &gt; (not ' + GE + ').', 'Answer: ' + lin2(h, k, '>', need, '<i>t</i>', '<i>c</i>') + '.'] });
      }
    ],
    [
      function () {
        var a = ri(2, 6), b = ri(2, 6), c = a * b * ri(1, 3);
        // standard form → slope-intercept, with b positive
        var sym = pick(['<', '>', '<=', '>=']);
        var mm = K.R(-a, b), bb = K.R(c, b);
        return Q({ q: 'Which inequality is equivalent to ' + lin2(a, b, sym, c, X, Y) + '?', mc: mc(m('<i>y</i> ' + S[sym] + ' ' + P([[mm, X], [bb, '']])), [m('<i>y</i> ' + S[FL[sym]] + ' ' + P([[mm, X], [bb, '']])), m('<i>y</i> ' + S[sym] + ' ' + P([[mm.neg(), X], [bb, '']])), m('<i>y</i> ' + S[sym] + ' ' + P([[K.R(-b, a), X], [K.R(c, a), '']]))], function () { return m('<i>y</i> ' + S[sym] + ' ' + P([[mm, X], [bb.add(rnz(-2, 2)), '']])); }), why: ['Subtract ' + m(a + '<i>x</i>') + ' from both sides: ' + m(b + '<i>y</i> ' + S[sym] + ' ' + P([[-a, X], [c, '']])) + '.', 'Divide by ' + b + '. It is positive, so the sign does not flip: ' + m('<i>y</i> ' + S[sym] + ' ' + P([[mm, X], [bb, '']])) + '.'] });
      },
      function () {
        // simpler: single-constraint SAT style
        var seats = ri(30, 60), vanS = ri(7, 12), carS = ri(4, 5);
        return Q({ q: 'A school needs seats for <b>at least</b> ' + seats + ' students on a trip. Each van holds ' + vanS + ' students and each car holds ' + carS + '. Let <i>v</i> be the number of vans and <i>c</i> the number of cars. Which inequality makes sure everyone has a seat?', mc: mc(lin2(vanS, carS, '>=', seats, '<i>v</i>', '<i>c</i>'), [lin2(vanS, carS, '<=', seats, '<i>v</i>', '<i>c</i>'), m('<i>v</i> + <i>c</i> ' + GE + ' ' + seats), lin2(carS, vanS, '>=', seats, '<i>v</i>', '<i>c</i>')]), why: ['Seats from vans: ' + m(vanS + '<i>v</i>') + '. Seats from cars: ' + m(carS + '<i>c</i>') + '.', '"At least" ' + seats + ' means the total must be ' + GE + ' ' + seats + '.', 'Answer: ' + lin2(vanS, carS, '>=', seats, '<i>v</i>', '<i>c</i>') + '. (Counting vehicles, ' + m('<i>v</i> + <i>c</i>') + ', ignores how many seats each has.)'] });
      }
    ]
  ];
  K.lesson('2.2', { title: 'Writing Two-Variable Inequalities', std: 'MA.912.AR.2.7', levels: u22 });

  /* ---------- 2.3 Graphing Two-Variable Inequalities ---------- */
  function sat(mm, bb, sym, x, y) { var r = mm.mul(x).add(bb).val(); return sym === '<' ? y < r : sym === '>' ? y > r : sym === '<=' ? y <= r : y >= r; }
  function regionShade(mm, bb, sym) { var above = sym === '>' || sym === '>='; var mv = K.R(mm).val(), bv = K.R(bb).val(); return above ? { a: mv, b: -1, c: -bv } : { a: -mv, b: 1, c: bv }; }
  var u23 = [
    [
      function () {
        var mm = K.R(rnz(-3, 3)), bb = ri(-4, 4), sym = pick(['<', '>', '<=', '>=']);
        var good = [], badp = [], guard = 0;
        while ((good.length < 1 || badp.length < 3) && guard++ < 400) {
          var x = ri(-5, 5), y = ri(-6, 6), r = mm.mul(x).add(bb).val();
          if (y === r) continue; // avoid boundary for clarity
          var p = [x, y];
          if (sat(mm, bb, sym, x, y)) { if (good.length < 1) good.push(p); } else if (badp.length < 3 && !badp.some(function (q) { return q[0] === x && q[1] === y; })) badp.push(p);
        }
        return Q({ q: 'Which point is a solution of ' + yIneq(mm, bb, sym) + '?', mc: mc(K.pt(good[0][0], good[0][1]), badp.map(function (p) { return K.pt(p[0], p[1]); })), why: ['Substitute each point. A point is a solution if the inequality is true.', 'For ' + K.pt(good[0][0], good[0][1]) + ': ' + m(n(good[0][1]) + ' ' + S[sym] + ' ' + K.subst([[mm, 1], [bb, 0]], n(good[0][0])) + ' = ' + n(mm.mul(good[0][0]).add(bb).val())) + ' is true ✔.', 'Each of the other points makes the inequality false.'] });
      },
      function () {
        var sym = pick(['<', '>', '<=', '>=']), mm = rnz(-3, 3), bb = ri(-5, 5);
        var lineW = sym.length === 2 ? 'Solid line' : 'Dashed line', side = (sym === '>' || sym === '>=') ? 'shade above' : 'shade below';
        var all = ['Solid line, shade above', 'Solid line, shade below', 'Dashed line, shade above', 'Dashed line, shade below'];
        var right = lineW + ', ' + side;
        return Q({ q: 'How should you graph ' + yIneq(mm, bb, sym) + '?', mc: mc(right, all.filter(function (z) { return z !== right; })), why: [S[sym] + (sym.length === 2 ? ' includes "or equal to," so the line is <b>solid</b>.' : ' does not include "equal to," so the line is <b>dashed</b>.'), 'With ' + Y + ' alone on the left, ' + ((sym === '>' || sym === '>=') ? '&gt; or ' + GE + ' means shade <b>above</b> the line.' : '&lt; or ' + LE + ' means shade <b>below</b> the line.')] });
      }
    ],
    [
      function () {
        var a = rnz(-4, 4), b = rnz(-4, 4), c = ri(-8, 8), sym = pick(['<', '>', '<=', '>=']);
        // test point (0,0) unless line passes through origin
        if (c === 0) c = 4;
        var zeroTrue = sym === '<' ? 0 < c : sym === '>' ? 0 > c : sym === '<=' ? 0 <= c : 0 >= c;
        var right = zeroTrue ? 'Yes, because ' + m('0 ' + S[sym] + ' ' + n(c)) + ' is true' : 'No, because ' + m('0 ' + S[sym] + ' ' + n(c)) + ' is false';
        return Q({ q: 'You use the test point (0, 0) for ' + lin2(a, b, sym, c, X, Y) + '. Is the side of the line containing (0, 0) shaded?', mc: mc(right, [zeroTrue ? 'No, because ' + m('0 ' + S[sym] + ' ' + n(c)) + ' is true' : 'Yes, because ' + m('0 ' + S[sym] + ' ' + n(c)) + ' is false', 'Yes, the origin is always shaded', 'No, the origin is never shaded']), why: ['Substitute ' + m('<i>x</i> = 0') + ' and ' + m('<i>y</i> = 0') + ': ' + m(P([[a, '(0)'], [b, '(0)']]) + ' ' + S[sym] + ' ' + n(c)) + ', which is ' + m('0 ' + S[sym] + ' ' + n(c)) + '.', 'That statement is ' + (zeroTrue ? '<b>true</b>, so shade the side with (0, 0).' : '<b>false</b>, so shade the side <b>without</b> (0, 0).')] });
      },
      function () {
        var mm = pick([K.R(1), K.R(-1), K.R(2), K.R(-2), K.R(1, 2), K.R(-1, 2)]), bb = ri(-3, 3), sym = pick(['<', '>', '<=', '>=']);
        var g = K.plane({ x: [-6, 6], y: [-6, 6], lines: [{ m: mm, b: bb, dash: sym.length === 1 }], shade: [regionShade(mm, bb, sym)] });
        var good = null, badp = [], guard = 0;
        while ((!good || badp.length < 3) && guard++ < 500) {
          var x = ri(-5, 5), y = ri(-5, 5), r = mm.mul(x).add(bb).val();
          if (Math.abs(y - r) < 0.75) continue;
          if (sat(mm, bb, sym, x, y)) { if (!good) good = [x, y]; } else if (!badp.some(function (q) { return q[0] === x && q[1] === y; })) badp.push([x, y]);
        }
        return Q({ q: 'The graph shows the solutions of an inequality. Which point is a solution?', graph: g, mc: mc(K.pt(good[0], good[1]), badp.slice(0, 3).map(function (p) { return K.pt(p[0], p[1]); })), why: ['Solutions are the points in the <b>shaded</b> region.', 'Plot each point. ' + K.pt(good[0], good[1]) + ' lands in the shaded region; the others are on the unshaded side.', 'You can also check it in the inequality ' + yIneq(mm, bb, sym) + '.'] });
      }
    ],
    [
      function () {
        var pa = ri(3, 8), pb = ri(2, 6), B = pa * pb * ri(3, 6);
        // pa x + pb y <= B with x,y >= 0. Which combination is affordable?
        var goodP, badP = [], g = 0;
        while ((!goodP || badP.length < 3) && g++ < 500) {
          var x = ri(0, Math.floor(B / pa)), y = ri(0, Math.floor(B / pb) + 3), cost = pa * x + pb * y;
          if (cost <= B && !goodP && cost > B * 0.6) goodP = [x, y];
          else if (cost > B && cost < B * 1.4 && !badP.some(function (q) { return q[0] === x && q[1] === y; })) badP.push([x, y]);
        }
        if (!goodP) goodP = [0, 0];
        return Q({ q: 'Notebooks cost $' + pa + ' and pens cost $' + pb + '. Sam can spend at most $' + B + ', so ' + lin2(pa, pb, '<=', B, '<i>n</i>', '<i>p</i>') + '. Which purchase can Sam afford?', mc: mc(goodP[0] + ' notebooks and ' + goodP[1] + ' pens', badP.slice(0, 3).map(function (p) { return p[0] + ' notebooks and ' + p[1] + ' pens'; })), why: ['Check each total cost.', goodP[0] + ' notebooks and ' + goodP[1] + ' pens cost ' + m(pa + '(' + goodP[0] + ') + ' + pb + '(' + goodP[1] + ') = ' + (pa * goodP[0] + pb * goodP[1])) + ' dollars, which is at most $' + B + ' ✔.', 'The other choices cost more than $' + B + '.'] });
      },
      function () {
        var mm = pick([K.R(1, 2), K.R(-1, 2), K.R(2), K.R(-2), K.R(1, 3), K.R(-3), K.R(3, 2), K.R(-2, 3)]), bb = ri(-3, 3), sym = pick(['<', '>', '<=', '>=']);
        var g = K.plane({ x: [-6, 6], y: [-6, 6], lines: [{ m: mm, b: bb, dash: sym.length === 1 }], shade: [regionShade(mm, bb, sym)] });
        // standard-form answer: multiply by denominator
        var d = mm.d, A = -mm.n, Bc = d, C = bb * d; // A x + d y sym C
        var right = lin2(A, Bc, sym, C, X, Y);
        return Q({ q: 'Which inequality is represented by the graph?', graph: g, mc: mc(right, [lin2(A, Bc, FL[sym], C, X, Y), lin2(-A, Bc, sym, C, X, Y), lin2(A, Bc, { '<': '<=', '<=': '<', '>': '>=', '>=': '>' }[sym], C, X, Y)]), why: ['From the graph: ' + Y + '-intercept ' + n(bb) + ', slope ' + mm.html() + ', ' + (sym.length === 1 ? 'dashed' : 'solid') + ' line, shaded ' + ((sym === '>' || sym === '>=') ? 'above' : 'below') + '. So ' + yIneq(mm, bb, sym) + '.', (d > 1 ? 'Multiply every term by ' + d + ' and move' : 'Move') + ' the ' + X + '-term to the left: ' + right + '.', (bb === 0 ? 'The line passes through (0, 0), so check with a point off the line, such as (0, 1): the inequality should match the shading.' : 'Check with (0, 0), which is not on the line: the inequality should match the shading.')] });
      }
    ]
  ];
  K.lesson('2.3', { title: 'Graphing Two-Variable Inequalities', std: 'MA.912.AR.2.8', levels: u23 });
  K.review(2, 'Unit 2 Review: Solving Inequalities');
})(typeof window !== 'undefined' ? window.KCEP : globalThis.KCEP);
