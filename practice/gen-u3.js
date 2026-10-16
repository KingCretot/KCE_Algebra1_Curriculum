/* Unit 3 — Linear Functions & Graphing */
(function (K) {
  var ri = K.ri, rnz = K.rnz, pick = K.pick, n = K.n, P = K.poly, X = K.x, Y = K.y, Q = K.Q, mc = K.mc, M = K.MINUS, m = K.m, fr = K.frx, R = K.R;

  /* ---------- 3.1 Classifying Functions ---------- */
  function relStr(pairs) { return '{' + pairs.map(function (p) { return K.pt(p[0], p[1]); }).join(', ') + '}'; }
  function funcRel() { var xs = K.sample([-4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 4); return xs.map(function (x) { return [x, ri(-6, 6)]; }); }
  function nonFuncRel() { var r = funcRel(); var i = ri(0, 2); r[3] = [r[i][0], r[i][1] + rnz(-3, 3)]; return K.shuffle(r); }
  function tableFor(type) {
    var xs = [0, 1, 2, 3, 4], ys;
    if (type === 'linear') { var mm = rnz(-5, 6), b = ri(-6, 10); ys = xs.map(function (x) { return mm * x + b; }); }
    else if (type === 'quadratic') { var a = rnz(-2, 3), b2 = ri(-3, 3), c = ri(-4, 6); ys = xs.map(function (x) { return a * x * x + b2 * x + c; }); }
    else { var a3 = pick([1, 2, 3, 4, 5]), r = pick([2, 3]); ys = xs.map(function (x) { return a3 * Math.pow(r, x); }); }
    return { xs: xs, ys: ys };
  }
  var u31 = [
    [
      function () {
        var good = funcRel(); var bads = [nonFuncRel(), nonFuncRel(), nonFuncRel()];
        return Q({ q: 'Which relation is a <b>function</b>?', mc: mc(m(relStr(good)), bads.map(function (b) { return m(relStr(b)); }), function () { return m(relStr(nonFuncRel())); }), why: ['A relation is a function when each input (' + X + '-value) has exactly <b>one</b> output.', 'In ' + m(relStr(good)) + ', no ' + X + '-value repeats, so it is a function.', 'Each other choice repeats an ' + X + '-value with two different ' + Y + '-values.'] });
      },
      function () {
        var kind = pick(['line', 'parabola', 'circle', 'sideways']);
        var g, isF = kind === 'line' || kind === 'parabola';
        if (kind === 'line') g = K.plane({ x: [-6, 6], y: [-6, 6], lines: [{ m: rnz(-2, 2), b: ri(-3, 3) }] });
        else if (kind === 'parabola') { var a = pick([1, -1, 0.5]), h = ri(-2, 2), k = ri(-3, 2); g = K.plane({ x: [-6, 6], y: [-6, 6], fns: [{ f: function (x) { return a * (x - h) * (x - h) + k; } }] }); }
        else if (kind === 'circle') { var r = ri(2, 4); g = K.plane({ x: [-6, 6], y: [-6, 6], fns: [{ f: function (x) { return Math.sqrt(r * r - x * x); }, from: -r, to: r }, { f: function (x) { return -Math.sqrt(r * r - x * x); }, from: -r, to: r }] }); }
        else { var k2 = ri(-2, 2); g = K.plane({ x: [-6, 6], y: [-6, 6], fns: [{ f: function (x) { return k2 + Math.sqrt(x + 4); }, from: -4, to: 6 }, { f: function (x) { return k2 - Math.sqrt(x + 4); }, from: -4, to: 6 }] }); }
        var right = isF ? 'Yes, every vertical line crosses it at most once' : 'No, a vertical line crosses it more than once';
        return Q({ q: 'Use the vertical line test. Is the graph a function?', graph: g, mc: mc(right, [isF ? 'No, a vertical line crosses it more than once' : 'Yes, every vertical line crosses it at most once', isF ? 'No, because it is not a straight line' : 'Yes, because it passes through the origin', isF ? 'No, a horizontal line crosses it more than once' : 'Yes, because it is a smooth curve']), why: ['Imagine sliding a vertical line across the graph.', isF ? 'It never touches the graph in two places at once, so each ' + X + ' has one ' + Y + '. It <b>is</b> a function.' : 'Some vertical lines hit the graph in two places, so one ' + X + ' has two ' + Y + '-values. It is <b>not</b> a function.'] });
      }
    ],
    [
      function () {
        var type = pick(['linear', 'quadratic', 'exponential']), t = tableFor(type);
        var d1 = [], d2 = [], r = [];
        for (var i = 1; i < 5; i++) { d1.push(t.ys[i] - t.ys[i - 1]); r.push(t.ys[i] / t.ys[i - 1]); }
        for (i = 1; i < 4; i++) d2.push(d1[i] - d1[i - 1]);
        var why = type === 'linear' ? ['First differences: ' + d1.map(n).join(', ') + '. They are all the same.', 'Constant first differences mean the function is <b>linear</b>.'] :
          type === 'quadratic' ? ['First differences: ' + d1.map(n).join(', ') + ' (not constant).', 'Second differences: ' + d2.map(n).join(', ') + '. They are constant.', 'Constant second differences mean <b>quadratic</b>.'] :
            ['First differences: ' + d1.map(n).join(', ') + ' (not constant).', 'Ratios: each ' + Y + ' is ' + n(r[0]) + ' times the one before. A constant ratio means <b>exponential</b>.'];
        return Q({ q: 'Is the function in the table linear, quadratic, or exponential?' + K.xyTable(t.xs, t.ys), mc: mc('<b>' + type[0].toUpperCase() + type.slice(1) + '</b>', ['Linear', 'Quadratic', 'Exponential', 'Not a function'].filter(function (z) { return z.toLowerCase() !== type; }).map(function (z) { return '<b>' + z + '</b>'; })), why: why });
      },
      function () {
        var type = pick(['linear', 'quadratic', 'exponential']);
        var eq = type === 'linear' ? 'f(<i>x</i>) = ' + P([[rnz(-6, 6), X], [rnz(-9, 9), '']]) : type === 'quadratic' ? 'f(<i>x</i>) = ' + P([[rnz(-4, 4), K.xp(2)], [ri(-5, 5), X], [ri(-6, 6), '']]) : 'f(<i>x</i>) = ' + ri(2, 9) + '(' + pick(['2', '3', '1.5', '0.5', '4']) + ')<sup><i>x</i></sup>';
        var name = type[0].toUpperCase() + type.slice(1);
        var why = type === 'linear' ? 'The highest power of ' + X + ' is 1, so it is <b>linear</b>.' : type === 'quadratic' ? 'The highest power of ' + X + ' is 2, so it is <b>quadratic</b>.' : 'The variable is in the <b>exponent</b>, so it is <b>exponential</b>.';
        return Q({ q: 'What type of function is ' + m(eq) + '?', mc: mc(name, ['Linear', 'Quadratic', 'Exponential', 'Absolute value'].filter(function (z) { return z !== name; })), why: [why] });
      }
    ],
    [
      function () {
        var type = pick(['linear', 'exponential', 'quadratic']);
        var ctx = type === 'linear' ? ['A savings jar starts with $' + ri(20, 80) + ' and gains $' + ri(5, 15) + ' every week.', 'The same amount is added each week, so the change is constant.'] :
          type === 'exponential' ? ['A town of ' + K.comma(1000 * ri(5, 40)) + ' people grows by ' + ri(2, 9) + '% each year.', 'The population is multiplied by the same factor each year (a constant percent), which is exponential.'] :
            ['A ball is thrown up; its height goes up, reaches a highest point, then comes back down.', 'Rising then falling with a single turning point is the shape of a parabola, which is quadratic.'];
        var name = type[0].toUpperCase() + type.slice(1);
        return Q({ q: ctx[0] + ' Which type of function best models this situation?', mc: mc(name, ['Linear', 'Quadratic', 'Exponential', 'None of these'].filter(function (z) { return z !== name; })), why: [ctx[1], 'So the best model is <b>' + type + '</b>.'] });
      },
      function () {
        // table with non-uniform x? keep uniform but ask "which statement is true"
        var t = tableFor('quadratic');
        var d1 = []; for (var i = 1; i < 5; i++) d1.push(t.ys[i] - t.ys[i - 1]);
        var d2 = d1[1] - d1[0];
        if (d2 === 0) return u31[2][0]();
        return Q({ q: 'Which statement about the table is true?' + K.xyTable(t.xs, t.ys), mc: mc('The second differences are all ' + n(d2) + ', so it is quadratic.', ['The first differences are constant, so it is linear.', 'Each ' + Y + '-value is multiplied by the same number, so it is exponential.', 'The second differences are all ' + n(d2 + (d2 > 0 ? 1 : -1)) + ', so it is quadratic.']), why: ['First differences: ' + d1.map(n).join(', ') + '. These change, so it is not linear.', 'Second differences: ' + [d1[1] - d1[0], d1[2] - d1[1], d1[3] - d1[2]].map(n).join(', ') + '. Constant second differences mean quadratic.'] });
      }
    ]
  ];
  K.lesson('3.1', { title: 'Classifying Functions', std: 'MA.912.F.1.1', levels: u31 });

  /* ---------- 3.2 Function Notation ---------- */
  var u32 = [
    [
      function () {
        var a = rnz(-7, 8), b = rnz(-10, 10), x = ri(-6, 7); if (a === 1) a = 2;
        var val = a * x + b;
        return Q({ q: 'If ' + m('f(<i>x</i>) = ' + P([[a, X], [b, '']])) + ', what is ' + m('f(' + n(x) + ')') + '?', mc: K.mcNum(val, [a + x + b, a * x - b, -val, a * (x + b)]), why: ['Replace ' + X + ' with ' + n(x) + ': ' + m('f(' + n(x) + ') = ' + K.lin([[a, n(x)]]) + K.plusK(b)) + '.', 'Multiply first: ' + m(n(a * x) + K.plusK(b) + ' = ' + n(val)) + '.'] });
      },
      function () {
        var xs = [ri(-3, 0), ri(1, 2), ri(3, 4), ri(5, 7)], a = rnz(-3, 4), b = ri(-5, 5);
        var ys = xs.map(function (x) { return a * x + b; });
        var j = ri(0, 3);
        return Q({ q: 'The table shows values of a function ' + m('<i>g</i>') + '. What is ' + m('<i>g</i>(' + n(xs[j]) + ')') + '?' + K.xyTable(xs, ys, X, '<i>g</i>(<i>x</i>)'), mc: K.mcNum(ys[j], [xs[j], ys[(j + 1) % 4], -ys[j]]), why: [m('<i>g</i>(' + n(xs[j]) + ')') + ' means "the output when the input is ' + n(xs[j]) + '."', 'Find ' + n(xs[j]) + ' in the ' + X + ' row and read the value below it: ' + n(ys[j]) + '.'] });
      }
    ],
    [
      function () {
        var a = rnz(-3, 3), b = ri(-6, 6), c = ri(-9, 9), x = rnz(-4, 4);
        var val = a * x * x + b * x + c, wrong = -a * x * x + b * x + c;
        return Q({ q: 'If ' + m('<i>h</i>(<i>x</i>) = ' + P([[a, K.xp(2)], [b, X], [c, '']])) + ', what is ' + m('<i>h</i>(' + n(x) + ')') + '?', mc: K.mcNum(val, [wrong, a * 2 * x + b * x + c, val + 2 * b * x]), why: ['Substitute ' + n(x) + ' for every ' + X + ': ' + m(K.subst([[a, 2], [b, 1], [c, 0]], n(x))) + '.', 'Square first: ' + m('(' + n(x) + ')<sup>2</sup> = ' + n(x * x)) + '. Watch the sign: a negative squared is positive.', 'Then: ' + m(n(a * x * x) + K.plusK(b * x) + K.plusK(c) + ' = ' + n(val)) + '.'] });
      },
      function () {
        var a = rnz(-6, 7), b = rnz(-10, 10), x = ri(-8, 9); if (a === 1 || a === -1) a = 3;
        var k = a * x + b;
        return Q({ q: 'If ' + m('f(<i>x</i>) = ' + P([[a, X], [b, '']])) + ' and ' + m('f(<i>x</i>) = ' + n(k)) + ', what is the value of ' + X + '?', mc: K.mcNum(x, [a * k + b, (k + b) / a, k].filter(function (z) { return z === Math.round(z); })), why: ['Here the <b>output</b> is given. Set the rule equal to it: ' + m(P([[a, X], [b, '']]) + ' = ' + n(k)) + '.', 'Solve: ' + m(P([[a, X]]) + ' = ' + n(k - b)) + ', so ' + m('<i>x</i> = ' + n(x)) + '.'] });
      }
    ],
    [
      function () {
        var rate = ri(12, 30), fee = ri(20, 60), t = ri(3, 9);
        var opts = mc('It costs $' + (fee + rate * t) + ' to rent the boat for ' + t + ' hours.', ['It costs $' + t + ' to rent the boat for ' + (fee + rate * t) + ' hours.', 'The boat costs $' + rate + ' per hour for ' + t + ' hours.', 'It costs $' + (rate * t) + ' to rent the boat for ' + t + ' hours.']);
        return Q({ q: 'The cost, in dollars, of renting a boat for <i>t</i> hours is ' + m('<i>C</i>(<i>t</i>) = ' + rate + '<i>t</i> + ' + fee) + '. Which statement describes ' + m('<i>C</i>(' + t + ') = ' + (fee + rate * t)) + '?', mc: opts, why: ['In ' + m('<i>C</i>(<i>t</i>)') + ', the input <i>t</i> is hours and the output is cost.', m('<i>C</i>(' + t + ') = ' + (fee + rate * t)) + ' means renting for ' + t + ' hours costs $' + (fee + rate * t) + ' (' + m(rate + '(' + t + ') + ' + fee) + ').'] });
      },
      function () {
        var a = rnz(-4, 5), b = ri(-6, 6), p = ri(-4, 4), q = ri(-4, 4); if (p === q) q = p + 2;
        var f = function (x) { return a * x + b; };
        var val = 2 * f(p) - f(q);
        return Q({ q: 'If ' + m('f(<i>x</i>) = ' + P([[a, X], [b, '']])) + ', what is the value of ' + m('2f(' + n(p) + ') ' + M + ' f(' + n(q) + ')') + '?', mc: K.mcNum(val, [f(2 * p - q), 2 * f(p) + f(q), f(p) - f(q)]), why: ['Evaluate each piece: ' + m('f(' + n(p) + ') = ' + n(f(p))) + ' and ' + m('f(' + n(q) + ') = ' + n(f(q))) + '.', 'Then ' + m('2(' + n(f(p)) + ') ' + M + ' (' + n(f(q)) + ') = ' + n(val)) + '.'] });
      },
      function () {
        var a = ri(2, 5), b = ri(-8, 8), k = ri(-3, 4);
        // f(x)=a x + b ; find f(k+1) − f(k) = a
        return Q({ q: 'For ' + m('f(<i>x</i>) = ' + P([[a, X], [b, '']])) + ', what is ' + m('f(<i>k</i> + 1) ' + M + ' f(<i>k</i>)') + ' for any number <i>k</i>?', mc: K.mcNum(a, [b, a + b, 1]), why: [m('f(<i>k</i> + 1) = ' + n(a) + '(<i>k</i> + 1)' + K.plusK(b) + ' = ' + P([[a, '<i>k</i>'], [a + b, '']])) + '.', m('f(<i>k</i>) = ' + P([[a, '<i>k</i>'], [b, '']])) + '.', 'Subtract: the <i>k</i>-terms cancel, leaving ' + n(a) + '. Increasing the input by 1 always adds the slope, ' + n(a) + '.'] });
      }
    ]
  ];
  K.lesson('3.2', { title: 'Function Notation & Evaluating Functions', std: 'MA.912.F.1.2', levels: u32 });

  /* ---------- 3.3 Average Rate of Change ---------- */
  var u33 = [
    [
      function () {
        var xs = [0, 1, 2, 3, 4, 5], a = pick([1, 2, -1]), b = ri(-3, 3), c = ri(-5, 8);
        var ys = xs.map(function (x) { return a * x * x + b * x + c; });
        var i = ri(0, 3), j = ri(i + 1, 5);
        var arc = R(ys[j] - ys[i], xs[j] - xs[i]);
        return Q({ q: 'Use the table. What is the average rate of change of ' + m('f') + ' from ' + m('<i>x</i> = ' + xs[i]) + ' to ' + m('<i>x</i> = ' + xs[j]) + '?' + K.xyTable(xs, ys, X, 'f(<i>x</i>)'), mc: K.mc(arc.html(), [R(xs[j] - xs[i], ys[j] - ys[i] || 1).html(), n(ys[j] - ys[i]), arc.neg().html()], function () { return arc.add(rnz(-3, 3)).html(); }), why: ['Average rate of change = ' + fr('change in output', 'change in input') + ' = ' + fr('f(' + xs[j] + ') ' + M + ' f(' + xs[i] + ')', xs[j] + ' ' + M + ' ' + xs[i]) + '.', 'From the table: ' + m(fr(n(ys[j]) + ' ' + M + ' ' + (ys[i] < 0 ? '(' + n(ys[i]) + ')' : n(ys[i])), xs[j] - xs[i]) + ' = ' + fr(n(ys[j] - ys[i]), xs[j] - xs[i]) + ' = ' + arc.html()) + '.'] });
      },
      function () {
        var t1 = ri(1, 3), t2 = t1 + ri(2, 4), d1 = ri(20, 80), sp = ri(30, 65), d2 = d1 + sp * (t2 - t1);
        return Q({ q: 'A car has traveled ' + d1 + ' miles after ' + t1 + ' hour' + (t1 > 1 ? 's' : '') + ' and ' + d2 + ' miles after ' + t2 + ' hours. What is its average speed (average rate of change) over that time?', mc: mc(sp + ' miles per hour', [Math.round(d2 / t2) === sp ? sp + 5 + ' miles per hour' : Math.round(d2 / t2) + ' miles per hour', (d2 - d1) + ' miles per hour', K.n(K.round((t2 - t1) / (d2 - d1), 3)) + ' miles per hour']), why: ['Average rate of change = ' + fr('change in distance', 'change in time') + '.', m(fr(d2 + ' ' + M + ' ' + d1, t2 + ' ' + M + ' ' + t1) + ' = ' + fr(d2 - d1, t2 - t1) + ' = ' + sp) + ' miles per hour.'] });
      }
    ],
    [
      function () {
        var a = pick([1, 2, 3, -1, -2]), b = ri(-4, 4), c = ri(-6, 6);
        var p = ri(-3, 2), q = p + ri(1, 4);
        var f = function (x) { return a * x * x + b * x + c; };
        var arc = R(f(q) - f(p), q - p);
        return Q({ q: 'Find the average rate of change of ' + m('f(<i>x</i>) = ' + P([[a, K.xp(2)], [b, X], [c, '']])) + ' over the interval ' + m('[' + n(p) + ', ' + n(q) + ']') + '.', mc: K.mc(arc.html(), [n(f(q) - f(p)), arc.neg().html(), R(f(q) + f(p), q - p).html()], function () { return arc.add(rnz(-4, 4)).html(); }), why: ['Find the outputs: ' + m('f(' + n(p) + ') = ' + n(f(p))) + ' and ' + m('f(' + n(q) + ') = ' + n(f(q))) + '.', 'Average rate of change = ' + m(fr(n(f(q)) + ' ' + M + ' ' + (f(p) < 0 ? '(' + n(f(p)) + ')' : n(f(p))), n(q) + ' ' + M + ' ' + (p < 0 ? '(' + n(p) + ')' : n(p))) + ' = ' + fr(n(f(q) - f(p)), q - p) + ' = ' + arc.html()) + '.'] });
      },
      function () {
        var x1 = ri(-5, 0), x2 = x1 + ri(2, 5), y1 = ri(-4, 4), mm = pick([R(1), R(-1), R(2), R(-2), R(1, 2), R(-1, 2), R(3, 2), R(-3, 2)]);
        var y2 = mm.mul(x2 - x1).add(y1);
        if (!y2.isInt() || Math.abs(y2.val()) > 6) return u33[1][0]();
        var g = K.plane({ x: [-6, 6], y: [-6, 6], fns: [{ f: function (x) { return y1 + 0.4 * (x - x1) * (x - x2) / (Math.max(1, (x2 - x1))) + mm.val() * (x - x1); } }], pts: [{ x: x1, y: y1, label: '(' + x1 + ', ' + y1 + ')' }, { x: x2, y: y2.val(), label: '(' + x2 + ', ' + y2.val() + ')' }] });
        return Q({ q: 'The curve passes through the two labeled points. What is the average rate of change of the function between them?', graph: g, mc: K.mc(mm.html(), [mm.neg().html(), R(mm.d, mm.n).html(), n(y2.val() - y1)], function () { return mm.add(rnz(-2, 2)).html(); }), why: ['Average rate of change only uses the two endpoints: it is the slope of the segment joining them.', m(fr(n(y2.val()) + ' ' + M + ' ' + (y1 < 0 ? '(' + n(y1) + ')' : n(y1)), n(x2) + ' ' + M + ' ' + (x1 < 0 ? '(' + n(x1) + ')' : n(x1))) + ' = ' + fr(n(y2.val() - y1), x2 - x1) + ' = ' + mm.html()) + '.'] });
      }
    ],
    [
      function () {
        var yr1 = 2000 + ri(0, 10), gap = pick([2, 4, 5]), yr2 = yr1 + gap, v1 = 100 * ri(20, 60), dr = pick([150, 200, 250, 300, 400]), v2 = v1 - dr * gap;
        return Q({ q: 'A car was worth $' + K.comma(v1) + ' in ' + yr1 + ' and $' + K.comma(v2) + ' in ' + yr2 + '. Which describes the average rate of change of its value?', mc: mc('It lost an average of $' + dr + ' per year.', ['It gained an average of $' + dr + ' per year.', 'It lost an average of $' + K.comma(dr * gap) + ' per year.', 'It lost an average of $' + K.comma(Math.round(v2 / gap)) + ' per year.'], function () { return 'It lost an average of $' + (dr + 50 * rnz(-3, 3)) + ' per year.'; }), why: ['Rate = ' + fr('change in value', 'change in years') + ' = ' + m(fr(K.comma(v2) + ' ' + M + ' ' + K.comma(v1), yr2 + ' ' + M + ' ' + yr1) + ' = ' + fr(M + K.comma(dr * gap), gap) + ' = ' + M + dr) + '.', 'Negative means the value went <b>down</b>: about $' + dr + ' per year.'] });
      },
      function () {
        var a = pick([1, 2, -1]), b = ri(-3, 3), c = ri(-4, 4);
        var f = function (x) { return a * x * x + b * x + c; };
        var p = ri(-3, 0), q = p + 2, r = p + 4;
        var r1 = R(f(q) - f(p), 2), r2 = R(f(r) - f(q), 2);
        if (r1.eq(r2)) return u33[2][0]();
        var bigger = r1.val() > r2.val() ? 'first' : 'second';
        var A = m('[' + n(p) + ', ' + n(q) + ']'), B = m('[' + n(q) + ', ' + n(r) + ']');
        return Q({ q: 'For ' + m('f(<i>x</i>) = ' + P([[a, K.xp(2)], [b, X], [c, '']])) + ', compare the average rate of change on ' + A + ' and on ' + B + '. Which is true?', mc: mc(bigger === 'first' ? 'It is greater on ' + A + '.' : 'It is greater on ' + B + '.', [bigger === 'first' ? 'It is greater on ' + B + '.' : 'It is greater on ' + A + '.', 'They are equal, because both intervals have width 2.', 'It cannot be found without a graph.']), why: ['On ' + A + ': ' + m(fr('f(' + n(q) + ') ' + M + ' f(' + n(p) + ')', 2) + ' = ' + fr(n(f(q)) + ' ' + M + ' ' + (f(p) < 0 ? '(' + n(f(p)) + ')' : n(f(p))), 2) + ' = ' + r1.html()) + '.', 'On ' + B + ': ' + m(fr(n(f(r)) + ' ' + M + ' ' + (f(q) < 0 ? '(' + n(f(q)) + ')' : n(f(q))), 2) + ' = ' + r2.html()) + '.', 'A quadratic’s rate of change is not constant, so equal widths can give different rates.'] });
      }
    ]
  ];
  K.lesson('3.3', { title: 'Average Rate of Change', std: 'MA.912.F.1.3', levels: u33 });

  /* ---------- 3.4 Graphing Linear Functions & Key Features ---------- */
  var SL = [R(1), R(2), R(3), R(-1), R(-2), R(-3), R(1, 2), R(-1, 2), R(1, 3), R(-1, 3), R(2, 3), R(-2, 3), R(3, 2), R(-3, 2)];
  function lineG(mm, bb, extra) { var o = { x: [-6, 6], y: [-6, 6], lines: [{ m: mm, b: bb }] }; if (extra) for (var k in extra) o[k] = extra[k]; return K.plane(o); }
  function nicePts(mm, bb) { // two lattice points on y = mx + b within window
    var pts = []; for (var x = -6; x <= 6; x++) { var y = mm.mul(x).add(bb); if (y.isInt() && Math.abs(y.val()) <= 5) pts.push([x, y.val()]); } return pts;
  }
  var u34 = [
    [
      function () {
        var mm = pick(SL), bb = ri(-4, 4), pts = nicePts(mm, bb);
        if (pts.length < 2) return u34[0][0]();
        var p1 = pts[0], p2 = pts[pts.length > 2 ? 1 : 1];
        return Q({ q: 'What is the slope of the line?', graph: lineG(mm, bb, { pts: [{ x: p1[0], y: p1[1] }, { x: p2[0], y: p2[1] }] }), mc: K.mc(mm.html(), [mm.neg().html(), R(mm.d, mm.n).html(), R(-mm.d, mm.n).html()], function () { return mm.add(rnz(-2, 2)).html(); }), why: ['Pick two points on the line, like ' + K.pt(p1[0], p1[1]) + ' and ' + K.pt(p2[0], p2[1]) + '.', 'Slope = ' + fr('rise', 'run') + ' = ' + m(fr(n(p2[1]) + ' ' + M + ' ' + (p1[1] < 0 ? '(' + n(p1[1]) + ')' : n(p1[1])), n(p2[0]) + ' ' + M + ' ' + (p1[0] < 0 ? '(' + n(p1[0]) + ')' : n(p1[0]))) + ' = ' + mm.html()) + '.', 'The line ' + (mm.n > 0 ? 'rises' : 'falls') + ' from left to right, so the slope is ' + (mm.n > 0 ? 'positive' : 'negative') + '.'] });
      },
      function () {
        var mm = pick(SL), bb = rnz(-4, 4);
        return Q({ q: 'What is the ' + Y + '-intercept of the line?', graph: lineG(mm, bb, { pts: [{ x: 0, y: bb }] }), mc: K.mc(K.pt(0, bb), [K.pt(bb, 0), K.pt(0, -bb), K.pt(0, mm.val() === Math.round(mm.val()) ? mm.val() : bb + 1)], function () { return K.pt(0, bb + rnz(-3, 3)); }), why: ['The ' + Y + '-intercept is where the line crosses the ' + Y + '-axis, where ' + m('<i>x</i> = 0') + '.', 'The line crosses at ' + K.pt(0, bb) + '.'] });
      },
      function () {
        var mm = rnz(-5, 5), bb = rnz(-9, 9);
        var which = K.coin();
        return Q({ q: 'For the line ' + m(K.lineEq(mm, bb)) + ', what is the ' + (which ? 'slope' : Y + '-intercept') + '?', mc: which ? K.mcNum(mm, [bb, -mm, mm + bb]) : K.mcNum(bb, [mm, -bb, bb - mm]), why: ['In slope-intercept form ' + m('<i>y</i> = <i>mx</i> + <i>b</i>') + ', <i>m</i> is the slope and <i>b</i> is the ' + Y + '-intercept.', 'Here ' + m('<i>m</i> = ' + n(mm)) + ' and ' + m('<i>b</i> = ' + n(bb)) + '.'] });
      }
    ],
    [
      function () {
        var a = rnz(-6, 6), b = rnz(-6, 6), xi = rnz(-6, 6), c = a * xi;
        // a x + b y = c, x-intercept xi
        return Q({ q: 'What is the ' + X + '-intercept of ' + m(P([[a, X], [b, Y]]) + ' = ' + n(c)) + '?', mc: K.mc(K.pt(xi, 0), [K.pt(0, xi), K.pt(R(c, b).html(), 0), K.pt(-xi, 0)], function () { return K.pt(xi + rnz(-3, 3), 0); }), why: ['At the ' + X + '-intercept, ' + m('<i>y</i> = 0') + '.', 'Substitute: ' + m(P([[a, X]]) + ' = ' + n(c)) + ', so ' + m('<i>x</i> = ' + n(xi)) + '.', 'The ' + X + '-intercept is ' + K.pt(xi, 0) + '.'] });
      },
      function () {
        var cap = ri(8, 20), rate = ri(2, 6), full = cap * rate;
        var opts = mc(m('0 ≤ <i>t</i> ≤ ' + cap), [m('0 ≤ <i>t</i> ≤ ' + full), m('<i>t</i> ≥ 0'), 'All real numbers']);
        return Q({ q: 'A tank fills at ' + rate + ' gallons per minute. It is empty at <i>t</i> = 0 and holds ' + full + ' gallons when full. The amount of water is ' + m('<i>W</i>(<i>t</i>) = ' + rate + '<i>t</i>') + '. What is a reasonable <b>domain</b> while it fills?', mc: opts, why: ['The domain is the set of inputs, here the times <i>t</i> in minutes.', 'It starts at 0 minutes and is full when ' + m(rate + '<i>t</i> = ' + full) + ', so ' + m('<i>t</i> = ' + cap) + '.', 'Domain: ' + m('0 ≤ <i>t</i> ≤ ' + cap) + '. (' + full + ' gallons is the top of the <b>range</b>, not the domain.)'] });
      },
      function () {
        var x1 = ri(-4, 0), dx = ri(1, 3), mm = rnz(-4, 4), b = ri(-5, 5);
        var xs = [x1, x1 + dx, x1 + 2 * dx, x1 + 3 * dx], ys = xs.map(function (x) { return mm * x + b; });
        var rate = R(mm * dx, dx);
        return Q({ q: 'The table shows a linear function. What is its rate of change?' + K.xyTable(xs, ys), mc: K.mcNum(mm, [mm * dx, -mm, ys[1] - ys[0] === mm ? mm + 1 : ys[1] - ys[0]]), why: ['Rate of change = ' + fr('change in ' + Y, 'change in ' + X) + '.', 'Each time ' + X + ' increases by ' + dx + ', ' + Y + ' changes by ' + n(mm * dx) + '.', m(fr(n(mm * dx), dx) + ' = ' + n(mm)) + '.'] });
      }
    ],
    [
      function () {
        var a = rnz(-5, 5), b = pick([-4, -3, -2, 2, 3, 4, 5, 6]), c = a * b * ri(-2, 2) || a * b;
        var mm = R(-a, b), bb = R(c, b);
        return Q({ q: 'What are the slope and ' + Y + '-intercept of ' + m(P([[a, X], [b, Y]]) + ' = ' + n(c)) + '?', mc: mc('slope ' + mm.html() + ', ' + Y + '-intercept ' + K.pt(0, bb), ['slope ' + mm.neg().html() + ', ' + Y + '-intercept ' + K.pt(0, bb), 'slope ' + R(a, 1).html() + ', ' + Y + '-intercept ' + K.pt(0, c), 'slope ' + mm.html() + ', ' + Y + '-intercept ' + K.pt(0, bb.neg().eq(bb) ? bb.add(1) : bb.neg())]), why: ['Solve for ' + Y + '. Subtract ' + m(P([[a, X]])) + ': ' + m(n(b) + '<i>y</i> = ' + P([[-a, X], [c, '']])) + '.', 'Divide by ' + n(b) + ': ' + m('<i>y</i> = ' + P([[mm, X], [bb, '']])) + '.', 'Slope ' + mm.html() + ', ' + Y + '-intercept ' + K.pt(0, bb) + '.'] });
      },
      function () {
        var start = 10 * ri(20, 50), rate = 5 * ri(2, 8), wks = Math.floor(start / rate);
        if (start % rate !== 0) start = rate * wks;
        var opts = mc('After ' + (start / rate) + ' weeks the gift card balance is $0.', ['The card starts with $' + (start / rate) + '.', 'The balance drops $' + (start / rate) + ' each week.', 'After ' + start + ' weeks the balance is $0.']);
        return Q({ q: 'A gift card balance is ' + m('<i>B</i>(<i>w</i>) = ' + start + ' ' + M + ' ' + rate + '<i>w</i>') + ' dollars after <i>w</i> weeks. What does the <i>w</i>-intercept, (' + (start / rate) + ', 0), tell you?', mc: opts, why: ['At the <i>w</i>-intercept the output (balance) is 0.', 'Solve ' + m(start + ' ' + M + ' ' + rate + '<i>w</i> = 0') + ': ' + m('<i>w</i> = ' + (start / rate)) + '.', 'So the card runs out after ' + (start / rate) + ' weeks.'] });
      },
      function () {
        var mm = pick(SL), bb = ri(-3, 3), pts = nicePts(mm, bb);
        if (pts.length < 2) return u34[2][0]();
        var correct = m(K.lineEq(mm, bb));
        return Q({ q: 'Which equation matches the graph?', graph: lineG(mm, bb), mc: mc(correct, [m(K.lineEq(mm.neg(), bb)), m(K.lineEq(R(mm.d, mm.n), bb)), m(K.lineEq(mm, -bb === bb ? bb + 2 : -bb))], function () { return m(K.lineEq(mm, bb + rnz(-3, 3))); }), why: ['The line crosses the ' + Y + '-axis at ' + n(bb) + ', so <i>b</i> = ' + n(bb) + '.', 'From ' + K.pt(pts[0][0], pts[0][1]) + ' to ' + K.pt(pts[1][0], pts[1][1]) + ': rise ' + n(pts[1][1] - pts[0][1]) + ' over run ' + n(pts[1][0] - pts[0][0]) + ', so the slope is ' + mm.html() + '.', 'Equation: ' + correct + '.'] });
      }
    ]
  ];
  K.lesson('3.4', { title: 'Graphing Linear Functions & Key Features', std: 'MA.912.AR.2.4', levels: u34 });

  /* ---------- 3.5 Real-World Linear Applications ---------- */
  var u35 = [
    [
      function () {
        var c = pick([['A taxi', 'a pickup fee of', 'per mile', '<i>m</i>', 'miles'], ['A phone plan', 'a monthly fee of', 'per gigabyte', '<i>g</i>', 'gigabytes'], ['A caterer', 'a setup fee of', 'per guest', '<i>g</i>', 'guests']]);
        var fee = ri(3, 60), rate = ri(2, 15), v = c[3]; if (fee === rate) fee += 5;
        var right = m('<i>C</i> = ' + rate + v + ' + ' + fee);
        return Q({ q: c[0] + ' charges ' + c[1] + ' $' + fee + ' plus $' + rate + ' ' + c[2] + '. Which function gives the total cost <i>C</i> for ' + v + ' ' + c[4] + '?', mc: mc(right, [m('<i>C</i> = ' + fee + v + ' + ' + rate), m('<i>C</i> = ' + (fee + rate) + v), m('<i>C</i> = ' + rate + v + ' ' + M + ' ' + fee)]), why: ['The amount that changes with ' + v + ' is the rate: $' + rate + ' ' + c[2] + ', so ' + m(rate + v) + '.', 'The one-time fee, $' + fee + ', is the constant.', 'Answer: ' + right + '.'] });
      },
      function () {
        var start = ri(50, 200), per = ri(5, 20), w = ri(3, 12);
        return Q({ q: 'Kai has $' + start + ' saved and adds $' + per + ' each week. How much will Kai have after ' + w + ' weeks?', mc: K.mcNum(start + per * w, [start + per, per * w, start * w]), why: ['Model: ' + m('<i>S</i>(<i>w</i>) = ' + per + '<i>w</i> + ' + start) + '.', m('<i>S</i>(' + w + ') = ' + per + '(' + w + ') + ' + start + ' = ' + (per * w) + ' + ' + start + ' = ' + (start + per * w)) + ' dollars.'] });
      }
    ],
    [
      function () {
        var fee = ri(20, 80), rate = ri(15, 45), h = ri(3, 12), tot = fee + rate * h;
        return Q({ q: 'An electrician charges ' + m('<i>C</i>(<i>h</i>) = ' + rate + '<i>h</i> + ' + fee) + ' dollars for <i>h</i> hours of work. A bill was $' + tot + '. How many hours did the electrician work?', mc: K.mcNum(h, [(tot + fee) / rate === Math.round((tot + fee) / rate) ? (tot + fee) / rate : h + 2, Math.round(tot / rate), h - 1]), why: ['Set the cost equal to ' + tot + ': ' + m(rate + '<i>h</i> + ' + fee + ' = ' + tot) + '.', 'Subtract ' + fee + ': ' + m(rate + '<i>h</i> = ' + (tot - fee)) + '.', 'Divide by ' + rate + ': ' + m('<i>h</i> = ' + h) + ' hours.'] });
      },
      function () {
        var drop = 5 * ri(2, 8), t = ri(8, 30); if (t === drop) t += 3; var h0 = drop * t;
        return Q({ q: 'A drone is ' + h0 + ' feet high and descends at ' + drop + ' feet per second, so ' + m('<i>H</i>(<i>t</i>) = ' + h0 + ' ' + M + ' ' + drop + '<i>t</i>') + '. What is a reasonable domain for the descent?', mc: mc(m('0 ≤ <i>t</i> ≤ ' + t), [m('0 ≤ <i>t</i> ≤ ' + h0), m('<i>t</i> ≥ 0'), m('0 ≤ <i>t</i> ≤ ' + drop)]), why: ['Time starts at 0 seconds.', 'The drone lands when ' + m('<i>H</i>(<i>t</i>) = 0') + ': ' + m(h0 + ' ' + M + ' ' + drop + '<i>t</i> = 0') + ', so ' + m('<i>t</i> = ' + t) + '.', 'Heights below 0 make no sense, so the domain is ' + m('0 ≤ <i>t</i> ≤ ' + t) + '.'] });
      }
    ],
    [
      function () {
        var a1 = ri(20, 50), r1 = ri(8, 15), a2 = a1 + ri(10, 40), r2 = r1 - ri(2, 6);
        // equal when a1 + r1 x = a2 + r2 x → x = (a2−a1)/(r1−r2)
        var x = (a2 - a1) / (r1 - r2);
        if (x !== Math.round(x)) { a2 = a1 + (r1 - r2) * ri(3, 9); x = (a2 - a1) / (r1 - r2); }
        return Q({ q: 'Gym A charges $' + a1 + ' to join plus $' + r1 + ' per month. Gym B charges $' + a2 + ' to join plus $' + r2 + ' per month. After how many months will the total cost be the same?', mc: K.mcNum(x, [x + 1, Math.round((a2 + a1) / (r1 + r2)), a2 - a1]), why: ['Gym A: ' + m(a1 + ' + ' + r1 + '<i>m</i>') + '. Gym B: ' + m(a2 + ' + ' + r2 + '<i>m</i>') + '.', 'Set equal: ' + m(a1 + ' + ' + r1 + '<i>m</i> = ' + a2 + ' + ' + r2 + '<i>m</i>') + '.', m((r1 - r2) + '<i>m</i> = ' + (a2 - a1)) + ', so ' + m('<i>m</i> = ' + x) + ' months.'] });
      },
      function () {
        var price = pick([4, 5, 6, 8]), cost = ri(60, 150), need = Math.ceil(cost / price) + 0;
        var profitN = need; // smallest n with price n − cost ≥ 0
        while (price * profitN - cost < 0) profitN++;
        return Q({ q: 'A club spent $' + cost + ' on supplies and sells bracelets for $' + price + ' each. Profit is ' + m('<i>P</i>(<i>b</i>) = ' + price + '<i>b</i> ' + M + ' ' + cost) + '. What is the <b>fewest</b> bracelets they must sell to not lose money?', mc: K.mcNum(profitN, [profitN - 1, Math.floor(cost / price) === profitN ? profitN + 1 : Math.floor(cost / price), cost - price]), why: ['Not losing money means ' + m('<i>P</i>(<i>b</i>) ≥ 0') + ': ' + m(price + '<i>b</i> ' + M + ' ' + cost + ' ≥ 0') + '.', m('<i>b</i> ≥ ' + fr(cost, price) + ' ≈ ' + K.n(K.round(cost / price, 2))) + '.', 'Bracelets are whole numbers, so the fewest is ' + profitN + '.'] });
      },
      function () {
        var slope = ri(2, 9), inter = ri(10, 50);
        var opts = mc('Each additional ticket sold adds $' + slope + ' to the total.', ['The club starts with ' + slope + ' tickets.', 'Each ticket costs $' + inter + '.', 'The total increases by $' + inter + ' for each ticket.']);
        return Q({ q: 'A fundraiser’s total in dollars is ' + m('<i>T</i>(<i>n</i>) = ' + slope + '<i>n</i> + ' + inter) + ', where <i>n</i> is the number of raffle tickets sold. What is the best interpretation of the slope?', mc: opts, why: ['The slope is the coefficient of <i>n</i>: ' + slope + '.', 'It is the change in total per ticket: each extra ticket adds $' + slope + '.', 'The ' + inter + ' is the starting amount (the intercept).'] });
      }
    ]
  ];
  K.lesson('3.5', { title: 'Real-World Linear Function Applications', std: 'MA.912.AR.2.5', levels: u35 });
  K.review(3, 'Unit 3 Review: Linear Functions & Graphing');
})(typeof window !== 'undefined' ? window.KCEP : globalThis.KCEP);
