package com.tradingbot.tickerservice.repository;

import com.tradingbot.tickerservice.domain.TickerXLM;
import org.springframework.stereotype.Repository;

@Repository
public interface TickerXLMRepository extends TickerCommonRepository<TickerXLM, String> { }
