import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/layout.tsx";
import {ThemeProvider} from "./components/context/theme-provider.tsx";
import WeatherDashboard from "./pages/weather-dashboard.tsx";
import CityPage from "./pages/city-page.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "sonner";

function App() {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes (if data is fetched after 5 min for example of the same city it will fetch new data
                gcTime: 10 * 60 * 1000, // 10 minutes garbage collection after 10 min (means gets deleted)
                retry: false,
                refetchOnWindowFocus: false
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider>
                    <Layout>
                        <Routes>
                            <Route path='/' element={<WeatherDashboard/>}/>
                            <Route path='/city/:cityName' element={<CityPage/>}/>
                        </Routes>
                    </Layout>
                    <Toaster richColors/>
                </ThemeProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}

export default App
