import {ForecastData} from "../api/types.ts";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card.tsx";
import {Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {format} from "date-fns";

interface HourlyTemperatureProps{
    data: ForecastData;
}

const HourlyTemperature = ( { data } : HourlyTemperatureProps) => {

    const chartData = data.list.slice(0,8).map((item) => ({
        time: format(new Date(item.dt * 1000), "ha"),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
    }))

    return (
        <Card className={'flex-1'}>
            <CardHeader>
                <CardTitle>Today's Temperature</CardTitle>
            </CardHeader>
            <CardContent>
                <div className={'h-[200px] w-full'}>
                    <ResponsiveContainer width={"100%"}>
                        <LineChart data={chartData}>
                            <XAxis
                                dataKey={'time'}
                                stroke={'#888888'}
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke={'#888888'}
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}°`}
                            />
                            {/*tooltip*/}
                            <Line
                                type={'monotone'}
                                dataKey={'temp'}
                                stroke={'#2563eb'}
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                type={'monotone'}
                                dataKey={'feels_like'}
                                stroke={'#64748b'}
                                strokeWidth={2}
                                dot={false}
                                strokeDasharray={'5 5'}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
export default HourlyTemperature
