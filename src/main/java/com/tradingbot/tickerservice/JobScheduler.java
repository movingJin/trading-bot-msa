package com.tradingbot.tickerservice;

import com.tradingbot.tickerservice.domain.Ticker;
import com.tradingbot.tickerservice.domain.TickerBTC;
import com.tradingbot.tickerservice.domain.TickerETH;
import com.tradingbot.tickerservice.domain.TickerXRP;
import com.tradingbot.tickerservice.service.TickerHistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author dalgun
 * @since 2019-10-30
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JobScheduler {
    private final TickerHistoryService tickerHistoryService;

    @Scheduled(cron="0 0/5 * * * ?")
    @Transactional(propagation= Propagation.NOT_SUPPORTED)
    public void runJob() throws InstantiationException, IllegalAccessException, NoSuchMethodException, InvocationTargetException {
        tickerHistoryService.execute();
    }
}
