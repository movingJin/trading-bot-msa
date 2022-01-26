package com.tradingbot.tickerservice.domain;

import lombok.Data;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@JsonComponent
@Document(collection = "tickers_link")
public class TickerLINK extends Ticker{
    public TickerLINK(){
        setSymbol(Coin.LINK.name());
    }
}
