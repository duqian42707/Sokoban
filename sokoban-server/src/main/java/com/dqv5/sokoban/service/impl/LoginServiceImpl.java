package com.dqv5.sokoban.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.dqv5.sokoban.config.ConfigProperties;
import com.dqv5.sokoban.entity.BaseUser;
import com.dqv5.sokoban.repository.BaseUserRepository;
import com.dqv5.sokoban.service.LoginService;
import com.dqv5.sokoban.utils.JwtTokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.Optional;
import java.util.UUID;

/**
 * @author duqian
 * @date 2023/8/10
 */
@Service
@Slf4j
public class LoginServiceImpl implements LoginService {
    @Resource
    private RestTemplate restTemplate;
    @Resource
    private ConfigProperties configProperties;
    @Resource
    private BaseUserRepository baseUserRepository;

    @Override
    public String login(String code) {
        JSONObject jsonObject = invokeLoginApi(code);
        String openid = jsonObject.getString("openid");
        String sessionKey = jsonObject.getString("session_key");
        String unionid = jsonObject.getString("unionid");
        log.debug("请求登录接口成功：openid:{},session_key:{},unionid:{}", openid, sessionKey, unionid);

        Optional<BaseUser> opt = baseUserRepository.findByOpenid(openid);
        BaseUser baseUser;
        if (opt.isPresent()) {
            baseUser = opt.get();
        } else {
            baseUser = new BaseUser();
            baseUser.setAccount(UUID.randomUUID().toString());
            baseUser.setNickName("未设置昵称");
            baseUser.setOpenid(openid);
            baseUser = baseUserRepository.save(baseUser);
        }
        String token = JwtTokenUtil.createToken(baseUser.getUserId(), baseUser.getAccount(), baseUser.getNickName(), openid);
        log.debug("登录生成token：{}", token);
        return token;
    }


    private JSONObject invokeLoginApi(String code) {
        String urlTpl = "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code";
        String appId = configProperties.getAppId();
        String appSecret = configProperties.getAppSecret();
        String url = String.format(urlTpl, appId, appSecret, code);
        String resp = restTemplate.getForObject(url, String.class);
        JSONObject jsonObject = JSONObject.parseObject(resp);
        if (jsonObject.getInteger("errcode") == 0) {
            return jsonObject;
        }
        throw new RuntimeException("请求登录接口异常: " + resp);
    }

}
