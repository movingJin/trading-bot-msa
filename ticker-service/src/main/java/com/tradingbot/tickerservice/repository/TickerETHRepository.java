package com.tradingbot.tickerservice.repository;

import com.tradingbot.tickerservice.domain.TickerETH;
import org.springframework.stereotype.Repository;

@Repository
public interface TickerETHRepository extends TickerCommonRepository<TickerETH, String> { }
