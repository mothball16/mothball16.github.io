export const clamp = (x, min, max) => Math.min(Math.max(min, x), max);
export const numLerp = (a, b, t) => a + (b - a) * t;