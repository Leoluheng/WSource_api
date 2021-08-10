package com.WSource.apiServer.config;

import com.WSource.apiServer.service.ConfigService;
import com.WSource.apiServer.service.JwtUserDetailService;
import com.WSource.apiServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import javax.transaction.Transactional;

@Component
@PropertySource("classpath:application.properties")
@ConfigurationProperties("jwt.token")
public class JwtProperties {

    @Autowired
    private ConfigService configService;

    private long expireAfter;

    private SecretKey secretKey;

    @PostConstruct
    @Transactional
    protected void init() {
        System.out.println("SET SECRET KEY");
        this.secretKey = configService.getSecretKey();
    }

    public long getExpireAfter() {
        return expireAfter;
    }

    public void setExpireAfter(long expireAfter) {
        this.expireAfter = expireAfter;
    }

    public SecretKey getSecretKey() { return this.secretKey; }

}
