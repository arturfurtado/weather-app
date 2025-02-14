import { Card, CardContent } from "../ui/card";

export default function WeatherCard({ name, country, temp, humidity, feelsLike }) {

    return (
        <div className="flex space-x-7">
            <Card className="border-none">
                <CardContent className='flex items-center p-10 rounded-md justify-center dark:hover:bg-[#09090A] dark:bg-[#030303] bg-[#fcfcfc] hover:bg-[#f6f6f5] transition-all'>
                    <div className="flex flex-col">
                        <p className="text-3xl font-bold">{country}</p>
                        <p className="text-xl font-medium">{name}</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-none">
                <CardContent className='flex items-center p-10 rounded-md justify-center dark:hover:bg-[#09090A] dark:bg-[#030303] bg-[#fcfcfc] hover:bg-[#f6f6f5]  transition-all'>
                    <div className="flex flex-col">
                        <p className="text-3xl font-bold">{temp} C</p>
                        <p className="text-xl font-medium">Temperature</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-none">
                <CardContent className='flex items-center p-10 rounded-md justify-center dark:hover:bg-[#09090A] dark:bg-[#030303] bg-[#fcfcfc] hover:bg-[#f6f6f5]  transition-all'>
                    <div className="flex flex-col">
                        <p className="text-3xl font-bold">{humidity} %</p>
                        <p className="text-xl font-medium">Humidity</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-none">
                <CardContent className='flex items-center p-10 rounded-md justify-center dark:hover:bg-[#09090A] dark:bg-[#030303] bg-[#fcfcfc] hover:bg-[#f6f6f5]  transition-all'>
                    <div className="flex flex-col">
                        <p className="text-3xl font-bold">{feelsLike} C</p>
                        <p className="text-xl font-medium">Feels Like</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
