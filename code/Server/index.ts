import Server from "./Core/server";

//create a server
const server = new Server();
const httpServer = server.startServer(); // This now returns HTTP server

//start the server
//const app = server.startServer();

// Start listening
httpServer.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
	console.log(
		`WebSocket server available on ws://localhost:${process.env.PORT}`,
	);
});

//app.listen(process.env.PORT); //TO GET THE VALRIABLES in .env.development
