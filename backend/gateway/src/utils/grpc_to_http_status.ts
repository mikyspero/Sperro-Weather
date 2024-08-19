import { status } from "@grpc/grpc-js";
import { HttpStatusCodes } from "./http_status";

function mapGrpcStatusToHttpStatus(grpcStatus: status): HttpStatusCodes {
    switch (grpcStatus) {
        // OK
        case status.OK:
            return HttpStatusCodes.OK;

        // Client Errors
        case status.INVALID_ARGUMENT:
        case status.FAILED_PRECONDITION:
            return HttpStatusCodes.BAD_REQUEST;
        case status.UNAUTHENTICATED:
            return HttpStatusCodes.UNAUTHORIZED;
        case status.PERMISSION_DENIED:
            return HttpStatusCodes.FORBIDDEN;
        case status.NOT_FOUND:
            return HttpStatusCodes.NOT_FOUND;
        case status.ALREADY_EXISTS:
            return HttpStatusCodes.CONFLICT;
        case status.RESOURCE_EXHAUSTED:
            return HttpStatusCodes.TOO_MANY_REQUESTS;
        case status.CANCELLED:
            return HttpStatusCodes.REQUEST_TIMEOUT;

        // Server Errors
        case status.UNKNOWN:
        case status.INTERNAL:
            return HttpStatusCodes.INTERNAL_SERVER_ERROR;
        case status.UNIMPLEMENTED:
            return HttpStatusCodes.NOT_IMPLEMENTED;
        case status.UNAVAILABLE:
            return HttpStatusCodes.SERVICE_UNAVAILABLE;
        case status.DEADLINE_EXCEEDED:
            return HttpStatusCodes.GATEWAY_TIMEOUT;

        // Default: for any status that doesn't have a direct HTTP equivalent
        default:
            return HttpStatusCodes.INTERNAL_SERVER_ERROR;
    }
}


function mapGrpcStatusToMessage(grpcStatus: status): string {
    switch (grpcStatus) {
        case status.OK:
            return "The operation completed successfully.";
        case status.CANCELLED:
            return "The operation was cancelled by the client.";
        case status.UNKNOWN:
            return "An unknown error occurred.";
        case status.INVALID_ARGUMENT:
            return "The client provided an invalid argument.";
        case status.DEADLINE_EXCEEDED:
            return "The operation timed out.";
        case status.NOT_FOUND:
            return "The requested resource was not found.";
        case status.ALREADY_EXISTS:
            return "The resource already exists.";
        case status.PERMISSION_DENIED:
            return "The client does not have permission to perform this operation.";
        case status.RESOURCE_EXHAUSTED:
            return "The resource has been exhausted (e.g., per-user quota).";
        case status.FAILED_PRECONDITION:
            return "The operation was rejected because the system is not in a state required for the operation's execution.";
        case status.ABORTED:
            return "The operation was aborted.";
        case status.OUT_OF_RANGE:
            return "The operation was attempted past the valid range.";
        case status.UNIMPLEMENTED:
            return "The operation is not implemented or is not supported.";
        case status.INTERNAL:
            return "An internal error occurred.";
        case status.UNAVAILABLE:
            return "The service is currently unavailable.";
        case status.DATA_LOSS:
            return "Unrecoverable data loss or corruption occurred.";
        case status.UNAUTHENTICATED:
            return "The request does not have valid authentication credentials.";
        default:
            return "An unexpected error occurred.";
    }
}


export { mapGrpcStatusToHttpStatus, mapGrpcStatusToMessage };