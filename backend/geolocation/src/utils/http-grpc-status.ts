import { status } from '@grpc/grpc-js';
import { HttpStatusCodes } from "./http_status";
import {WebError} from "./web_error";

function mapHttpStatusToGrpcStatus(httpStatus: HttpStatusCodes): status {
    switch (httpStatus) {
        // Successful Responses
        case HttpStatusCodes.OK:
        case HttpStatusCodes.CREATED:
        case HttpStatusCodes.ACCEPTED:
        case HttpStatusCodes.NO_CONTENT:
            return status.OK;

        // Client Error Responses
        case HttpStatusCodes.BAD_REQUEST:
            return status.INVALID_ARGUMENT;
        case HttpStatusCodes.UNAUTHORIZED:
            return status.UNAUTHENTICATED;
        case HttpStatusCodes.FORBIDDEN:
            return status.PERMISSION_DENIED;
        case HttpStatusCodes.NOT_FOUND:
            return status.NOT_FOUND;
        case HttpStatusCodes.CONFLICT:
            return status.ALREADY_EXISTS;
        case HttpStatusCodes.GONE:
            return status.NOT_FOUND;
        case HttpStatusCodes.TOO_MANY_REQUESTS:
            return status.RESOURCE_EXHAUSTED;

        // Server Error Responses
        case HttpStatusCodes.INTERNAL_SERVER_ERROR:
            return status.INTERNAL;
        case HttpStatusCodes.NOT_IMPLEMENTED:
            return status.UNIMPLEMENTED;
        case HttpStatusCodes.SERVICE_UNAVAILABLE:
            return status.UNAVAILABLE;
        case HttpStatusCodes.GATEWAY_TIMEOUT:
            return status.DEADLINE_EXCEEDED;

        // Default: for any status that doesn't have a direct gRPC equivalent
        default:
            return status.UNKNOWN;
    }
}

export function createGrpcErrorFromWebError(error: WebError): { code: status; message: string; details: string } {
    return {
        code: mapHttpStatusToGrpcStatus(error.status),
        message: error.message,
        details: JSON.stringify({ status: error.status, message: error.message })
    };
}


