function generateUUID(number?: any) {
  return number
    ? (number ^ ((Math.random() * 16) >> (number / 4))).toString(16) // eslint-disable-line
    : [1e7, -1e3, -4e3, -8e3, -1e11].join('').replace(/[018]/g, generateUUID);
}

export { generateUUID };
