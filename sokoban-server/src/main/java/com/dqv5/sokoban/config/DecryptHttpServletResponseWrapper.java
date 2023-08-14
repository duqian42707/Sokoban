package com.dqv5.sokoban.config;

import com.dqv5.sokoban.utils.RSAEncryptUtils;
import org.apache.commons.io.IOUtils;

import javax.servlet.ServletOutputStream;
import javax.servlet.WriteListener;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class DecryptHttpServletResponseWrapper extends HttpServletResponseWrapper {
    private final HttpServletResponse response;

    public DecryptHttpServletResponseWrapper(HttpServletResponse response) {
        super(response);
        this.response = response;
    }

    @Override
    public ServletOutputStream getOutputStream() throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        return new ServletOutputStream() {
            @Override
            public boolean isReady() {
                return true;
            }

            @Override
            public void setWriteListener(WriteListener writeListener) {

            }

            @Override
            public void write(int b) throws IOException {
                byteArrayOutputStream.write(b);
            }

            @Override
            public void flush() throws IOException {
                if (!response.isCommitted()) {
                    byte[] body = byteArrayOutputStream.toByteArray();
                    String bodyText = new String(body, StandardCharsets.UTF_8);
                    String encrypt = null;
                    try {
//                        encrypt = RSAEncryptUtils.encrypt(bodyText, RSAEncryptUtils.REQUEST_PUBLIC_KEY);
//                        body = encrypt.getBytes(StandardCharsets.UTF_8);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                    ServletOutputStream outputStream = response.getOutputStream();
                    outputStream.write(body);
                    outputStream.flush();
                }
            }
        };
    }

}
