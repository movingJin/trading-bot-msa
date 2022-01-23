package com.tradingbot.tickerservice.service;

import com.tradingbot.tickerservice.bithumbRestApi.service.BithumbApiService;
import com.tradingbot.tickerservice.domain.*;
import com.tradingbot.tickerservice.repository.TickerBTCRepository;
import com.tradingbot.tickerservice.repository.TickerETHRepository;
import com.tradingbot.tickerservice.repository.TickerXRPRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.lang.reflect.InvocationTargetException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
@Transactional
@RequiredArgsConstructor
public class TickerHistoryService implements InitializingBean {
    private final ReactiveMongoTemplate reactiveMongoTemplate;
    private final TickerBTCRepository tickerBTCRepository;
    private final TickerETHRepository tickerETHRepository;
    private final TickerXRPRepository tickerXRPRepository;
    private final BithumbApiService bithumbApiService;
    private final RedisTemplate<String, String> redisTemplate;
    private HashOperations<String, String, String> hashOperations;  //Thread safe
    static Logger log = Logger.getLogger(TickerHistoryService.class.getName());
    private final List<Class<? extends Ticker>> listOfTickerClasses = Arrays.asList(
            TickerBTC.class,
            TickerETH.class,
            TickerXRP.class);
    @Override
    public void afterPropertiesSet() throws Exception {
        hashOperations = redisTemplate.opsForHash();
    }

    public <T extends Ticker> void execute() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        log.info("transaction exists? ".concat( String.valueOf(TransactionSynchronizationManager.isActualTransactionActive()) )); // true
        log.info("transaction sync? ".concat( String.valueOf(TransactionSynchronizationManager.isSynchronizationActive()) ));  // true

        List<TickerBTC> btcs = tickerBTCRepository.findByTimeTagBefore(LocalDateTime.now().minusDays(120));
        List<TickerETH> eths = tickerETHRepository.findByTimeTagBefore(LocalDateTime.now().minusDays(120));
        List<TickerXRP> xrps = tickerXRPRepository.findByTimeTagBefore(LocalDateTime.now().minusDays(120));
        log.info("======= Start ticker history delete step =======");
        tickerBTCRepository.deleteAll(btcs);
        tickerETHRepository.deleteAll(eths);
        tickerXRPRepository.deleteAll(xrps);


        log.info("======= Start ticker history insert step =======");
        TickerBTC btc = bithumbApiService.getTicker(TickerBTC.class, Coin.BTC.name());
        TickerETH eth = bithumbApiService.getTicker(TickerETH.class, Coin.ETH.name());
        TickerXRP xrp = bithumbApiService.getTicker(TickerXRP.class, Coin.XRP.name());
        tickerBTCRepository.save(btc);
        tickerETHRepository.save(eth);
        tickerXRPRepository.save(xrp);

        for (var tickerClass:listOfTickerClasses) {
            loadHourMovingAverage(tickerClass.getConstructor().newInstance());
            loadDayMovingAverage(tickerClass.getConstructor().newInstance());
        }
        return;
    }

    private void loadHourMovingAverage(Ticker ticker) {
        Arrays.stream(HourMovingAverage.values())
                .forEach(hours ->
                        reactiveMongoTemplate.aggregate(
                                        Aggregation.newAggregation(
                                                Ticker.class,
                                                match(where("symbol")
                                                        .is(ticker.getSymbol())
                                                        .and("timeTag")
                                                        .gte(LocalDateTime.now().minusHours(hours.getValue()))),
                                                group("$symbol")
                                                        .avg("$closePrice")
                                                        .as("average")),
                                        MovingAverage.class)
                                .doOnNext(value -> {
                                    hashOperations.put(ticker.getSymbol(), hours.name(), Double.toString(value.getAverage()));
                                    hashOperations.put(ticker.getSymbol(), hours.name() + "_TIMETAG", LocalDateTime.now().toString());
                                }).subscribe());
    }

    private void loadDayMovingAverage(Ticker ticker) {
        Arrays.stream(DayMovingAverage.values())
                .forEach(days ->
                        reactiveMongoTemplate.aggregate(
                                        Aggregation.newAggregation(
                                                Ticker.class,
                                                match(where("symbol")
                                                        .is(ticker.getSymbol())
                                                        .and("timeTag")
                                                        .gte(LocalDateTime.now().minusHours(days.getValue()))),
                                                group("$symbol")
                                                        .avg("$closePrice")
                                                        .as("average")),
                                        MovingAverage.class)
                                .doOnNext(value -> {
                                    hashOperations.put(ticker.getSymbol(), days.name(), Double.toString(value.getAverage()));
                                    hashOperations.put(ticker.getSymbol(), days.name()+"_TIMETAG", LocalDateTime.now().toString());
                                }).subscribe());
    }
}
