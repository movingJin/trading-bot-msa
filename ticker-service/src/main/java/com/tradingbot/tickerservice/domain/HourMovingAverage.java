package com.tradingbot.tickerservice.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum HourMovingAverage {
    HMA1(1),
    HMA3(3),
    HMA6(6),
    HMA12(12);
    private final int value;

}
