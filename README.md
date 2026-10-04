# KCE Algebra 1 Curriculum

Original KCE-authored tutoring curriculum for high school Algebra 1, built
directly against Florida's official B.E.S.T. Algebra 1 course standards
(Course #1200310) — not against any one textbook or teacher's worksheet
packet, since Algebra 1 classes commonly run without a textbook. Full course
scope: see `KCE_Algebra1_10Unit_Scope_v1.html` in the KCE Team Drive
(Algebra1 folder).

This is a general-purpose **MASTER** course — same pattern as KCE Geometry,
Pathways, Math Foundations, and FAST Prep. It is not built for any single
student; it stays in Draft with no roster in Google Classroom and gets Copied
into a per-student class whenever a student needs it. It was piloted using a
current Honors Algebra 1 student's real worksheets as a pacing reference, but
the content is original KCE-authored material addressing each standard's
required skill — never a transcription of any teacher's packet, textbook, or
TPT product, per standing copyright discipline.

Designed for 1:1 tutoring sessions, one lesson per weekly session.

## File naming

Files are named `N-M-slug.html`, where N is the unit number and M is the
lesson number within that unit (e.g. `1-2-literal-equations.html` is Unit 1,
Lesson 2). Each lesson's masthead and landing-page card also show the exact
Florida B.E.S.T. standard code it covers (e.g. `MA.912.AR.1.2`), so a tutor
can match a lesson to a student's classwork by standard code alone.

## Structure

- `KCE_Algebra1_UnitN.html` — landing page per unit, links to that unit's lessons
- `Unit N - <title>/N-M-slug.html` — individual lessons

## Lesson mechanics (as of the Sep 2026 audit)

Every lesson follows the same pattern: a 10-slide instructional arc, an
embedded 2-question guided-practice checkpoint mid-lesson, and a 5-question
end-of-lesson quiz. All graded questions (checkpoints and quiz) give the
student **two attempts** before revealing the correct answer, and every
question — right or wrong — shows a plain-English "Here's why" explanation
using a real-world example, not just "correct answer highlighted in green."
Slide 1 collects the student's name, and the final quiz score auto-submits
to the tutor via Formspree so progress is visible without a student having
to self-report it.

## Build status

Units 1–6 are built (28 lessons). Units 7–10 not yet started; the locked
standard sequence for them is in `KCE_Algebra1_10Unit_Scope_v1.2.html`.
Standing build rule: one full unit at a time, verified before the next begins.

**October 2026 audit (Units 1–5):**
- Every quiz question now has four answer choices (was three), with the
  correct answer's position varied so it can't be guessed from placement.
- Rewrote 25 "Here's why" explanations that described a different problem
  than the one asked (Units 1–3), and fixed a duplicate answer choice in 3.2.
- Fixed teaching errors: Celsius/Fahrenheit direction (1.2), a parallel-line
  example whose point sat on the original line (4.2), and a reversed
  cheaper-gym conclusion (5.1).
- Added 27 graphs and number lines to the worked examples in Units 2–5,
  which previously described every graph in words only.

**Unit 6 (Oct 2026):** Exponential Functions & Financial Literacy, 6 lessons — 6.1 Properties of Exponents (NSO.1.2), 6.2 Rational Exponents (NSO.1.1), 6.3 Growth & Decay (AR.5.3), 6.4 Writing Exponential Functions (AR.5.4), 6.5 Graphing Exponential Functions (AR.5.6), 6.6 Simple & Compound Interest (FL.3.2 + FL.3.4), plus `unit-6-review.html`.

**Unit reviews (Oct 2026):** every unit ends with `unit-N-review.html` in its folder: key ideas from each lesson, common mistakes, a printable one-page cheat sheet, and a 10-question mixed practice test that reports to Formspree as `Unit N Review`. The last lesson of each unit links to its review, and the review links on to the next unit. New units ship with their review.

Lesson quiz scores post to the dedicated Algebra 1 Formspree endpoint
(`xrpbqdra`), tagged `program: "KCE Algebra 1"`.
