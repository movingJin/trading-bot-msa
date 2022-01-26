package com.tradingbot.tickerservice.repository;

import com.tradingbot.tickerservice.domain.TickerEOS;
import org.springframework.stereotype.Repository;

@Repository
public interface TickerEOSRepository extends TickerCommonRepository<TickerEOS, String> { }
