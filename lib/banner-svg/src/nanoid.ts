// Tiny URL-safe id generator (no deps so this lib stays portable for the API server).
const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

export function nanoid(size = 8): string {
  let id = "";
  for (let i = 0; i < size; i++) {
    id += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return id;
}
