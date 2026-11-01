/* KCE Algebra 1 — EOC Prep course data. Questions come from the course practice generators (../practice/gen-u*.js). */
(function () {
  'use strict';
  var K = window.KCEP, E = window.KCEEOC;
  var LINKS = {"1.1": {"t": "Parts of Expressions & Equations", "h": "../Unit%201%20-%20Solving%20Equations%20%26%20Literal%20Equations/1-1-parts-of-expressions.html"}, "1.2": {"t": "Literal Equations", "h": "../Unit%201%20-%20Solving%20Equations%20%26%20Literal%20Equations/1-2-literal-equations.html"}, "1.3": {"t": "Multi-Step Linear Equations", "h": "../Unit%201%20-%20Solving%20Equations%20%26%20Literal%20Equations/1-3-multistep-linear-equations.html"}, "R1": {"t": "Unit 1 Review", "h": "../Unit%201%20-%20Solving%20Equations%20%26%20Literal%20Equations/unit-1-review.html"}, "2.1": {"t": "One-Variable & Compound Inequalities", "h": "../Unit%202%20-%20Solving%20Inequalities/2-1-one-variable-compound-inequalities.html"}, "2.2": {"t": "Writing Two-Variable Inequalities", "h": "../Unit%202%20-%20Solving%20Inequalities/2-2-writing-two-variable-inequalities.html"}, "2.3": {"t": "Graphing Two-Variable Inequalities", "h": "../Unit%202%20-%20Solving%20Inequalities/2-3-graphing-two-variable-inequalities.html"}, "R2": {"t": "Unit 2 Review", "h": "../Unit%202%20-%20Solving%20Inequalities/unit-2-review.html"}, "3.1": {"t": "Classifying Functions", "h": "../Unit%203%20-%20Linear%20Functions%20%26%20Graphing/3-1-classifying-functions.html"}, "3.2": {"t": "Function Notation & Evaluating Functions", "h": "../Unit%203%20-%20Linear%20Functions%20%26%20Graphing/3-2-function-notation.html"}, "3.3": {"t": "Average Rate of Change", "h": "../Unit%203%20-%20Linear%20Functions%20%26%20Graphing/3-3-average-rate-of-change.html"}, "3.4": {"t": "Graphing Linear Functions & Key Features", "h": "../Unit%203%20-%20Linear%20Functions%20%26%20Graphing/3-4-graphing-linear-functions.html"}, "3.5": {"t": "Real-World Linear Function Applications", "h": "../Unit%203%20-%20Linear%20Functions%20%26%20Graphing/3-5-real-world-linear-applications.html"}, "R3": {"t": "Unit 3 Review", "h": "../Unit%203%20-%20Linear%20Functions%20%26%20Graphing/unit-3-review.html"}, "4.1": {"t": "Writing Linear Equations", "h": "../Unit%204%20-%20Writing%20Linear%20Equations/4-1-writing-linear-equations.html"}, "4.2": {"t": "Parallel & Perpendicular Lines", "h": "../Unit%204%20-%20Writing%20Linear%20Equations/4-2-parallel-perpendicular-lines.html"}, "4.3": {"t": "Comparing Linear Functions Across Representations", "h": "../Unit%204%20-%20Writing%20Linear%20Equations/4-3-comparing-linear-functions.html"}, "4.4": {"t": "Comparing Linear vs. Nonlinear Functions", "h": "../Unit%204%20-%20Writing%20Linear%20Equations/4-4-linear-vs-nonlinear.html"}, "4.5": {"t": "Choosing the Best Model", "h": "../Unit%204%20-%20Writing%20Linear%20Equations/4-5-choosing-the-best-model.html"}, "R4": {"t": "Unit 4 Review", "h": "../Unit%204%20-%20Writing%20Linear%20Equations/unit-4-review.html"}, "5.1": {"t": "Solving Systems by Graphing", "h": "../Unit%205%20-%20Systems%20of%20Equations%20%26%20Inequalities/5-1-solving-by-graphing.html"}, "5.2": {"t": "Solving Systems by Substitution", "h": "../Unit%205%20-%20Systems%20of%20Equations%20%26%20Inequalities/5-2-solving-by-substitution.html"}, "5.3": {"t": "Solving Systems by Elimination", "h": "../Unit%205%20-%20Systems%20of%20Equations%20%26%20Inequalities/5-3-solving-by-elimination.html"}, "5.4": {"t": "Special Cases — No Solution & Infinite Solutions", "h": "../Unit%205%20-%20Systems%20of%20Equations%20%26%20Inequalities/5-4-special-cases.html"}, "5.5": {"t": "Graphing Systems of Inequalities", "h": "../Unit%205%20-%20Systems%20of%20Equations%20%26%20Inequalities/5-5-graphing-systems-of-inequalities.html"}, "5.6": {"t": "Systems in Context — Constraints & Viable Solutions", "h": "../Unit%205%20-%20Systems%20of%20Equations%20%26%20Inequalities/5-6-systems-in-context.html"}, "R5": {"t": "Unit 5 Review", "h": "../Unit%205%20-%20Systems%20of%20Equations%20%26%20Inequalities/unit-5-review.html"}, "6.1": {"t": "Properties of Exponents", "h": "../Unit%206%20-%20Exponential%20Functions%20%26%20Financial%20Literacy/6-1-properties-of-exponents.html"}, "6.2": {"t": "Rational Exponents", "h": "../Unit%206%20-%20Exponential%20Functions%20%26%20Financial%20Literacy/6-2-rational-exponents.html"}, "6.3": {"t": "Exponential Growth & Decay", "h": "../Unit%206%20-%20Exponential%20Functions%20%26%20Financial%20Literacy/6-3-exponential-growth-decay.html"}, "6.4": {"t": "Writing Exponential Functions", "h": "../Unit%206%20-%20Exponential%20Functions%20%26%20Financial%20Literacy/6-4-writing-exponential-functions.html"}, "6.5": {"t": "Graphing Exponential Functions", "h": "../Unit%206%20-%20Exponential%20Functions%20%26%20Financial%20Literacy/6-5-graphing-exponential-functions.html"}, "6.6": {"t": "Simple & Compound Interest", "h": "../Unit%206%20-%20Exponential%20Functions%20%26%20Financial%20Literacy/6-6-simple-compound-interest.html"}, "R6": {"t": "Unit 6 Review", "h": "../Unit%206%20-%20Exponential%20Functions%20%26%20Financial%20Literacy/unit-6-review.html"}, "7.1": {"t": "Adding & Subtracting Polynomials", "h": "../Unit%207%20-%20Polynomials,%20Radicals%20%26%20Factoring/7-1-adding-subtracting-polynomials.html"}, "7.2": {"t": "Multiplying Polynomials", "h": "../Unit%207%20-%20Polynomials,%20Radicals%20%26%20Factoring/7-2-multiplying-polynomials.html"}, "7.3": {"t": "Dividing a Polynomial by a Monomial", "h": "../Unit%207%20-%20Polynomials,%20Radicals%20%26%20Factoring/7-3-dividing-by-a-monomial.html"}, "7.4": {"t": "Factoring: GCF & Grouping", "h": "../Unit%207%20-%20Polynomials,%20Radicals%20%26%20Factoring/7-4-factoring-gcf-grouping.html"}, "7.5": {"t": "Factoring Trinomials", "h": "../Unit%207%20-%20Polynomials,%20Radicals%20%26%20Factoring/7-5-factoring-trinomials.html"}, "7.6": {"t": "Special Factoring Patterns", "h": "../Unit%207%20-%20Polynomials,%20Radicals%20%26%20Factoring/7-6-special-factoring-patterns.html"}, "7.7": {"t": "Operations with Radicals", "h": "../Unit%207%20-%20Polynomials,%20Radicals%20%26%20Factoring/7-7-operations-with-radicals.html"}, "R7": {"t": "Unit 7 Review", "h": "../Unit%207%20-%20Polynomials,%20Radicals%20%26%20Factoring/unit-7-review.html"}, "8.1": {"t": "Graphing Quadratic Functions", "h": "../Unit%208%20-%20Quadratic%20Functions%20%26%20Equations/8-1-graphing-quadratic-functions.html"}, "8.2": {"t": "Vertex & Zeros from the Equation", "h": "../Unit%208%20-%20Quadratic%20Functions%20%26%20Equations/8-2-vertex-and-zeros.html"}, "8.3": {"t": "Solving by Factoring & Square Roots", "h": "../Unit%208%20-%20Quadratic%20Functions%20%26%20Equations/8-3-solving-by-factoring-square-roots.html"}, "8.4": {"t": "Completing the Square", "h": "../Unit%208%20-%20Quadratic%20Functions%20%26%20Equations/8-4-completing-the-square.html"}, "8.5": {"t": "The Quadratic Formula", "h": "../Unit%208%20-%20Quadratic%20Functions%20%26%20Equations/8-5-quadratic-formula.html"}, "8.6": {"t": "Writing Quadratic Functions", "h": "../Unit%208%20-%20Quadratic%20Functions%20%26%20Equations/8-6-writing-quadratic-functions.html"}, "8.7": {"t": "Quadratics in Context", "h": "../Unit%208%20-%20Quadratic%20Functions%20%26%20Equations/8-7-quadratics-in-context.html"}, "R8": {"t": "Unit 8 Review", "h": "../Unit%208%20-%20Quadratic%20Functions%20%26%20Equations/unit-8-review.html"}, "9.1": {"t": "Solving Absolute Value Equations", "h": "../Unit%209%20-%20Absolute%20Value%20%26%20Function%20Transformations/9-1-absolute-value-equations.html"}, "9.2": {"t": "Graphing Absolute Value Functions", "h": "../Unit%209%20-%20Absolute%20Value%20%26%20Function%20Transformations/9-2-graphing-absolute-value.html"}, "9.3": {"t": "Shifting Functions", "h": "../Unit%209%20-%20Absolute%20Value%20%26%20Function%20Transformations/9-3-shifting-functions.html"}, "9.4": {"t": "Stretches, Compressions & Reflections", "h": "../Unit%209%20-%20Absolute%20Value%20%26%20Function%20Transformations/9-4-stretches-reflections.html"}, "R9": {"t": "Unit 9 Review", "h": "../Unit%209%20-%20Absolute%20Value%20%26%20Function%20Transformations/unit-9-review.html"}, "10.1": {"t": "Representing Data", "h": "../Unit%2010%20-%20Statistics%20%26%20Data%20Analysis/10-1-representing-data.html"}, "10.2": {"t": "Interpreting Distributions", "h": "../Unit%2010%20-%20Statistics%20%26%20Data%20Analysis/10-2-interpreting-distributions.html"}, "10.3": {"t": "Two-Way Frequency Tables", "h": "../Unit%2010%20-%20Statistics%20%26%20Data%20Analysis/10-3-two-way-tables.html"}, "10.4": {"t": "Scatter Plots & Lines of Fit", "h": "../Unit%2010%20-%20Statistics%20%26%20Data%20Analysis/10-4-scatter-plots-lines-of-fit.html"}, "10.5": {"t": "Correlation & Residuals", "h": "../Unit%2010%20-%20Statistics%20%26%20Data%20Analysis/10-5-correlation-residuals.html"}, "10.6": {"t": "Correlation vs. Causation", "h": "../Unit%2010%20-%20Statistics%20%26%20Data%20Analysis/10-6-correlation-vs-causation.html"}, "10.7": {"t": "Sampling & Margin of Error", "h": "../Unit%2010%20-%20Statistics%20%26%20Data%20Analysis/10-7-sampling-margin-of-error.html"}, "R10": {"t": "Unit 10 Review", "h": "../Unit%2010%20-%20Statistics%20%26%20Data%20Analysis/unit-10-review.html"}};

  function unitIds(u) { return Object.keys(K.lessons).filter(function (id) { return id.split('.')[0] === String(u); }).sort(function (a, b) { return +a.split('.')[1] - +b.split('.')[1]; }); }
  function review(units) {
    var out = [];
    units.forEach(function (u) {
      unitIds(u).forEach(function (id) { var l = LINKS[id]; if (l) out.push({ label: 'Lesson ' + id + ' · ' + l.t, href: l.h, practice: '../practice/' + id.replace('.', '-') + '.html' }); });
      var r = LINKS['R' + u]; if (r) out.push({ label: r.t + ' (cheat sheet + practice test)', href: r.h });
    });
    return out;
  }
  function topicOf(id) { return K.lessons[id].title; }
  function mk(id, level, recent) { var q = K.make(id, level, recent); q.topic = topicOf(id); return q; }
  // 20 questions: first 10 at Level 2, last 10 at Level 3, lessons taken in turn from a shuffled list.
  function weekMaker(units, mixedFrom) {
    var plan = null;
    return function (i, recent) {
      if (i === 0 || !plan) {
        var ids = []; units.forEach(function (u) { ids = ids.concat(unitIds(u)); });
        var mix = []; (mixedFrom || []).forEach(function (u) { mix = mix.concat(unitIds(u)); });
        plan = [];
        var a = K.shuffle(ids), b = K.shuffle(mix);
        for (var k = 0; k < 20; k++) {
          var useMix = mix.length && k % 5 >= 2; // Week 6: 8 statistics + 12 mixed
          var id = useMix ? b[k % b.length] : a[k % a.length];
          plan.push({ id: id, lv: k < 10 ? 2 : 3 });
        }
        plan = plan.slice(0, 10).concat(K.shuffle(plan.slice(10)));
      }
      var p = plan[i];
      return mk(p.id, p.lv, recent);
    };
  }

  var WEEKS = [
    { title: 'Equations & Inequalities', units: [1, 2], blurb: 'Parts of expressions, literal equations, multi-step equations, and one- and two-variable inequalities (Units 1–2).' },
    { title: 'Linear Functions', units: [3, 4], blurb: 'Functions, function notation, rate of change, graphing lines, writing linear equations, and choosing the best model (Units 3–4).' },
    { title: 'Systems, Absolute Value & Transformations', units: [5, 9], blurb: 'Solving systems three ways, special cases, systems of inequalities, absolute value, and shifting and stretching functions (Units 5 and 9).' },
    { title: 'Exponents, Exponential Functions & Polynomials', units: [6, 7], blurb: 'Exponent rules, rational exponents, growth and decay, interest, polynomial operations, factoring and radicals (Units 6–7).' },
    { title: 'Quadratic Functions & Equations', units: [8], blurb: 'Graphs, vertex and zeros, factoring, completing the square, the quadratic formula, and quadratics in context (Unit 8).' },
    { title: 'Statistics & Full Review', units: [10], mixed: [1, 2, 3, 4, 5, 6, 7, 8, 9], blurb: 'Data displays, distributions, two-way tables, scatter plots and correlation (Unit 10), plus a mixed review of the whole course to get ready for the practice test.' }
  ];

  // Practice test: 40 questions. Unit → number of questions and area.
  var PLAN = [[1, 3, 'eq'], [2, 3, 'eq'], [3, 4, 'lin'], [4, 4, 'lin'], [5, 5, 'lin'], [6, 4, 'nl'], [7, 4, 'nl'], [8, 5, 'nl'], [9, 3, 'nl'], [10, 5, 'data']];
  var SEEDS = { 1: 20261101, 2: 20261102 };
  function makeForm(attempt) {
    var rng = E.seeded(SEEDS[attempt] || 7), oldR = Math.random;
    K.setRng(rng); Math.random = rng;
    try {
      var qs = [], recent = [];
      PLAN.forEach(function (row) {
        var ids = unitIds(row[0]), off = attempt === 1 ? 0 : 1;
        for (var j = 0; j < row[1]; j++) {
          var id = ids[(j * 2 + off) % ids.length];
          var lv = (j + attempt) % 2 === 0 ? 3 : 2;
          var q = mk(id, lv, recent); q.cat = row[2];
          recent.push(q.key); qs.push(q);
        }
      });
      return K.shuffle(qs);
    } finally { K.setRng(oldR); Math.random = oldR; }
  }

  E.C = {
    course: 'Algebra 1', slug: 'algebra1', short: 'a1',
    form: 'https://formspree.io/f/xrpbqdra',
    home: '../index.html',
    plain: K.plain,
    weekCount: 20,
    weeks: WEEKS.map(function (w) { return { title: w.title, blurb: w.blurb, review: review(w.units), make: weekMaker(w.units, w.mixed) }; }),
    test: {
      count: 40, minutes: 90, make: makeForm,
      cats: [
        { id: 'eq', name: 'Equations & Inequalities', weeks: [1] },
        { id: 'lin', name: 'Linear Functions & Systems', weeks: [2, 3] },
        { id: 'nl', name: 'Nonlinear Functions & Polynomials', weeks: [3, 4, 5] },
        { id: 'data', name: 'Data & Statistics', weeks: [6] }
      ]
    }
  };
})();
