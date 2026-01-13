import Server from "./Core/server";

//create a server
const server = new Server();

//start the server
const app = server.startServer();

app.listen(process.env.PORT); //TO GET THE VALRIABLES in .env.development
