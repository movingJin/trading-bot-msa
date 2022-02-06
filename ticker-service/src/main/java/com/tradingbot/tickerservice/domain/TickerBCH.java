package com.tradingbot.tickerservice.domain;

import lombok.Data;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@JsonComponent
@Document(collection = "tickers_bch")
public class TickerBCH extends Ticker{
    public TickerBCH(){
        setSymbol(Coin.BCH.name());
    }
}
