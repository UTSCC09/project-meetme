/* eslint no-console: ["error", { allow: ["warn"] }] */
import http from "http";
import { ExpressPeerServer } from "peer";
import app from "./app";
import server from "./server";
import { connectDb } from "./models";

async function startApolloServer(port) {
    const httpServer = http.createServer(app);

    const peerServer = ExpressPeerServer(httpServer, {
        debug: true,
        path: "/meetme",
        port,
        proxied: true,
    });

    app.use("/peerjs", peerServer);

    await server.start();
    server.applyMiddleware({
        app,
        path: "/graphql",
        cors: {
            origin: ["https://studio.apollographql.com"],
            credentials: true,
        },
    });
    httpServer.listen(port, () => {
        console.log(
            `🚀 Apollo Server running on http://localhost:${port}/graphql`
        );
    });
}

const port = process.env.PORT || 5000;

connectDb().then(startApolloServer(port));
