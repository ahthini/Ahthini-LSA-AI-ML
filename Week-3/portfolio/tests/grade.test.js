import { test } from "node:test"
import assert from "node:assert/strict"
import { contains } from "../lib/grade.js"

test("accepts typographic hyphens in the dataset name", () => {
  assert.ok(contains("The dataset is MIMIC‑IV.", ["MIMIC-IV"]))
})
test("accepts equivalent whitespace and case", () => {
  assert.ok(contains("TWO\u202fWEEKS", ["two weeks"]))
})
test("does not turn the wrong percentage into a match", () => {
  assert.equal(contains("83.3%", ["80%", "80.0%"]), false)
})
test("does not accept a different dataset or missing answer", () => {
  assert.equal(contains("MIMIC-III", ["MIMIC-IV"]), false)
  assert.equal(contains(undefined, ["MIMIC-IV"]), false)
})
