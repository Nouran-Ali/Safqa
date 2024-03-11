import CryptoJS from 'crypto-js';

export function encrypt(plainText, workingKey) {
  console.log("🚀 ~ file: ccavutils.js:4 ~ encrypt ~ plainText:", plainText)
  const key = CryptoJS.MD5(workingKey);
  const iv = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: iv,
  });
  return encrypted.toString();
}


export function decrypt(encText, workingKey) {
  const key = CryptoJS.MD5(workingKey);
  const iv = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
  const decrypted = CryptoJS.AES.decrypt(encText, key, {
    iv: iv,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}