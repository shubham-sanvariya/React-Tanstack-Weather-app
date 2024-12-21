import {API_CONFIG} from "./config.ts";
import {Coordinates, ForecastData, WeatherData} from "./types.ts";

class WeatherAPI{

    private createURL(endpoint:string, params:Record<string, string | number>) {
        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params,
        });

        return `${endpoint}?${searchParams.toString()}`;
    }
    private async fetchData<T>(url:string): Promise<T> {
        const response = await fetch(url);

        if (!response.ok){
            throw new Error(`Weather API Error: ${response.statusText}`);
        }

        return response.json();
    }

    async getCurrentWeather({lat,lon} : Coordinates): Promise<WeatherData>{
        const url = this.createURL(`${API_CONFIG.BASE_URL}/weather`,{
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
        })

        return this.fetchData<WeatherData>(url);
    }

    async getForecast({lat,lon} : Coordinates): Promise<ForecastData>{
        const url = this.createURL(`${API_CONFIG.BASE_URL}/forecast`,{
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
        })

        return this.fetchData<ForecastData>(url);
    }
}
