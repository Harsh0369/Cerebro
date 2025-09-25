export const isEmail = (s) => /\S+@\S+\.\S+/.test(s);
export const sanitizeSubjects = (str) =>
  str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
