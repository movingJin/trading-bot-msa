package com.tradingbot.tickerservice.repository;

import com.tradingbot.tickerservice.domain.TickerADA;
import org.springframework.stereotype.Repository;

@Repository
public interface TickerADARepository extends TickerCommonRepository<TickerADA, String> { }
