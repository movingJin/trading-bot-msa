package com.tradingbot.tickerservice.domain;

import lombok.Data;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@JsonComponent
@Document(collection = "tickers_xlm")
public class TickerXLM extends Ticker{
    public TickerXLM(){
        setSymbol(Coin.XLM.name());
    }
}
