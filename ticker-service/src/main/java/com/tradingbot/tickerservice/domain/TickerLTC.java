package com.tradingbot.tickerservice.domain;

import lombok.Data;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@JsonComponent
@Document(collection = "tickers_ltc")
public class TickerLTC extends Ticker{
    public TickerLTC(){
        setSymbol(Coin.LTC.name());
    }
}
