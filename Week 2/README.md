# Week 2 — Option B

Newsroom Triage classifies news, retrieves category notes, applies guardrails and records answers. Evaluation uses the 30 manual Week 1 labels.

## Files and request flow (B3)

- `app/config.py`: prompt, routing rules, category constraints, confidence floor and retrieval settings.
- `app/engine.py`: retrieval, model calls, guardrails, storage and scoring.
- `app/ui.py`: Classify, Scoring, Runs and Health pages.
- `run.py`: starts the web server on the hosting platform's port.
- `app/knowledge/categories.md`: category definitions and overlap rules.
- `app/knowledge/escalation.md`: escalation guidance, currently not enabled in the knowledge-file list.

For a non-empty request: route the question, retrieve relevant passages, generate the branch response, apply guardrails, then store the result. Empty inputs return early. Classification makes a second call below 0.6 and records agreement without replacing the first prediction.

## Current evidence

The notebook and `results/versions.csv` contain local experiments. The final configuration uses a 0.80 confidence floor. `evidence/github_actions_green.png` records successful feature CI. `results/tests_consistency_feature.txt` records 30 passing tests.

Live service: https://ahthini-newsroom-triage.onrender.com.

Hosted Scoring-page results against the 30 manual labels:

| Configuration | Correct | Accuracy | Kappa |
| --- | --- | --- | --- |
| Reconstructed original prompt, floor 0 | 21/30 | 70.0% | 0.6132 |
| Improved prompt, floor 0.80 | 25/30 | 83.3% | 0.7829 |

The improved configuration matched four more labels, an increase of 13.3 percentage points. These are separate runs, so the difference cannot be attributed solely to one prompt sentence. See `results/deployed_*.json` and `evidence/hosted_*.png`.

After idle, Render showed its waking-up page. The app was still loading at 51.4 seconds and ready by 75.0 seconds. This observation range includes browser overhead and is not model latency. See `results/cold_start.json` and the screenshots.

The first baseline browser session remained on processing. A fresh-session retry returned the recorded score. No result was inferred from the stalled screen.

## Branches

`week2-developer` is the improved app. `codex/week2-hosted-baseline` preserves the original prompt and zero confidence floor for hosted comparison, using the same 1,024-token limit and feature implementation. Its configuration tests intentionally fail. It is a reconstructed evaluation baseline, not evidence of the original development chronology.
