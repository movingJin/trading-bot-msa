package com.tradingbot.tickerservice.domain;

import lombok.Data;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@JsonComponent
@Document(collection = "tickers_eos")
public class TickerEOS extends Ticker{
    public TickerEOS(){
        setSymbol(Coin.EOS.name());
    }
}
