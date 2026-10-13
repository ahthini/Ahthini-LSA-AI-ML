# week1

LSA AI & Machine Learning internship — Week 1, Option C.

Compare independent human labels, two language-model prompts and official news labels. Evaluate agreement, investigate failures and serve the classifier through Gradio. Repeat the label audit on sentiment and sarcasm data from my NLP coursework.

## Project files

- `week1.ipynb`: C1–C7 experiments, outputs and additional exercises.
- `week1_data.csv`: supplied news dataset, including official labels.
- `results/`: manual labels, saved model responses, evaluation tables and BESSTIE sample metadata.
- `requirements.txt`: pinned direct dependencies for the notebook and its kernel.
- `Python API documentation for https.docx`: saved API documentation artifact. Retain the assignment's requested API screenshot separately.

## Setup

Developed with Python 3.12.6. Open this folder in VS Code with the Python and Jupyter extensions.

For a new checkout, run these commands from the project folder:

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

For the existing internship workspace, reuse the shared environment in the parent folder:

```bash
source ../.venv/bin/activate
python -m pip install -r requirements.txt
```

Select that environment as the notebook kernel, then run the Imports cell first. The requirements pin direct dependencies, not every transitive dependency. They reflect the installed environment rather than a separately tested clean installation.

## Run the notebook

1. For a fresh annotation exercise, write category rules and label the 30 main items before inspecting reference labels or completed results. This repository now contains revealed answers and completed decisions.
2. The notebook loads manual decisions from `results/manual_labels.csv` and preserves that file on reruns.
3. Enter a Groq API key only through the hidden `getpass` prompt. Do not place it in notebook code, outputs or Git. The configured model is `openai/gpt-oss-120b`.
4. The single-headline connection test makes one live request. The main classification cell reuses `results/ai_labels.csv` when present. A fresh run makes 60 initial requests, with rate-limit retries and a four-second pause between items.
5. C3 and C4 read saved data and calculate metrics locally. C5 reuses saved robustness results when available. Preserve old experiment files before deliberately starting a fresh run.
6. C6 launches a public Gradio share link with `demo.launch(share=True)`. Keep the notebook and computer running while testing. User submissions call Groq. Run `demo.close()` when finished. Share links are temporary, not a persistent deployment.
7. C7 downloads BESSTIE from Hugging Face. Label both tasks in `results/besstie_manual_labels.csv` before running the comparison cell. The sample uses the validation split, seed 42 and recorded row IDs and fingerprint.

Run All prompts for the API key, performs the connection test and launches Gradio. It is not an offline-only execution mode. To inspect saved results, run Imports and the relevant analysis cells instead. Network access is required for live inference, sharing and the initial dataset download.

## Methods and results

The specific and vague prompts both request a JSON label and confidence to meet Option C. Their category guidance differs. Validation rejects invalid responses rather than turning them into guesses. All 60 saved news responses passed validation.

| Comparison | Matches | Agreement | Kappa |
| --- | --- | --- | --- |
| Human vs official | 22/30 | 73.3% | 0.643 |
| Human vs specific AI | 25/30 | 83.3% | 0.779 |
| Specific AI vs official | 24/30 | 80.0% | 0.733 |
| Human vs vague AI | 26/30 | 86.7% | 0.823 |
| Vague AI vs official | 24/30 | 80.0% | 0.733 |

Both prompts achieved the same benchmark accuracy, with different error patterns. Business and Sci/Tech were the most confused categories. The detailed prompt did not improve overall accuracy in this run.

- **Leakage:** TF-IDF and logistic regression scored 61.7% on 60 held-out items after training on 140. Training on all 200, including those test items, increased the score to 100%. This is a deliberately contaminated evaluation, not a generalisation claim.
- **Imbalance:** always predicting World scored 80% accuracy and kappa 0 on the separate 30-item imbalanced set.
- **Uncertainty:** 95% Wilson intervals quantify uncertainty in the observed agreement rates. The sample-size calculation targets approximately 385 independent, representative items for an approximate five-percentage-point margin at 95% confidence under a conservative large-population approximation.
- **Human confidence:** benchmark disagreement rates were 3/21 for H, 3/7 for M and 2/2 for L. This suggests uncertainty was informative in this sample, but the two low-confidence examples are too few for a firm calibration claim.
- **Retrieval:** searching for the word world returned five items across World, Sports and Business. pandas and SQL returned matching IDs.

