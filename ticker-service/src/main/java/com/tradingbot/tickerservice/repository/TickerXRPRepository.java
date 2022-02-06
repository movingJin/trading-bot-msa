package com.tradingbot.tickerservice.repository;

import com.tradingbot.tickerservice.domain.TickerETH;
import com.tradingbot.tickerservice.domain.TickerXRP;
import org.springframework.stereotype.Repository;

@Repository
public interface TickerXRPRepository extends TickerCommonRepository<TickerXRP, String> { }
