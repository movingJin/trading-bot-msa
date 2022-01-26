package com.tradingbot.tickerservice.domain;

import lombok.Data;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@JsonComponent
@Document(collection = "tickers_ada")
public class TickerADA extends Ticker{
    public TickerADA(){
        setSymbol(Coin.ADA.name());
    }
}
