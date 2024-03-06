import  express  from "express";
import Ffmpeg from "fluent-ffmpeg";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.post("/process-video", (req, res) => {
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath) {
        res.status(400).send("Bad request. Missing file path.");
    }
    Ffmpeg(inputFilePath).outputOptions("-vf", "scale=-1:360").on("end", () => {
        res.status(200).send("Processing finished successfully.")
    }).on("error", err => {
        console.log(`An errror occure: ${err.message}`);
        res.status(500).send(`internal serveur Error: ${err.message}`);
    })
    .save(outputFilePath);
});

app.listen(port, () => {
    console.log(`Video processing service listening at http://localhost:${port}`);
})