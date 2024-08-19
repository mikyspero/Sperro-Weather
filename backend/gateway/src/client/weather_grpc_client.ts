import path from "path";
import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { Point } from "../types/point";

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
    getFullWeather(point: Point, callback: (error: Error | null, response: any) => void): void;
}

const client = new weatherProto.GetWeather('localhost:50051', credentials.createInsecure()) as WeatherClient;

export async function getWeatherData(latitude: number, longitude: number): Promise<any> {
    return new Promise((resolve, reject) => {
        const point: Point = { latitude, longitude };

        client.getFullWeather(point, (error, response) => {
            if (error) {
                console.error('gRPC Error:', error);
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}