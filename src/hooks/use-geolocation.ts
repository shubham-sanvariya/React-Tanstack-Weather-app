import {useEffect, useState} from "react";
import {Coordinates} from "../api/types.ts";

interface GeoLocationState{
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
}

export function  useGeolocation(){
    const [locationData, setLocationData] = useState<GeoLocationState>({
        coordinates: null,
        isLoading: true,
        error: null,
    });

    const getLocation = () => {
        setLocationData((prev) => ({...prev,isLoading: true,error: null} ));

        if (!navigator.geolocation){
            setLocationData({
                coordinates: null,
                isLoading: false,
                error: "Geolocation is not supported by your browser",
            })
        }

        navigator.geolocation.getCurrentPosition(position => {
            setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                error: null,
                isLoading: false
            })
        },(error) => {
            let errorMessage : string;

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "Location permission denied. Please enable location access";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    errorMessage  = "Location request time out.";
                    break;
                default:
                    errorMessage = "An unknown error occurred.";
            }

            setLocationData({
                coordinates: null,
                error: errorMessage,
                isLoading: false
            })
        },{
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
            }
        );
    };

    useEffect(() => {
        getLocation();
    }, []);

    return{
        ...locationData,
        getLocation
    }
}
