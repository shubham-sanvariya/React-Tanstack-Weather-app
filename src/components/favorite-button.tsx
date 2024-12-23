import {WeatherData} from "../api/types.ts";
import {useFavorites} from "../hooks/use-favorite.ts";
import {Button} from "./ui/button.tsx";
import {Star} from "lucide-react";
import {toast} from "sonner";


interface FavoriteButtonProps {
    data: WeatherData
}

const FavoriteButton = ( { data }: FavoriteButtonProps) => {

    const {addToFavorite, isFavorite, removeFavorite} = useFavorites();
    const isCurrentlyFavorite = isFavorite(data.coord.lat,data.coord.lon);

    const handleToggleFavorite = () => {
        if (isCurrentlyFavorite){
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from Favorites`);
        }else {
            addToFavorite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country
            });

            toast.success(`Added ${data.name} to Favorites`)
        }
    }

    return (
        <Button
            variant={isCurrentlyFavorite ? "default" : "outline"}
            size={"icon"}
            className={isCurrentlyFavorite
                ? "bg-yellow-500 hover:bg-yellow-600"
                :""}
            onClick={handleToggleFavorite}
        >
            <Star
                className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
            />

        </Button>
    )
}
export default FavoriteButton