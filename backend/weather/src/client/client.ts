import path from "path";
import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { Point } from "../types/point";

// Assuming these types are defined based on your proto files
interface WeatherObject {
    date: string;
    weather: { main: string; description?: string };
    temperature: {
        current?: number;
        average?: number;
        feelslike?: number;
        min: number;
        max: number
    };
    humidity?: number;
    pressure?: number;
    wind?: { speed: number; direction: number };
}

interface FullWeather {
    current: WeatherObject;
    daily: WeatherObject[];
    hourly: WeatherObject[];
}

const PROTO_PATH = path.join(__dirname, '../../proto/weather-service.proto');
const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const weatherProto: any = loadPackageDefinition(packageDefinition);

interface WeatherClient {
    getCurrentWeather(point: Point, callback: (error: Error | null, response: WeatherObject) => void): void;
    getHourlyWeather(point: Point, callback: (error: Error | null, response: WeatherObject[]) => void): void;
    getDailyWeather(point: Point, callback: (error: Error | null, response: WeatherObject[]) => void): void;
    getFullWeather(point: Point, callback: (error: Error | null, response: FullWeather) => void): void;
}

const client = new weatherProto.WeatherService('localhost:3000', credentials.createInsecure()) as WeatherClient;

const point: Point = {
    latitude: 40.7128,
    longitude: -74.0060
};

function testGetCurrentWeather() {
    client.getCurrentWeather(point, (error, response) => {
        if (error) {
            console.error('Error in GetCurrentWeather:', error);
            return;
        }
        console.log('Current Weather data:', response);
    });
}

function testGetHourlyWeather() {
    client.getHourlyWeather(point, (error, response) => {
        if (error) {
            console.error('Error in GetHourlyWeather:', error);
            return;
        }
        console.log('Hourly Weather data:', response);
    });
}

function testGetDailyWeather() {
    client.getDailyWeather(point, (error, response) => {
        if (error) {
            console.error('Error in GetDailyWeather:', error);
            return;
        }
        console.log('Daily Weather data:', response);
    });
}

function testGetFullWeather() {
    client.getFullWeather(point, (error, response) => {
        if (error) {
            console.error('Error in GetFullWeather:', error);
            return;
        }
        console.log('Full Weather data:', response);
    });
}

// Run all tests
testGetCurrentWeather();
//testGetHourlyWeather();
//testGetDailyWeather();
testGetFullWeather();