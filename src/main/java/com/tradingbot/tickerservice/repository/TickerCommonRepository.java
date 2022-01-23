package com.tradingbot.tickerservice.repository;

import com.tradingbot.tickerservice.domain.Ticker;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TickerCommonRepository<T extends Ticker, String> extends MongoRepository<T, String> {
    List<T> findByTimeTagBefore(LocalDateTime days);
    List<T> findByTimeTagAfter(LocalDateTime days);
    void deleteById(Long id);
}
