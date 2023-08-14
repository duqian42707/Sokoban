package com.dqv5.sokoban.config;

import com.alibaba.fastjson.JSONObject;
import com.dqv5.sokoban.utils.RSAEncryptUtils;
import lombok.SneakyThrows;
import org.apache.commons.io.IOUtils;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class DecryptHttpServletRequestWrapper extends HttpServletRequestWrapper {
    public DecryptHttpServletRequestWrapper(HttpServletRequest request) {
        super(request);
    }

    /**
     * 修改getInputStream方法
     *
     * @return
     */
    @SneakyThrows
    @Override
    public ServletInputStream getInputStream() {
        // 获取请求体数据
        InputStream in = super.getInputStream();
        String body = IOUtils.toString(in);
        JSONObject jsonObject = JSONObject.parseObject(body);
        String text = jsonObject.getString("text");
        // 解密
        String msg = RSAEncryptUtils.decrypt(text, RSAEncryptUtils.REQUEST_PRIVATE_KEY);
        InputStream inputStream = new ByteArrayInputStream(msg.getBytes(StandardCharsets.UTF_8));
        // 返回
        return new ServletInputStream() {
            @Override
            public boolean isFinished() {
                return false;
            }

            @Override
            public boolean isReady() {
                return false;
            }

            @Override
            public void setReadListener(ReadListener readListener) {
            }

            @Override
            public int read() throws IOException {
                return inputStream.read();
            }
        };
    }
}
