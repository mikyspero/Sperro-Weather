import path from "path";
import { Server, ServerCredentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import {
    getCurrentWeatherHandler,
    getDailyWeatherHandler,
    getFullWeatherHandler,
    getHourlyWeatherHandler
} from "./handler";

// Load the protobuf files
const PROTO_PATH = path.join(__dirname, '../../proto/weather-service.proto');
const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const weatherProto = loadPackageDefinition(packageDefinition);

export function createServer(): Server {
    const server = new Server();

    // Find the WeatherService in the loaded proto
    const WeatherService = weatherProto.WeatherService;

    // @ts-ignore
    if (!WeatherService || !WeatherService.service) {
        throw new Error('WeatherService not found in the loaded proto file');
    }

    // @ts-ignore
    server.addService(WeatherService.service, {
        GetCurrentWeather: getCurrentWeatherHandler,
        //GetHourlyWeather: getHourlyWeatherHandler, //tbf need to study array returns in gRPC
        //GetDailyWeather: getDailyWeatherHandler, //as above
        GetFullWeather: getFullWeatherHandler
    });

    return server;
}

export function startServer(port: string = "50051"): void {
    const server = createServer();
    server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), (error, port) => {
        if (error) {
            console.error(`Failed to bind server: ${error}`);
            return;
        }
        server.start();
        console.log(`Server running at http://0.0.0.0:${port}`);
    });
}