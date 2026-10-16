/* Unit 6 — Exponential Functions & Financial Literacy */
(function (K) {
  var ri = K.ri, rnz = K.rnz, pick = K.pick, n = K.n, P = K.poly, X = K.x, Y = K.y, Q = K.Q, mc = K.mc, M = K.MINUS, m = K.m, fr = K.frx, R = K.R;
  function pw(base, e) { return base + '<sup>' + (typeof e === 'number' ? n(e) : e) + '</sup>'; }
  function xe(e, v) { v = v || 'x'; return e === 0 ? '1' : e === 1 ? '<i>' + v + '</i>' : '<i>' + v + '</i><sup>' + n(e) + '</sup>'; }
  // monomial c x^p y^q (p,q may be negative → shown as fraction)
  function mono(c, p, q) {
    c = R(c);
    var numV = '', denV = '';
    [['x', p], ['y', q]].forEach(function (t) { if (t[1] > 0) numV += xe(t[1], t[0]); else if (t[1] < 0) denV += xe(-t[1], t[0]); });
    var cn = Math.abs(c.n), cd = c.d, sign = c.n < 0 ? M : '';
    var top = (cn === 1 && numV ? '' : String(cn)) + numV, bot = (cd === 1 ? '' : String(cd)) + denV;
    if (!bot) return sign + top;
    return sign + fr(top || '1', bot);
  }
  function rawMono(c, p, q) { return (c === 1 ? '' : c === -1 ? M : n(c)) + (p ? xe(p, 'x') : '') + (q ? xe(q, 'y') : ''); }

  /* ---------- 6.1 Properties of Exponents ---------- */
  var u61 = [
    [
      function () {
        var a = ri(2, 9), b = ri(2, 9), rule = pick(['prod', 'quot', 'pow']);
        if (rule === 'quot' && a <= b) { var t = a; a = b + 1; b = t; }
        var expr = rule === 'prod' ? m(xe(a) + ' · ' + xe(b)) : rule === 'quot' ? m(fr(xe(a), xe(b))) : m('(' + xe(a) + ')<sup>' + b + '</sup>');
        var ans = rule === 'prod' ? a + b : rule === 'quot' ? a - b : a * b;
        var wrong = rule === 'prod' ? [a * b, a + b + 1, Math.abs(a - b) || a + b + 2] : rule === 'quot' ? [a + b, a * b, Math.round(a / b) === a - b ? a - b + 1 : Math.round(a / b)] : [a + b, Math.pow(a, b) > 99 ? a * b + 1 : Math.pow(a, b), a * b - 1];
        var ruleTxt = rule === 'prod' ? 'Product rule: when you multiply powers with the same base, <b>add</b> the exponents.' : rule === 'quot' ? 'Quotient rule: when you divide powers with the same base, <b>subtract</b> the exponents.' : 'Power rule: a power raised to a power, <b>multiply</b> the exponents.';
        return Q({ q: 'Simplify ' + expr + '.', mc: mc(m(xe(ans)), wrong.filter(function (w) { return w > 0; }).map(function (w) { return m(xe(w)); }), function () { return m(xe(ans + rnz(-3, 3))); }), why: [ruleTxt, rule === 'prod' ? m(a + ' + ' + b + ' = ' + ans) : rule === 'quot' ? m(a + ' ' + M + ' ' + b + ' = ' + ans) : m(a + ' × ' + b + ' = ' + ans), 'Answer: ' + m(xe(ans)) + '.'] });
      },
      function () {
        var b = ri(2, 12), kind = pick(['zero', 'neg']);
        if (kind === 'zero') return Q({ q: 'What is the value of ' + m(pw(b, 0)) + '?', mc: mc('1', ['0', n(b), M + '1']), why: ['Any nonzero number to the zero power equals 1.', 'Reason: ' + m(fr(pw(b, 3), pw(b, 3)) + ' = ' + pw(b, '3 ' + M + ' 3') + ' = ' + pw(b, 0)) + ', and anything divided by itself is 1.'] });
        var e = ri(1, 3); if (b > 6) e = 1;
        var val = Math.pow(b, e);
        return Q({ q: 'What is the value of ' + m(pw(b, -e)) + '?', mc: mc(m(fr('1', val)), [m(M + val), m(M + n(b * e)), m(fr('1', b * e === val ? b * e + 1 : b * e))], function (i) { return m(pick([M + fr('1', val), n(val), fr('1', val + i)])); }), why: ['A negative exponent means "take the reciprocal": ' + m(pw(b, -e) + ' = ' + fr('1', pw(b, e))) + '.', m(pw(b, e) + ' = ' + val) + ', so the value is ' + m(fr('1', val)) + '. It is positive, not negative.'] });
      }
    ],
    [
      function () {
        var c1 = ri(2, 6), c2 = ri(2, 6), p1 = ri(1, 6), p2 = ri(1, 6), q1 = ri(0, 4), q2 = ri(1, 4);
        var expr = m('(' + rawMono(c1, p1, q1) + ')(' + rawMono(c2, p2, q2) + ')');
        var right = m(rawMono(c1 * c2, p1 + p2, q1 + q2));
        return Q({ q: 'Simplify ' + expr + '.', mc: mc(right, [m(rawMono(c1 + c2, p1 + p2, q1 + q2)), m(rawMono(c1 * c2, p1 * p2, q1 * q2 || q1 + q2 + 1)), m(rawMono(c1 * c2, p1 + p2 + 1, q1 + q2))], function () { return m(rawMono(c1 * c2, p1 + p2 + rnz(-2, 2), q1 + q2)); }), why: ['Multiply the coefficients: ' + m(c1 + ' × ' + c2 + ' = ' + c1 * c2) + '.', 'Add exponents of like bases: ' + m(xe(p1) + ' · ' + xe(p2) + ' = ' + xe(p1 + p2)) + (q1 + q2 ? ' and ' + m(xe(q1, 'y') + ' · ' + xe(q2, 'y') + ' = ' + xe(q1 + q2, 'y')).replace('>1 ·', '>1 ·') : '') + '.', 'Answer: ' + right + '.'] });
      },
      function () {
        var c = ri(2, 4), p = ri(1, 4), q = ri(1, 3), e = ri(2, 3);
        var expr = m('(' + rawMono(c, p, q) + ')<sup>' + e + '</sup>');
        var right = m(rawMono(Math.pow(c, e), p * e, q * e));
        return Q({ q: 'Simplify ' + expr + '.', mc: mc(right, [m(rawMono(c * e, p * e, q * e)), m(rawMono(Math.pow(c, e), p + e, q + e)), m(rawMono(c, p * e, q * e))], function () { return m(rawMono(Math.pow(c, e), p * e + rnz(-2, 2), q * e)); }), why: ['Raise <b>every</b> factor to the power ' + e + '.', 'Coefficient: ' + m(pw(c, e) + ' = ' + Math.pow(c, e)) + ' (not ' + c + ' × ' + e + ').', 'Exponents multiply: ' + m(xe(p) + ' → ' + xe(p * e)) + ', ' + m(xe(q, 'y') + ' → ' + xe(q * e, 'y')) + '.', 'Answer: ' + right + '.'] });
      },
      function () {
        var c1 = 2 * ri(2, 6), c2 = 2, p1 = ri(1, 4), p2 = ri(p1 + 1, p1 + 4);
        // (c1 x^p1)/(c2 x^p2) = (c1/c2) / x^(p2−p1)
        var cc = R(c1, c2), d = p2 - p1;
        var right = m(fr(cc.html(), xe(d)));
        return Q({ q: 'Simplify ' + m(fr(rawMono(c1, p1, 0), rawMono(c2, p2, 0))) + '. Write your answer with positive exponents.', mc: mc(right, [m(cc.html() + xe(d)), m(fr(cc.html(), xe(p1 + p2))), m(fr('1', cc.html() + xe(d)))], function () { return m(fr(cc.html(), xe(d + rnz(1, 3)))); }), why: ['Divide coefficients: ' + m(fr(c1, c2) + ' = ' + cc.html()) + '.', 'Subtract exponents: ' + m(p1 + ' ' + M + ' ' + p2 + ' = ' + M + d) + ', so you get ' + m(xe(-d)) + '.', 'A negative exponent moves the power to the denominator: ' + m(xe(-d) + ' = ' + fr('1', xe(d))) + '. Answer: ' + right + '.'] });
      }
    ],
    [
      function () {
        var a = ri(2, 4), p = ri(1, 3), q = ri(1, 3), e = 2, c = ri(2, 6), r = ri(1, 4), s = ri(1, 4);
        // (a x^p y^q)^2 · (c x^r y^-s)
        var C = a * a * c, PX = p * e + r, QY = q * e - s;
        var right = m(mono(C, PX, QY));
        return Q({ q: 'Simplify ' + m('(' + rawMono(a, p, q) + ')<sup>2</sup> · ' + rawMono(c, r, -s)) + '. Use only positive exponents.', mc: mc(right, [m(mono(a * 2 * c, PX, QY)), m(mono(C, p * e * r, QY)), m(mono(C, PX, q * e + s))], function () { return m(mono(C, PX + rnz(-2, 2), QY)); }), why: ['Square first: ' + m('(' + rawMono(a, p, q) + ')<sup>2</sup> = ' + rawMono(a * a, 2 * p, 2 * q)) + '.', 'Multiply: coefficients ' + m(a * a + ' × ' + c + ' = ' + C) + '; ' + X + ' exponents ' + m(2 * p + ' + ' + r + ' = ' + PX) + '; ' + Y + ' exponents ' + m(2 * q + ' + (' + M + s + ') = ' + n(QY)) + '.', (QY < 0 ? 'Move the negative power of ' + Y + ' to the denominator. ' : '') + 'Answer: ' + right + '.'] });
      },
      function () {
        var b = pick([2, 3]), a = ri(2, 5), c = ri(1, 4), k = a + c;
        // b^a · b^c = b^k ; if b^x = b^a · b^c, x = ?
        var big = Math.pow(b, k);
        return Q({ q: 'If ' + m(pw(b, '<i>x</i>') + ' = ' + pw(b, a) + ' · ' + pw(b, c)) + ', what is the value of ' + X + '?', mc: K.mcNum(k, [a * c, big, Math.abs(a - c) || k + 1]), why: ['Product rule: ' + m(pw(b, a) + ' · ' + pw(b, c) + ' = ' + pw(b, a + ' + ' + c) + ' = ' + pw(b, k)) + '.', 'Same base on both sides, so the exponents are equal: ' + m('<i>x</i> = ' + k) + '.'] });
      },
      function () {
        var p = ri(3, 8), q = ri(1, p - 1), r = ri(1, 4);
        // (x^p · x^q) / x^r ^? ask value as exponent
        var e = p + q - r;
        return Q({ q: 'Which is equivalent to ' + m(fr(xe(p) + ' · ' + xe(q), '(' + xe(r) + ')<sup>2</sup>')) + ' for ' + m('<i>x</i> ≠ 0') + '?', mc: mc(m(e - r === 0 ? '1' : (e - r > 0 ? xe(e - r) : fr('1', xe(r - e)))), [m(xe(p * q - r * 2 > 0 ? p * q - 2 * r : p + q + 1)), m(xe(p + q - r)), m(xe(p + q + 2 * r))], function () { return m(xe(Math.abs(e - r) + ri(1, 3))); }), why: ['Numerator: ' + m(xe(p) + ' · ' + xe(q) + ' = ' + xe(p + q)) + '.', 'Denominator: ' + m('(' + xe(r) + ')<sup>2</sup> = ' + xe(2 * r)) + '.', 'Divide: ' + m(xe(p + q) + ' ÷ ' + xe(2 * r) + ' = ' + pw('<i>x</i>', n(p + q - 2 * r))) + (p + q - 2 * r < 0 ? ' = ' + m(fr('1', xe(2 * r - p - q))) : '') + '.'] });
      }
    ]
  ];
  K.lesson('6.1', { title: 'Properties of Exponents', std: 'MA.912.NSO.1.2', levels: u61 });

  /* ---------- 6.2 Rational Exponents ---------- */
  var PERF = { 2: [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144], 3: [8, 27, 64, 125, 216, 1000] };
  function rootOf(v, k) { return Math.round(Math.pow(v, 1 / k)); }
  var u62 = [
    [
      function () {
        var k = pick([2, 3]), v = pick(PERF[k]), r = rootOf(v, k);
        return Q({ q: 'Evaluate ' + m(pw(v, fr('1', k))) + '.', mc: K.mcNum(r, [v / k === Math.round(v / k) ? v / k : r + 1, v * k > 999 ? r + 2 : r * k, Math.pow(v, 2) > 999 ? r - 1 : r * r === v ? r + 3 : r * r]), why: ['A power of ' + m(fr('1', k)) + ' means the ' + (k === 2 ? 'square' : 'cube') + ' root: ' + m(pw(v, fr('1', k)) + ' = ' + (k === 2 ? K.sqrt(v) : K.cbrt(v))) + '.', m(r + (k === 2 ? ' × ' + r : ' × ' + r + ' × ' + r) + ' = ' + v) + ', so the answer is ' + r + '.'] });
      },
      function () {
        var a = ri(2, 7), b = pick([2, 3, 4, 5]); if (a % b === 0) a += 1;
        var g = K.gcd(a, b);
        var right = m(pw('<i>x</i>', fr(a, b)));
        var rootStr = b === 2 ? K.sqrt(xe(a)) : '<span class="rad"><sup class="ri">' + b + '</sup>√<span class="rc">' + xe(a) + '</span></span>';
        return Q({ q: 'Which is equivalent to ' + m(rootStr) + '?', mc: mc(right, [m(pw('<i>x</i>', fr(b, a))), m(pw('<i>x</i>', n(a * b))), m(pw('<i>x</i>', n(a - b > 0 ? a - b : a + b)))]), why: ['The root index goes in the <b>denominator</b>; the power inside goes in the <b>numerator</b>.', m(rootStr + ' = ' + pw('<i>x</i>', fr(a, b))) + '.'] });
      }
    ],
    [
      function () {
        var k = pick([2, 3]), v = pick(PERF[k].filter(function (z) { return z <= (k === 2 ? 100 : 125); })), r = rootOf(v, k), p = pick([2, 3]); if (k === 3) p = 2;
        var ans = Math.pow(r, p);
        return Q({ q: 'Evaluate ' + m(pw(v, fr(p, k))) + '.', mc: K.mcNum(ans, [r * p, Math.pow(v, p) > 9999 ? ans + r : r, ans + 1]), why: ['Take the root first, then the power: ' + m(pw(v, fr(p, k)) + ' = (' + (k === 2 ? K.sqrt(v) : K.cbrt(v)) + ')<sup>' + p + '</sup>') + '.', m((k === 2 ? K.sqrt(v) : K.cbrt(v)) + ' = ' + r) + ', and ' + m(pw(r, p) + ' = ' + ans) + '.'] });
      },
      function () {
        var k = pick([2, 3]), v = pick(PERF[k].filter(function (z) { return z <= 64; })), r = rootOf(v, k);
        return Q({ q: 'Evaluate ' + m(pw(v, M + fr('1', k))) + '.', mc: mc(m(fr('1', r)), [m(M + r), m(M + fr('1', r)), m(n(r))]), why: ['Negative exponent → reciprocal: ' + m(pw(v, M + fr('1', k)) + ' = ' + fr('1', pw(v, fr('1', k))) ) + '.', m(pw(v, fr('1', k)) + ' = ' + r) + ', so the value is ' + m(fr('1', r)) + '.'] });
      }
    ],
    [
      function () {
        var a = ri(1, 5), b = ri(1, 5), d = pick([2, 3, 4, 6]);
        var s = R(a, d).add(R(b, d));
        return Q({ q: 'Simplify ' + m(pw('<i>x</i>', fr(a, d)) + ' · ' + pw('<i>x</i>', fr(b, d))) + '.', mc: mc(m(s.isInt() ? xe(s.val()) : pw('<i>x</i>', s.html())), [m(pw('<i>x</i>', R(a * b, d * d).html())), m(pw('<i>x</i>', fr(a + b, 2 * d))), m(pw('<i>x</i>', R(a, d).mul(R(b, d)).add(1).html()))], function () { return m(pw('<i>x</i>', s.add(R(1, d)).html())); }), why: ['Product rule works with fraction exponents too: add them.', m(fr(a, d) + ' + ' + fr(b, d) + ' = ' + fr(a + b, d) + (R(a + b, d).d === d ? '' : ' = ' + s.html())) + '.', 'Answer: ' + m(s.isInt() ? xe(s.val()) : pw('<i>x</i>', s.html())) + '.'] });
      },
      function () {
        var b = pick([2, 3, 5]), v = Math.pow(b, 2), k = pick([3, 4]), big = Math.pow(b, k);
        // big^(x) = b ... SAT: (b^k)^(1/k) ; solve 8^x = 2 → x = 1/3
        return Q({ q: 'If ' + m(pw(big, '<i>x</i>') + ' = ' + b) + ', what is the value of ' + X + '?', mc: mc(m(fr('1', k)), [m(n(k)), m(M + fr('1', k)), m(fr('1', big))]), why: ['Write ' + big + ' as a power of ' + b + ': ' + m(big + ' = ' + pw(b, k)) + '.', 'So ' + m(pw('(' + pw(b, k) + ')', '<i>x</i>') + ' = ' + pw(b, k + '<i>x</i>') + ' = ' + pw(b, 1)) + '.', 'Set exponents equal: ' + m(k + '<i>x</i> = 1') + ', so ' + m('<i>x</i> = ' + fr('1', k)) + '.'] });
      },
      function () {
        var r = ri(2, 5), v = r * r * r * r;
        return Q({ q: 'Which expression is equal to ' + m(pw(v, fr('3', '4'))) + '?', mc: K.mcNum(r * r * r, [r * 3, v * 3 / 4, r * r * r * r * r * r * r * r > 99999 ? r * r : r * r * r * r]), why: [m(pw(v, fr('3', '4')) + ' = (' + pw(v, fr('1', '4')) + ')<sup>3</sup>') + '.', 'The fourth root of ' + v + ' is ' + r + ' because ' + m(pw(r, 4) + ' = ' + v) + '.', m(pw(r, 3) + ' = ' + r * r * r) + '.'] });
      }
    ]
  ];
  K.lesson('6.2', { title: 'Rational Exponents', std: 'MA.912.NSO.1.1', levels: u62 });

  /* ---------- 6.3 Exponential Growth & Decay ---------- */
  function bstr(b) { return n(b); }
  var u63 = [
    [
      function () {
        var a = ri(2, 900), b = pick([1.02, 1.05, 1.1, 1.25, 1.5, 2, 3, 0.5, 0.75, 0.8, 0.9, 0.95]);
        var ask = K.coin() ? 'a' : 'b';
        return Q({ q: 'In ' + m('<i>y</i> = ' + a + '(' + bstr(b) + ')<sup><i>x</i></sup>') + ', what is the ' + (ask === 'a' ? '<b>initial value</b>' : '<b>growth or decay factor</b>') + '?', mc: ask === 'a' ? K.mcNum(a, [b, a * b === Math.round(a * b) && a * b !== a ? a * b : a + 1, a + 10]) : mc(n(b), [n(a), n(K.round(1 - b, 2)) === n(b) ? '1' : n(K.round(Math.abs(1 - b), 2)), n(K.round(b + 1, 2))], function () { return n(K.round(b + rnz(1, 8) * 0.5, 2)); }), why: ['In ' + m('<i>y</i> = <i>a</i>(<i>b</i>)<sup><i>x</i></sup>') + ', <i>a</i> is the initial value (the value when <i>x</i> = 0) and <i>b</i> is the factor.', 'Here ' + m('<i>a</i> = ' + a) + ' and ' + m('<i>b</i> = ' + bstr(b)) + '.'] });
      },
      function () {
        var b = pick([1.03, 1.2, 1.5, 2, 3, 0.4, 0.6, 0.85, 0.97, 0.5]), a = ri(10, 500);
        var grow = b > 1;
        return Q({ q: 'Does ' + m('<i>f</i>(<i>x</i>) = ' + a + '(' + bstr(b) + ')<sup><i>x</i></sup>') + ' show exponential growth or decay?', mc: mc(grow ? 'Growth, because ' + bstr(b) + ' &gt; 1' : 'Decay, because 0 &lt; ' + bstr(b) + ' &lt; 1', [grow ? 'Decay, because 0 &lt; ' + bstr(b) + ' &lt; 1' : 'Growth, because ' + bstr(b) + ' &gt; 1', 'Growth, because ' + a + ' is positive', 'Neither; it is linear']), why: ['Look at the factor <i>b</i>. If <i>b</i> &gt; 1, it is growth. If 0 &lt; <i>b</i> &lt; 1, it is decay.', 'Here <i>b</i> = ' + bstr(b) + ', so it is ' + (grow ? 'growth' : 'decay') + '.'] });
      }
    ],
    [
      function () {
        var pct = pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25]), grow = K.coin(), b = K.round(grow ? 1 + pct / 100 : 1 - pct / 100, 2);
        return Q({ q: 'For ' + m('<i>y</i> = ' + ri(100, 999) + '(' + n(b) + ')<sup><i>t</i></sup>') + ', what is the percent rate of change per time period?', mc: mc((grow ? 'Increase of ' : 'Decrease of ') + pct + '%', [(grow ? 'Decrease of ' : 'Increase of ') + pct + '%', (grow ? 'Increase of ' : 'Decrease of ') + n(b * 100) + '%', (grow ? 'Increase of ' : 'Decrease of ') + n(K.round(pct / 10, 1)) + '%']), why: ['The factor is ' + m('<i>b</i> = 1 ' + (grow ? '+' : M) + ' <i>r</i>') + '.', grow ? m(n(b) + ' = 1 + ' + n(pct / 100)) + ', so <i>r</i> = ' + n(pct / 100) + ' = ' + pct + '% growth.' : m(n(b) + ' = 1 ' + M + ' ' + n(pct / 100)) + ', so <i>r</i> = ' + n(pct / 100) + ' = ' + pct + '% decay.'] });
      },
      function () {
        var pct = pick([3, 4, 5, 6, 8, 10, 15, 20]), grow = K.coin(), b = K.round(grow ? 1 + pct / 100 : 1 - pct / 100, 2);
        return Q({ q: 'A quantity ' + (grow ? 'increases' : 'decreases') + ' by ' + pct + '% each year. What is its yearly factor <i>b</i> in ' + m('<i>y</i> = <i>a</i>(<i>b</i>)<sup><i>t</i></sup>') + '?', mc: mc(n(b), [n(K.round(grow ? 1 - pct / 100 : 1 + pct / 100, 2)), n(pct / 100), n(pct)]), why: ['Growth factor = 1 + rate; decay factor = 1 ' + M + ' rate.', 'Rate = ' + pct + '% = ' + n(pct / 100) + ', so ' + m('<i>b</i> = 1 ' + (grow ? '+' : M) + ' ' + n(pct / 100) + ' = ' + n(b)) + '.'] });
      }
    ],
    [
      function () {
        var a = 100 * ri(5, 40), pct = pick([5, 10, 20, 25, 50]), t = pick([2, 3]);
        var b = 1 - pct / 100, val = K.round(a * Math.pow(b, t), 2);
        return Q({ q: 'A car worth $' + K.comma(a) + ' loses ' + pct + '% of its value each year. What is its value after ' + t + ' years?', mc: mc(K.money(val), [K.money(Math.max(a - a * pct / 100 * t, K.round(a * pct / 100, 2))), K.money(K.round(a * Math.pow(1 + pct / 100, t), 2)), K.money(K.round(a * b, 2))], function (i) { return K.money(K.round(val + 25 * i, 2)); }), why: ['Decay model: ' + m('<i>V</i> = ' + K.comma(a) + '(' + n(b) + ')<sup><i>t</i></sup>') + '.', m('<i>V</i> = ' + K.comma(a) + '(' + n(b) + ')<sup>' + t + '</sup> = ' + K.comma(a) + ' × ' + n(K.round(Math.pow(b, t), 4)) + ' = ' + K.comma(val)) + '.', 'Each year the ' + pct + '% is taken from a smaller amount, so the value does not drop by the same dollar amount every year.'] });
      },
      function () {
        var a = ri(2, 9) * 100, b = pick([2, 3]), t = ri(3, 6), tot = a * Math.pow(b, t);
        return Q({ q: 'A colony of ' + a + ' bacteria ' + (b === 2 ? 'doubles' : 'triples') + ' every hour. Which function gives the number of bacteria after <i>h</i> hours, and how many are there after ' + t + ' hours?', mc: mc(m('<i>B</i> = ' + a + '(' + b + ')<sup><i>h</i></sup>') + '; ' + K.comma(tot), [m('<i>B</i> = ' + a + ' + ' + b + '<i>h</i>') + '; ' + K.comma(a + b * t), m('<i>B</i> = ' + b + '(' + a + ')<sup><i>h</i></sup>') + '; ' + K.comma(tot * b), m('<i>B</i> = ' + a + '(' + b + ')<sup><i>h</i></sup>') + '; ' + K.comma(a * b * t)]), why: ['Starting amount ' + a + ', factor ' + b + ': ' + m('<i>B</i> = ' + a + '(' + b + ')<sup><i>h</i></sup>') + '.', m('<i>B</i>(' + t + ') = ' + a + ' × ' + b + '<sup>' + t + '</sup> = ' + a + ' × ' + Math.pow(b, t) + ' = ' + K.comma(tot)) + '.'] });
      }
    ]
  ];
  K.lesson('6.3', { title: 'Exponential Growth & Decay', std: 'MA.912.AR.5.3', levels: u63 });

  /* ---------- 6.4 Writing Exponential Functions ---------- */
  function expEq(a, b, v) { return m('<i>y</i> = ' + K.expo(a, b, v)); }
  var u64 = [
    [
      function () {
        var a = ri(1, 9), b = pick([2, 3, 4]);
        var xs = [0, 1, 2, 3], ys = xs.map(function (x) { return a * Math.pow(b, x); });
        return Q({ q: 'Which exponential function matches the table?' + K.xyTable(xs, ys), mc: mc(expEq(a, b), [expEq(b, a), m('<i>y</i> = ' + P([[ys[1] - ys[0], X], [a, '']])), expEq(a, b + 1)], function (i) { return expEq(a + i, b); }), why: ['Initial value (at <i>x</i> = 0): ' + m('<i>a</i> = ' + a) + '.', 'Factor: ' + m(ys[1] + ' ÷ ' + ys[0] + ' = ' + b) + ', the same each step.', 'Function: ' + expEq(a, b) + '.'] });
      },
      function () {
        var a = 10 * ri(2, 50), pct = pick([2, 3, 5, 8, 10, 12, 20]), grow = K.coin(), b = K.round(grow ? 1 + pct / 100 : 1 - pct / 100, 2);
        return Q({ q: 'A town has ' + K.comma(a) + ' residents and its population ' + (grow ? 'grows' : 'shrinks') + ' by ' + pct + '% per year. Which function models the population after <i>t</i> years?', mc: mc(expEq(a, b, 't'), [expEq(a, K.round(grow ? 1 - pct / 100 : 1 + pct / 100, 2), 't'), expEq(a, pct / 100, 't'), m('<i>y</i> = ' + K.comma(a) + ' ' + (grow ? '+' : M) + ' ' + pct + '<i>t</i>')]), why: ['Initial value: ' + K.comma(a) + '.', 'Factor: ' + m('1 ' + (grow ? '+' : M) + ' ' + n(pct / 100) + ' = ' + n(b)) + '.', 'Model: ' + expEq(a, b, 't') + '.'] });
      }
    ],
    [
      function () {
        var a = pick([1, 2, 3, 4]), b = pick([2, 3]);
        var pts = [[0, a], [1, a * b], [2, a * b * b]];
        var g = K.plane({ x: [-3, 4], y: [0, Math.max(10, a * b * b + 2)], stepY: a * b * b + 2 > 12 ? 2 : 1, labY: a * b * b + 2 > 12 ? 4 : 2, fns: [{ f: function (x) { return a * Math.pow(b, x); } }], pts: pts.map(function (p) { return { x: p[0], y: p[1], label: '(' + p[0] + ', ' + p[1] + ')' }; }) });
        return Q({ q: 'Which function is shown in the graph?', graph: g, mc: mc(expEq(a, b), [expEq(b, a === b ? a + 1 : a), expEq(a, b + 1), m('<i>y</i> = ' + P([[a * b - a, X], [a, '']]))], function (i) { return expEq(a + i, b); }), why: ['The ' + Y + '-intercept is ' + K.pt(0, a) + ', so ' + m('<i>a</i> = ' + a) + '.', 'From ' + K.pt(0, a) + ' to ' + K.pt(1, a * b) + ' the value is multiplied by ' + b + ', so ' + m('<i>b</i> = ' + b) + '.', 'Function: ' + expEq(a, b) + '.'] });
      },
      function () {
        var a = pick([64, 81, 128, 243, 256, 500, 1000]), b = a === 81 || a === 243 ? R(1, 3) : a === 500 || a === 1000 ? R(1, 5) : R(1, 2);
        if (a === 500) b = R(1, 5);
        var xs = [0, 1, 2, 3], ys = xs.map(function (x) { return a * Math.pow(b.val(), x); });
        var bhtml = b.html();
        return Q({ q: 'Which function models the table?' + K.xyTable(xs, ys.map(function (v) { return K.round(v, 3); })), mc: mc(m('<i>y</i> = ' + a + '(' + bhtml + ')<sup><i>x</i></sup>'), [m('<i>y</i> = ' + a + '(' + R(b.d).html() + ')<sup><i>x</i></sup>'), m('<i>y</i> = ' + P([[ys[1] - ys[0], X], [a, '']])), m('<i>y</i> = ' + bhtml + '(' + a + ')<sup><i>x</i></sup>')]), why: ['Initial value ' + a + ' (at <i>x</i> = 0).', 'Each value is ' + bhtml + ' of the previous one: ' + m(n(K.round(ys[1], 3)) + ' ÷ ' + a + ' = ' + bhtml) + '. That is decay.', 'Model: ' + m('<i>y</i> = ' + a + '(' + bhtml + ')<sup><i>x</i></sup>') + '.'] });
      }
    ],
    [
      function () {
        var a = pick([2, 3, 4, 5]), b = pick([2, 3]);
        // values at x=1 and x=3 given
        var y1 = a * b, y3 = a * b * b * b;
        return Q({ q: 'An exponential function ' + m('<i>y</i> = <i>a</i>(<i>b</i>)<sup><i>x</i></sup>') + ' passes through ' + K.pt(1, y1) + ' and ' + K.pt(3, y3) + ', with <i>b</i> &gt; 0. What is the function?', mc: mc(expEq(a, b), [expEq(y1, b), expEq(a, b * b), expEq(b, a === b ? a + 1 : a)]), why: ['From <i>x</i> = 1 to <i>x</i> = 3 (two steps), the value is multiplied by ' + m(y3 + ' ÷ ' + y1 + ' = ' + b * b) + '.', 'Two steps of <i>b</i> give ' + m('<i>b</i><sup>2</sup> = ' + b * b) + ', so ' + m('<i>b</i> = ' + b) + '.', 'Then ' + m('<i>a</i> · ' + b + ' = ' + y1) + ', so ' + m('<i>a</i> = ' + a) + '. Function: ' + expEq(a, b) + '.'] });
      },
      function () {
        var hl = pick([2, 3, 5, 8]), a = pick([80, 120, 200, 400]);
        return Q({ q: 'A medicine has a half-life of ' + hl + ' hours. A patient takes ' + a + ' mg. Which function gives the amount left after <i>t</i> hours?', mc: mc(m('<i>A</i> = ' + a + '(' + fr('1', '2') + ')<sup>' + fr('<i>t</i>', hl) + '</sup>'), [m('<i>A</i> = ' + a + '(' + fr('1', '2') + ')<sup>' + hl + '<i>t</i></sup>'), m('<i>A</i> = ' + a + '(2)<sup>' + fr('<i>t</i>', hl) + '</sup>'), m('<i>A</i> = ' + a + ' ' + M + ' ' + fr('1', '2') + '<i>t</i>')]), why: ['Every ' + hl + ' hours, the amount is multiplied by ' + fr('1', '2') + '.', 'After <i>t</i> hours, the number of half-lives is ' + m(fr('<i>t</i>', hl)) + '.', 'So ' + m('<i>A</i> = ' + a + '(' + fr('1', '2') + ')<sup>' + fr('<i>t</i>', hl) + '</sup>') + '. Check: at ' + m('<i>t</i> = ' + hl) + ', ' + m('<i>A</i> = ' + a / 2) + ' mg.'] });
      }
    ]
  ];
  K.lesson('6.4', { title: 'Writing Exponential Functions', std: 'MA.912.AR.5.4', levels: u64 });

  /* ---------- 6.5 Graphing Exponential Functions ---------- */
  var u65 = [
    [
      function () {
        var a = ri(1, 9), b = pick([2, 3, 4, 1.5, 0.5]);
        return Q({ q: 'What is the ' + Y + '-intercept of ' + m('<i>f</i>(<i>x</i>) = ' + K.expo(a, b)) + '?', mc: mc(K.pt(0, a), [K.pt(0, b === Math.round(b) && b !== a ? b : a + 1), K.pt(a, 0), K.pt(0, 0)]), why: ['The ' + Y + '-intercept is where <i>x</i> = 0.', m('<i>f</i>(0) = ' + a + '(' + n(b) + ')<sup>0</sup> = ' + a + ' · 1 = ' + a) + '.', 'So the ' + Y + '-intercept is ' + K.pt(0, a) + '.'] });
      },
      function () {
        var a = ri(2, 5), b = pick([2, 3, 0.5]), k = ri(-3, 3);
        return Q({ q: 'What is the horizontal asymptote of ' + m('<i>f</i>(<i>x</i>) = ' + K.expo(a, b) + K.plusK(k)) + '?', mc: mc(m('<i>y</i> = ' + n(k)), [m('<i>y</i> = ' + n(a)), m('<i>x</i> = ' + n(k)), m('<i>y</i> = ' + n(a + k))], function (i) { return m('<i>y</i> = ' + n(k + i)); }), why: ['The graph of ' + m('<i>a</i>(<i>b</i>)<sup><i>x</i></sup>') + ' gets closer and closer to <i>y</i> = 0 but never reaches it.', 'Adding ' + n(k) + ' shifts everything ' + (k >= 0 ? 'up' : 'down') + ' by ' + Math.abs(k) + ', so the asymptote is ' + m('<i>y</i> = ' + n(k)) + '.'] });
      }
    ],
    [
      function () {
        var a = pick([1, 2, 3]), b = pick([2, 3, 0.5]), k = pick([0, 0, 1, 2, -1]);
        var g = K.plane({ x: [-5, 5], y: [-3, 9], fns: [{ f: function (x) { return a * Math.pow(b, x) + k; } }], lines: k !== 0 ? [{ m: 0, b: k, dash: true, color: K.COL.gray }] : [] });
        var lo = k;
        return Q({ q: 'The graph shows ' + m('<i>f</i>(<i>x</i>) = ' + K.expo(a, b) + K.plusK(k)) + '. What is its <b>range</b>?', graph: g, mc: mc(m('<i>y</i> &gt; ' + n(lo)), [m('<i>y</i> ≥ ' + n(lo)), 'All real numbers', m('<i>x</i> &gt; ' + n(lo))]), why: ['The range is the set of possible ' + Y + '-values.', 'The graph gets close to the asymptote ' + m('<i>y</i> = ' + n(lo)) + ' but never touches it, and it goes up without bound.', 'Range: ' + m('<i>y</i> &gt; ' + n(lo)) + '. (The domain is all real numbers.)'] });
      },
      function () {
        var a = ri(1, 6), b = pick([2, 3, 1.5, 0.5, 0.25, 0.8]);
        var inc = b > 1;
        return Q({ q: 'Describe ' + m('<i>f</i>(<i>x</i>) = ' + K.expo(a, b)) + '.', mc: mc(inc ? 'Increasing; as <i>x</i> → ∞, <i>f</i>(<i>x</i>) → ∞' : 'Decreasing; as <i>x</i> → ∞, <i>f</i>(<i>x</i>) → 0', [inc ? 'Decreasing; as <i>x</i> → ∞, <i>f</i>(<i>x</i>) → 0' : 'Increasing; as <i>x</i> → ∞, <i>f</i>(<i>x</i>) → ∞', inc ? 'Increasing; as <i>x</i> → ∞, <i>f</i>(<i>x</i>) → 0' : 'Decreasing; as <i>x</i> → ∞, <i>f</i>(<i>x</i>) → −∞', 'Constant; <i>f</i>(<i>x</i>) = ' + a + ' for all <i>x</i>']), why: ['With <i>a</i> &gt; 0: if <i>b</i> &gt; 1 the graph increases; if 0 &lt; <i>b</i> &lt; 1 it decreases.', 'Here <i>b</i> = ' + n(b) + (inc ? ', so it increases without bound as <i>x</i> grows.' : ', so it decreases toward 0 (the asymptote) as <i>x</i> grows.')] });
      }
    ],
    [
      function () {
        var opts = [[2, 2], [1, 3], [4, 0.5], [3, 2]], pick1 = pick(opts), a = pick1[0], b = pick1[1];
        var g = K.plane({ x: [-4, 4], y: [-1, 10], fns: [{ f: function (x) { return a * Math.pow(b, x); } }], pts: [{ x: 0, y: a }, { x: 1, y: a * b }] });
        return Q({ q: 'Which function is graphed? (Points are at <i>x</i> = 0 and <i>x</i> = 1.)', graph: g, mc: mc(expEq(a, b), [expEq(b, a), expEq(a * b, b), expEq(a, 1 / b)], function (i) { return expEq(a + i, b); }), why: ['At <i>x</i> = 0 the graph is at ' + n(a) + ', so <i>a</i> = ' + n(a) + '.', 'At <i>x</i> = 1 it is at ' + n(a * b) + ', so the factor is ' + m(n(a * b) + ' ÷ ' + n(a) + ' = ' + n(b)) + '.', 'Function: ' + expEq(a, b) + '.'] });
      },
      function () {
        var a = ri(2, 5), b = pick([2, 3]), k = ri(1, 4);
        var f = function (x) { return a * Math.pow(b, x) + k; };
        var p = ri(0, 1), q = p + 2;
        var arc = R(f(q) - f(p), 2);
        return Q({ q: 'For ' + m('<i>f</i>(<i>x</i>) = ' + a + '(' + b + ')<sup><i>x</i></sup> + ' + k) + ', what is the average rate of change from ' + m('<i>x</i> = ' + p) + ' to ' + m('<i>x</i> = ' + q) + '?', mc: K.mc(arc.html(), [n(f(q) - f(p)), R(f(q) + f(p), 2).html(), n(b)], function () { return arc.add(rnz(-4, 4)).html(); }), why: [m('<i>f</i>(' + p + ') = ' + f(p)) + ' and ' + m('<i>f</i>(' + q + ') = ' + f(q)) + '.', m(fr(f(q) + ' ' + M + ' ' + f(p), q + ' ' + M + ' ' + p) + ' = ' + fr(f(q) - f(p), 2) + ' = ' + arc.html()) + '.', 'Unlike a linear function, this rate gets bigger on later intervals.'] });
      }
    ]
  ];
  K.lesson('6.5', { title: 'Graphing Exponential Functions', std: 'MA.912.AR.5.6', levels: u65 });

  /* ---------- 6.6 Simple & Compound Interest ---------- */
  var u66 = [
    [
      function () {
        var Pp = 100 * ri(5, 50), r = pick([2, 3, 4, 5, 6, 8]), t = ri(2, 10), I = Pp * r / 100 * t;
        return Q({ q: 'Find the simple interest on $' + K.comma(Pp) + ' at ' + r + '% per year for ' + t + ' years. Use ' + m('<i>I</i> = <i>Prt</i>') + '.', mc: mc(K.money(I), [K.money(Pp * r * t), K.money(Pp + I), K.money(Pp * r / 100)]), why: ['Write the rate as a decimal: ' + r + '% = ' + n(r / 100) + '.', m('<i>I</i> = ' + K.comma(Pp) + ' × ' + n(r / 100) + ' × ' + t + ' = ' + K.comma(I)) + '.', 'The interest is ' + K.money(I) + '.'] });
      },
      function () {
        var Pp = 100 * ri(5, 40), r = pick([2, 3, 4, 5, 6]), t = ri(2, 8), I = Pp * r / 100 * t;
        return Q({ q: 'You deposit $' + K.comma(Pp) + ' in an account that pays ' + r + '% <b>simple</b> interest per year. What is the total balance after ' + t + ' years?', mc: mc(K.money(Pp + I), [K.money(I), K.money(K.round(Pp * Math.pow(1 + r / 100, t), 2)), K.money(Pp + Pp * r / 100)]), why: ['Interest: ' + m('<i>I</i> = ' + K.comma(Pp) + ' × ' + n(r / 100) + ' × ' + t + ' = ' + K.comma(I)) + '.', 'Balance = principal + interest = ' + m(K.comma(Pp) + ' + ' + K.comma(I) + ' = ' + K.comma(Pp + I)) + '.'] });
      }
    ],
    [
      function () {
        var Pp = 100 * ri(10, 50), r = pick([2, 4, 5, 6, 8]), t = pick([2, 3]), nC = 1;
        var A = K.round(Pp * Math.pow(1 + r / 100, t), 2);
        return Q({ q: '$' + K.comma(Pp) + ' is invested at ' + r + '% interest compounded annually. Use ' + m('<i>A</i> = <i>P</i>(1 + <i>r</i>)<sup><i>t</i></sup>') + ' to find the balance after ' + t + ' years.', mc: mc(K.money(A), [K.money(Pp + Pp * r / 100 * t), K.money(K.round(Pp * (1 + r / 100), 2)), K.money(K.round(Pp * (1 + r / 100) * t, 2))]), why: [m('<i>A</i> = ' + K.comma(Pp) + '(1 + ' + n(r / 100) + ')<sup>' + t + '</sup> = ' + K.comma(Pp) + '(' + n(1 + r / 100) + ')<sup>' + t + '</sup>') + '.', m('(' + n(1 + r / 100) + ')<sup>' + t + '</sup> = ' + n(K.round(Math.pow(1 + r / 100, t), 6))) + ', so ' + m('<i>A</i> = ' + K.money(A).replace('$', '')) + ' dollars.'] });
      },
      function () {
        var Pp = 1000 * ri(1, 5), r = pick([4, 6, 8, 12]), nC = pick([2, 4, 12]), t = pick([1, 2]);
        var A = K.round(Pp * Math.pow(1 + r / 100 / nC, nC * t), 2);
        var nm = { 2: 'semiannually (twice a year)', 4: 'quarterly', 12: 'monthly' }[nC];
        return Q({ q: '$' + K.comma(Pp) + ' earns ' + r + '% annual interest compounded ' + nm + '. Using ' + m('<i>A</i> = <i>P</i>(1 + ' + fr('<i>r</i>', '<i>n</i>') + ')<sup><i>nt</i></sup>') + ', what is the balance after ' + t + ' year' + (t > 1 ? 's' : '') + '? (Round to the nearest cent.)', mc: mc(K.money(A), [K.money(K.round(Pp * Math.pow(1 + r / 100, t), 2)), K.money(Pp + Pp * r / 100 * t), K.money(K.round(Pp * Math.pow(1 + r / 100 / nC, t), 2))], function (i) { return K.money(K.round(A + 10 * rnz(-5, 5) * i / i, 2)); }), why: ['Here ' + m('<i>r</i> = ' + n(r / 100)) + ', ' + m('<i>n</i> = ' + nC) + ', ' + m('<i>t</i> = ' + t) + '.', m('<i>A</i> = ' + K.comma(Pp) + '(1 + ' + fr(n(r / 100), nC) + ')<sup>' + nC + '·' + t + '</sup> = ' + K.comma(Pp) + '(' + n(K.round(1 + r / 100 / nC, 6)) + ')<sup>' + nC * t + '</sup>') + '.', 'That is about ' + K.money(A) + '.'] });
      }
    ],
    [
      function () {
        var Pp = 1000 * ri(1, 5), r = pick([5, 6, 8, 10]), t = pick([3, 5, 10]);
        var S = Pp + Pp * r / 100 * t, C = K.round(Pp * Math.pow(1 + r / 100, t), 2);
        var diff = K.round(C - S, 2);
        return Q({ q: 'Maya puts $' + K.comma(Pp) + ' in an account paying ' + r + '% simple interest. Leo puts $' + K.comma(Pp) + ' in an account paying ' + r + '% interest compounded annually. After ' + t + ' years, how much more does Leo have? (Round to the nearest cent.)', mc: mc(K.money(diff), [K.money(0), K.money(K.round(C, 2)), K.money(K.round(diff * 2, 2))]), why: ['Maya (simple): ' + m(K.comma(Pp) + ' + ' + K.comma(Pp) + '(' + n(r / 100) + ')(' + t + ') = ' + K.comma(S)) + '.', 'Leo (compound): ' + m(K.comma(Pp) + '(' + n(1 + r / 100) + ')<sup>' + t + '</sup> ≈ ' + K.money(C).replace('$', '')) + '.', 'Difference: about ' + K.money(diff) + '. Compound interest earns interest on interest, so it grows faster.'] });
      },
      function () {
        var kind = K.coin() ? 'simple' : 'compound';
        var right = kind === 'simple' ? 'Linear, because the same dollar amount of interest is added each year' : 'Exponential, because the balance is multiplied by the same factor each year';
        return Q({ q: 'An account earns ' + (kind === 'simple' ? 'simple' : 'compound') + ' interest. What kind of function models the balance over time, and why?', mc: mc(right, [kind === 'simple' ? 'Exponential, because the balance is multiplied by the same factor each year' : 'Linear, because the same dollar amount of interest is added each year', 'Quadratic, because interest speeds up', 'Linear, because the interest rate stays the same']), why: [kind === 'simple' ? 'Simple interest is calculated on the original principal only, so the same amount is added each year: a constant rate of change (linear).' : 'Compound interest is calculated on the growing balance, so each year the balance is multiplied by (1 + <i>r</i>): a constant ratio (exponential).'] });
      },
      function () {
        var Pp = 100 * ri(20, 80), I = Pp * pick([2, 3, 4, 5, 6]) / 100 * pick([2, 3, 4]), t = pick([2, 3, 4]);
        var r = I / (Pp * t) * 100;
        if (Math.abs(r - Math.round(r * 10) / 10) > 1e-9) return u66[2][0]();
        return Q({ q: 'A loan of $' + K.comma(Pp) + ' charged $' + K.comma(I) + ' in simple interest over ' + t + ' years. What was the annual interest rate?', mc: mc(n(K.round(r, 2)) + '%', [n(K.round(r * t, 2)) + '%', n(K.round(I / Pp * 100, 2)) === n(K.round(r, 2)) ? n(K.round(r + 1, 2)) + '%' : n(K.round(I / Pp * 100, 2)) + '%', n(K.round(r / 100, 4)) + '%'], function () { return n(K.round(r + rnz(-3, 3) * 0.5, 2)) + '%'; }), why: ['Solve ' + m('<i>I</i> = <i>Prt</i>') + ' for <i>r</i>: ' + m('<i>r</i> = ' + fr('<i>I</i>', '<i>Pt</i>')) + '.', m('<i>r</i> = ' + fr(K.comma(I), K.comma(Pp) + ' × ' + t) + ' = ' + n(K.round(r / 100, 4))) + '.', 'As a percent: ' + n(K.round(r, 2)) + '%.'] });
      }
    ]
  ];
  K.lesson('6.6', { title: 'Simple & Compound Interest', std: 'MA.912.FL.3.2 · FL.3.4', levels: u66 });
  K.review(6, 'Unit 6 Review: Exponential Functions & Financial Literacy');
})(typeof window !== 'undefined' ? window.KCEP : globalThis.KCEP);
