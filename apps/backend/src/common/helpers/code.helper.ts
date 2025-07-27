export function getCodeByNumber(
  lastNumber = 0,
  lenCode = 6,
  initialChar = '',
  repeatChar = '0'
) {
  const idStr = (isNaN(lastNumber) ? 0 : lastNumber + 1).toString();
  const lengthSku = lenCode - initialChar.length - idStr.length;

  return initialChar + repeatChar.repeat(lengthSku) + idStr;
}
