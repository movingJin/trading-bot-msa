package com.tradingbot.tickerservice.repository;

import com.tradingbot.tickerservice.domain.TickerLINK;
import org.springframework.stereotype.Repository;

@Repository
public interface TickerLINKRepository extends TickerCommonRepository<TickerLINK, String> { }
