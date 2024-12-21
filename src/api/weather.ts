import {API_CONFIG} from "./config.ts";
import {Coordinates, WeatherData} from "./types.ts";

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

}
