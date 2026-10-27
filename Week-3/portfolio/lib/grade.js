//normalise typography without changing the expected facts
export const normalise = (text) => String(text ?? "").normalize("NFKC")
  .replace(/[\u2010-\u2015\u2212]/g, "-").replace(/\s+/g, " ").trim().toLowerCase()

export const contains = (text, needles) =>
  needles.some((needle) => normalise(text).includes(normalise(needle)))
