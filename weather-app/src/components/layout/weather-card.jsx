import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../ui/card";

export default function WeatherCard({ name, country, temp, humidity }) {

    return (
        <Card >
            <CardHeader>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">{country}</p>
                <p className="font-semibold">{name}</p>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col font-semibold">
                    <p>{temp} C <span className="font-bold">Temperature</span></p>
                </div>
                <div className="flex flex-col font-semibold">
                    <p>{humidity}% <span className="font-bold">Humidity</span></p>
                </div>

            </CardFooter>
        </Card>

    )
}
