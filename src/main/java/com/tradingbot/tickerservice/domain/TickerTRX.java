package com.tradingbot.tickerservice.domain;

import lombok.Data;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@JsonComponent
@Document(collection = "tickers_trx")
public class TickerTRX extends Ticker{
    public TickerTRX(){
        setSymbol(Coin.TRX.name());
    }
}
