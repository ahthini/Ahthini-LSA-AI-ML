# Newsroom Triage

Paste a news headline, get a category, see exactly how it decided.

Built for Week 2 of the AI and Machine Learning mentorship programme.

## Run it

    pip install -r requirements.txt
    python run.py

Open http://127.0.0.1:7860

With no `GROQ_API_KEY` set it runs on a built-in stand-in classifier, so it
works before you have signed up for anything. The Health tab tells you which
mode you are in.

## Configuration and feature

`app/config.py`. It is almost entirely plain English: the prompt, the routing
rules, the guardrails, and which notes the app may read from.

## Tests

    pytest -q

The original 17 tests now pass. Additional mocked tests cover the low-confidence
second call, agreement display, call counts, failures and guardrails.

## Consistency check

Classification runs a second time when the first confidence is below 0.6.
The trace shows both categories and whether they agree. The first answer remains
the decision, and the 0.80 confidence floor still applies. Agreement is not proof
of correctness. If the second call fails, the first decision still passes through
the guardrails.

## Deployment

Use Render with branch `week2-developer`, root directory `Week 2/newsroom_app`,
build command `pip install -r requirements.txt` and start command `python run.py`.
Enter `GROQ_API_KEY` in Render's environment settings. Never commit it.
The scoring page uses `manual_labels.csv` and pauses between live items.
SQLite records on an ephemeral hosting filesystem may be lost on restart.

Deployment and cold-start measurements remain pending until verified on Render.
