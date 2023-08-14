package com.dqv5.sokoban.utils;

import lombok.extern.slf4j.Slf4j;

import javax.crypto.Cipher;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@Slf4j
public class RSAEncryptUtils {
    /**
     * 请求加密传输的私钥
     */
    public static final String REQUEST_PRIVATE_KEY = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKgEi6AA58mYb3aM" +
            "8KxjuD/z8jQT2EtcpOMND364XJOziteD9SAvQ4Or55x8GDaDWk1evZElBgDmsuA5" +
            "eS6qMT//kwnp29sQKQsCqc3ZYoEQZGmNpdwUkAA2T0k9mprcjCSX6rxxXBf+qf6Q" +
            "eUPUb72jiPbOuqw7r+V+3kdPspf1AgMBAAECgYEAlCQt1830kNNOtABg1B64ferh" +
            "SvmUZB4zY95IIzr6pWBQsuUuZEpIBPi1JkxkLOxz2nQGQMucF39RiFIkfvigopcq" +
            "mI7Ia9bsyZSBVWyy25PXBLGrkNajaJaFiSZ7hIedSMiySfDGryTc0kVZHidNxloo" +
            "S8Nk4cbDAXkwp36KfAECQQDUPpQ3zYOUPttnoTFTfvmTorgEepfMKJKaAUig1kh+" +
            "BGsZnOtizas2j88Wz5wf4oQMEssny/F1IdOA+GRYRaqhAkEAyqfbVoohVL+L7Vpw" +
            "cQMSWy5kjVCKe/0/EPQoU09HHsLpWXc8roE9oKw/Rd3PimSwdy370vL1sze7URJd" +
            "Greg1QJAawSGzcBVaSlsjcssSPKMO1HfwXpjEfEfQoIFMfv6H3hw3EBQO8iCXQeU" +
            "HuddzIH1nPTY9N8Th8EfmTcluZCfIQJBAJq8QAV7wqdq+fRpMaGYrtNgQPaFoLe7" +
            "TgQr6P5zceJTAMmG+ZZkqCGeY1F9Y5JP/02Alt8jE+ebjjMAyoYz32ECQAy6EeQX" +
            "ZJ+ISNXltfKmDHusE4A5MahVZ0FRWKSOAFUf07tUIcYB5ZCALX8S/sTRPWEth3Bu" +
            "Qm/fGHaQz7M2fVw=";
    /**
     * 公钥
     */
    public static final String REQUEST_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoBIugAOfJmG92jPCsY7g/8/I0" +
            "E9hLXKTjDQ9+uFyTs4rXg/UgL0ODq+ecfBg2g1pNXr2RJQYA5rLgOXkuqjE//5MJ" +
            "6dvbECkLAqnN2WKBEGRpjaXcFJAANk9JPZqa3Iwkl+q8cVwX/qn+kHlD1G+9o4j2" +
            "zrqsO6/lft5HT7KX9QIDAQAB";

    public static void main(String[] args) throws Exception {
        //生成公钥和私钥
//        String[] keyPair = genKeyPair();
//        String pubKey = keyPair[0];
//        String priKey = keyPair[1];

        String pubKey = REQUEST_PUBLIC_KEY;
        String priKey = REQUEST_PRIVATE_KEY;

        //加密字符串
        String message = "df723820";
        log.info("公钥: {}", pubKey);
        log.info("私钥: {}", priKey);

        log.info("加密前: {}", message);
        String messageEn = encrypt(message, pubKey);
        log.info("加密后: {}", messageEn);
        String messageDe = decrypt(messageEn, priKey);
        log.info("解密后: {}", messageDe);

    }

    /**
     * 随机生成密钥对
     *
     * @throws NoSuchAlgorithmException
     */
    public static String[] genKeyPair() throws NoSuchAlgorithmException {
        // KeyPairGenerator类用于生成公钥和私钥对，基于RSA算法生成对象
        KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance("RSA");
        // 初始化密钥对生成器，密钥大小为96-1024位
        keyPairGen.initialize(1024, new SecureRandom());
        // 生成一个密钥对，保存在keyPair中
        KeyPair keyPair = keyPairGen.generateKeyPair();
        // 得到私钥
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
        // 得到公钥
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();

        String publicKeyString = new String(Base64.getEncoder().encode(publicKey.getEncoded()));
        // 得到私钥字符串
        String privateKeyString = new String(Base64.getEncoder().encode((privateKey.getEncoded())));
        // 将公钥和私钥保存到数组,0表示公钥,1表示私钥
        return new String[]{publicKeyString, privateKeyString};
    }

    /**
     * RSA公钥加密
     *
     * @param str       加密字符串
     * @param publicKey 公钥
     * @return 密文
     * @throws Exception 加密过程中的异常信息
     */
    public static String encrypt(String str, String publicKey) throws Exception {
        //base64编码的公钥
        byte[] decoded = Base64.getDecoder().decode(publicKey);
        RSAPublicKey pubKey = (RSAPublicKey) KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(decoded));
        //RSA加密
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, pubKey);
        return Base64.getEncoder().encodeToString(cipher.doFinal(str.getBytes(StandardCharsets.UTF_8)));
    }

    /**
     * RSA私钥解密
     *
     * @param str        加密字符串
     * @param privateKey 私钥
     * @return 铭文
     * @throws Exception 解密过程中的异常信息
     */
    public static String decrypt(String str, String privateKey) throws Exception {
        //64位解码加密后的字符串
        byte[] inputByte = Base64.getDecoder().decode(str.getBytes(StandardCharsets.UTF_8));
        //base64编码的私钥
        byte[] decoded = Base64.getDecoder().decode(privateKey);
        RSAPrivateKey priKey = (RSAPrivateKey) KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(decoded));
        //RSA解密
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, priKey);
        return new String(cipher.doFinal(inputByte));
    }

}

