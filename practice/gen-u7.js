/* Unit 7 — Polynomials, Radicals & Factoring */
(function (K) {
  var ri = K.ri, rnz = K.rnz, pick = K.pick, n = K.n, P = K.poly, X = K.x, Y = K.y, Q = K.Q, mc = K.mc, M = K.MINUS, m = K.m, fr = K.frx, R = K.R;
  // polynomial as array of coefficients c[p] for x^p
  function ph(c, v) { var t = []; for (var p = c.length - 1; p >= 0; p--) t.push([c[p] || 0, K.xp(p, v)]); return P(t); }
  function padd(a, b, s) { s = s === undefined ? 1 : s; var r = []; for (var i = 0; i < Math.max(a.length, b.length); i++) r[i] = (a[i] || 0) + s * (b[i] || 0); return trim(r); }
  function pmul(a, b) { var r = []; for (var i = 0; i < a.length; i++) for (var j = 0; j < b.length; j++) r[i + j] = (r[i + j] || 0) + a[i] * (b[j] || 0); for (var k = 0; k < r.length; k++) r[k] = r[k] || 0; return trim(r); }
  function trim(r) { while (r.length > 1 && !r[r.length - 1]) r.pop(); return r; }
  function rpoly(deg, lo, hi, lead) { var c = []; for (var i = 0; i <= deg; i++) c[i] = ri(lo, hi); c[deg] = lead || rnz(lo, hi); return c; }
  function bin(a, b) { return '(' + P([[a, X], [b, '']]) + ')'; } // (ax + b)

  /* ---------- 7.1 Adding & Subtracting Polynomials ---------- */
  var u71 = [
    [
      function () {
        var deg = ri(2, 5), c = rpoly(deg, -9, 9); var terms = [];
        for (var p = 0; p <= deg; p++) if (c[p]) terms.push([c[p], K.xp(p)]);
        var shuffled = K.shuffle(terms);
        var ask = pick(['deg', 'lead']);
        if (ask === 'deg') return Q({ q: 'What is the degree of ' + m(P(shuffled)) + '?', mc: K.mcNum(deg, [terms.length, deg + 1, c[deg]]), why: ['The degree is the highest exponent on the variable.', 'The highest power is ' + m(K.xp(deg)) + ', so the degree is ' + deg + '.'] });
        return Q({ q: 'Write ' + m(P(shuffled)) + ' in standard form. What is the <b>leading coefficient</b>?', mc: K.mcNum(c[deg], [shuffled[0][0] !== c[deg] ? shuffled[0][0] : -c[deg], deg, -c[deg]]), why: ['Standard form lists terms from the highest power to the lowest: ' + m(ph(c)) + '.', 'The leading coefficient is the coefficient of the first term: ' + n(c[deg]) + '.'] });
      },
      function () {
        var a = rpoly(2, -9, 9), b = rpoly(2, -9, 9), s = padd(a, b);
        return Q({ q: 'Add: ' + m('(' + ph(a) + ') + (' + ph(b) + ')'), mc: mc(m(ph(s)), [m(ph(padd(a, b, -1))), m(ph([s[0], s[1], (a[2] || 0) * (b[2] || 0)])), m(ph([s[0] + 1, s[1], s[2]]))], function () { return m(ph([s[0] + rnz(-3, 3), s[1], s[2]])); }), why: ['Combine like terms: ' + K.xp(2) + '-terms, ' + X + '-terms, and constants.', m(K.xp(2)) + ': ' + m(n(a[2]) + ' + ' + (b[2] < 0 ? '(' + n(b[2]) + ')' : n(b[2])) + ' = ' + n(s[2] || 0)) + '; ' + X + ': ' + m(n(a[1]) + ' + ' + (b[1] < 0 ? '(' + n(b[1]) + ')' : n(b[1])) + ' = ' + n(s[1] || 0)) + '; constants: ' + m(n(a[0]) + ' + ' + (b[0] < 0 ? '(' + n(b[0]) + ')' : n(b[0])) + ' = ' + n(s[0])) + '.', 'Sum: ' + m(ph(s)) + '.'] });
      }
    ],
    [
      function () {
        var a = rpoly(2, -9, 9), b = rpoly(2, -9, 9), d = padd(a, b, -1);
        var wrongSign = [a[0] + b[0], a[1] - b[1], a[2] - b[2]]; // only first term distributed
        return Q({ q: 'Subtract: ' + m('(' + ph(a) + ') ' + M + ' (' + ph(b) + ')'), mc: mc(m(ph(d)), [m(ph(padd(a, b))), m(ph(trim([a[0] + b[0], a[1] + b[1], a[2] - b[2]]))), m(ph(trim([a[0] - b[0], a[1] + b[1], a[2] - b[2]])))], function () { return m(ph(trim([d[0] + rnz(-3, 3), d[1] || 0, d[2] || 0]))); }), why: ['Subtracting a polynomial means subtracting <b>every</b> term: distribute the negative sign.', m(M + '(' + ph(b) + ') = ' + ph(b.map(function (z) { return -z; })) ) + '.', 'Now combine like terms: ' + m(ph(d)) + '.'] });
      },
      function () {
        var a = rpoly(3, -6, 6), b = rpoly(2, -6, 6), s = padd(a, b);
        return Q({ q: 'Simplify ' + m('(' + ph(a) + ') + (' + ph(b) + ')') + '. What is the coefficient of ' + m(K.xp(2)) + '?', mc: K.mcNum(s[2] || 0, [a[2] || 0, (a[2] || 0) - (b[2] || 0), s[3] || 0]), why: ['Only like terms combine. The ' + K.xp(2) + '-terms are ' + m(P([[a[2] || 0, K.xp(2)]])) + ' and ' + m(P([[b[2] || 0, K.xp(2)]])) + '.', m(n(a[2] || 0) + ' + ' + ((b[2] || 0) < 0 ? '(' + n(b[2]) + ')' : n(b[2] || 0)) + ' = ' + n(s[2] || 0)) + '.'] });
      }
    ],
    [
      function () {
        var l = [ri(-5, 5), ri(1, 6)], w = [ri(-4, 4), ri(1, 5)];
        var per = padd(l, w).map(function (z) { return 2 * z; });
        return Q({ q: 'A rectangle has length ' + m(ph(l)) + ' and width ' + m(ph(w)) + '. Which expression is its perimeter?', mc: mc(m(ph(per)), [m(ph(padd(l, w))), m(ph(pmul(l, w))), m(ph([per[0], per[1] / 2]))], function () { return m(ph([per[0] + rnz(-3, 3), per[1]])); }), why: ['Perimeter = 2(length) + 2(width).', m('2(' + ph(l) + ') + 2(' + ph(w) + ') = ' + ph(l.map(function (z) { return 2 * z; })) + ' + ' + ph(w.map(function (z) { return 2 * z; }))).replace('+ ' + M, M + ' ') + '.', 'Combine: ' + m(ph(per)) + '.'] });
      },
      function () {
        var a = rpoly(2, -8, 8), d = rpoly(2, -8, 8), b = padd(a, d, -1);
        // (a) − (?) = d → ? = a − d = b
        return Q({ q: 'What polynomial must be subtracted from ' + m(ph(a)) + ' to get ' + m(ph(d)) + '?', mc: mc(m(ph(b)), [m(ph(padd(d, a, -1))), m(ph(padd(a, d))), m(ph(trim([b[0], b[1] || 0, -(b[2] || 0)])))], function () { return m(ph(trim([b[0] + rnz(-3, 3), b[1] || 0, b[2] || 0]))); }), why: ['If ' + m('<i>A</i> ' + M + ' <i>B</i> = <i>D</i>') + ', then ' + m('<i>B</i> = <i>A</i> ' + M + ' <i>D</i>') + '.', m('(' + ph(a) + ') ' + M + ' (' + ph(d) + ') = ' + ph(b)) + '.', 'Check: ' + m('(' + ph(a) + ') ' + M + ' (' + ph(b) + ') = ' + ph(d)) + ' ✔'] });
      }
    ]
  ];
  K.lesson('7.1', { title: 'Adding & Subtracting Polynomials', std: 'MA.912.AR.1.3', levels: u71 });

  /* ---------- 7.2 Multiplying Polynomials ---------- */
  var u72 = [
    [
      function () {
        var k = rnz(-6, 6), p = ri(1, 3), b = rpoly(2, -7, 7);
        var mon = []; mon[p] = k; for (var i = 0; i < p; i++) mon[i] = 0;
        var r = pmul(mon, b);
        return Q({ q: 'Multiply: ' + m(ph(mon) + '(' + ph(b) + ')'), mc: mc(m(ph(r)), [m(ph(padd(b, mon))), m(ph(trim([b[0] * k, b[1], b[2]]).concat())), m(ph(pmul([0, k], b)))].filter(function (z, i) { return !(i === 2 && p === 1); }), function () { return m(ph(trim(r.map(function (z, i) { return i === r.length - 1 ? z + rnz(-2, 2) : z; })))); }), why: ['Distribute ' + m(ph(mon)) + ' to <b>each</b> term inside.', 'Multiply coefficients and add exponents: ' + m(ph(r)) + '.'] });
      },
      function () {
        var a = rnz(-7, 7), b = rnz(-7, 7);
        var r = pmul([a, 1], [b, 1]);
        return Q({ q: 'Multiply: ' + m(bin(1, a) + bin(1, b)), mc: mc(m(ph(r)), [m(ph([a * b, 0, 1])), m(ph([a + b, a * b, 1])), m(ph([a * b, a - b, 1]))], function () { return m(ph([a * b, a + b + rnz(-2, 2), 1])); }), why: ['Use FOIL: First ' + m(X + ' · ' + X + ' = ' + K.xp(2)) + ', Outer ' + m(P([[b, X]])) + ', Inner ' + m(P([[a, X]])) + ', Last ' + m('(' + n(a) + ')(' + n(b) + ') = ' + n(a * b)) + '.', m(K.xp(2) + K.coef(b, false) + X + K.coef(a, false) + X + K.plusK(a * b)) + '.', 'Combine the middle terms: ' + m(ph(r)) + '.'] });
      }
    ],
    [
      function () {
        var a = rnz(-4, 4), b = rnz(-7, 7), c = rnz(-4, 4), d = rnz(-7, 7); if (Math.abs(a) === 1) a = 2;
        var r = pmul([b, a], [d, c]);
        return Q({ q: 'Multiply: ' + m(bin(a, b) + bin(c, d)), mc: mc(m(ph(r)), [m(ph([b * d, 0, a * c])), m(ph([b * d, a * d - b * c, a * c])), m(ph([b + d, a * d + b * c, a * c]))], function () { return m(ph([b * d, a * d + b * c + rnz(-3, 3), a * c])); }), why: ['First: ' + m(P([[a, X]]) + ' · ' + P([[c, X]]) + ' = ' + P([[a * c, K.xp(2)]])) + '. Outer: ' + m(P([[a * d, X]])) + '. Inner: ' + m(P([[b * c, X]])) + '. Last: ' + m(n(b * d)) + '.', 'Combine the ' + X + '-terms: ' + m(n(a * d) + ' + ' + (b * c < 0 ? '(' + n(b * c) + ')' : n(b * c)) + ' = ' + n(a * d + b * c)) + '.', 'Product: ' + m(ph(r)) + '.'] });
      },
      function () {
        var a = rnz(-6, 6), r = pmul([a, 1], [a, 1]);
        return Q({ q: 'Expand ' + m(bin(1, a) + '<sup>2</sup>') + '.', mc: mc(m(ph(r)), [m(ph([a * a, 0, 1])), m(ph([a * a, a, 1])), m(ph([2 * a, 2 * a, 1]))], function () { return m(ph([a * a + rnz(-3, 3), 2 * a, 1])); }), why: [m(bin(1, a) + '<sup>2</sup> = ' + bin(1, a) + bin(1, a)) + ', not ' + m(K.xp(2) + ' + ' + n(a * a)) + '.', 'FOIL: ' + m(K.xp(2) + K.coef(a, false) + X + K.coef(a, false) + X + ' + ' + n(a * a)) + '.', 'Answer: ' + m(ph(r)) + '. The middle term is ' + m(n(2 * a) + X) + '.'] });
      }
    ],
    [
      function () {
        var a = rnz(-5, 5), t = rpoly(2, -5, 5, 1);
        var r = pmul([a, 1], t);
        return Q({ q: 'Multiply: ' + m(bin(1, a) + '(' + ph(t) + ')'), mc: mc(m(ph(r)), [m(ph(trim([a * t[0], t[0] + a * t[1], t[1] + a * t[2], 1]).map(function (z, i) { return i === 2 ? z + 1 : z; }))), m(ph(trim([a * t[0], a * t[1], a * t[2] + t[1], t[2]]))), m(ph(trim([a * t[0], t[0], t[1], t[2]])))], function () { return m(ph(r.map(function (z, i) { return i === 1 ? z + rnz(-3, 3) : z; }))); }), why: ['Multiply ' + X + ' by every term: ' + m(ph(pmul([0, 1], t))) + '.', 'Multiply ' + n(a) + ' by every term: ' + m(ph(pmul([a], t))) + '.', 'Add and combine like terms: ' + m(ph(r)) + '.'] });
      },
      function () {
        var w = rnz(1, 6), lb = rnz(1, 9), wb = rnz(-3, 5);
        // area of rectangle (x + lb)(x + wb), ask coefficient or full
        var r = pmul([lb, 1], [wb, 1]);
        return Q({ q: 'A rectangular patio is ' + m(bin(1, lb)) + ' feet long and ' + m(bin(1, wb)) + ' feet wide. Which expression gives its area in square feet?', mc: mc(m(ph(r)), [m(ph(padd([lb, 1], [wb, 1]).map(function (z) { return 2 * z; }))), m(ph([lb * wb, 0, 1])), m(ph([lb + wb, lb * wb, 1]))], function () { return m(ph([lb * wb, lb + wb + rnz(-2, 2), 1])); }), why: ['Area = length × width = ' + m(bin(1, lb) + bin(1, wb)) + '.', 'FOIL: ' + m(ph(r)) + '.', '(The expression ' + m(ph(padd([lb, 1], [wb, 1]).map(function (z) { return 2 * z; }))) + ' is the perimeter, not the area.)'] });
      },
      function () {
        var a = rnz(-4, 4), b = rnz(-4, 4), c = rnz(-4, 4);
        var r = pmul(pmul([a, 1], [b, 1]), [c, 1]);
        return Q({ q: 'When ' + m(bin(1, a) + bin(1, b) + bin(1, c)) + ' is expanded, what is the constant term?', mc: K.mcNum(a * b * c, [a + b + c, -a * b * c, a * b + b * c + a * c]), why: ['The constant term comes from multiplying the constants: ' + m('(' + n(a) + ')(' + n(b) + ')(' + n(c) + ')') + '.', 'That equals ' + n(a * b * c) + '. (Full expansion: ' + m(ph(r)) + '.)'] });
      }
    ]
  ];
  K.lesson('7.2', { title: 'Multiplying Polynomials', std: 'MA.912.AR.1.3', levels: u72 });

  /* ---------- 7.3 Dividing by a Monomial ---------- */
  var u73 = [
    [
      function () {
        var k = rnz(2, 6) * (K.coin() ? 1 : -1), q = rpoly(2, -6, 6); q[0] = rnz(-6, 6);
        var num = pmul(q, [0, k]); // k x * q
        return Q({ q: 'Divide: ' + m(fr(ph(num), P([[k, X]]))), mc: mc(m(ph(q)), [m(ph(pmul(q, [0, 1]))), m(ph(trim([q[0], q[1], q[2]]).map(function (z, i) { return i === 0 ? z * k : z; }))), m(ph(q.map(function (z) { return -z; })))], function () { return m(ph(q.map(function (z, i) { return i === 0 ? z + rnz(-2, 2) : z; }))); }), why: ['Split into one fraction per term and divide each by ' + m(P([[k, X]])) + '.', 'Divide coefficients and subtract exponents: ' + m(ph(q)) + '.', 'Check by multiplying back: ' + m(P([[k, X]]) + '(' + ph(q) + ') = ' + ph(num)) + ' ✔'] });
      },
      function () {
        var k = ri(2, 5), a = k * ri(1, 6), b = k * rnz(-6, 6), p = ri(3, 5);
        return Q({ q: 'Simplify ' + m(fr(P([[a, K.xp(p)], [b, K.xp(p - 1)]]), n(k) + K.xp(2))) + '.', mc: mc(m(P([[a / k, K.xp(p - 2)], [b / k, K.xp(p - 3)]])), [m(P([[a / k, K.xp(p / 2 === Math.round(p / 2) ? p / 2 : p - 1)], [b / k, K.xp(p - 3)]])), m(P([[a - k, K.xp(p - 2)], [b - k, K.xp(p - 3)]])), m(P([[a / k, K.xp(p - 2)], [b, K.xp(p - 3)]]))], function () { return m(P([[a / k, K.xp(p - 2 + rnz(1, 2))], [b / k, K.xp(p - 3)]])); }), why: ['Divide each term by ' + m(n(k) + K.xp(2)) + '.', m(fr(P([[a, K.xp(p)]]), n(k) + K.xp(2)) + ' = ' + P([[a / k, K.xp(p - 2)]])) + ' and ' + m(fr(P([[b, K.xp(p - 1)]]), n(k) + K.xp(2)) + ' = ' + P([[b / k, K.xp(p - 3)]])) + '.', 'Answer: ' + m(P([[a / k, K.xp(p - 2)], [b / k, K.xp(p - 3)]])) + '.'] });
      }
    ],
    [
      function () {
        var k = ri(2, 4), c = [rnz(-5, 5), rnz(-5, 5), rnz(-5, 5)].map(function (z) { return z * k; }), mon = [0, 0, k];
        var num = pmul([c[0], c[1], c[2]], mon); // degree 4
        var qt = c.map(function (z) { return z / k; });
        return Q({ q: 'Divide: ' + m(fr(ph(num), n(k) + K.xp(2))), mc: mc(m(ph(c)), [m(ph(trim([0, c[0], c[1], c[2]]))), m(ph(qt)), m(ph(c.map(function (z, i) { return i === 2 ? -z : z; })))], function () { return m(ph(c.map(function (z, i) { return i === 0 ? z + rnz(-3, 3) : z; }))); }), why: ['Divide each term by ' + m(n(k) + K.xp(2)) + ': divide the coefficient by ' + k + ' and subtract 2 from each exponent.', 'Result: ' + m(ph(c)) + '.', 'Check: ' + m(n(k) + K.xp(2) + '(' + ph(c) + ') = ' + ph(num)) + ' ✔'] });
      },
      function () {
        var k = ri(2, 6), a = rnz(-6, 6), b = rnz(-6, 6), c = rnz(-6, 6);
        var num = [k * c, k * b, k * a]; // k(a x^2 + b x + c) over k x? → a x + b + c/x
        var mon = [0, k];
        var top = pmul([c, b, a], mon); // k a x^3 + k b x^2 + k c x
        return Q({ q: 'Simplify ' + m(fr(ph(top), n(k) + X)) + '.', mc: mc(m(ph([c, b, a])), [m(ph([c * k, b, a])), m(ph(trim([0, c, b, a]))), m(ph([c, b, a].map(function (z) { return z * k; })))], function () { return m(ph([c + rnz(-3, 3), b, a])); }), why: ['Divide each term by ' + m(n(k) + X) + '.', m(ph(top)) + ' ÷ ' + m(n(k) + X) + ' = ' + m(ph([c, b, a])) + '.'] });
      }
    ],
    [
      function () {
        var k = ri(2, 5), q = [rnz(-8, 8), rnz(-8, 8), rnz(-4, 4)], top = pmul(q, [0, 0, k]);
        var asked = pick([0, 1, 2]);
        return Q({ q: 'When ' + m(ph(top)) + ' is divided by ' + m(n(k) + K.xp(2)) + ', what is the coefficient of the ' + (asked === 0 ? 'constant term' : asked === 1 ? X + '-term' : K.xp(2) + '-term') + ' in the quotient?', mc: K.mcNum(q[asked], [top[asked + 2], q[asked] * k, -q[asked]]), why: ['Each term of ' + m(ph(top)) + ' is divided by ' + m(n(k) + K.xp(2)) + '.', 'Quotient: ' + m(ph(q)) + '.', 'The requested coefficient is ' + n(q[asked]) + '.'] });
      },
      function () {
        var w = ri(2, 6), l = [rnz(-5, 5), ri(1, 4), ri(1, 3)], area = pmul(l, [0, w]);
        return Q({ q: 'A rectangle has area ' + m(ph(area)) + ' square units and width ' + m(n(w) + X) + ' units. Which expression is its length?', mc: mc(m(ph(l)), [m(ph(pmul(l, [0, 1]))), m(ph(l.map(function (z, i) { return i === 0 ? z * w : z; }))), m(ph(trim([0, l[0], l[1], l[2]]).map(function (z) { return z; })).replace(/^/, ''))], function () { return m(ph(l.map(function (z, i) { return i === 1 ? z + rnz(1, 2) : z; }))); }), why: ['Length = Area ÷ Width.', m(fr(ph(area), n(w) + X) + ' = ' + ph(l)) + '.', 'Check: ' + m(n(w) + X + '(' + ph(l) + ') = ' + ph(area)) + ' ✔'] });
      }
    ]
  ];
  K.lesson('7.3', { title: 'Dividing a Polynomial by a Monomial', std: 'MA.912.AR.1.4', levels: u73 });

  /* ---------- 7.4 GCF & Grouping ---------- */
  var u74 = [
    [
      function () {
        var g = ri(2, 9), a = rnz(1, 9), b = rnz(-9, 9); while (K.gcd(a, b) !== 1) b = rnz(-9, 9);
        var p = ri(1, 3);
        // g x^p (a x + b) → terms
        var t1 = g * a, t2 = g * b;
        var expr = P([[t1, K.xp(p + 1)], [t2, K.xp(p)]]);
        var gcf = n(g) + K.xp(p);
        return Q({ q: 'What is the greatest common factor (GCF) of the terms in ' + m(expr) + '?', mc: mc(m(gcf), [m(n(g)), m(K.xp(p)), m(n(g) + K.xp(p + 1))], function () { return m(n(g * ri(2, 3)) + K.xp(p)); }), why: ['GCF of the numbers ' + Math.abs(t1) + ' and ' + Math.abs(t2) + ': ' + g + '.', 'GCF of the variable parts ' + m(K.xp(p + 1)) + ' and ' + m(K.xp(p)) + ': the smaller power, ' + m(K.xp(p)) + '.', 'GCF: ' + m(gcf) + '.'] });
      },
      function () {
        var g = ri(2, 8), a = ri(1, 7), b = rnz(-9, 9); while (K.gcd(a, Math.abs(b)) !== 1) b = rnz(-9, 9);
        var expr = P([[g * a, X], [g * b, '']]);
        return Q({ q: 'Factor out the GCF: ' + m(expr), mc: mc(m(n(g) + bin(a, b)), [m(n(g) + bin(g * a, b)), m(n(a) + bin(g, b)), m(n(g) + '<i>x</i>' + bin(a, b))], function () { return m(n(g) + bin(a, b + rnz(-2, 2))); }), why: ['The GCF of ' + m(P([[g * a, X]])) + ' and ' + n(g * b) + ' is ' + g + '.', 'Divide each term by ' + g + ': ' + m(P([[a, X]])) + ' and ' + n(b) + '.', 'So ' + m(expr + ' = ' + n(g) + bin(a, b)) + '. Check by distributing.'] });
      }
    ],
    [
      function () {
        var g = ri(2, 6), p = ri(1, 2), c = [rnz(-6, 6), rnz(-6, 6), ri(1, 6)];
        while (K.gcd(K.gcd(Math.abs(c[0]), Math.abs(c[1])), c[2]) !== 1 || c[0] === 0) c = [rnz(-6, 6), rnz(-6, 6), ri(1, 6)];
        var mon = []; for (var i = 0; i < p; i++) mon[i] = 0; mon[p] = g;
        var full = pmul(mon, c);
        return Q({ q: 'Factor completely: ' + m(ph(full)), mc: mc(m(n(g) + K.xp(p) + '(' + ph(c) + ')'), [m(n(g) + '(' + ph(pmul(c, mon.map(function (z) { return z ? 1 : 0; }))) + ')'), m(K.xp(p) + '(' + ph(c.map(function (z) { return z * g; })) + ')'), m(n(g) + K.xp(p) + '(' + ph(c.map(function (z, i) { return i === 0 ? z * g : z; })) + ')')], function () { return m(n(g) + K.xp(p) + '(' + ph(c.map(function (z, i) { return i === 1 ? z + rnz(1, 2) : z; })) + ')'); }), why: ['GCF of the coefficients: ' + g + '. GCF of the variables: ' + m(K.xp(p)) + ' (the lowest power).', 'Divide each term by ' + m(n(g) + K.xp(p)) + ': ' + m(ph(c)) + '.', 'Answer: ' + m(n(g) + K.xp(p) + '(' + ph(c) + ')') + '.'] });
      },
      function () {
        var g = ri(2, 6), a = ri(1, 6), b = ri(1, 9); while (K.gcd(a, b) !== 1) b = ri(1, 9);
        // −g a x − g b  → −g(ax + b)
        var expr = P([[-g * a, X], [-g * b, '']]);
        return Q({ q: 'Factor out a <b>negative</b> GCF: ' + m(expr), mc: mc(m(M + n(g) + bin(a, b)), [m(M + n(g) + bin(a, -b)), m(n(g) + bin(-a, b)), m(M + n(g) + bin(-a, -b))], function () { return m(M + n(g) + bin(a, b + rnz(1, 3))); }), why: ['Factor out ' + m(M + g) + ': divide each term by ' + m(M + g) + '.', m(P([[-g * a, X]]) + ' ÷ (' + M + g + ') = ' + P([[a, X]])) + ' and ' + m(n(-g * b) + ' ÷ (' + M + g + ') = ' + n(b)) + '.', 'Answer: ' + m(M + n(g) + bin(a, b)) + '. Both signs inside change.'] });
      }
    ],
    [
      function () {
        var a = rnz(-6, 6), c = ri(1, 5), d = rnz(-6, 6);
        // (x + a)(c x^2 + d) = c x^3 + a c x^2 + d x + a d
        var full = pmul([a, 1], [d, 0, c]);
        return Q({ q: 'Factor by grouping: ' + m(ph(full)), mc: mc(m(bin(1, a) + '(' + P([[c, K.xp(2)], [d, '']]) + ')'), [m(bin(1, -a) + '(' + P([[c, K.xp(2)], [d, '']]) + ')'), m(bin(1, a) + '(' + P([[c, K.xp(2)], [-d, '']]) + ')'), m(bin(c, a) + '(' + P([[1, K.xp(2)], [d, '']]) + ')')], function () { return m(bin(1, a + rnz(1, 2)) + '(' + P([[c, K.xp(2)], [d, '']]) + ')'); }), why: ['Group in pairs: ' + m('(' + P([[c, K.xp(3)], [a * c, K.xp(2)]]) + ') + (' + P([[d, X], [a * d, '']]) + ')') + '.', 'Factor each pair: ' + m(P([[c, K.xp(2)]]) + bin(1, a) + K.coef(d, false) + bin(1, a)) + '.', 'Factor out the common binomial: ' + m(bin(1, a) + '(' + P([[c, K.xp(2)], [d, '']]) + ')') + '.'] });
      },
      function () {
        var a = rnz(-5, 5), b = rnz(-5, 5);
        var full = pmul([a, 1], [b, 1]);
        var q = ri(2, 4);
        var tot = full.map(function (z) { return z * q; });
        return Q({ q: 'Which is the complete factorization of ' + m(ph(tot)) + '?', mc: mc(m(n(q) + bin(1, a) + bin(1, b)), [m(bin(q, a) + bin(1, b)), m(n(q) + bin(1, -a) + bin(1, -b)), m(n(q) + '(' + ph(full) + ')')], function () { return m(n(q) + bin(1, a + rnz(1, 2)) + bin(1, b)); }), why: ['First take out the GCF ' + q + ': ' + m(n(q) + '(' + ph(full) + ')') + '.', 'Then factor the trinomial: two numbers with product ' + n(a * b) + ' and sum ' + n(a + b) + ' are ' + n(a) + ' and ' + n(b) + '.', 'Complete factorization: ' + m(n(q) + bin(1, a) + bin(1, b)) + '. (Leaving the trinomial unfactored is not complete.)'] });
      }
    ]
  ];
  K.lesson('7.4', { title: 'Factoring: GCF & Grouping', std: 'MA.912.AR.1.7', levels: u74 });

  /* ---------- 7.5 Factoring Trinomials ---------- */
  function trinPair() { var a, b; do { a = rnz(-9, 9); b = rnz(-9, 9); } while (a + b === 0 || a === b); return [a, b]; }
  var u75 = [
    [
      function () {
        var p = trinPair(), a = p[0], b = p[1];
        var full = pmul([a, 1], [b, 1]);
        return Q({ q: 'Factor: ' + m(ph(full)), mc: mc(m(bin(1, a) + bin(1, b)), [m(bin(1, -a) + bin(1, -b)), m(bin(1, a) + bin(1, -b)), m(bin(1, -a) + bin(1, b))], function () { return m(bin(1, a + rnz(1, 2)) + bin(1, b)); }), why: ['Find two numbers that <b>multiply</b> to ' + n(a * b) + ' and <b>add</b> to ' + n(a + b) + '.', 'They are ' + n(a) + ' and ' + n(b) + ': ' + m('(' + n(a) + ')(' + n(b) + ') = ' + n(a * b)) + ' and ' + m(n(a) + ' + ' + (b < 0 ? '(' + n(b) + ')' : n(b)) + ' = ' + n(a + b)) + '.', 'So ' + m(ph(full) + ' = ' + bin(1, a) + bin(1, b)) + '.'] });
      },
      function () {
        var p = trinPair(), a = p[0], b = p[1], full = pmul([a, 1], [b, 1]);
        var right = (a * b > 0) ? (a + b > 0 ? 'Both positive' : 'Both negative') : 'One positive and one negative';
        return Q({ q: 'For ' + m(ph(full)) + ', what are the signs of the two numbers in the factored form ' + m('(<i>x</i> + <i>p</i>)(<i>x</i> + <i>q</i>)') + '?', mc: mc(right, ['Both positive', 'Both negative', 'One positive and one negative', 'Both zero'].filter(function (z) { return z !== right; })), why: ['The constant ' + n(a * b) + ' is the product <i>pq</i>; the middle coefficient ' + n(a + b) + ' is the sum.', a * b > 0 ? 'A positive product means the signs are the same; the ' + (a + b > 0 ? 'positive' : 'negative') + ' sum means both are ' + (a + b > 0 ? 'positive.' : 'negative.') : 'A negative product means the signs are different.', '(Here they are ' + n(a) + ' and ' + n(b) + '.)'] });
      }
    ],
    [
      function () {
        var A = pick([2, 3, 5]), b1 = rnz(-7, 7), d = rnz(-7, 7);
        if (K.gcd(A, Math.abs(b1)) !== 1) b1 = b1 > 0 ? b1 + 1 : b1 - 1;
        // (A x + b1)(x + d)
        var full = pmul([b1, A], [d, 1]);
        if (!full[1]) return u75[1][0]();
        return Q({ q: 'Factor: ' + m(ph(full)), mc: mc(m(bin(A, b1) + bin(1, d)), [m(bin(A, d) + bin(1, b1)), m(bin(A, -b1) + bin(1, -d)), m(bin(1, b1) + bin(A, -d))], function () { return m(bin(A, b1) + bin(1, d + rnz(1, 2))); }), why: ['Use the <i>ac</i> method: ' + m('<i>ac</i> = ' + A + ' · ' + (b1 * d < 0 ? '(' + n(b1 * d) + ')' : n(b1 * d)) + ' = ' + n(A * b1 * d)) + '. Find two numbers with that product and sum ' + n(full[1]) + ': ' + n(A * d) + ' and ' + n(b1) + '.', 'Split the middle and group: ' + m(P([[A, K.xp(2)], [A * d, X], [b1, X], [b1 * d, '']])) + ' = ' + m(n(A) + X + bin(1, d) + K.coef(b1, false) + bin(1, d)) + '.', 'Answer: ' + m(bin(A, b1) + bin(1, d)) + '. Check by multiplying.'] });
      },
      function () {
        var p = trinPair(), a = p[0], b = p[1], full = pmul([a, 1], [b, 1]);
        var opts = mc(m(bin(1, a)), [m(bin(1, -a)), m(bin(1, a + b)), m(bin(1, a * b))], function () { return m(bin(1, a + rnz(1, 3))); });
        return Q({ q: 'Which binomial is a factor of ' + m(ph(full)) + '?', mc: opts, why: ['Factor: two numbers with product ' + n(a * b) + ' and sum ' + n(a + b) + ' are ' + n(a) + ' and ' + n(b) + '.', m(ph(full) + ' = ' + bin(1, a) + bin(1, b)) + ', so ' + m(bin(1, a)) + ' is a factor.'] });
      }
    ],
    [
      function () {
        var A = pick([2, 3, 4, 6]), C = pick([1, 2, 3, 5]), b1 = rnz(-6, 6), d = rnz(-6, 6);
        if (K.gcd(A, Math.abs(b1)) !== 1 || K.gcd(C, Math.abs(d)) !== 1) return u75[2][1]();
        var full = pmul([b1, A], [d, C]);
        if (!full[1]) return u75[2][1]();
        return Q({ q: 'Factor completely: ' + m(ph(full)), mc: mc(m(bin(A, b1) + bin(C, d)), [m(bin(A, d) + bin(C, b1)), m(bin(A, -b1) + bin(C, -d)), m(bin(A * C, b1) + bin(1, d))], function () { return m(bin(A, b1 + rnz(1, 2)) + bin(C, d)); }), why: [m('<i>ac</i> = ' + n(A * C) + ' · ' + (b1 * d < 0 ? '(' + n(b1 * d) + ')' : n(b1 * d)) + ' = ' + n(A * C * b1 * d)) + '. Two numbers with that product and sum ' + n(full[1]) + ': ' + n(A * d) + ' and ' + n(b1 * C) + '.', 'Split, group, and factor: ' + m(bin(A, b1) + bin(C, d)) + '.', 'Check: ' + m(bin(A, b1) + bin(C, d) + ' = ' + ph(full)) + ' ✔'] });
      },
      function () {
        var p = trinPair(), a = p[0], b = p[1], full = pmul([a, 1], [b, 1]);
        var c = full[0], bb = full[1];
        return Q({ q: 'The expression ' + m(K.xp(2) + K.coef(bb, false) + X + ' + <i>c</i>') + ' can be factored as ' + m(bin(1, a) + bin(1, b)) + '. What is the value of <i>c</i>?', mc: K.mcNum(c, [a + b, -c, a - b]), why: ['Multiply the factors: ' + m(bin(1, a) + bin(1, b) + ' = ' + ph(full)) + '.', 'The constant term is ' + m('(' + n(a) + ')(' + n(b) + ') = ' + n(c)) + ', so ' + m('<i>c</i> = ' + n(c)) + '.'] });
      },
      function () {
        var w = ri(2, 9), l = w + ri(1, 6);
        var full = pmul([w, 1], [l, 1]);
        return Q({ q: 'The area of a rectangle is ' + m(ph(full)) + ' square meters. If its width is ' + m(bin(1, w)) + ' meters, what is its length?', mc: mc(m(bin(1, l)), [m(bin(1, -l)), m(bin(1, w + l)), m(bin(1, w * l))], function () { return m(bin(1, l + rnz(1, 3))); }), why: ['Factor the area: two numbers with product ' + n(w * l) + ' and sum ' + n(w + l) + ' are ' + w + ' and ' + l + '.', m(ph(full) + ' = ' + bin(1, w) + bin(1, l)) + '.', 'Width ' + m(bin(1, w)) + ', so the length is ' + m(bin(1, l)) + '.'] });
      }
    ]
  ];
  K.lesson('7.5', { title: 'Factoring Trinomials', std: 'MA.912.AR.1.7', levels: u75 });

  /* ---------- 7.6 Special Factoring Patterns ---------- */
  var u76 = [
    [
      function () {
        var a = ri(1, 5), b = ri(1, 12); if (a > 1 && K.gcd(a, b) !== 1) b += 1;
        var expr = P([[a * a, K.xp(2)], [-b * b, '']]);
        return Q({ q: 'Factor: ' + m(expr), mc: mc(m(bin(a, -b) + bin(a, b)), [m(bin(a, -b) + '<sup>2</sup>'), m(bin(a, b) + '<sup>2</sup>'), m(bin(a * a, -b) + bin(1, b))], function () { return m(bin(a, -b - rnz(1, 2)) + bin(a, b)); }), why: ['This is a <b>difference of two squares</b>: ' + m('<i>A</i><sup>2</sup> ' + M + ' <i>B</i><sup>2</sup> = (<i>A</i> ' + M + ' <i>B</i>)(<i>A</i> + <i>B</i>)') + '.', m(expr + ' = (' + P([[a, X]]) + ')<sup>2</sup> ' + M + ' ' + b + '<sup>2</sup>') + '.', 'Answer: ' + m(bin(a, -b) + bin(a, b)) + '.'] });
      },
      function () {
        var b = rnz(-9, 9), full = pmul([b, 1], [b, 1]);
        return Q({ q: 'Factor the perfect square trinomial: ' + m(ph(full)), mc: mc(m(bin(1, b) + '<sup>2</sup>'), [m(bin(1, -b) + '<sup>2</sup>'), m(bin(1, b) + bin(1, -b)), m(bin(1, 2 * b) + '<sup>2</sup>')], function () { return m(bin(1, b + rnz(1, 2)) + '<sup>2</sup>'); }), why: ['Pattern: ' + m('<i>x</i><sup>2</sup> + 2<i>bx</i> + <i>b</i><sup>2</sup> = (<i>x</i> + <i>b</i>)<sup>2</sup>') + '.', 'The first and last terms are squares (' + m(K.xp(2)) + ' and ' + n(b * b) + ' = ' + m('(' + n(b) + ')<sup>2</sup>') + '), and the middle term is ' + m('2(' + n(b) + ')' + X + ' = ' + P([[2 * b, X]])) + '.', 'Answer: ' + m(bin(1, b) + '<sup>2</sup>') + '.'] });
      }
    ],
    [
      function () {
        var a = pick([2, 3, 4, 5]), b = ri(1, 7); if (K.gcd(a, b) !== 1) b = 1;
        var full = pmul([b, a], [b, a]);
        return Q({ q: 'Factor: ' + m(ph(full)), mc: mc(m(bin(a, b) + '<sup>2</sup>'), [m(bin(a * a, b * b)), m(bin(a, -b) + '<sup>2</sup>'), m(bin(a, b) + bin(a, -b))], function () { return m(bin(a, b + rnz(1, 2)) + '<sup>2</sup>'); }), why: ['Check: ' + m(n(a * a) + K.xp(2) + ' = (' + n(a) + X + ')<sup>2</sup>') + ' and ' + m(n(b * b) + ' = ' + b + '<sup>2</sup>') + '.', 'Middle term: ' + m('2(' + n(a) + X + ')(' + b + ') = ' + P([[2 * a * b, X]])) + ' ✔. It is a perfect square trinomial.', 'Answer: ' + m(bin(a, b) + '<sup>2</sup>') + '.'] });
      },
      function () {
        var kinds = [['dos', 'Difference of two squares'], ['pst', 'Perfect square trinomial'], ['none', 'Neither pattern']];
        var k = pick(kinds), b = ri(2, 9), e;
        if (k[0] === 'dos') e = P([[1, K.xp(2)], [-b * b, '']]);
        else if (k[0] === 'pst') e = ph(pmul([b, 1], [b, 1]));
        else e = pick([P([[1, K.xp(2)], [b * b, '']]), ph([b * b, b, 1]), P([[1, K.xp(2)], [-(b * b + 1), '']])]);
        return Q({ q: 'Which special pattern does ' + m(e) + ' fit?', mc: mc(k[1], kinds.filter(function (z) { return z !== k; }).map(function (z) { return z[1]; }).concat(['Sum of two squares (factorable)'])), why: k[0] === 'dos' ? ['Two perfect squares with a minus sign between them: ' + m(K.xp(2) + ' ' + M + ' ' + b + '<sup>2</sup>') + '. Difference of two squares: ' + m(bin(1, -b) + bin(1, b)) + '.'] : k[0] === 'pst' ? ['First and last terms are squares and the middle term is ' + m('2 · ' + X + ' · ' + b) + '. Perfect square trinomial: ' + m(bin(1, b) + '<sup>2</sup>') + '.'] : ['A sum of two squares (like ' + m(K.xp(2) + ' + ' + b * b) + ') does not factor over the real numbers, a constant that is not a perfect square does not fit, and a middle term that is not ' + m('2<i>ab</i>') + ' is not a perfect square. So it fits neither pattern.'] });
      }
    ],
    [
      function () {
        var g = ri(2, 5), b = ri(1, 8);
        var expr = P([[g, K.xp(2)], [-g * b * b, '']]);
        return Q({ q: 'Factor completely: ' + m(expr), mc: mc(m(n(g) + bin(1, -b) + bin(1, b)), [m(n(g) + '(' + P([[1, K.xp(2)], [-b * b, '']]) + ')'), m(bin(g, -b) + bin(g, b)), m(n(g) + bin(1, -b) + '<sup>2</sup>')], function () { return m(n(g) + bin(1, -b - rnz(1, 2)) + bin(1, b)); }), why: ['First take out the GCF ' + g + ': ' + m(n(g) + '(' + P([[1, K.xp(2)], [-b * b, '']]) + ')') + '.', 'The part in parentheses is a difference of squares: ' + m(bin(1, -b) + bin(1, b)) + '.', 'Completely factored: ' + m(n(g) + bin(1, -b) + bin(1, b)) + '.'] });
      },
      function () {
        var a = ri(11, 40), b = ri(1, 9);
        // a^2 − b^2 mental math: (a−b)(a+b)
        return Q({ q: 'Use a special pattern to evaluate ' + m(a + '<sup>2</sup> ' + M + ' ' + b + '<sup>2</sup>') + ' without a calculator.', mc: K.mcNum(a * a - b * b, [(a - b) * (a - b), a * a + b * b, (a - b) * 2]), why: ['Difference of squares: ' + m(a + '<sup>2</sup> ' + M + ' ' + b + '<sup>2</sup> = (' + a + ' ' + M + ' ' + b + ')(' + a + ' + ' + b + ')') + '.', m('(' + (a - b) + ')(' + (a + b) + ') = ' + (a * a - b * b)) + '.'] });
      },
      function () {
        var b = ri(2, 9), k = 2 * b;
        return Q({ q: 'For what positive value of <i>k</i> is ' + m(K.xp(2) + ' + <i>k</i><i>x</i> + ' + b * b) + ' a perfect square trinomial?', mc: K.mcNum(k, [b, b * b, 2 * b * b]), why: ['A perfect square trinomial looks like ' + m(K.xp(2) + ' + 2<i>bx</i> + <i>b</i><sup>2</sup>') + '.', m('<i>b</i><sup>2</sup> = ' + b * b) + ' means ' + m('<i>b</i> = ' + b) + '.', 'Then ' + m('<i>k</i> = 2<i>b</i> = ' + k) + ', giving ' + m(bin(1, b) + '<sup>2</sup>') + '.'] });
      }
    ]
  ];
  K.lesson('7.6', { title: 'Special Factoring Patterns', std: 'MA.912.AR.1.7', levels: u76 });

  /* ---------- 7.7 Operations with Radicals ---------- */
  var SQF = [2, 3, 5, 6, 7, 10, 11];
  function rad(c, r) { if (r === 1) return n(c); return (c === 1 ? '' : c === -1 ? M : n(c)) + K.sqrt(r); }
  var u77 = [
    [
      function () {
        var k = ri(2, 7), r = pick(SQF), v = k * k * r;
        return Q({ q: 'Simplify ' + m(K.sqrt(v)) + '.', mc: mc(m(rad(k, r)), [m(rad(r, k)), m(rad(k * k, r)), m(rad(Math.floor(v / 2) === v / 2 && v / 2 !== k * k * r ? 2 : k + 1, r))], function () { return m(rad(k + rnz(1, 3), r)); }), why: ['Find the largest perfect-square factor of ' + v + ': ' + m(v + ' = ' + k * k + ' · ' + r) + '.', m(K.sqrt(v) + ' = ' + K.sqrt(k * k) + ' · ' + K.sqrt(r) + ' = ' + rad(k, r)) + '.'] });
      },
      function () {
        var r = pick(SQF), a = rnz(-8, 9), b = rnz(-8, 9); if (a + b === 0) b += 1;
        return Q({ q: 'Simplify ' + m(rad(a, r) + (b < 0 ? ' ' + M + ' ' + rad(-b, r) : ' + ' + rad(b, r))) + '.', mc: mc(m(rad(a + b, r)), [m(rad(a + b, 2 * r)), m(rad(a * b, r)), m(rad(a + b, r * r) )], function () { return m(rad(a + b + rnz(1, 3), r)); }), why: ['These are <b>like radicals</b> (both have ' + m(K.sqrt(r)) + '), so add the coefficients.', m(n(a) + ' + ' + (b < 0 ? '(' + n(b) + ')' : n(b)) + ' = ' + n(a + b)) + '.', 'Answer: ' + m(rad(a + b, r)) + '. The radical part stays ' + m(K.sqrt(r)) + '.'] });
      }
    ],
    [
      function () {
        var r = pick([2, 3, 5]), k1 = ri(2, 4), k2 = ri(2, 5), c1 = rnz(1, 4), c2 = rnz(-4, 4); if (c2 === 0) c2 = 2;
        // c1√(k1² r) + c2√(k2² r) = (c1 k1 + c2 k2)√r
        var tot = c1 * k1 + c2 * k2;
        if (tot === 0) return u77[1][1]();
        var e = rad(c1, k1 * k1 * r) + (c2 > 0 ? ' + ' + rad(c2, k2 * k2 * r) : ' ' + M + ' ' + rad(-c2, k2 * k2 * r));
        return Q({ q: 'Simplify ' + m(e) + '.', mc: mc(m(rad(tot, r)), [m(rad(c1 + c2, r * (k1 * k1 + k2 * k2))), m(rad(c1 + c2, r)), m(rad(tot, r * 2))], function () { return m(rad(tot + rnz(1, 3), r)); }), why: ['Simplify each radical first: ' + m(K.sqrt(k1 * k1 * r) + ' = ' + rad(k1, r)) + ' and ' + m(K.sqrt(k2 * k2 * r) + ' = ' + rad(k2, r)) + '.', 'Now ' + m(n(c1 * k1) + K.sqrt(r) + (c2 * k2 > 0 ? ' + ' : ' ' + M + ' ') + Math.abs(c2 * k2) + K.sqrt(r)) + ' are like radicals.', 'Combine: ' + m(rad(tot, r)) + '.'] });
      },
      function () {
        var a = pick(SQF), b = pick(SQF.filter(function (z) { return z !== a; })), c1 = ri(1, 5), c2 = ri(1, 5);
        var prod = a * b, k = 1, rr = prod;
        for (var i = 9; i >= 2; i--) if (prod % (i * i) === 0) { k = i; rr = prod / (i * i); break; }
        var coef = c1 * c2 * k;
        return Q({ q: 'Multiply and simplify: ' + m(rad(c1, a) + ' · ' + rad(c2, b)), mc: mc(m(rad(coef, rr)), [m(rad(c1 * c2, prod) === m(rad(coef, rr)) ? rad(c1 + c2, prod) : rad(c1 * c2, prod)), m(rad(c1 + c2, a + b)), m(rad(c1 * c2, a + b))], function () { return m(rad(coef + rnz(1, 3), rr)); }), why: ['Multiply coefficients and multiply radicands: ' + m(n(c1 * c2) + K.sqrt(n(a) + ' · ' + n(b)) + ' = ' + rad(c1 * c2, prod)) + '.', k > 1 ? 'Simplify: ' + m(K.sqrt(prod) + ' = ' + rad(k, rr)) + ', so the answer is ' + m(rad(coef, rr)) + '.' : 'No perfect-square factor remains, so the answer is ' + m(rad(coef, rr)) + '.'] });
      }
    ],
    [
      function () {
        var k = ri(2, 6), r = pick(SQF), c = ri(2, 6) * k;
        // (c√(k² r)) / √r ... simpler: √(a)/√(b) → √(a/b)
        var b = pick([2, 3, 5]), s = ri(2, 6), a = b * s * s;
        return Q({ q: 'Simplify ' + m(fr(K.sqrt(a), K.sqrt(b))) + '.', mc: K.mcNum(s, [a / b, s * s, a - b]), why: ['Quotient property: ' + m(fr(K.sqrt(a), K.sqrt(b)) + ' = ' + K.sqrt(fr(a, b)) + ' = ' + K.sqrt(a / b)) + '.', m(K.sqrt(a / b) + ' = ' + s) + '.'] });
      },
      function () {
        var r = pick([2, 3, 5, 6, 7]), a = rnz(-5, 5), b = ri(1, 4);
        // (a + b√r)(a − b√r) = a² − b² r
        var val = a * a - b * b * r;
        return Q({ q: 'Multiply: ' + m('(' + n(a) + ' + ' + rad(b, r) + ')(' + n(a) + ' ' + M + ' ' + rad(b, r) + ')'), mc: K.mcNum(val, [a * a + b * b * r, a * a - b * r, a * a - b * b]), why: ['This is ' + m('(<i>A</i> + <i>B</i>)(<i>A</i> ' + M + ' <i>B</i>) = <i>A</i><sup>2</sup> ' + M + ' <i>B</i><sup>2</sup>') + '.', m('<i>A</i><sup>2</sup> = ' + (a < 0 ? '(' + n(a) + ')' : n(a)) + '<sup>2</sup> = ' + a * a) + ' and ' + m('<i>B</i><sup>2</sup> = (' + rad(b, r) + ')<sup>2</sup> = ' + b * b + ' · ' + r + ' = ' + b * b * r) + '.', m(a * a + ' ' + M + ' ' + b * b * r + ' = ' + n(val)) + '. The radicals disappear.'] });
      },
      function () {
        var s = pick([2, 3, 5]), k = ri(2, 5), side = k * k * s;
        // area of square with side √(side) → side; diagonal etc. Use: perimeter of square with side √(k² s) = 4k√s
        return Q({ q: 'A square has side length ' + m(K.sqrt(side)) + ' cm. What is its perimeter, in simplest form?', mc: mc(m(rad(4 * k, s) + ' cm'), [m(rad(4, side) + ' cm').replace(/^/, ''), m(n(side) + ' cm'), m(rad(k, 4 * s) + ' cm')], function () { return m(rad(4 * k + rnz(1, 3), s) + ' cm'); }), why: ['Simplify the side: ' + m(K.sqrt(side) + ' = ' + rad(k, s)) + '.', 'Perimeter = 4 × side = ' + m('4 · ' + rad(k, s) + ' = ' + rad(4 * k, s)) + ' cm.', '(' + m(n(side)) + ' cm² would be the area.)'] });
      }
    ]
  ];
  K.lesson('7.7', { title: 'Operations with Radicals', std: 'MA.912.NSO.1.4', levels: u77 });
  K.review(7, 'Unit 7 Review: Polynomials, Radicals & Factoring');
})(typeof window !== 'undefined' ? window.KCEP : globalThis.KCEP);
