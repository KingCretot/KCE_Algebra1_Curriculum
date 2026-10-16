/* Unit 10 — Statistics & Data Analysis */
(function (K) {
  function corr(D) { var n = D.length, mx = 0, my = 0, sxy = 0, sxx = 0, syy = 0; D.forEach(function (p) { mx += p[0] / n; my += p[1] / n; }); D.forEach(function (p) { sxy += (p[0] - mx) * (p[1] - my); sxx += (p[0] - mx) * (p[0] - mx); syy += (p[1] - my) * (p[1] - my); }); return sxx && syy ? sxy / Math.sqrt(sxx * syy) : 0; }
  var ri = K.ri, rnz = K.rnz, pick = K.pick, n = K.n, P = K.poly, X = K.x, Y = K.y, Q = K.Q, mc = K.mc, M = K.MINUS, m = K.m, fr = K.frx, R = K.R;
  function sorted(a) { return a.slice().sort(function (p, q) { return p - q; }); }
  function median(a) { var s = sorted(a), L = s.length; return L % 2 ? s[(L - 1) / 2] : (s[L / 2 - 1] + s[L / 2]) / 2; }
  function mean(a) { return a.reduce(function (p, q) { return p + q; }, 0) / a.length; }
  function five(a) { var s = sorted(a), L = s.length, lo = s.slice(0, Math.floor(L / 2)), hi = s.slice(Math.ceil(L / 2)); return [s[0], median(lo), median(s), median(hi), s[L - 1]]; }
  function list(a) { return a.map(n).join(', '); }
  function pct(x) { return n(K.round(x * 100, 1)) + '%'; }

  /* ---------- 10.1 Representing Data ---------- */
  var NUM = ['heights of students in centimeters', 'number of pets each family owns', 'daily high temperatures', 'minutes spent on homework', 'test scores', 'ages of people at a park'];
  var CAT = ['favorite ice cream flavor', 'eye color', 'type of pet owned', 'favorite sport', 'country of birth', 'shirt color'];
  var u101 = [
    [
      function () {
        var isNum = K.coin(), d = isNum ? pick(NUM) : pick(CAT);
        return Q({ q: 'A survey records the <b>' + d + '</b>. Is this data numerical or categorical?', mc: mc(isNum ? 'Numerical' : 'Categorical', [isNum ? 'Categorical' : 'Numerical', 'Both numerical and categorical', 'Neither']), why: [isNum ? 'The values are numbers that can be measured or counted, and averaging them makes sense: numerical.' : 'The values are labels or groups, not quantities you can average: categorical.'] });
      },
      function () {
        var bi = K.coin();
        var d = bi ? pick(['each student’s height and arm span', 'hours studied and test score for each student', 'temperature and ice cream sales each day', 'age and price of each used car']) : pick(['each student’s height', 'the test score of each student', 'the daily temperature', 'the price of each used car']);
        return Q({ q: 'A data set records <b>' + d + '</b>. Is it univariate or bivariate?', mc: mc(bi ? 'Bivariate' : 'Univariate', [bi ? 'Univariate' : 'Bivariate', 'Categorical', 'Trivariate']), why: [bi ? 'Two variables are recorded for each individual, so it is <b>bivariate</b>.' : 'Only one variable is recorded for each individual, so it is <b>univariate</b>.'] });
      }
    ],
    [
      function () {
        var cases = [['the relationship between hours of sleep and test score', 'Scatter plot', 'Two numerical variables for each student: a scatter plot shows the relationship.'], ['how many students chose each favorite sport', 'Bar graph', 'Counts of a categorical variable: a bar graph.'], ['the distribution of 50 students’ heights, grouped in intervals', 'Histogram', 'One numerical variable grouped into intervals: a histogram.'], ['the median, quartiles, and spread of test scores for two classes', 'Box plot', 'Box plots show the five-number summary and make comparing spreads easy.']];
        var c = pick(cases);
        return Q({ q: 'Which display is best for showing ' + c[0] + '?', mc: mc(c[1], ['Scatter plot', 'Bar graph', 'Histogram', 'Box plot', 'Circle graph'].filter(function (z) { return z !== c[1]; }).slice(0, 3)), why: [c[2]] });
      },
      function () {
        var vals = []; for (var i = 0; i < ri(8, 12); i++) vals.push(ri(1, 8));
        var t = ri(1, 8), cnt = vals.filter(function (v) { return v === t; }).length;
        if (cnt === 0) { vals.push(t); cnt = 1; }
        return Q({ q: 'The dot plot shows how many books each student read this month. How many students read exactly ' + t + (t === 1 ? ' book?' : ' books?'), graph: K.dotPlot({ vals: vals, min: 0, max: 9, title: 'Books read' }), mc: K.mcNum(cnt, [cnt + 1, vals.length, Math.max(0, cnt - 1) === cnt ? cnt + 2 : Math.max(0, cnt - 1)].filter(function (z) { return z >= 0; })), why: ['Each dot is one student.', 'Count the dots above ' + t + ': there ' + (cnt === 1 ? 'is 1 dot.' : 'are ' + cnt + ' dots.')] });
      }
    ],
    [
      function () {
        var labels = ['0–9', '10–19', '20–29', '30–39', '40–49'], vals = labels.map(function () { return ri(1, 9); });
        var i = ri(1, 3), above = vals.slice(i).reduce(function (p, q) { return p + q; }, 0), lowB = i * 10;
        return Q({ q: 'The histogram shows minutes spent exercising. How many people exercised <b>at least</b> ' + lowB + ' minutes?', graph: K.bars({ labels: labels, vals: vals, hist: true, ymax: 10, ystep: 2, xlab: 'Minutes', ylab: 'People' }), mc: K.mcNum(above, [vals[i], above - vals[i], vals.reduce(function (p, q) { return p + q; }, 0)]), why: ['"At least ' + lowB + '" includes the bar starting at ' + lowB + ' and every bar to its right.', 'Add those bars: ' + vals.slice(i).join(' + ') + ' = ' + above + '.', 'A histogram groups data into intervals, so you cannot see individual values.'] });
      },
      function () {
        var opts = mc('A histogram shows numerical data in intervals with touching bars; a bar graph shows categories with gaps between bars', ['A histogram shows categories; a bar graph shows numerical data', 'They are exactly the same', 'A bar graph must show percents; a histogram shows counts']);
        return Q({ q: 'What is the key difference between a histogram and a bar graph?', mc: opts, why: ['Histograms are for <b>numerical</b> data grouped into intervals; the bars touch because the intervals are continuous.', 'Bar graphs are for <b>categorical</b> data; the bars are separated because the categories are distinct.'] });
      }
    ]
  ];
  K.lesson('10.1', { title: 'Representing Data', std: 'MA.912.DP.1.1', levels: u101 });

  /* ---------- 10.2 Interpreting Distributions ---------- */
  var u102 = [
    [
      function () {
        var L = pick([5, 7, 9]), d = []; for (var i = 0; i < L; i++) d.push(ri(2, 30));
        var med = median(d), mn = mean(d);
        return Q({ q: 'What is the median of this data set? ' + m(list(d)), mc: K.mcNum(med, [d[Math.floor(L / 2)] === med ? med + 1 : d[Math.floor(L / 2)], K.round(mn, 1) === med ? med + 2 : K.round(mn, 1), Math.max.apply(null, d) - Math.min.apply(null, d)]), why: ['Put the data in order: ' + m(list(sorted(d))) + '.', 'With ' + L + ' values, the median is the middle one (position ' + (L + 1) / 2 + '): ' + n(med) + '.', 'Do not take the middle of the unsorted list.'] });
      },
      function () {
        var f = [ri(10, 20)]; for (var i = 1; i < 5; i++) f.push(f[i - 1] + ri(2, 8));
        var lo = Math.floor(f[0] / 5) * 5, hi = Math.ceil(f[4] / 5) * 5; if (hi === lo) hi += 5;
        var ask = pick(['med', 'iqr', 'range']);
        var ans = ask === 'med' ? f[2] : ask === 'iqr' ? f[3] - f[1] : f[4] - f[0];
        return Q({ q: 'Use the box plot. What is the ' + (ask === 'med' ? 'median' : ask === 'iqr' ? 'interquartile range (IQR)' : 'range') + '?', graph: K.boxPlot({ five: f, min: lo, max: hi, step: (hi - lo) > 30 ? 5 : (hi - lo) > 15 ? 2 : 1, title: 'Points scored per game' }), mc: K.mcNum(ans, [f[2], f[3] - f[1], f[4] - f[0], f[1]].filter(function (z) { return z !== ans; })), why: ['Five-number summary: min ' + f[0] + ', Q1 ' + f[1] + ', median ' + f[2] + ', Q3 ' + f[3] + ', max ' + f[4] + '.', ask === 'med' ? 'The median is the line inside the box: ' + f[2] + '.' : ask === 'iqr' ? 'IQR = Q3 ' + M + ' Q1 = ' + f[3] + ' ' + M + ' ' + f[1] + ' = ' + ans + '.' : 'Range = max ' + M + ' min = ' + f[4] + ' ' + M + ' ' + f[0] + ' = ' + ans + '.'] });
      }
    ],
    [
      function () {
        var base = []; for (var i = 0; i < 7; i++) base.push(ri(10, 20));
        var out = ri(60, 95), d = base.concat([out]);
        var m1 = mean(base), m2 = mean(d), md1 = median(base), md2 = median(d);
        return Q({ q: 'Seven quiz scores are ' + m(list(base)) + '. An eighth student scores ' + out + '. How does this outlier affect the mean and median?', mc: mc('The mean increases a lot; the median changes only a little', ['The median increases a lot; the mean changes only a little', 'Both stay exactly the same', 'Both decrease']), why: ['Mean before: ' + n(K.round(m1, 2)) + '; after: ' + n(K.round(m2, 2)) + '. A big jump.', 'Median before: ' + n(md1) + '; after: ' + n(md2) + '. A small change.', 'The mean uses every value’s size, so an outlier pulls it; the median depends only on the middle position.'] });
      },
      function () {
        var shape = pick(['right', 'left', 'sym']);
        var vals = shape === 'right' ? [9, 8, 6, 4, 2, 1, 1] : shape === 'left' ? [1, 1, 2, 4, 6, 8, 9] : [1, 3, 6, 8, 6, 3, 1];
        vals = vals.map(function (v) { return Math.max(1, v + rnz(-1, 1)); });
        for (var i = 1; i < 7; i++) { if (shape === 'right') vals[i] = Math.min(vals[i], vals[i - 1]); else if (shape === 'left') vals[i] = Math.max(vals[i], vals[i - 1]); }
        if (shape === 'sym') { for (var j = 0; j < 3; j++) vals[6 - j] = vals[j]; vals[3] = Math.max(vals[3], vals[2] + 1); }
        var name = { right: 'Skewed right', left: 'Skewed left', sym: 'Roughly symmetric' }[shape];
        return Q({ q: 'Describe the shape of the distribution.', graph: K.bars({ labels: ['1', '2', '3', '4', '5', '6', '7'], vals: vals, hist: true, ymax: 10, ystep: 2, xlab: 'Value', ylab: 'Frequency' }), mc: mc(name, ['Skewed right', 'Skewed left', 'Roughly symmetric', 'Uniform'].filter(function (z) { return z !== name; })), why: [shape === 'right' ? 'Most data is on the left with a long tail stretching to the <b>right</b>: skewed right.' : shape === 'left' ? 'Most data is on the right with a long tail stretching to the <b>left</b>: skewed left.' : 'The left and right sides look like mirror images: roughly symmetric.', 'The tail names the skew.'] });
      }
    ],
    [
      function () {
        var d = []; for (var i = 0; i < 9; i++) d.push(ri(20, 40)); d.push(ri(70, 90));
        var f = five(d), iqr = f[3] - f[1], fenceHi = f[3] + 1.5 * iqr;
        var out = d.filter(function (v) { return v > fenceHi || v < f[1] - 1.5 * iqr; });
        var big = Math.max.apply(null, d);
        var isOut = big > fenceHi;
        return Q({ q: 'Data: ' + m(list(sorted(d))) + '. Using the 1.5 × IQR rule, is ' + big + ' an outlier?', mc: mc(isOut ? 'Yes, because ' + big + ' &gt; Q3 + 1.5(IQR) = ' + n(fenceHi) : 'No, because ' + big + ' ≤ Q3 + 1.5(IQR) = ' + n(fenceHi), [isOut ? 'No, because ' + big + ' ≤ Q3 + 1.5(IQR) = ' + n(fenceHi) : 'Yes, because ' + big + ' &gt; Q3 + 1.5(IQR) = ' + n(fenceHi), 'Yes, because it is the largest value', 'No, because outliers must be negative']), why: ['Q1 = ' + n(f[1]) + ', Q3 = ' + n(f[3]) + ', so IQR = ' + n(iqr) + '.', 'Upper fence: ' + m('Q3 + 1.5 × ' + n(iqr) + ' = ' + n(f[3]) + ' + ' + n(1.5 * iqr) + ' = ' + n(fenceHi)) + '.', big + (isOut ? ' is above the fence, so it is an outlier.' : ' is not above the fence, so it is not an outlier.')] });
      },
      function () {
        var A = [ri(10, 15)], B = [ri(10, 15)];
        for (var i = 1; i < 5; i++) { A.push(A[i - 1] + ri(2, 4)); B.push(B[i - 1] + ri(1, 9)); }
        var iA = A[3] - A[1], iB = B[3] - B[1];
        if (iA === iB) B[3] += 2, B[4] += 2, iB += 2;
        var lo = Math.min(A[0], B[0]) - 1, hi = Math.max(A[4], B[4]) + 1;
        lo = Math.floor(lo / 2) * 2; hi = Math.ceil(hi / 2) * 2;
        var more = iA > iB ? 'Class A' : 'Class B';
        var g = '<div>' + K.boxPlot({ five: A, min: lo, max: hi, step: hi - lo > 24 ? 4 : 2, title: 'Class A' }) + '</div><div>' + K.boxPlot({ five: B, min: lo, max: hi, step: hi - lo > 24 ? 4 : 2, title: 'Class B' }) + '</div>';
        return Q({ q: 'The box plots show homework minutes for two classes. Which class has more variability in the middle 50% of its data?', graph: '<div style="display:flex;flex-direction:column;gap:6px">' + g + '</div>', mc: mc(more + ', because its IQR is larger', [(more === 'Class A' ? 'Class B' : 'Class A') + ', because its IQR is larger', more === 'Class A' ? 'Class B, because its median is higher' : 'Class A, because its median is higher', 'They have the same variability']), why: ['The middle 50% is the box; its width is the IQR.', 'Class A IQR = ' + A[3] + ' ' + M + ' ' + A[1] + ' = ' + iA + '. Class B IQR = ' + B[3] + ' ' + M + ' ' + B[1] + ' = ' + iB + '.', more + ' has the larger IQR, so more variability.'] });
      }
    ]
  ];
  K.lesson('10.2', { title: 'Interpreting Distributions', std: 'MA.912.DP.1.2', levels: u102 });

  /* ---------- 10.3 Two-Way Tables ---------- */
  function twoWay() {
    var a = ri(10, 40), b = ri(10, 40), c = ri(10, 40), d = ri(10, 40);
    return { a: a, b: b, c: c, d: d, r1: a + b, r2: c + d, c1: a + c, c2: b + d, T: a + b + c + d };
  }
  function twHtml(t, rows, cols) {
    return K.table(['', cols[0], cols[1], 'Total'], [[rows[0], t.a, t.b, t.r1], [rows[1], t.c, t.d, t.r2], ['Total', t.c1, t.c2, t.T]], { rowHead: true });
  }
  var CTX = [[['Grade 9', 'Grade 10'], ['Plays sport', 'No sport']], [['Owns pet', 'No pet'], ['Likes cats', 'Likes dogs']], [['Morning', 'Evening'], ['Bus', 'Car']]];
  var u103 = [
    [
      function () {
        var t = twoWay(), cx = pick(CTX);
        var ask = pick(['joint', 'marginal']);
        if (ask === 'joint') return Q({ q: 'How many students are in the group "' + cx[0][0] + '" <b>and</b> "' + cx[1][1] + '"?' + twHtml(t, cx[0], cx[1]), mc: K.mcNum(t.b, [t.a, t.r1, t.c2]), why: ['Find the cell where the "' + cx[0][0] + '" row meets the "' + cx[1][1] + '" column.', 'That cell is ' + t.b + '.'] });
        return Q({ q: 'How many students in total are in the "' + cx[1][0] + '" group?' + twHtml(t, cx[0], cx[1]), mc: K.mcNum(t.c1, [t.a, t.r1, t.T]), why: ['A marginal total is in the Total row or column.', 'The "' + cx[1][0] + '" column total is ' + t.a + ' + ' + t.c + ' = ' + t.c1 + '.'] });
      },
      function () {
        var t = twoWay(), cx = pick(CTX);
        return Q({ q: 'What is the <b>joint relative frequency</b> of "' + cx[0][1] + '" and "' + cx[1][0] + '"? Round to the nearest tenth of a percent.' + twHtml(t, cx[0], cx[1]), mc: mc(pct(t.c / t.T), [pct(t.c / t.r2), pct(t.c / t.c1), pct(t.r2 / t.T)], function () { return pct((t.c + rnz(-3, 3)) / t.T); }), why: ['Joint relative frequency = cell ÷ grand total.', m(fr(t.c, t.T) + ' ≈ ' + pct(t.c / t.T)) + '.'] });
      }
    ],
    [
      function () {
        var t = twoWay(), cx = pick(CTX);
        return Q({ q: 'Of the students in "' + cx[0][0] + '", what percent are "' + cx[1][0] + '"? (This is a conditional relative frequency.) Round to the nearest tenth of a percent.' + twHtml(t, cx[0], cx[1]), mc: mc(pct(t.a / t.r1), [pct(t.a / t.T), pct(t.a / t.c1), pct(t.r1 / t.T)], function () { return pct((t.a + rnz(-3, 3)) / t.r1); }), why: ['"Of the students in ' + cx[0][0] + '" means divide by the ' + cx[0][0] + ' row total, ' + t.r1 + '.', m(fr(t.a, t.r1) + ' ≈ ' + pct(t.a / t.r1)) + '.'] });
      },
      function () {
        var t = twoWay(), cx = pick(CTX);
        return Q({ q: 'What is the marginal relative frequency of "' + cx[0][1] + '"? Round to the nearest tenth of a percent.' + twHtml(t, cx[0], cx[1]), mc: mc(pct(t.r2 / t.T), [pct(t.c / t.T), pct(t.r2 / t.c2), pct(t.r1 / t.T)], function () { return pct((t.r2 + rnz(-3, 3)) / t.T); }), why: ['Marginal relative frequency = row (or column) total ÷ grand total.', m(fr(t.r2, t.T) + ' ≈ ' + pct(t.r2 / t.T)) + '.'] });
      }
    ],
    [
      function () {
        var cx = pick(CTX), assoc = K.coin();
        var a, b, c, d;
        if (assoc) { a = ri(30, 40); b = ri(5, 12); c = ri(8, 15); d = ri(25, 40); } else { var p = ri(4, 6) / 10; a = 10 * ri(2, 5); b = Math.round(a * (1 - p) / p); c = 10 * ri(2, 5); d = Math.round(c * (1 - p) / p); }
        var t = { a: a, b: b, c: c, d: d, r1: a + b, r2: c + d, c1: a + c, c2: b + d, T: a + b + c + d };
        var p1 = a / t.r1, p2 = c / t.r2, diff = Math.abs(p1 - p2);
        var isA = diff > 0.1;
        return Q({ q: 'Compare the conditional relative frequencies of "' + cx[1][0] + '" within each row. Is there evidence of an association between the two variables?' + twHtml(t, cx[0], cx[1]), mc: mc(isA ? 'Yes; ' + pct(p1) + ' vs. ' + pct(p2) + ' are quite different' : 'No; ' + pct(p1) + ' vs. ' + pct(p2) + ' are about the same', [isA ? 'No; ' + pct(p1) + ' vs. ' + pct(p2) + ' are about the same' : 'Yes; ' + pct(p1) + ' vs. ' + pct(p2) + ' are quite different', 'Yes, because the grand total is ' + t.T, 'No, because the table has only two rows']), why: ['"' + cx[0][0] + '": ' + m(fr(a, t.r1) + ' ≈ ' + pct(p1)) + ' are "' + cx[1][0] + '".', '"' + cx[0][1] + '": ' + m(fr(c, t.r2) + ' ≈ ' + pct(p2)) + ' are "' + cx[1][0] + '".', isA ? 'The percents differ by a lot, which suggests an association.' : 'The percents are close, which suggests little or no association.'] });
      },
      function () {
        var t = twoWay(), cx = pick(CTX);
        return Q({ q: 'A student is chosen at random from the "' + cx[1][1] + '" group. What is the probability the student is in "' + cx[0][1] + '"? Round to the nearest tenth of a percent.' + twHtml(t, cx[0], cx[1]), mc: mc(pct(t.d / t.c2), [pct(t.d / t.r2), pct(t.d / t.T), pct(t.c2 / t.T)], function () { return pct((t.d + rnz(-3, 3)) / t.c2); }), why: ['Given "' + cx[1][1] + '," only that column counts: ' + t.c2 + ' students.', 'Of them, ' + t.d + ' are "' + cx[0][1] + '": ' + m(fr(t.d, t.c2) + ' ≈ ' + pct(t.d / t.c2)) + '.'] });
      }
    ]
  ];
  K.lesson('10.3', { title: 'Two-Way Frequency Tables', std: 'MA.912.DP.3.1', levels: u103 });

  /* ---------- 10.4 Scatter Plots & Lines of Fit ---------- */
  function scatterData(mm, b, noise, N, x0, x1) { var pts = []; for (var i = 0; i < N; i++) { var x = x0 + (x1 - x0) * i / (N - 1) + (Math.random() * 0.6 - 0.3); x = K.round(x, 1); pts.push([x, K.round(mm * x + b + (K.ri(-100, 100) / 100) * noise, 1)]); } return pts; }
  var u104 = [
    [
      function () {
        var dir = pick(['pos', 'neg', 'none']);
        var pts, rr, tries = 0;
        do { pts = dir === 'none' ? (function () { var a = []; for (var i = 0; i < 12; i++) a.push([ri(1, 10), ri(1, 10)]); return a; })() : scatterData(dir === 'pos' ? 0.8 : -0.8, dir === 'pos' ? 1 : 9.5, 1.2, 12, 1, 10); rr = corr(pts); }
        while (tries++ < 60 && (dir === 'none' ? Math.abs(rr) > 0.2 : Math.abs(rr) < 0.75));
        var g = K.plane({ x: [0, 11], y: [0, 11], firstQuadrant: true, pts: pts.map(function (p) { return { x: p[0], y: p[1], r: 3.6, color: K.COL.blue }; }) });
        var name = { pos: 'Positive association', neg: 'Negative association', none: 'No association' }[dir];
        return Q({ q: 'What type of association does the scatter plot show?', graph: g, mc: mc(name, ['Positive association', 'Negative association', 'No association', 'Exponential association'].filter(function (z) { return z !== name; })), why: [dir === 'pos' ? 'As ' + X + ' increases, ' + Y + ' tends to increase: positive.' : dir === 'neg' ? 'As ' + X + ' increases, ' + Y + ' tends to decrease: negative.' : 'The points show no clear upward or downward trend: no association.'] });
      },
      function () {
        var mm = pick([2, 3, 4, 5, 1.5, 2.5]), b = ri(10, 40), x = ri(4, 12);
        return Q({ q: 'A line of fit for hours studied (<i>h</i>) and test score (<i>s</i>) is ' + m('<i>s</i> = ' + n(mm) + '<i>h</i> + ' + b) + '. Predict the score for ' + x + ' hours of study.', mc: K.mcNum(mm * x + b, [mm + x + b, mm * x, b * x]), why: ['Substitute ' + m('<i>h</i> = ' + x) + ': ' + m('<i>s</i> = ' + n(mm) + '(' + x + ') + ' + b + ' = ' + n(mm * x) + ' + ' + b + ' = ' + n(mm * x + b)) + '.'] });
      }
    ],
    [
      function () {
        var mm = pick([2, 3, 5, 0.5, 1.5]), b = ri(5, 30); if (b === mm) b += 3;
        var ctx = pick([['weeks', 'height of a plant (cm)'], ['years of experience', 'hourly wage ($)'], ['hours of practice', 'free throws made']]);
        var opts = mc('For each additional ' + ctx[0].replace(/s$/, '') + ', the ' + ctx[1].replace(/ \(.*\)/, '') + ' increases by about ' + n(mm), ['When ' + ctx[0] + ' is 0, the ' + ctx[1].replace(/ \(.*\)/, '') + ' is ' + n(mm), 'For each additional ' + ctx[0].replace(/s$/, '') + ', the ' + ctx[1].replace(/ \(.*\)/, '') + ' increases by about ' + b, 'The ' + ctx[1].replace(/ \(.*\)/, '') + ' is always ' + n(mm) + ' times the ' + ctx[0]]);
        return Q({ q: 'The line of fit ' + m('<i>y</i> = ' + n(mm) + '<i>x</i> + ' + b) + ' relates <i>x</i> = ' + ctx[0] + ' and <i>y</i> = ' + ctx[1] + '. What does the slope mean?', mc: opts, why: ['The slope is the change in <i>y</i> for each 1-unit increase in <i>x</i>.', 'So each additional ' + ctx[0].replace(/s$/, '') + ' adds about ' + n(mm) + ' to the predicted ' + ctx[1].replace(/ \(.*\)/, '') + '. The ' + b + ' is the predicted value when <i>x</i> = 0.'] });
      },
      function () {
        var x1 = ri(1, 3), y1 = ri(2, 6), mm = pick([R(1), R(1, 2), R(2), R(3, 2), R(-1), R(-1, 2)]), x2 = x1 + 2 * mm.d * ri(1, 2);
        var y2 = mm.mul(x2 - x1).add(y1).val();
        if (y2 < 1 || y2 > 10 || x2 > 10) return u104[1][0]();
        var b = mm.mul(-x1).add(y1);
        var pts = []; for (var i = 0, tries = 0; pts.length < 9 && tries < 80; tries++) { var x = ri(0, 10), yv = mm.mul(x).add(b).val() + (ri(-10, 10) / 10); if (yv < 0.5 || yv > 10.5 || x === x1 || x === x2) continue; pts.push({ x: x, y: yv, r: 3.2, color: K.COL.gray }); }
        pts.push({ x: x1, y: y1, color: K.COL.red, label: '(' + x1 + ', ' + y1 + ')' }, { x: x2, y: y2, color: K.COL.red, label: '(' + x2 + ', ' + y2 + ')' });
        var g = K.plane({ x: [0, 11], y: [0, 11], firstQuadrant: true, lines: [{ m: mm, b: b, color: K.COL.blue }], pts: pts });
        return Q({ q: 'The line of fit passes through the two red points. What is its equation?', graph: g, mc: mc(m(K.lineEq(mm, b)), [m(K.lineEq(mm.neg(), b)), m(K.lineEq(R(mm.d, mm.n), b)), m(K.lineEq(mm, b.add(2)))], function () { return m(K.lineEq(mm, b.add(rnz(-3, 3)))); }), why: ['Slope from the red points: ' + m(fr(y2 + ' ' + M + ' ' + y1, x2 + ' ' + M + ' ' + x1) + ' = ' + mm.html()) + '.', 'Intercept: ' + m(y1 + ' = ' + mm.html() + '(' + x1 + ') + <i>b</i>') + ', so ' + m('<i>b</i> = ' + b.html()) + '.', 'Line of fit: ' + m(K.lineEq(mm, b)) + '.'] });
      }
    ],
    [
      function () {
        var mm = pick([2, 3, 4]), b = ri(5, 20), lo = ri(1, 3), hi = lo + ri(5, 8), x = hi + ri(15, 40);
        return Q({ q: 'A line of fit ' + m('<i>y</i> = ' + mm + '<i>x</i> + ' + b) + ' was made from data with <i>x</i> between ' + lo + ' and ' + hi + '. A student uses it to predict <i>y</i> at <i>x</i> = ' + x + '. What is the main concern?', mc: mc('Extrapolating far beyond the data may be unreliable', ['The slope is too large to use', 'Lines of fit can only predict values below ' + lo, 'There is no concern; any input works']), why: ['The model is based on <i>x</i> values from ' + lo + ' to ' + hi + '.', 'Predicting at <i>x</i> = ' + x + ' is <b>extrapolation</b>: the pattern may not continue that far, so the prediction (' + (mm * x + b) + ') could be way off.'] });
      },
      function () {
        var mm = pick([1.5, 2, 2.5, 3]), b = ri(20, 50), target = b + mm * ri(6, 20);
        var x = (target - b) / mm;
        return Q({ q: 'A line of fit for a savings plan is ' + m('<i>s</i> = ' + n(mm) + '<i>w</i> + ' + b) + ' (dollars after <i>w</i> weeks). According to the model, after how many weeks will savings reach $' + n(target) + '?', mc: K.mcNum(x, [target / mm, target - b, x + 2].map(function (z) { return K.round(z, 1); })), why: ['Set ' + m('<i>s</i> = ' + n(target)) + ': ' + m(n(target) + ' = ' + n(mm) + '<i>w</i> + ' + b) + '.', m(n(mm) + '<i>w</i> = ' + n(target - b)) + ', so ' + m('<i>w</i> = ' + n(x)) + ' weeks.'] });
      }
    ]
  ];
  K.lesson('10.4', { title: 'Scatter Plots & Lines of Fit', std: 'MA.912.DP.2.4', levels: u104 });

  /* ---------- 10.5 Correlation & Residuals ---------- */
  var u105 = [
    [
      function () {
        var r = pick([0.95, 0.91, 0.88, 0.52, 0.48, 0.15, 0.08, -0.12, -0.18, -0.5, -0.55, -0.9, -0.93, -0.97]);
        var dir = r > 0 ? 'positive' : 'negative', st = Math.abs(r) >= 0.8 ? 'strong' : Math.abs(r) >= 0.4 ? 'moderate' : 'weak';
        var right = (st[0].toUpperCase() + st.slice(1)) + ' ' + dir;
        var all = ['Strong positive', 'Moderate positive', 'Weak positive', 'Strong negative', 'Moderate negative', 'Weak negative'].filter(function (z) { return z !== right; });
        return Q({ q: 'A correlation coefficient is ' + m('<i>r</i> = ' + n(r)) + '. How would you describe the correlation?', mc: mc(right, K.sample(all, 3)), why: ['The sign of <i>r</i> gives the direction: ' + dir + '.', 'The closer |<i>r</i>| is to 1, the stronger: |<i>r</i>| = ' + n(Math.abs(r)) + ' is ' + st + '.', '(Roughly: |<i>r</i>| ≥ 0.8 strong, 0.4–0.8 moderate, below 0.4 weak.)'] });
      },
      function () {
        var mm = pick([2, 3, 1.5]), b = ri(5, 15), x = ri(2, 9), pred = mm * x + b, act = pred + pick([-4, -3, -2, -1, 1, 2, 3, 4, 5]);
        var res = act - pred;
        return Q({ q: 'A line of fit is ' + m('<i>y</i> = ' + n(mm) + '<i>x</i> + ' + b) + '. The data point ' + K.pt(x, act) + ' is in the data set. What is its residual?', mc: K.mcNum(res, [-res, pred, act], null, 3), why: ['Residual = actual ' + M + ' predicted.', 'Predicted: ' + m(n(mm) + '(' + x + ') + ' + b + ' = ' + n(pred)) + '.', 'Residual: ' + m(n(act) + ' ' + M + ' ' + n(pred) + ' = ' + n(res)) + '. ' + (res > 0 ? 'Positive: the point is above the line.' : 'Negative: the point is below the line.')] });
      }
    ],
    [
      function () {
        var rs = [0.92, -0.35, 0.15, -0.88].map(function (v) { return K.round(v + rnz(-3, 3) / 100, 2); });
        var best = rs.reduce(function (p, q) { return Math.abs(q) > Math.abs(p) ? q : p; });
        return Q({ q: 'Which correlation coefficient shows the <b>strongest</b> linear relationship?', mc: mc(m('<i>r</i> = ' + n(best)), rs.filter(function (z) { return z !== best; }).map(function (z) { return m('<i>r</i> = ' + n(z)); })), why: ['Strength depends on |<i>r</i>|, not the sign.', 'The largest |<i>r</i>| is ' + n(Math.abs(best)) + ', so ' + m('<i>r</i> = ' + n(best)) + ' is strongest (' + (best > 0 ? 'positive' : 'negative') + ').'] });
      },
      function () {
        var good = K.coin();
        var rs, tr = 0; do { rs = []; for (var q = 0; q < 6; q++) { rs.push(ri(3, 16) / 10); rs.push(-ri(3, 16) / 10); } rs = K.shuffle(rs); var D1 = rs.map(function (v, i) { return [(i + 1 - 6.5) * (i + 1 - 6.5), v]; }), D2 = rs.map(function (v, i) { return [i + 1, v]; }); } while (tr++ < 60 && (Math.abs(corr(D1)) > 0.35 || Math.abs(corr(D2)) > 0.35)); var pts = []; for (var i = 0; i < 12; i++) { var x = i + 1; var y = good ? rs[i] : K.round(0.12 * (x - 6.5) * (x - 6.5) - 1.8 + ri(-3, 3) / 10, 1); pts.push({ x: x, y: y, r: 3.6, color: K.COL.blue }); }
        var g = K.plane({ x: [0, 13], y: [-4, 4], pts: pts, lines: [{ m: 0, b: 0, color: K.COL.gray, dash: true }], xlab: 'x', ylab: 'Residual', noXY: true });
        return Q({ q: 'A residual plot for a linear model is shown. Is a linear model a good fit?', graph: g, mc: mc(good ? 'Yes; the residuals are scattered randomly around 0' : 'No; the residuals show a curved pattern', [good ? 'No; the residuals show a curved pattern' : 'Yes; the residuals are scattered randomly around 0', 'Yes; some residuals are negative', 'No; residuals should all be positive']), why: [good ? 'Random scatter above and below 0 with no pattern means the line captures the trend well.' : 'A U-shaped (curved) pattern means the data bends, so a nonlinear model would fit better.'] });
      }
    ],
    [
      function () {
        var mm = 2, b = ri(3, 8), xs = [1, 2, 3, 4, 5], res = xs.map(function () { return pick([-2, -1, 0, 1, 2]); });
        var ys = xs.map(function (x, i) { return mm * x + b + res[i]; });
        var j = ri(0, 4); res[j] = pick([-3, 3]); ys[j] = mm * xs[j] + b + res[j];
        return Q({ q: 'The line of fit is ' + m('<i>y</i> = 2<i>x</i> + ' + b) + '. Which data point has the residual with the greatest absolute value?' + K.xyTable(xs, ys), mc: (function () { var k = j; var right = K.pt(xs[k], ys[k]); return mc(right, xs.map(function (x, i) { return K.pt(x, ys[i]); }).filter(function (p) { return p !== right; }).slice(0, 3)); })(), why: ['Residual = actual ' + M + ' predicted, with predicted ' + m('= 2<i>x</i> + ' + b) + '.', 'Residuals: ' + xs.map(function (x, i) { return m('<i>x</i> = ' + x + ': ' + n(ys[i]) + ' ' + M + ' ' + n(mm * x + b) + ' = ' + n(ys[i] - mm * x - b)); }).join('; ') + '.', 'The largest absolute residual is the point farthest from the line.'] });
      },
      function () {
        var r = pick([0.9, 0.85, -0.9, -0.88]);
        var opts = mc('A strong linear association, but correlation alone does not prove one causes the other', ['That ' + X + ' causes ' + Y + ' to change', 'That 90% of the data lies on the line', 'That the slope of the line of fit is ' + n(r)]);
        return Q({ q: 'A study finds ' + m('<i>r</i> = ' + n(r)) + ' between two variables. Which conclusion is justified?', mc: opts, why: ['|<i>r</i>| close to 1 means a strong linear relationship.', '<i>r</i> is not a percent and it is not the slope.', 'Correlation does not establish causation.'] });
      }
    ]
  ];
  K.lesson('10.5', { title: 'Correlation & Residuals', std: 'MA.912.DP.2.6', levels: u105 });

  /* ---------- 10.6 Correlation vs. Causation ---------- */
  var LURK = [['ice cream sales', 'sunburns', 'hot, sunny weather', 1], ['the number of firefighters at a fire', 'the amount of damage', 'the size of the fire', 0], ['shoe size', 'reading ability in children', 'age', 0], ['hot chocolate sales', 'the number of colds', 'cold winter weather', 1], ['the number of hospitals in a city', 'the number of births', 'the city’s population', 0]];
  function cap(t) { return t[0].toUpperCase() + t.slice(1); }
  function causes(L, rev) { var pl = rev ? /sunburns/.test(L[1]) : L[3]; return pl ? ' cause ' : ' causes '; }
  var u106 = [
    [
      function () {
        var L = pick(LURK);
        return Q({ q: 'In many towns, ' + L[0] + ' and ' + L[1] + ' are strongly correlated. What is the most likely explanation?', mc: mc('A lurking variable, ' + L[2] + ', affects both', [cap(L[0]) + causes(L) + L[1], cap(L[1]) + causes(L, 1) + L[0], 'The correlation must be a math mistake']), why: ['Correlation means two variables change together. It does not show that one causes the other.', 'Here ' + L[2] + ' increases both ' + L[0] + ' and ' + L[1] + '. That is a <b>lurking variable</b>.'] });
      },
      function () {
        var claim = pick(['a new fertilizer makes plants grow taller', 'a reading program improves reading scores', 'a medicine lowers blood pressure', 'music while studying improves memory', 'a new diet increases energy']);
        return Q({ q: 'A researcher wants to show that ' + claim + '. Which type of study can support a claim that one variable <b>causes</b> a change in another?', mc: mc('A randomized controlled experiment', ['An observational study of existing groups', 'A survey asking people what they think', 'A scatter plot with a strong correlation']), why: ['Only a randomized experiment, where the researcher assigns treatments at random, controls for lurking variables.', 'Observational studies and surveys can show correlation, but not cause.'] });
      }
    ],
    [
      function () {
        var c = pick([['Students who eat breakfast get higher grades.', 'Families who can provide breakfast may also provide more study support'], ['People who own pets live longer.', 'Healthier people may be more likely to own and care for pets'], ['Students who take music lessons score higher in math.', 'Families with more income may afford both lessons and tutoring'], ['Cities with more police officers have more crime.', 'Larger cities have both more officers and more crime'], ['Teens who play video games have better reaction times.', 'People with fast reactions may enjoy games more and play more'], ['People who drink green tea have fewer heart problems.', 'Green tea drinkers may also exercise and eat healthier'], ['Students with more books at home read better.', 'Parents who read a lot may both buy books and read with their children'], ['Towns with more parks have healthier residents.', 'Wealthier towns can afford parks and also better health care']]);
        return Q({ q: 'A news article reports, "' + c[0] + '" It concludes that the first thing causes the second. What is the biggest flaw in that conclusion?', mc: mc('It assumes causation from correlation; a lurking variable could explain it', ['The sample was too large', 'Correlations can never be positive', 'There is no flaw; correlation proves causation']), why: ['The data only shows the two things happen together.', 'A possible lurking variable: ' + c[1].toLowerCase() + '.', 'An experiment would be needed to show cause.'] });
      },
      function () {
        var obs = K.coin();
        var topic = pick([['jog daily', 'heart health'], ['take a vitamin', 'number of sick days'], ['use a new study app', 'test scores'], ['sleep 8 hours', 'reaction time'], ['drink extra water', 'headache frequency'], ['practice meditation', 'stress levels']]);
        var d = obs ? 'researchers compare the ' + topic[1] + ' of people who already ' + topic[0] + ' with people who do not' : 'researchers randomly assign ' + ri(4, 30) * 10 + ' volunteers to ' + topic[0] + ' or not, then compare ' + topic[1];
        return Q({ q: 'In a study, ' + d + '. What type of study is this?', mc: mc(obs ? 'Observational study' : 'Randomized experiment', [obs ? 'Randomized experiment' : 'Observational study', 'Census', 'Simulation']), why: [obs ? 'The researchers only observe groups that already exist; they do not assign the treatment. Observational.' : 'The researchers randomly assign who will ' + topic[0] + '. That is a randomized experiment, which can support cause-and-effect conclusions.'] });
      }
    ],
    [
      function () {
        var L = pick(LURK);
        return Q({ q: 'A city wants to reduce ' + L[1] + ' by limiting ' + L[0] + ', because the two are strongly correlated. Why might this plan fail?', mc: mc('Limiting ' + L[0] + ' would not change ' + L[2] + ', which drives both', ['The correlation is too strong to act on', 'Correlation proves the plan will work', 'Strong correlations always reverse over time']), why: ['The plan assumes ' + L[0] + causes(L) + L[1] + '.', 'If ' + L[2] + ' causes both, changing ' + L[0] + ' does nothing to ' + L[1] + '.'] });
      },
      function () {
        var pr = pick([['study app', 'higher test scores', 'students', 'use the app'], ['fitness tracker', 'more daily steps', 'adults', 'wear the tracker'], ['tutoring program', 'better grades', 'students', 'join the program'], ['sleep supplement', 'longer sleep', 'adults', 'take the supplement'], ['typing course', 'faster typing', 'students', 'take the course']]);
        var opts = mc('Randomly assign ' + pr[2] + ' to ' + pr[3] + ' or not, then compare results', ['Survey ' + pr[2] + ' who already ' + pr[3] + ' about their results', 'Compare people who chose to ' + pr[3] + ' with people who did not', 'Ask experts whether the ' + pr[0] + ' seems to help']);
        return Q({ q: 'A company wants to show that its ' + pr[0] + ' <b>causes</b> ' + pr[1] + '. Which design best supports that claim?', mc: opts, why: ['Random assignment makes the two groups alike in every way except the ' + pr[0] + '.', 'Then a difference in results can be attributed to the ' + pr[0] + '. The other designs are observational and leave lurking variables uncontrolled.'] });
      }
    ]
  ];
  K.lesson('10.6', { title: 'Correlation vs. Causation', std: 'MA.912.DP.1.3', levels: u106 });

  /* ---------- 10.7 Sampling & Margin of Error ---------- */
  var u107 = [
    [
      function () {
        var s = ri(40, 200), y = ri(10, s - 10), N = 100 * ri(10, 80);
        var est = Math.round(y / s * N);
        return Q({ q: 'In a random sample of ' + s + ' students at a school of ' + K.comma(N) + ', ' + y + ' said they ride the bus. Estimate how many students at the school ride the bus.', mc: K.mcNum(est, [y * 10, Math.round(est / 2), N - est], K.comma), why: ['Sample proportion: ' + m(fr(y, s) + ' ≈ ' + n(K.round(y / s, 4))) + '.', 'Apply it to the whole school: ' + m(n(K.round(y / s, 4)) + ' × ' + K.comma(N) + ' ≈ ' + K.comma(est)) + '.'] });
      },
      function () {
        var opts = mc('Choosing names at random from a list of all students', ['Asking the first 30 students who arrive at school', 'Asking only students in the math club', 'Letting students volunteer online']);
        return Q({ q: 'A school wants to know students’ favorite lunch. Which sampling method is most likely to give a <b>representative</b> sample?', mc: opts, why: ['A random sample gives every student an equal chance to be chosen, which avoids bias.', 'The other methods favor certain groups (early arrivals, math club, people who like to volunteer).'] });
      }
    ],
    [
      function () {
        var p = ri(30, 70), e = pick([2, 3, 4, 5]);
        return Q({ q: 'A poll finds ' + p + '% of voters support a plan, with a margin of error of ±' + e + '%. What is the likely range of the true percentage?', mc: mc((p - e) + '% to ' + (p + e) + '%', [p + '% to ' + (p + e) + '%', (p - 2 * e) + '% to ' + (p + 2 * e) + '%', (p - e) + '% to ' + p + '%']), why: ['The margin of error is added and subtracted from the sample result.', m(p + ' ' + M + ' ' + e + ' = ' + (p - e)) + ' and ' + m(p + ' + ' + e + ' = ' + (p + e)) + '.', 'Likely range: ' + (p - e) + '% to ' + (p + e) + '%.'] });
      },
      function () {
        var sm = ri(40, 80), lg = sm * ri(4, 10);
        return Q({ q: 'Two random samples are taken from the same population: one of size ' + sm + ' and one of size ' + lg + '. Which sample’s estimate is likely to have a smaller margin of error?', mc: mc('The sample of ' + lg + ', because larger samples vary less', ['The sample of ' + sm + ', because smaller samples are more accurate', 'Both have the same margin of error', 'It is impossible to tell']), why: ['Larger random samples produce estimates that vary less from sample to sample.', 'So the margin of error is smaller for the sample of ' + lg + '.'] });
      }
    ],
    [
      function () {
        var center = ri(40, 60), spread = pick([4, 5, 6, 8]);
        var lo = center - spread, hi = center + spread;
        var vals = [lo, hi]; for (var i = 0; i < 9; i++) { var d = Math.min(spread - 1, Math.round(Math.abs(ri(-10, 10) + ri(-10, 10) + ri(-10, 10)) / 30 * spread * 1.3)); vals.push(center + d, center - d); }
        vals = vals.map(function (v) { return Math.max(lo, Math.min(hi, v)); });
        var g = K.dotPlot({ vals: vals, min: lo - 1, max: hi + 1, title: 'Simulated sample percents (%)' });
        return Q({ q: 'A class simulated 20 random samples. Each dot is one sample’s percent. The results range from about ' + lo + '% to ' + hi + '%. Which is the best estimate of the margin of error?', graph: g, mc: mc('About ±' + spread + '%', ['About ±' + (2 * spread) + '%', 'About ±' + center + '%', 'About ±' + (hi - lo + 2) + '%']), why: ['The simulated results cluster around ' + center + '%.', 'Most fall within about ' + spread + ' points of the center (' + lo + '% to ' + hi + '%).', 'So the margin of error is about ±' + spread + '%: half the width of the range.'] });
      },
      function () {
        var s = ri(5, 9) * 10, mu = ri(150, 400), tot = 100 * ri(20, 90); if (tot === s * s) tot += 100;
        return Q({ q: 'A random sample of ' + s + ' households used a mean of ' + mu + ' kWh of electricity last month. The town has ' + K.comma(tot) + ' households. Estimate the town’s <b>total</b> monthly use.', mc: mc(K.comma(mu * tot) + ' kWh', [K.comma(mu * s) + ' kWh', K.comma(Math.round(mu * tot / s)) + ' kWh', K.comma(mu + tot) + ' kWh']), why: ['Assume the sample mean represents a typical household.', 'Total ≈ mean × number of households = ' + m(mu + ' × ' + K.comma(tot) + ' = ' + K.comma(mu * tot)) + ' kWh.'] });
      }
    ]
  ];
  K.lesson('10.7', { title: 'Sampling & Margin of Error', std: 'MA.912.DP.1.4', levels: u107 });
  K.review(10, 'Unit 10 Review: Statistics & Data Analysis');
})(typeof window !== 'undefined' ? window.KCEP : globalThis.KCEP);
