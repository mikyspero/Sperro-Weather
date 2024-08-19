import path from "path";
import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { City } from "../types/city";
import { Point } from "../types/point";

const PROTO_PATH = path.join(__dirname, '../../proto/geolocation_service.proto');
const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const geolocationProto: any = loadPackageDefinition(packageDefinition);

interface GeolocationClient {
    getCoordinates(cityRequest: City, callback: (error: Error | null, response: Point) => void): void;
}

class GeolocationService {
    private client: GeolocationClient;

    constructor(address: string) {
        this.client = new geolocationProto.Geolocation(address, credentials.createInsecure()) as GeolocationClient;
    }

    async getCoordinates(cityName: string, stateCode?: string, countryCode?: string): Promise<Point> {
        return new Promise((resolve, reject) => {
            const cityRequest: City = { cityName, stateCode, countryCode };

            this.client.getCoordinates(cityRequest, (error, response) => {
                if (error) {
                    console.error('gRPC Error:', error);
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }
}

// Default service for production use
const productionService = new GeolocationService('localhost:50051');

// Export the getCoordinates function for general use
export const getCoordinates = productionService.getCoordinates.bind(productionService);

// Testing capability
export class TestGeolocationService extends GeolocationService {
    constructor() {
        super('localhost:50052');
    }

    // Method to test the service with mock data
    async testGetCoordinates(cityName: string, expectedLat: number, expectedLon: number): Promise<boolean> {
        try {
            const result = await this.getCoordinates(cityName);
            return Math.abs(result.latitude - expectedLat) < 0.001 &&
                Math.abs(result.longitude - expectedLon) < 0.001;
        } catch (error) {
            console.error('Test failed:', error);
            return false;
        }
    }
}

// Example usage of the test capability
async function runTest() {
    const testService = new TestGeolocationService();
    const testResult = await testService.testGetCoordinates('New York', 40.7128, -74.0060);
    console.log('Test result:', testResult ? 'Passed' : 'Failed');
}

// Uncomment the following line to run the test
 runTest();
