# Week 3 — Option B

Personal portfolio chat with measured retrieval experiments.

## Current checkpoint

The supplied application is extracted into `portfolio/` without changes. All 49 tests pass. The untouched sample evaluation ran in demo mode, with no API key.

| Metric | Sample baseline |
| --- | --- |
| Retrieval found the fact | 15/20 (75.0%) |
| Retrieval MRR | 0.675 |
| Mean context waste | 49.8% |
| Mean characters per question | 1134 |
| Graded correct | 11/20 (55.0%) |

Full evidence is in `results/tests_starter.txt` and `results/eval_starter_demo.txt`. These are sample demo results, not personal-content or live-model results.

## Notebook

Open `week3.ipynb` in VS Code and select the shared `LSA-internship/.venv` kernel. It reads the baseline files and preserves them when rerun.

## Start the website

From the internship folder, run:

```bash
cd "Week-3/portfolio"
"$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node" dev.js
```

Open http://localhost:3000. Stop with Ctrl+C. The explicit path uses the installed Codex Node.js runtime because Node.js is not currently on the terminal PATH. After a normal Node.js installation, `node dev.js` can replace it.

## Next checkpoint

Commit the starting point and deploy the sample app on Vercel, with root directory `Week-3/portfolio`. Then personalise the five notes and the expected answers before comparing retrieval methods. Keep the same personalised question set across those comparisons.

Supplied participant materials and instructor-only files stay local and are excluded from Git.
