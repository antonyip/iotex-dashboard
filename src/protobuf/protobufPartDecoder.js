import JSBI from "jsbi";
import { bufferLeToBeHex } from "./hexUtils";

export function decodeFixed32(value) {
  const floatValue = Buffer.readFloatLE(value);
  const intValue = Buffer.readInt32LE(value);
  const uintValue = Buffer.readUInt32LE(value);

  const result = [];

  result.push({ type: "Int", value: intValue });

  if (intValue !== uintValue) {
    result.push({ type: "Unsigned Int", value: uintValue });
  }

  result.push({ type: "Float", value: floatValue });

  return result;
}

export function decodeFixed64(value) {
  const floatValue = Buffer.readDoubleLE(value);
  const uintValue = JSBI.BigInt("0x" + bufferLeToBeHex(value));
  const intValue = twoComplements(uintValue);

  const result = [];

  result.push({ type: "Int", value: intValue.toString() });

  if (intValue !== uintValue) {
    result.push({ type: "Unsigned Int", value: uintValue.toString() });
  }

  result.push({ type: "Double", value: floatValue });

  return result;
}

const maxLong = JSBI.BigInt("0x7fffffffffffffff");
const longForComplement = JSBI.BigInt("0x10000000000000000");

function twoComplements(uintValue) {
  if (JSBI.greaterThan(uintValue, maxLong)) {
    return JSBI.subtract(uintValue, longForComplement);
  } else {
    return uintValue;
  }
}
