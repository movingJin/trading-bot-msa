package com.tradingbot.tickerservice.service;

import com.tradingbot.tickerservice.bithumbRestApi.service.BithumbApiService;
import com.tradingbot.tickerservice.domain.*;
import com.tradingbot.tickerservice.repository.*;
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
    private final TickerADARepository tickerADARepository;
    private final TickerBCHRepository tickerBCHRepository;
    private final TickerBTCRepository tickerBTCRepository;
    private final TickerEOSRepository tickerEOSRepository;
    private final TickerETHRepository tickerETHRepository;
    private final TickerLINKRepository tickerLINKRepository;
    private final TickerLTCRepository tickerLTCRepository;
    private final TickerTRXRepository tickerTRXRepository;
    private final TickerXLMRepository tickerXLMRepository;
    private final TickerXRPRepository tickerXRPRepository;

    private final BithumbApiService bithumbApiService;
    private final RedisTemplate<String, String> redisTemplate;
    private HashOperations<String, String, String> hashOperations;  //Thread safe
    static Logger log = Logger.getLogger(TickerHistoryService.class.getName());
    private final List<Class<? extends Ticker>> listOfTickerClasses = Arrays.asList(
            TickerADA.class,
            TickerBCH.class,
            TickerBTC.class,
            TickerEOS.class,
            TickerETH.class,
            TickerLINK.class,
            TickerLTC.class,
            TickerTRX.class,
            TickerXLM.class,
            TickerXRP.class);
    @Override
    public void afterPropertiesSet() throws Exception {
        hashOperations = redisTemplate.opsForHash();
    }

    public <T extends Ticker> void execute() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        log.info("transaction exists? ".concat( String.valueOf(TransactionSynchronizationManager.isActualTransactionActive()) )); // true
        log.info("transaction sync? ".concat( String.valueOf(TransactionSynchronizationManager.isSynchronizationActive()) ));  // true

        List<TickerADA> adas = tickerADARepository.findByTimeTagBefore(LocalDateTime.now().minusDays(120));
        List<TickerBCH> bchs = tickerBCHRepository.findByTimeTagBefore(LocalDateTime.now().minusDays(120));
        List<TickerBTC> btcs = tickerBTCRepository.findByTimeTagBefore(LocalDateTime.now().minusDays(120));
        List<TickerEOS> eoss = tickerEOSRepository.findByTimeTagBefore(LocalDateTime.now().minusDays(120));
        List<TickerETH> eths = tickerETHRepository.findByTimeTagBefore(LocalDateTime.now().minusDays(120));
        List<TickerLINK> links = tickerLINKRepository.findByTimeTagBefore(LocalDateTime.now().minusDays(120));
        List<TickerLTC> ltcs = tickerLTCRepository.findByTimeTagBefore(LocalDateTime.now().minusDays(120));
        List<TickerTRX> trxs = tickerTRXRepository.findByTimeTagBefore(LocalDateTime.now().minusDays(120));
        List<TickerXLM> xlms = tickerXLMRepository.findByTimeTagBefore(LocalDateTime.now().minusDays(120));
        List<TickerXRP> xrps = tickerXRPRepository.findByTimeTagBefore(LocalDateTime.now().minusDays(120));

        log.info("======= Start ticker history delete step =======");
        tickerADARepository.deleteAll(adas);
        tickerBCHRepository.deleteAll(bchs);
        tickerBTCRepository.deleteAll(btcs);
        tickerEOSRepository.deleteAll(eoss);
        tickerETHRepository.deleteAll(eths);
        tickerLINKRepository.deleteAll(links);
        tickerLTCRepository.deleteAll(ltcs);
        tickerTRXRepository.deleteAll(trxs);
        tickerXLMRepository.deleteAll(xlms);
        tickerXRPRepository.deleteAll(xrps);

        log.info("======= Start ticker history insert step =======");
        TickerADA ada = bithumbApiService.getTicker(TickerADA.class, Coin.ADA.name());
        TickerBCH bch = bithumbApiService.getTicker(TickerBCH.class, Coin.BCH.name());
        TickerBTC btc = bithumbApiService.getTicker(TickerBTC.class, Coin.BTC.name());
        TickerEOS eos = bithumbApiService.getTicker(TickerEOS.class, Coin.EOS.name());
        TickerETH eth = bithumbApiService.getTicker(TickerETH.class, Coin.ETH.name());
        TickerLINK link = bithumbApiService.getTicker(TickerLINK.class, Coin.LINK.name());
        TickerLTC ltc = bithumbApiService.getTicker(TickerLTC.class, Coin.LTC.name());
        TickerTRX trx = bithumbApiService.getTicker(TickerTRX.class, Coin.TRX.name());
        TickerXLM xlm = bithumbApiService.getTicker(TickerXLM.class, Coin.XLM.name());
        TickerXRP xrp = bithumbApiService.getTicker(TickerXRP.class, Coin.XRP.name());
        tickerADARepository.save(ada);
        tickerBCHRepository.save(bch);
        tickerBTCRepository.save(btc);
        tickerEOSRepository.save(eos);
        tickerETHRepository.save(eth);
        tickerLINKRepository.save(link);
        tickerLTCRepository.save(ltc);
        tickerTRXRepository.save(trx);
        tickerXLMRepository.save(xlm);
        tickerXRPRepository.save(xrp);

        for (var tickerClass:listOfTickerClasses) {
            loadHourMovingAverage(tickerClass.getConstructor().newInstance());
            loadDayMovingAverage(tickerClass.getConstructor().newInstance());
        }
        return;
    }

    private <T extends Ticker> void loadHourMovingAverage(T ticker) {
        Arrays.stream(HourMovingAverage.values())
                .forEach(hours ->
                        reactiveMongoTemplate.aggregate(
                                        Aggregation.newAggregation(
                                                ticker.getClass(),
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

    private <T extends Ticker> void loadDayMovingAverage(T ticker) {
        Arrays.stream(DayMovingAverage.values())
                .forEach(days ->
                        reactiveMongoTemplate.aggregate(
                                        Aggregation.newAggregation(
                                                ticker.getClass(),
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
