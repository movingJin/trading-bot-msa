package com.tradingbot.tickerservice.repository;

import com.tradingbot.tickerservice.domain.TickerBCH;
import org.springframework.stereotype.Repository;

@Repository
public interface TickerBCHRepository extends TickerCommonRepository<TickerBCH, String> { }