## Robustness and interface

| Input | Observed behaviour |
| --- | --- |
| Empty text | Returned World with confidence 0.00 despite having no news content. |
| 3,000 words of noise | API rejected the request with HTTP 413. Model behaviour on this input was not observed. |
| Spanish football headline | Returned Sports with confidence 0.99. |
| Broadcasting-deal headline | Returned Business with confidence 0.97. |

The updated wrapper rejects empty text and inputs over 2,000 words before making a request. This size cap does not detect nonsense or guarantee compliance with token limits. The Gradio interface uses the guarded classifier and checks output format before returning results.

The browser form is the frontend. Python running in the notebook is the backend, which calls Groq and returns a validated result. Gradio exposes the operation as `/classify`. Model-reported confidence is not a calibrated probability of correctness.

## BESSTIE project-label audit

The same 30 validation texts were independently labelled for sentiment and sarcasm, with references revealed afterwards.

| Task | Matches | Agreement | Kappa |
| --- | --- | --- | --- |
| Sentiment | 25/30 | 83.3% | 0.667 |
| Sarcasm | 27/30 | 90.0% | 0.609 |

Sarcasm has higher raw agreement but lower kappa because expected agreement depends on the label distributions. Both kappas fall below the assignment's approximate 0.7 discussion threshold. Disagreements call for inspection of ambiguity, context and annotation rules, rather than automatically treating either annotator as correct.

## Limitations and assistance

Thirty examples provide limited precision and little evidence for category-level or dialect-level generalisation. Benchmark labels can be debatable. JSON validity does not establish semantic correctness. Live model outputs can change between runs, even with temperature zero. Saved responses preserve the evaluated run.

AI assistance was used for initial rule drafting, code development, debugging and documentation. Manual annotation decisions are preserved in the saved CSVs. The final write-up should reflect my own interpretation of the evidence and disclose any remembered BESSTIE examples from prior coursework.

## Data sources

- AG News: supplied course CSV derived from the [AG News classification dataset](https://www.di.unipi.it/~gulli/AG_corpus_of_news_articles.html).
- [surrey-nlp/BESSTIE-CW-26](https://huggingface.co/datasets/surrey-nlp/BESSTIE-CW-26): coursework dataset for binary sentiment and sarcasm. Its dataset card lists Apache-2.0. Sample provenance is recorded in `results/besstie_sample.json`.

## My initial category rules

Written before comparing with the supplied category rules. These rules were drafted with AI assistance and reviewed by me.

- World: News mainly about politics, government, international relations, conflict, royalty or public affairs
- Sports: News mainly about sporting events, results, athletes, teams, transfers or competitions
- Business: News mainly about companies, markets, earnings, trade, employment, or the economy
- Sci/Tech: News mainly about scientific research, discoveries, technology, software, engineering, space, or medical research. 

## Overlapping categories
Each item will be classified by its main focus rather than by a single keyword or the organisation mentioned. If multiple categories fit, the best fit will be chosen and M/L confidence will be recorded. Ambiguity will be explained in notes.

## Submission checklist

- [x] Save news labels, both prompt runs and agreement metrics.
- [x] Complete leakage, imbalance, uncertainty and robustness experiments.
- [x] Build the Gradio interface and inspect its API documentation.
- [x] Complete the BESSTIE audit and pandas/SQL retrieval exercises.
- [ ] Confirm the public interface works from a phone and save the requested API screenshot.
- [ ] Record a failed public GitHub Actions run and explain its consequence.
- [ ] Explain one unfamiliar technology from the course list in two sentences.
- [ ] Finish the two-page write-up, including rule differences and disputed labels.
- [ ] Commit the project, complete work through a branch and merge a pull request.
- [ ] Submit the repository link, notebook, write-up and requested evidence to the course Drive.
