/* Unit 1 — Solving Equations & Literal Equations */
(function (K) {
  var ri = K.ri, rnz = K.rnz, pick = K.pick, n = K.n, f = K.f, P = K.poly, X = K.x, Y = K.y, Q = K.Q, mc = K.mc, M = K.MINUS;
  var v = K.v, m = K.m;

  /* ---------- 1.1 Parts of Expressions ---------- */
  function expr3() { // ax^2 + bx + c with distinct nonzero coefficients
    var a, b, c;
    do { a = rnz(-9, 9); b = rnz(-9, 9); c = rnz(-12, 12); } while (Math.abs(a) === Math.abs(b) || Math.abs(b) === Math.abs(c) || Math.abs(a) === Math.abs(c) || a === 1 || a === -1);
    return { a: a, b: b, c: c, h: P([[a, K.xp(2)], [b, X], [c, '']]) };
  }
  var u11 = [
    [ // Level 1
      function () {
        var e = expr3();
        var what = pick(['coef', 'const', 'lead']);
        if (what === 'coef') return Q({ q: 'In the expression ' + m(e.h) + ', what is the <b>coefficient</b> of ' + X + '?', mc: K.mcNum(e.b, [-e.b, e.a, e.c]), why: ['A coefficient is the number multiplied by a variable.', 'The term with ' + X + ' is ' + m(P([[e.b, X]])) + ', so its coefficient is ' + n(e.b) + '. The sign belongs to the coefficient.'] });
        if (what === 'const') return Q({ q: 'In the expression ' + m(e.h) + ', what is the <b>constant term</b>?', mc: K.mcNum(e.c, [-e.c, e.a, e.b]), why: ['A constant is a term with no variable. Its value never changes.', 'The constant term here is ' + n(e.c) + '. Keep the sign in front of it.'] });
        return Q({ q: 'In the expression ' + m(e.h) + ', what is the coefficient of ' + K.xp(2) + '?', mc: K.mcNum(e.a, [-e.a, e.b, 2]), why: ['The ' + K.xp(2) + ' term is ' + m(P([[e.a, K.xp(2)]])) + '.', 'The number multiplying ' + K.xp(2) + ' is ' + n(e.a) + '. The exponent 2 is not the coefficient.'] });
      },
      function () {
        var k = ri(2, 5), terms = [];
        var pool = [[rnz(-9, 9), X], [rnz(-9, 9), K.xp(2)], [rnz(-9, 9), Y], [rnz(-9, 9), '<i>xy</i>'], [rnz(-15, 15), '']];
        terms = K.sample(pool, k);
        var h = P(terms);
        return Q({ q: 'How many <b>terms</b> are in the expression ' + m(h) + '?', mc: K.mcNum(k, [k - 1, k + 1, k + 2, 1].filter(function (z) { return z > 0; })), why: ['Terms are the parts of an expression separated by + or ' + M + ' signs.', 'Count them: ' + terms.map(function (t) { return m(P([t])); }).join(', ') + '. That is ' + k + ' terms.'] });
      },
      function () {
        var a = ri(2, 9), b = ri(2, 9), c = ri(2, 9);
        var h = P([[a, '<i>xy</i>'], [-b, X], [c, '']]);
        var opts = mc('<i>x</i> and <i>y</i>', [n(a) + ' and ' + n(b), n(c), '<i>x</i> only'], null);
        return Q({ q: 'Which are the <b>variables</b> in the expression ' + m(h) + '?', mc: opts, why: ['A variable is a letter that stands for a value that can change.', 'The letters here are ' + X + ' and ' + Y + '. The numbers ' + a + ', ' + b + ', and ' + c + ' are coefficients or constants.'] });
      }
    ],
    [ // Level 2
      function () {
        var a = ri(2, 6), b = rnz(-7, 7), c = rnz(-9, 9), d = rnz(-12, 12);
        var h = n(a) + '(' + P([[1, X], [b, '']]) + ')' + K.coef(c, false) + X + K.plusK(d);
        return Q({ q: 'How many terms are in ' + m(h) + '? (Treat any group in parentheses as one chunk.)', mc: K.mcNum(3, [4, 2, 5]), why: ['A product like ' + m(n(a) + '(' + P([[1, X], [b, '']]) + ')') + ' counts as <b>one</b> term, because the parentheses group it into a single chunk.', 'The terms are ' + m(n(a) + '(' + P([[1, X], [b, '']]) + ')') + ', ' + m(P([[c, X]])) + ', and ' + m(P([[d, '']])) + '. That is 3 terms.'] });
      },
      function () {
        var r = pick([[ri(12, 25), ri(25, 60), 'hour', 'A plumber', 'hours worked']]);
        var rate = ri(35, 95), fee = ri(40, 120);
        var opts = mc('The one-time fee of $' + fee, ['The hourly rate of $' + fee, 'The number of hours worked', 'The total cost after ' + fee + ' hours']);
        return Q({ q: 'A plumber’s total charge is ' + m('<i>C</i> = ' + rate + '<i>h</i> + ' + fee) + ', where <i>h</i> is the number of hours worked. What does the constant ' + fee + ' represent?', mc: opts, why: ['The constant term does not change when <i>h</i> changes.', 'So ' + fee + ' is charged no matter how many hours: it is a one-time fee. The coefficient ' + rate + ' is the hourly rate.'] });
      },
      function () {
        var a = ri(2, 9), b = ri(2, 9);
        var termH = n(a) + '<i>x</i><sup>2</sup><i>y</i>';
        var opts = mc(n(a) + ', ' + X + ', ' + X + ', and ' + Y, [n(a) + ' and ' + Y + ' only', K.xp(2) + ' only', n(a + 2) + ' and ' + Y]);
        return Q({ q: 'A term is a product of <b>factors</b>. Which list shows all the factors of the term ' + m(termH) + '?', mc: opts, why: [m(termH) + ' means ' + m(n(a) + ' · ' + X + ' · ' + X + ' · ' + Y) + '.', 'So its factors are ' + n(a) + ', ' + X + ', ' + X + ', and ' + Y + '.'] });
      }
    ],
    [ // Level 3
      function () {
        var p = ri(12, 60), t = pick([6, 7, 8]);
        var mult = '1.0' + t;
        var opts = mc('The price after a ' + t + '% tax is added', ['The amount of tax only', 'A ' + mult + '% tax rate', 'The price after a ' + t + '% discount']);
        return Q({ q: 'At a store, the expression ' + m(mult + '<i>p</i>') + ' gives the total cost of an item with original price <i>p</i> dollars. Which best describes what ' + m(mult + '<i>p</i>') + ' represents?', mc: opts, why: [m(mult + '<i>p</i>') + ' = ' + m('<i>p</i> + 0.0' + t + '<i>p</i>') + '.', 'That is the original price plus ' + t + '% of the price. So it is the price <b>with</b> a ' + t + '% tax added.'] });
      },
      function () {
        var a = ri(2, 6), b = ri(2, 9), c = ri(2, 9), d = ri(1, 9);
        // a(x − b) + cx − d simplifies to (a+c)x − (ab + d)
        var h = n(a) + '(' + P([[1, X], [-b, '']]) + ') + ' + n(c) + X + ' ' + M + ' ' + d;
        var A = a + c, B = -(a * b + d);
        var right = P([[A, X], [B, '']]);
        var opts = mc(m(right), [m(P([[A, X], [-(b + d), '']])), m(P([[a * c, X], [B, '']])), m(P([[A, X], [a * b - d, '']]))], function () { return m(P([[A + rnz(-2, 2), X], [B + rnz(-4, 4), '']])); });
        return Q({ q: 'Which expression is equivalent to ' + m(h) + '?', mc: opts, why: ['Distribute ' + a + ': ' + m(n(a) + '(' + P([[1, X], [-b, '']]) + ') = ' + P([[a, X], [-a * b, '']])) + '.', 'Combine like terms: ' + m(P([[a, X], [c, X]]).replace(/^/, '') + ' = ' + P([[A, X]])) + ' and ' + m(n(-a * b) + ' ' + M + ' ' + d + ' = ' + n(B)) + '.', 'Result: ' + m(right) + '.'] });
      },
      function () {
        var w = ri(3, 9), cost = ri(8, 20), bonus = ri(15, 60);
        var opts = mc('The number of hours each employee works', ['The number of employees', 'The total pay', 'The bonus each employee gets']);
        return Q({ q: 'A manager uses ' + m('<i>T</i> = <i>e</i>(' + cost + '<i>h</i> + ' + bonus + ')') + ' for the total weekly pay of <i>e</i> employees. Each employee earns $' + cost + ' per hour plus a $' + bonus + ' bonus. What does <i>h</i> represent?', mc: opts, why: ['Inside the parentheses, ' + m(cost + '<i>h</i> + ' + bonus) + ' is one employee’s pay: $' + cost + ' times the hours, plus the bonus.', 'So <i>h</i> is the number of hours each employee works. The chunk in parentheses is multiplied by <i>e</i>, the number of employees.'] });
      }
    ]
  ];
  K.lesson('1.1', { title: 'Parts of Expressions & Equations', std: 'MA.912.AR.1.1', levels: u11 });

  /* ---------- 1.2 Literal Equations ---------- */
  var u12 = [
    [
      function () {
        var F = pick([
          ['<i>d</i> = <i>rt</i>', '<i>t</i>', ['<i>t</i> = ' + fr('<i>d</i>', '<i>r</i>'), '<i>t</i> = <i>dr</i>', '<i>t</i> = ' + fr('<i>r</i>', '<i>d</i>'), '<i>t</i> = <i>d</i> ' + M + ' <i>r</i>'], 'Divide both sides by <i>r</i>.'],
          ['<i>A</i> = <i>lw</i>', '<i>w</i>', ['<i>w</i> = ' + fr('<i>A</i>', '<i>l</i>'), '<i>w</i> = <i>Al</i>', '<i>w</i> = ' + fr('<i>l</i>', '<i>A</i>'), '<i>w</i> = <i>A</i> ' + M + ' <i>l</i>'], 'Divide both sides by <i>l</i>.'],
          ['<i>P</i> = 4<i>s</i>', '<i>s</i>', ['<i>s</i> = ' + fr('<i>P</i>', '4'), '<i>s</i> = 4<i>P</i>', '<i>s</i> = <i>P</i> ' + M + ' 4', '<i>s</i> = ' + fr('4', '<i>P</i>')], 'Divide both sides by 4.'],
          ['<i>V</i> = <i>lwh</i>', '<i>h</i>', ['<i>h</i> = ' + fr('<i>V</i>', '<i>lw</i>'), '<i>h</i> = <i>Vlw</i>', '<i>h</i> = ' + fr('<i>lw</i>', '<i>V</i>'), '<i>h</i> = <i>V</i> ' + M + ' <i>lw</i>'], 'Divide both sides by <i>lw</i>.'],
          ['<i>y</i> = <i>x</i> + <i>b</i>', '<i>b</i>', ['<i>b</i> = <i>y</i> ' + M + ' <i>x</i>', '<i>b</i> = <i>y</i> + <i>x</i>', '<i>b</i> = <i>x</i> ' + M + ' <i>y</i>', '<i>b</i> = <i>xy</i>'], 'Subtract <i>x</i> from both sides.'],
          ['<i>C</i> = 2π<i>r</i>', '<i>r</i>', ['<i>r</i> = ' + fr('<i>C</i>', '2π'), '<i>r</i> = 2π<i>C</i>', '<i>r</i> = <i>C</i> ' + M + ' 2π', '<i>r</i> = ' + fr('2π', '<i>C</i>')], 'Divide both sides by 2π.']
        ]);
        return Q({ q: 'Solve ' + m(F[0]) + ' for ' + F[1] + '.', mc: mc(m(F[2][0]), F[2].slice(1).map(m)), why: ['To isolate ' + F[1] + ', undo the operation attached to it.', F[3], 'Result: ' + m(F[2][0]) + '.'] });
      },
      function () {
        var a = ri(2, 9), b = ri(1, 15);
        // y = ax + b → x = (y − b)/a
        var right = '<i>x</i> = ' + fr('<i>y</i> ' + M + ' ' + b, a);
        return Q({ q: 'Solve ' + m('<i>y</i> = ' + a + '<i>x</i> + ' + b) + ' for ' + X + '.', mc: mc(m(right), [m('<i>x</i> = ' + fr('<i>y</i> + ' + b, a)), m('<i>x</i> = ' + fr('<i>y</i>', a) + ' ' + M + ' ' + b), m('<i>x</i> = ' + a + '<i>y</i> ' + M + ' ' + b)]), why: ['Subtract ' + b + ' from both sides: ' + m('<i>y</i> ' + M + ' ' + b + ' = ' + a + '<i>x</i>') + '.', 'Divide both sides by ' + a + ': ' + m(right) + '. The whole side ' + m('<i>y</i> ' + M + ' ' + b) + ' is divided by ' + a + '.'] });
      }
    ],
    [
      function () {
        var F = pick([
          ['<i>P</i> = 2<i>l</i> + 2<i>w</i>', '<i>l</i>', ['<i>l</i> = ' + fr('<i>P</i> ' + M + ' 2<i>w</i>', '2'), '<i>l</i> = <i>P</i> ' + M + ' <i>w</i>', '<i>l</i> = ' + fr('<i>P</i>', '2') + ' ' + M + ' 2<i>w</i>', '<i>l</i> = ' + fr('<i>P</i> + 2<i>w</i>', '2')], ['Subtract 2<i>w</i> from both sides: ' + m('<i>P</i> ' + M + ' 2<i>w</i> = 2<i>l</i>') + '.', 'Divide both sides by 2.']],
          ['<i>A</i> = ' + fr('1', '2') + '<i>bh</i>', '<i>h</i>', ['<i>h</i> = ' + fr('2<i>A</i>', '<i>b</i>'), '<i>h</i> = ' + fr('<i>A</i>', '2<i>b</i>'), '<i>h</i> = 2<i>Ab</i>', '<i>h</i> = ' + fr('<i>b</i>', '2<i>A</i>')], ['Multiply both sides by 2: ' + m('2<i>A</i> = <i>bh</i>') + '.', 'Divide both sides by <i>b</i>.']],
          ['<i>ax</i> + <i>by</i> = <i>c</i>', '<i>y</i>', ['<i>y</i> = ' + fr('<i>c</i> ' + M + ' <i>ax</i>', '<i>b</i>'), '<i>y</i> = <i>c</i> ' + M + ' <i>ax</i> ' + M + ' <i>b</i>', '<i>y</i> = ' + fr('<i>c</i> + <i>ax</i>', '<i>b</i>'), '<i>y</i> = ' + fr('<i>c</i>', '<i>b</i>') + ' ' + M + ' <i>ax</i>'], ['Subtract <i>ax</i> from both sides: ' + m('<i>by</i> = <i>c</i> ' + M + ' <i>ax</i>') + '.', 'Divide both sides by <i>b</i>.']],
          ['<i>F</i> = ' + fr('9', '5') + '<i>C</i> + 32', '<i>C</i>', ['<i>C</i> = ' + fr('5', '9') + '(<i>F</i> ' + M + ' 32)', '<i>C</i> = ' + fr('9', '5') + '(<i>F</i> ' + M + ' 32)', '<i>C</i> = ' + fr('5', '9') + '<i>F</i> ' + M + ' 32', '<i>C</i> = ' + fr('5', '9') + '(<i>F</i> + 32)'], ['Subtract 32 from both sides: ' + m('<i>F</i> ' + M + ' 32 = ' + fr('9', '5') + '<i>C</i>') + '.', 'Multiply both sides by ' + fr('5', '9') + ', the reciprocal of ' + fr('9', '5') + '.']],
          ['<i>y</i> = <i>mx</i> + <i>b</i>', '<i>m</i>', ['<i>m</i> = ' + fr('<i>y</i> ' + M + ' <i>b</i>', '<i>x</i>'), '<i>m</i> = <i>y</i> ' + M + ' <i>b</i> ' + M + ' <i>x</i>', '<i>m</i> = ' + fr('<i>y</i>', '<i>x</i>') + ' ' + M + ' <i>b</i>', '<i>m</i> = ' + fr('<i>y</i> + <i>b</i>', '<i>x</i>')], ['Subtract <i>b</i> from both sides: ' + m('<i>y</i> ' + M + ' <i>b</i> = <i>mx</i>') + '.', 'Divide both sides by <i>x</i>.']],
          ['<i>I</i> = <i>Prt</i>', '<i>r</i>', ['<i>r</i> = ' + fr('<i>I</i>', '<i>Pt</i>'), '<i>r</i> = <i>IPt</i>', '<i>r</i> = ' + fr('<i>Pt</i>', '<i>I</i>'), '<i>r</i> = <i>I</i> ' + M + ' <i>Pt</i>'], ['<i>r</i> is multiplied by both <i>P</i> and <i>t</i>.', 'Divide both sides by <i>Pt</i>.']]
        ]);
        return Q({ q: 'Solve ' + m(F[0]) + ' for ' + F[1] + '.', mc: mc(m(F[2][0]), F[2].slice(1).map(m)), why: F[3].concat(['Result: ' + m(F[2][0]) + '.']) });
      },
      function () {
        var a = ri(2, 7), b = ri(2, 7), c = ri(6, 30);
        // a x + b y = c → y = (c − a x)/b
        var right = '<i>y</i> = ' + fr(c + ' ' + M + ' ' + a + '<i>x</i>', b);
        return Q({ q: 'Solve ' + m(a + '<i>x</i> + ' + b + '<i>y</i> = ' + c) + ' for ' + Y + '.', mc: mc(m(right), [m('<i>y</i> = ' + fr(c + ' + ' + a + '<i>x</i>', b)), m('<i>y</i> = ' + c + ' ' + M + ' ' + a + '<i>x</i> ' + M + ' ' + b), m('<i>y</i> = ' + fr(c, b) + ' ' + M + ' ' + a + '<i>x</i>')]), why: ['Subtract ' + a + '<i>x</i> from both sides: ' + m(b + '<i>y</i> = ' + c + ' ' + M + ' ' + a + '<i>x</i>') + '.', 'Divide <b>every</b> term on the right by ' + b + ': ' + m(right) + '.'] });
      }
    ],
    [
      function () {
        var w = ri(4, 15), l = ri(w + 1, w + 20), Pp = 2 * l + 2 * w;
        return Q({ q: 'The perimeter of a rectangle is ' + m('<i>P</i> = 2<i>l</i> + 2<i>w</i>') + '. A rectangular garden has a perimeter of ' + Pp + ' feet and a width of ' + w + ' feet. What is its length, in feet?', mc: K.mcNum(l, [Pp - w, (Pp - w) / 2, Pp / 2 - 2 * w, l + w].filter(function (z) { return z > 0 && z === Math.round(z); })), why: ['Solve for <i>l</i> first: ' + m('<i>l</i> = ' + fr('<i>P</i> ' + M + ' 2<i>w</i>', '2')) + '.', 'Substitute: ' + m('<i>l</i> = ' + fr(Pp + ' ' + M + ' 2(' + w + ')', '2') + ' = ' + fr(Pp - 2 * w, 2) + ' = ' + l) + ' feet.'] });
      },
      function () {
        var a = ri(2, 9), b = ri(2, 9), c = a * b * ri(1, 4);
        // a x + b y = c, y in terms of x: y = c/b − (a/b)x
        var s1 = K.R(c, b), s2 = K.R(-a, b);
        var right = '<i>y</i> = ' + P([[s1, ''], [s2, X]]);
        return Q({ q: 'If ' + m(a + '<i>x</i> + ' + b + '<i>y</i> = ' + c) + ', which equation gives ' + Y + ' in terms of ' + X + '?', mc: mc(m(right), [m('<i>y</i> = ' + P([[s1, ''], [s2.neg(), X]])), m('<i>y</i> = ' + P([[c - a, ''], [-1, X]]).replace(/^/, '')), m('<i>y</i> = ' + P([[K.R(c, a), ''], [K.R(-b, a), X]]))], function () { return m('<i>y</i> = ' + P([[s1.add(rnz(-3, 3)), ''], [s2, X]])); }), why: ['Subtract ' + a + '<i>x</i>: ' + m(b + '<i>y</i> = ' + c + ' ' + M + ' ' + a + '<i>x</i>') + '.', 'Divide every term by ' + b + ': ' + m(right) + '.'] });
      },
      function () {
        var Pr = pick([500, 800, 1000, 1200, 1500, 2000]), t = ri(2, 6), rp = pick([2, 3, 4, 5, 6]), I = Pr * rp / 100 * t;
        return Q({ q: 'Simple interest is ' + m('<i>I</i> = <i>Prt</i>') + ', where <i>r</i> is the yearly rate as a decimal. An account earned $' + K.comma(I) + ' in interest on $' + K.comma(Pr) + ' over ' + t + ' years. What was the yearly interest rate?', mc: mc(rp + '%', [(rp * t) + '%', K.n(K.round(I / Pr, 3)) + '%', K.n(K.round(rp / t, 2)) + '%'], function () { return ri(1, 12) + '%'; }), why: ['Solve for <i>r</i>: ' + m('<i>r</i> = ' + fr('<i>I</i>', '<i>Pt</i>')) + '.', 'Substitute: ' + m('<i>r</i> = ' + fr(K.comma(I), K.comma(Pr) + ' · ' + t) + ' = ' + fr(K.comma(I), K.comma(Pr * t)) + ' = ' + K.n(rp / 100)) + '.', 'As a percent, 0.0' + rp + ' = ' + rp + '%.'] });
      }
    ]
  ];
  function fr(a, b) { return '<span class="fr"><span class="nu">' + a + '</span><span class="de">' + b + '</span></span>'; }
  K.lesson('1.2', { title: 'Literal Equations', std: 'MA.912.AR.1.2', levels: u12 });

  /* ---------- 1.3 Multi-Step Linear Equations ---------- */
  var u13 = [
    [
      function () {
        var a = rnz(-9, 9), x = ri(-10, 10), b = rnz(-15, 15); if (a === 1) a = 3;
        var c = a * x + b;
        var eq = P([[a, X], [b, '']]) + ' = ' + n(c);
        var wrong = [(c + b) / a, c - b, (c - b) * a, -x].filter(function (z) { return z === Math.round(z); });
        return Q({ q: 'Solve for ' + X + ': ' + m(eq), mc: K.mcNum(x, wrong), why: [(b > 0 ? 'Subtract ' + b : 'Add ' + Math.abs(b)) + ' on both sides: ' + m(P([[a, X]]) + ' = ' + n(c - b)) + '.', 'Divide both sides by ' + n(a) + ': ' + m('<i>x</i> = ' + n(x)) + '.', 'Check: ' + m(K.lin([[a, n(x)]]) + K.plusK(b) + ' = ' + n(c)) + ' ✔'] });
      },
      function () {
        var a = ri(2, 6), x = ri(-8, 12), b = rnz(-9, 9), c = a * (x + b);
        var eq = a + '(' + P([[1, X], [b, '']]) + ') = ' + n(c);
        return Q({ q: 'Solve for ' + X + ': ' + m(eq), mc: K.mcNum(x, [c / a + b, c - b, (c - b) / a].filter(function (z) { return z === Math.round(z); })), why: ['Divide both sides by ' + a + ' (or distribute first): ' + m(P([[1, X], [b, '']]) + ' = ' + n(c / a)) + '.', (b > 0 ? 'Subtract ' + b : 'Add ' + Math.abs(b)) + ': ' + m('<i>x</i> = ' + n(x)) + '.'] });
      }
    ],
    [
      function () {
        var x = ri(-9, 9), a, c; do { a = rnz(-8, 9); c = rnz(-8, 9); } while (a === c);
        var b = rnz(-15, 15), d = (a - c) * x + b;
        var eq = P([[a, X], [b, '']]) + ' = ' + P([[c, X], [d, '']]);
        var wrong = [(d - b) / (a + c), (d + b) / (a - c), (b - d) / (a - c)].filter(function (z) { return isFinite(z) && z === Math.round(z); });
        return Q({ q: 'Solve for ' + X + ': ' + m(eq), mc: K.mcNum(x, wrong), why: ['Get the ' + X + '-terms on one side: ' + (c > 0 ? 'subtract ' + m(P([[c, X]])) : 'add ' + m(P([[-c, X]]))) + ' on both sides to get ' + m(P([[a - c, X], [b, '']]) + ' = ' + n(d)) + '.', 'Move the constant: ' + m(P([[a - c, X]]) + ' = ' + n(d - b)) + '.', 'Divide by ' + n(a - c) + ': ' + m('<i>x</i> = ' + n(x)) + '.'] });
      },
      function () {
        var a = ri(2, 6), b = rnz(-6, 6), c = rnz(-5, 7), x = ri(-8, 10), d = rnz(-9, 9);
        // a(x + b) + c x = R
        var R = a * (x + b) + c * x + d;
        var eq = a + '(' + P([[1, X], [b, '']]) + ')' + K.coef(c, false) + X + K.plusK(d) + ' = ' + n(R);
        if (a + c === 0) return u13[1][0]();
        var wrongs = [(R - d - b) / (a + c), (R - d - a * b) / a, (R + d - a * b) / (a + c)].filter(function (z) { return z === Math.round(z); });
        return Q({ q: 'Solve for ' + X + ': ' + m(eq), mc: K.mcNum(x, wrongs), why: ['Distribute: ' + m(P([[a, X], [a * b, '']]) + K.coef(c, false) + X + K.plusK(d) + ' = ' + n(R)) + '.', 'Combine like terms: ' + m(P([[a + c, X], [a * b + d, '']]) + ' = ' + n(R)) + '.', 'Undo the constant: ' + m(P([[a + c, X]]) + ' = ' + n(R - a * b - d)) + '.', 'Divide by ' + n(a + c) + ': ' + m('<i>x</i> = ' + n(x)) + '.'] });
      }
    ],
    [
      function () {
        var fee = ri(15, 60), rate = ri(8, 25), h = ri(3, 14), tot = fee + rate * h;
        var item = pick([['bike rental', 'hours'], ['kayak rental', 'hours'], ['moving truck', 'hours']]);
        return Q({ q: 'A ' + item[0] + ' costs a $' + fee + ' flat fee plus $' + rate + ' per hour. Maria’s total bill was $' + tot + '. How many hours did she rent it?', mc: K.mcNum(h, [Math.round(tot / rate), h + 1, (tot + fee) / rate].filter(function (z) { return z === Math.round(z) && z > 0; })), why: ['Write the equation: ' + m(fee + ' + ' + rate + '<i>h</i> = ' + tot) + '.', 'Subtract ' + fee + ': ' + m(rate + '<i>h</i> = ' + (tot - fee)) + '.', 'Divide by ' + rate + ': ' + m('<i>h</i> = ' + h) + ' hours.'] });
      },
      function () {
        var a = ri(2, 5), b = rnz(-6, 6), c = ri(2, 7), x = ri(-6, 9), k = rnz(-5, 5);
        if (c === a) c = a + 1;
        // a(x + b) = c x + d, ask for x + k
        var d = a * (x + b) - c * x;
        var eq = a + '(' + P([[1, X], [b, '']]) + ') = ' + P([[c, X], [d, '']]);
        var ans = x + k;
        return Q({ q: 'If ' + m(eq) + ', what is the value of ' + m(P([[1, X], [k, '']])) + '?', mc: K.mcNum(ans, [x, x - k, -ans]), why: ['Distribute: ' + m(P([[a, X], [a * b, '']]) + ' = ' + P([[c, X], [d, '']])) + '.', 'Collect ' + X + '-terms: ' + m(P([[a - c, X]]) + ' = ' + n(d - a * b)) + ', so ' + m('<i>x</i> = ' + n(x)) + '.', 'The question asks for ' + m(P([[1, X], [k, '']])) + ': ' + m(n(x) + K.plusK(k) + ' = ' + n(ans)) + '.'] });
      },
      function () {
        var d = pick([2, 3, 4, 5]), x = d * ri(-5, 6), b = rnz(-8, 8), c = x / d + b;
        // x/d + b = c
        var eq = fr('<i>x</i>', d) + K.plusK(b) + ' = ' + n(c);
        return Q({ q: 'Solve for ' + X + ': ' + m(eq), mc: K.mcNum(x, [c * d - b, (c - b), (c - b) / d].filter(function (z) { return z === Math.round(z); })), why: [(b > 0 ? 'Subtract ' + b : 'Add ' + Math.abs(b)) + ' on both sides: ' + m(fr('<i>x</i>', d) + ' = ' + n(c - b)) + '.', 'Multiply both sides by ' + d + ': ' + m('<i>x</i> = ' + n(x)) + '.'] });
      }
    ]
  ];
  K.lesson('1.3', { title: 'Multi-Step Linear Equations', std: 'MA.912.AR.2.1', levels: u13 });
  K.review(1, 'Unit 1 Review: Solving Equations & Literal Equations');
})(typeof window !== 'undefined' ? window.KCEP : globalThis.KCEP);
