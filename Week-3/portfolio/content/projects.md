# Projects

## Psychiatric readmission risk prediction

My psychiatric readmission research uses structured EHR data and clinical notes from MIMIC-IV. The pipeline covered 238,491 admissions from 107,926 patients, with patient-level data partitioning. Models compared included LightGBM, XGBoost, CatBoost, Random Forest, neural networks, LSTM/GRU and ensembles. The final ensemble achieved ROC-AUC 0.8014 and PR-AUC 0.5965, as reported in my CV. Evaluation included SHAP, calibration, subgroup analysis, feature reduction and leakage auditing. These are research results, not evidence of deployment in clinical care.

## Coronary perfusion modelling

My King's College London project modelled coronary perfusion territories using CTCA and Voronoi subdivision. The reproducible pipeline combined CT segmentation, vessel skeletonisation and mesh cleaning to investigate subendocardial territories. Tools included Python, PyVista, SciPy, NiBabel, MeshLab, ITK-SNAP, ParaView, Dragonfly and 3D Slicer.

## NLP sentiment and sarcasm

My NLP coursework used the BESSTIE-CW-26 dataset for both sentiment and sarcasm. In Week 1 of the LSA internship, I revisited label quality by manually labelling 30 validation texts for both tasks before comparing with dataset references. Sentiment agreement was 25/30, or 83.3%, with kappa 0.667. Sarcasm agreement was 27/30, or 90.0%, with kappa 0.609. These figures measure my label agreement with the references, not a trained model's performance.

## Week 1 news classification evaluation

I completed Option C, labelling 30 news items and comparing my labels with two AI prompts and official dataset labels. My labels matched the official labels on 22/30 items, or 73.3%, with kappa 0.643. Both AI prompts matched the official labels on 24/30 items, or 80.0%, with kappa 0.733. My agreement with the specific AI prompt was 25/30, or 83.3%, with kappa 0.779. Business and Sci/Tech were the most confused categories. I also explored data leakage, class imbalance, confidence intervals and robustness, and built a Gradio classifier interface.

## Week 2 newsroom triage application

I completed Option B, working on a newsroom triage app with classification, retrieval, guardrails and stored runs. Hosted evaluation against my 30 manual labels scored 21/30, or 70.0%, with kappa 0.6132 for the reconstructed original configuration. The improved prompt and confidence floor of 0.80 scored 25/30, or 83.3%, with kappa 0.7829. These were separate runs with multiple configuration differences, so the improvement cannot be attributed to one prompt sentence. The app used Python, Groq and SQLite and was deployed on Render. The feature tests recorded 30 passes.

## Week 3 portfolio chatbot

I am working on Option B, a portfolio chatbot that retrieves passages from my notes and sends them to a language model. The starter application was deployed on Vercel and verified with a live Groq answer and an off-topic refusal. The starter's 49 tests passed. Personalisation and retrieval experiments are in progress, so I do not yet claim a measured retrieval improvement for my own content.
