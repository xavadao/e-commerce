---
name: grammar-check
description: Clarify spelling and wording, produce a corrected document, show a legal-like unified diff on a canvas, and offer downloads of original / updated / diff. Use when the user asks to proofread, grammar-check, or lightly edit a document.
---

# Grammar check

Natural-language procedure for proofreading and light wording fixes. Do **not** invent client facts. Prefer clarifying questions over guessing names, parties, or defined terms.

## When to call `propose_action`

Call `propose_action` with kind `preference` (action-less options) **before** writing the corrected document whenever any of these are ambiguous:

- Person or company **name spelling** (e.g. Jon vs John, Acme vs ACME)
- Defined-term capitalization or pluralization that changes legal meaning
- Whether a change is a grammar fix vs a substantive rewrite
- Which attached / pasted document is the source if more than one is present

Rules:

1. Ask 1–4 clarifying questions in **one** `propose_action` call.
2. Give options **no actions** so answers return as a follow-up prompt.
3. **Stop and wait** after the card — do not produce the corrected document yet.
4. Skip `propose_action` only when the user already answered those points or the text has no naming / term ambiguities.

## Workflow

1. Load the source document (attachment text, paste, or room file). Keep the **exact original** for later download.
2. **Clarify gate:** if needed, call `propose_action` (see above) and wait.
3. Produce the **corrected document** from clarified answers. Prefer grammar, spelling, punctuation, and clarity — do not change deal terms unless the user asked.
4. Present the revision on a canvas:
   - Call `create_canvas` (or reuse an existing canvas room id).
   - Call `canvas_add_elements` with a `heading`, a `doc` for the updated text, and a `doc` (or `text`) showing the legal-like **unified diff**.
5. Offer downloads: call `offer_document_downloads` with the exact `originalText` and `updatedText` (optional `title` / `basename`). That posts a chat card with **original**, **updated**, and **diff** text downloads.
6. Summarize briefly what changed; do not paste the full document again in chat unless the user asks.

## Output expectations

- Original text preserved byte-for-byte for the original download.
- Updated text reflects only clarified + grammatical edits.
- Diff is unified (`--- a/…` / `+++ b/…` / `@@` hunks).
- Downloads are plain text / markdown-friendly text (no DOCX/PDF in this skill).
