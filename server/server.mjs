import express from "express";
import cors from "cors";
import './loadEnviroment.mjs';
import records from "./routes/record.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'), function (err) {
            if (err) {
                res.status(500).send(err);
            }
        });
    })
}

// Start the Express Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});