export function isEmptyObject(obj) {
  if (typeof obj !== "object") {
    return false;
  }
  return Object.keys(obj).length === 0;
}
