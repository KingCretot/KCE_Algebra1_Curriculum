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

Units 1–4 are built. Units 1–3 (11 lessons total) were fully audited in
September 2026: two-attempt answer logic, real-world explanations, and
Formspree progress tracking were added to every lesson (previously, wrong
answers revealed instantly with no explanation, and no score data left the
browser). Unit 4 exists and is content-complete but has **not yet** had this
same audit pass — it still uses the older single-attempt, no-tracking
mechanics and should get the same treatment before being handed to a
student. Units 5–10 not yet started. Standing build rule: one full unit at a
time, verified before the next begins.

**Progress-tracking note:** lesson submissions currently post to the
existing "Math Foundations Progress" Formspree endpoint as a stopgap (tagged
`program: "KCE Algebra 1"` so they're identifiable in the inbox). A
dedicated Algebra 1 Formspree endpoint should replace this — swap is a
one-line change per file once the new endpoint ID exists.
