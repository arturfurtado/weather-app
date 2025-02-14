import { Card, CardContent } from "../ui/card";

export default function WeatherCard({ 
  name, 
  country, 
  temp, 
  humidity, 
  feelsLike,
  humidityDelta,
  tempDelta: passedTempDelta,
  feelsLikeDelta: passedFeelsLikeDelta,
  sunset,
  sunrise,
}) {
  const computedTempDelta =
    (temp != null && feelsLike != null)
      ? Math.round(feelsLike - temp)
      : undefined;
  const computedTempDeltaFinal =
    passedTempDelta !== undefined ? passedTempDelta : computedTempDelta;

  const computedFeelsLikeDeltaFinal =
    passedFeelsLikeDelta !== undefined ? passedFeelsLikeDelta : computedTempDelta;

  const formatDelta = (delta) => {
    if (delta > 0) return `+${delta}`;
    if (delta < 0) return `${delta}`;
    return null;
  };

  const deltaClass = (delta) =>
    delta < 0 ? 'text-red-500' : delta > 0 ? 'text-green-500' : '';

  return (
    <div className="flex space-x-7">
        <div className="flex flex-col space-y-7">
      <Card className="border-none">
        <CardContent className="flex items-center p-10 rounded-md justify-center dark:hover:bg-[#09090A] dark:bg-[#030303] bg-[#fcfcfc] hover:bg-[#f6f6f5] transition-all">
          <div className="flex flex-col">
            <p className="text-3xl font-bold">{country}</p>
            <p className="text-xl font-medium">{name}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none">
        <CardContent className="flex items-center p-10 rounded-md justify-center dark:hover:bg-[#09090A] dark:bg-[#030303] bg-[#fcfcfc] hover:bg-[#f6f6f5] transition-all">
          <div className="flex flex-col">
            <p className="text-3xl font-bold">
              {temp}°C{' '}
              {computedTempDeltaFinal !== undefined &&
                computedTempDeltaFinal !== 0 && (
                  <span className={`text-base ${deltaClass(computedTempDeltaFinal)}`}>
                    ({formatDelta(computedTempDeltaFinal)}°)
                  </span>
                )}
            </p>
            <p className="text-xl font-medium">Temperature</p>
          </div>
        </CardContent>
      </Card>
      </div>
      <div className="flex flex-col space-y-7">
      <Card className="border-none">
        <CardContent className="flex items-center p-10 rounded-md justify-center dark:hover:bg-[#09090A] dark:bg-[#030303] bg-[#fcfcfc] hover:bg-[#f6f6f5] transition-all">
          <div className="flex flex-col">
            <p className="text-3xl font-bold">
              {humidity}%{' '}
              {humidityDelta !== undefined && humidityDelta !== 0 && (
                <span className={`text-base ${deltaClass(humidityDelta)}`}>
                  ({formatDelta(humidityDelta)}%)
                </span>
              )}
            </p>
            <p className="text-xl font-medium">Humidity</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none">
        <CardContent className="flex items-center p-10 rounded-md justify-center dark:hover:bg-[#09090A] dark:bg-[#030303] bg-[#fcfcfc] hover:bg-[#f6f6f5] transition-all">
          <div className="flex flex-col">
            <p className="text-3xl font-bold">
              {feelsLike}°C{' '}
              {computedFeelsLikeDeltaFinal !== undefined &&
                computedFeelsLikeDeltaFinal !== 0 && (
                  <span className={`text-base ${deltaClass(computedFeelsLikeDeltaFinal)}`}>
                    ({formatDelta(computedFeelsLikeDeltaFinal)}°)
                  </span>
                )}
            </p>
            <p className="text-xl font-medium">Feels Like</p>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
