package com.tradingbot.tickerservice.repository;

import com.tradingbot.tickerservice.domain.TickerBTC;
import org.springframework.stereotype.Repository;

@Repository
public interface TickerBTCRepository extends TickerCommonRepository<TickerBTC, String> { }
