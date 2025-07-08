
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Thermometer, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  uvIndex: number;
  visibility: number;
}

interface ForecastDay {
  date: string;
  high: number;
  low: number;
  condition: string;
}

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock weather data generator (since we don't want to use real API keys)
  const generateMockWeatherData = (cityName: string): WeatherData => {
    const conditions = ["Sunny", "Cloudy", "Rainy", "Snowy", "Partly Cloudy"];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      location: cityName,
      temperature: Math.floor(Math.random() * 35) + 5, // 5-40°C
      condition: randomCondition,
      humidity: Math.floor(Math.random() * 40) + 30, // 30-70%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      feelsLike: Math.floor(Math.random() * 35) + 5,
      uvIndex: Math.floor(Math.random() * 11), // 0-10
      visibility: Math.floor(Math.random() * 15) + 5, // 5-20 km
    };
  };

  const generateMockForecast = (): ForecastDay[] => {
    const conditions = ["Sunny", "Cloudy", "Rainy", "Snowy", "Partly Cloudy"];
    const days = ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5"];
    
    return days.map((day, index) => ({
      date: day,
      high: Math.floor(Math.random() * 30) + 10,
      low: Math.floor(Math.random() * 15) + 0,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
    }));
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case "snowy":
        return <CloudSnow className="h-8 w-8 text-blue-200" />;
      case "cloudy":
      case "partly cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const searchWeather = async () => {
    if (!city.trim()) {
      toast({
        title: "Error",
        description: "Please enter a city name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockData = generateMockWeatherData(city);
      const mockForecast = generateMockForecast();
      
      setWeatherData(mockData);
      setForecast(mockForecast);
      setIsLoading(false);
      
      toast({
        title: "Weather Updated",
        description: `Weather data loaded for ${city}`,
      });
    }, 1000);
  };

  // Load default weather on component mount
  useEffect(() => {
    const defaultData = generateMockWeatherData("London");
    const defaultForecast = generateMockForecast();
    setWeatherData(defaultData);
    setForecast(defaultForecast);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Weather Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              onKeyPress={(e) => e.key === "Enter" && searchWeather()}
              className="flex-1"
            />
            <Button onClick={searchWeather} disabled={isLoading}>
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? "Loading..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {weatherData && (
        <>
          {/* Current Weather */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold">{weatherData.location}</h2>
                    <p className="text-muted-foreground">{weatherData.condition}</p>
                  </div>
                  {getWeatherIcon(weatherData.condition)}
                </div>
                <div className="text-6xl font-bold mb-2">
                  {weatherData.temperature}°C
                </div>
                <p className="text-muted-foreground">
                  Feels like {weatherData.feelsLike}°C
                </p>
              </CardContent>
            </Card>

            {/* Weather Details */}
            <Card>
              <CardHeader>
                <CardTitle>Weather Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span>Humidity</span>
                  </div>
                  <span>{weatherData.humidity}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <span>Wind Speed</span>
                  </div>
                  <span>{weatherData.windSpeed} km/h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span>UV Index</span>
                  </div>
                  <span>{weatherData.uvIndex}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <span>Visibility</span>
                  </div>
                  <span>{weatherData.visibility} km</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 5-Day Forecast */}
          <Card>
            <CardHeader>
              <CardTitle>5-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {forecast.map((day, index) => (
                  <div key={index} className="text-center p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                    <p className="font-medium mb-2">{day.date}</p>
                    <div className="flex justify-center mb-2">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{day.condition}</p>
                    <div className="text-sm">
                      <span className="font-medium">{day.high}°</span>
                      <span className="text-muted-foreground">/{day.low}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;
