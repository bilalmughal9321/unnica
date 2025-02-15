import TouchID from 'react-native-touch-id';
import {Constant} from '../Utils';
import {Buffer} from 'buffer';
import Aes from 'react-native-aes-crypto';
import CryptoJS from 'crypto-js';
import auth from '@react-native-firebase/auth';

const handleNFCSecTest = () => {
  const keyBase64 = 'USymMYYWZdDxkmQYGqc+V0dO2I2O1y7bo+x5IzGxGPU=';
  const ivBase64 = 'qtyJerluyxRlD2ClhJsbtA==';
  const encryptedPwdBase64 = 'XXpB+PEtwd01BwNo+23S2w==';

  const key = CryptoJS.enc.Base64.parse(keyBase64);
  const iv = CryptoJS.enc.Base64.parse(ivBase64);
  const encryptedPwd = CryptoJS.enc.Base64.parse(encryptedPwdBase64);

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: encryptedPwd,
  });

  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decryptedPwd = decrypted.toString(CryptoJS.enc.Utf8);

  console.log('Decrypted Password:', decryptedPwd);
};
