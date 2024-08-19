import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

import { ServerCredentials } from "@grpc/grpc-js";
import { createServer } from "./server/grpc_server";
import { PORT} from "./configs/imported_variables";

const server = createServer();

const address = `0.0.0.0:${PORT}`;
server.bindAsync(address, ServerCredentials.createInsecure(), (err: Error | null, PORT: number) => {
  if (err) {
    console.error(`Failed to start server: ${err.message}`);
    process.exit(1);  // Exit the process with an error code
  }
  console.log(`Server running at ${address}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gRPC server');
  server.forceShutdown();
  process.exit(0);
});


