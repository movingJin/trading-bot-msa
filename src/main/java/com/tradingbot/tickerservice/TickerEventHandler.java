package com.tradingbot.tickerservice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tradingbot.tickerservice.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.redis.connection.ReactiveRedisConnectionFactory;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ReactiveRedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.client.WebSocketClient;
import reactor.core.Exceptions;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.http.HttpClient;
import java.time.LocalDateTime;
import java.util.Arrays;
@Slf4j
@Component
@RequiredArgsConstructor
public class TickerEventHandler implements CommandLineRunner, InitializingBean {
    private final ObjectMapper objectMapper;
    private final WebSocketClient client;
    private final RedisTemplate<String, String> redisTemplate;
    private HashOperations<String, String, String> hashOperations;

    @Override
    public void afterPropertiesSet() throws Exception {
        WebClient client = WebClient.create();
        hashOperations = redisTemplate.opsForHash();
    }
    @Override
    public void run(String... args) throws Exception {
        client.execute(
                        URI.create("wss://pubwss.bithumb.com/pub/ws"),
                        session -> session.send(
                                        Mono.just(session.textMessage("{'type':'ticker', " +
                                                "'symbols': ['" + Symbol.BTC_KRW + "','" + Symbol.ETH_KRW + "','" + Symbol.XLM_KRW + "','" + Symbol.XRP_KRW + "','" + Symbol.LTC_KRW + "','" + Symbol.EOS_KRW + "','" + Symbol.ADA_KRW + "','" + Symbol.TRX_KRW + "','" + Symbol.LINK_KRW + "','" + Symbol.BCH_KRW + "']" +
                                                ",'tickTypes':['30M']}")))
                                .thenMany(session.receive().map(WebSocketMessage::getPayloadAsText))
                                .filter(text -> text.startsWith("{\"type\":\"ticker\""))
                                .map(text -> text.replaceAll("_KRW", ""))
                                .map(message -> {
                                    try {
                                        return objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                                                .readValue(objectMapper.readTree(message).get("content").toString(), Ticker.class);
                                    } catch (JsonProcessingException e) {
                                        throw Exceptions.propagate(e);
                                    }
                                })
                                .doOnNext(ticker -> hashOperations.put(ticker.getSymbol(), "CLOSED_PRICE", Double.toString(ticker.getClosePrice())))
                                .doOnNext(ticker -> {
                                    try {
                                        hashOperations.put(ticker.getSymbol(), "TICKER", objectMapper.writeValueAsString(ticker));
                                    } catch (JsonProcessingException e) {
                                        e.printStackTrace();
                                    }
                                })
                                .then()).log()
                .repeat().log().subscribe();
    }
}
