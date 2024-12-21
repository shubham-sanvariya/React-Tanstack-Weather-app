import {API_CONFIG} from "./config.ts";
import {Coordinates} from "./types.ts";

class WeatherAPI{

    private createURL(endpoint:string, params:Record<string, string | number>) {
        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params,
        });

        return `${endpoint}?${searchParams.toString()}`;
    }

}
