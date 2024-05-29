export enum HttpStatusCodes {
    // Informational Responses
    CONTINUE = 100, // The server has received the request headers and expects the request body.
    SWITCHING_PROTOCOLS = 101, // The server is switching protocols according to the Upgrade header.
    PROCESSING = 102, // The server is processing the request but no response is available yet.
    EARLY_HINTS = 103, // Used to return some response headers before the final HTTP message.
  
    // Successful Responses
    OK = 200, // The request was successful.
    CREATED = 201, // The request has been fulfilled, and a new resource has been created.
    ACCEPTED = 202, // The request has been accepted for processing, but the processing has not been completed.
    NON_AUTHORITATIVE_INFORMATION = 203, // The server successfully processed the request but is returning information from another source.
    NO_CONTENT = 204, // The server successfully processed the request, but there is no content to return.
    RESET_CONTENT = 205, // The server successfully processed the request, but the user agent should reset the document view.
    PARTIAL_CONTENT = 206, // The server is delivering only part of the resource due to a range header sent by the client.
    MULTI_STATUS = 207, // The message body contains an XML message that follows the WebDAV standard.
    ALREADY_REPORTED = 208, // The members of a DAV binding have already been enumerated in a previous response header.
    IM_USED = 226, // The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
  
    // Redirection Responses
    MULTIPLE_CHOICES = 300, // The requested resource corresponds to any one of a set of representations.
    MOVED_PERMANENTLY = 301, // The resource has been assigned a new permanent URI, and any future references should use the returned URI.
    FOUND = 302, // The resource is temporarily located at a different URI.
    SEE_OTHER = 303, // The response to the request can be found under another URI.
    NOT_MODIFIED = 304, // The resource has not been modified since the last request.
    USE_PROXY = 305, // The requested resource must be accessed through the proxy provided in the Location header.
    TEMPORARY_REDIRECT = 307, // The resource is temporarily located at a different URI.
    PERMANENT_REDIRECT = 308, // The resource is permanently located at a different URI.
  
    // Client Error Responses
    BAD_REQUEST = 400, // The server cannot or will not process the request due to an apparent client error.
    UNAUTHORIZED = 401, // The request requires user authentication or the authentication credentials provided were invalid.
    PAYMENT_REQUIRED = 402, // Reserved for future use.
    FORBIDDEN = 403, // The server understood the request but refuses to authorize it.
    NOT_FOUND = 404, // The server cannot find the requested resource.
    METHOD_NOT_ALLOWED = 405, // The request method is not supported for the requested resource.
    NOT_ACCEPTABLE = 406, // The server cannot generate a response matching the list of acceptable values defined in the request headers.
    PROXY_AUTHENTICATION_REQUIRED = 407, // The client must first authenticate itself with the proxy.
    REQUEST_TIMEOUT = 408, // The server did not receive a complete request message within the time that it was prepared to wait.
    CONFLICT = 409, // The request could not be completed due to a conflict with the current state of the resource.
    GONE = 410, // The requested resource is no longer available at the server, and no forwarding address is known.
    LENGTH_REQUIRED = 411, // The server refuses to accept the request without a defined Content-Length header.
    PRECONDITION_FAILED = 412, // The precondition given in one or more of the request headers was not met.
    PAYLOAD_TOO_LARGE = 413, // The request entity is larger than the server is willing or able to process.
    URI_TOO_LONG = 414, // The URI provided was too long for the server to process.
    UNSUPPORTED_MEDIA_TYPE = 415, // The request entity has a media type that the server or resource does not support.
    RANGE_NOT_SATISFIABLE = 416, // The requested range cannot be satisfied.
    EXPECTATION_FAILED = 417, // The expectation given in the request's Expect header could not be met.
    IM_A_TEAPOT = 418, // The server refuses the attempt to brew coffee with a teapot.
    MISDIRECTED_REQUEST = 421, // The request was directed at a server that is unable to produce the requested response.
    UNPROCESSABLE_ENTITY = 422, // The request was well-formed but was unable to be followed due to semantic errors.
    LOCKED = 423, // The resource that is being accessed is locked.
    FAILED_DEPENDENCY = 424, // The request failed due to failure of a previous request.
    TOO_EARLY = 425, // The server is unwilling to risk processing a request that might be replayed.
    UPGRADE_REQUIRED = 426, // The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.
    PRECONDITION_REQUIRED = 428, // The origin server requires the request to be conditional.
    TOO_MANY_REQUESTS = 429, // The user has sent too many requests in a given amount of time.
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431, // The server is unwilling to process the request because its header fields are too large.
    UNAVAILABLE_FOR_LEGAL_REASONS = 451, // The user requested a resource that is not available due to legal reasons.
  
    // Server Error Responses
    INTERNAL_SERVER_ERROR = 500, // The server encountered an unexpected condition that prevented it from fulfilling the request.
    NOT_IMPLEMENTED = 501, // The server does not support the functionality required to fulfill the request.
    BAD_GATEWAY = 502, // The server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request.
    SERVICE_UNAVAILABLE = 503, // The server is currently unable to handle the request due to a temporary overload or scheduled maintenance.
    GATEWAY_TIMEOUT = 504, // The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access to complete the request.
    HTTP_VERSION_NOT_SUPPORTED = 505, // The server does not support the HTTP protocol version used in the request.
    VARIANT_ALSO_NEGOTIATES = 506, // The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
    INSUFFICIENT_STORAGE = 507, // The server is unable to store the representation needed to complete the request.
    LOOP_DETECTED = 508, // The server terminated an operation because it encountered an infinite loop while processing a request with "Depth: infinity".
    NOT_EXTENDED = 510, // The policy for accessing the resource has not been met in the request.
    NETWORK_AUTHENTICATION_REQUIRED = 511 // The client needs to authenticate to gain network access.
  }