package com.tradingbot.tickerservice.repository;

import com.tradingbot.tickerservice.domain.TickerTRX;
import org.springframework.stereotype.Repository;

@Repository
public interface TickerTRXRepository extends TickerCommonRepository<TickerTRX, String> { }
