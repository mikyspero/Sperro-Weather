import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { Point } from "../types/point";
import { WEATHER_PORT } from "../config/imported_variables";
import {WebError} from "../utils/web_error";
import {HttpStatusCodes} from "../utils/http_status";

const PROTO_PATH = path.join(__dirname, '../../proto/weather-service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const weatherProto = grpc.loadPackageDefinition(packageDefinition) as any;

const WeatherService = weatherProto.WeatherService;

interface WeatherClient {
    getFullWeather(point: Point, callback: (error: Error | null, response: any) => void): void;
}

const client = new WeatherService('weather:3000', grpc.credentials.createInsecure()) as WeatherClient;

export async function getWeatherData(latitude: number, longitude: number): Promise<any> {
    return new Promise((resolve, reject) => {
        const point: Point = { latitude, longitude };

        client.getFullWeather(point, (error, response) => {
            if (error) {
                console.error('gRPC Error:', error);
                // Transform the gRPC error into a WebError
                const webError = WebError.buildErrorFromGrpc(error);
                reject(webError);
            } else {
                resolve(response);
            }
        });
    });
}
