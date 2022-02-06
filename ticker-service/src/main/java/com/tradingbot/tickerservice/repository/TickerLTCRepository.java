package com.tradingbot.tickerservice.repository;

import com.tradingbot.tickerservice.domain.TickerLTC;
import org.springframework.stereotype.Repository;

@Repository
public interface TickerLTCRepository extends TickerCommonRepository<TickerLTC, String> { }
