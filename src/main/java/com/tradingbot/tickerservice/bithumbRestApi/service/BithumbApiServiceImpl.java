package com.tradingbot.tickerservice.bithumbRestApi.service;


import com.tradingbot.tickerservice.bithumbRestApi.Api_Client;
import com.tradingbot.tickerservice.domain.Ticker;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;

import static com.tradingbot.tickerservice.bithumbRestApi.HttpRequest.METHOD_GET;
import static com.tradingbot.tickerservice.bithumbRestApi.HttpRequest.METHOD_POST;

@Slf4j
@Service
public class BithumbApiServiceImpl implements BithumbApiService {

    @Override
    public <T extends Ticker> T getTicker(Class<T> clazz, String symbol) {
        T ticker = null;
        Api_Client api = new Api_Client("dummy", "dummy");
        try {
            String reqUrl = String.format("/public/ticker/%s_KRW", symbol);
            HashMap<String, String> rgParams = new HashMap<String, String>();
            rgParams.put("count", "1");
            String result = api.callApi(reqUrl, rgParams, METHOD_GET);
            JSONObject jObject = new JSONObject(result);
            String status = jObject.getString("status");
            if (status.equals("0000")) {
                ticker = clazz.getConstructor().newInstance();
                JSONObject dataObject = jObject.getJSONObject("data");
                Double opening_price = Double.parseDouble(dataObject.getString("opening_price"));
                Double closing_price = Double.parseDouble(dataObject.getString("closing_price"));
                Double min_price = Double.parseDouble(dataObject.getString("min_price"));
                Double max_price = Double.parseDouble(dataObject.getString("max_price"));
                Double units_traded = Double.parseDouble(dataObject.getString("units_traded"));
                Long date = Long.parseLong(dataObject.getString("date"));
                Instant instant = Instant.ofEpochMilli(date);
                LocalDateTime timeStamp = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();

                ticker.setSymbol(symbol);
                ticker.setOpenPrice(opening_price);
                ticker.setClosePrice(closing_price);
                ticker.setHighPrice(max_price);
                ticker.setLowPrice(min_price);
                ticker.setVolume(units_traded);
                ticker.setTimeTag(timeStamp);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ticker;
    }
}
