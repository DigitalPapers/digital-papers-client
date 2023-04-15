export function isNotEmptyString(str) {
  return typeof str === "string" && str.trim().length > 0;
}
