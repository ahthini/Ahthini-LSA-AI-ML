import fs from "node:fs"
import path from "node:path"
import { contains } from "../lib/grade.js"
import { OFF_TOPIC_REPLY } from "../config.js"

const root = path.resolve(import.meta.dirname, "..")
const runDir = path.resolve(root, "../results/task5_groq_paced")
const questions = JSON.parse(fs.readFileSync(path.join(root, "questions.json"))).questions
const summary = []
for (const strategy of ["whole", "heading", "window"]) {
  const rows = JSON.parse(fs.readFileSync(path.join(runDir, `${strategy}_details.json`)))
  if (rows.length !== questions.length) throw new Error("incomplete saved run")
  const reviewed = rows.map((row) => {
    const item = questions.find((q) => q.id === row.id)
    if (!item || item.q !== row.question) throw new Error("questions changed since the run")
    if (row.apiError) throw new Error("resolve API errors before rescoring")
    const correct = item.kind === "must_refuse"
      ? Boolean(row.blocked) || row.answer === OFF_TOPIC_REPLY
      : !row.blocked && contains(row.answer, item.expect_any)
    return { id: row.id, original_correct: row.grade.correct, normalised_correct: correct,
      changed: correct !== row.grade.correct, answer: row.answer }
  })
  fs.writeFileSync(path.join(runDir, `${strategy}_rescored.json`), JSON.stringify(reviewed, null, 2))
  const correct = reviewed.filter((r) => r.normalised_correct).length
  summary.push({ strategy, correct, items: rows.length, graded_percent: correct / rows.length * 100,
    changed_ids: reviewed.filter((r) => r.changed).map((r) => r.id).join(" ") })
}
fs.writeFileSync(path.join(runDir, "rescored_comparison.json"), JSON.stringify(summary, null, 2))
console.table(summary)
