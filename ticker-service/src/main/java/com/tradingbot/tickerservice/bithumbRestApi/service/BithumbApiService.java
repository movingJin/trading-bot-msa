package com.tradingbot.tickerservice.bithumbRestApi.service;

import com.tradingbot.tickerservice.domain.Ticker;
import org.springframework.stereotype.Component;

@Component
public interface BithumbApiService {
    public <T extends Ticker> T getTicker(Class<T> clazz, String symbol);
}
