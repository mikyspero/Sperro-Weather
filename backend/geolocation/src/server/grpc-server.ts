import path from "path";
import { Server, ServerCredentials, loadPackageDefinition, ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { getCoordinates } from "../services/location";
import { validate } from "../validation/validate_schema";
import { pointSchema } from "../models/point_schema";
import { Point } from "../types/point";
import { ZodError } from "zod";
import { WebError } from "../utils/web_error";
import { createGrpcErrorFromWebError } from "../utils/http-grpc-status";
import { HttpStatusCodes } from "../utils/http_status";
import {City} from "../types/city";

// Load the protobuf files
const PROTO_PATH = path.join(__dirname, '../../proto/geolocation_service.proto');
const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const geolocationProto = loadPackageDefinition(packageDefinition);

// Implement the GetCoordinates RPC method
const getCoordinatesHandler = async (
    call: ServerUnaryCall<City, Point>,
    callback: sendUnaryData<Point>
): Promise<void> => {
    try {
        const cityRequest = call.request;
        const coordinates = await getCoordinates(cityRequest);
        const validatedCoordinates = validate<Point>(pointSchema)(coordinates);
        callback(null, validatedCoordinates);
    } catch (error) {
        const webError = error instanceof ZodError ? WebError.transformErrorFromZodToWeb(error)
            : error instanceof WebError ? error
                : WebError.createError("Unknown error", HttpStatusCodes.INTERNAL_SERVER_ERROR);

        callback(createGrpcErrorFromWebError(webError), null);
    }
};

// Start the gRPC server
const server = new Server();
// @ts-ignore
server.addService(geolocationProto.Geolocation.service, { GetCoordinates: getCoordinatesHandler });
const address = '0.0.0.0:50052';
server.bindAsync(address, ServerCredentials.createInsecure(), (err: Error | null, port: number) => {
    if (err) {
        console.error(`Failed to start server: ${err.message}`);
        return;
    }
    console.log(`Server running at ${address}`);
});