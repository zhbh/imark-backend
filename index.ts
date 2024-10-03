import app from "./app";

app.listen(3000, "0.0.0.0", () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${3000}`);
});