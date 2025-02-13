import { Card, CardContent } from "../ui/card";

export default function WeatherCard({ name, country, temp, humidity }) {

    return (
        <Card>
            <CardContent className='flex items-center p-6 justify-center space-x-4'>
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">{country}</p>
                    <p className="text-xl font-medium">{name}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-3xl font-semibold">{temp} C </p>
                    <p className="text-xl font-medium">Temperature</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">{humidity}% </p>
                    <p className="text-xl font-medium">Humidity</p>
                </div>
            </CardContent>
        </Card>
    )
}
