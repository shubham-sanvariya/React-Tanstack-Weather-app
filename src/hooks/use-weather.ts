import {Coordinates} from "../api/types.ts";
import {useQuery} from "@tanstack/react-query";
import {weatherAPI} from "../api/weather.ts";

export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ["weather",coords] as const,
    forecast: (coords: Coordinates) => ["forecast",coords] as const,
}

export function useWeatherQuery(coordinates:Coordinates|null){
   return useQuery({
        // if coordinates is undefined or null it will return {lat: 0, lon: 0}
        queryKey: WEATHER_KEYS.weather(coordinates ?? {lat: 0, lon: 0}),
        queryFn: ()=>
            coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,
    })
}

export function useForecastQuery(coordinates:Coordinates|null){
   return useQuery({
        // if coordinates is undefined or null it will return {lat: 0, lon: 0}
        queryKey: WEATHER_KEYS.forecast(coordinates ?? {lat: 0, lon: 0}),
        queryFn: ()=>
            coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates,
    })
}
