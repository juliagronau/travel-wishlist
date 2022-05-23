import express from "express";
import countries from "./routes/countries.js";
import countryData from "./countries.js";

const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //extended false bewirkt, dass keine verschachtelten Objekte zulässig sind
app.use("/api/countries", countries);

app.get("/", (req, res) => {
  res.render("pages/index", { countryData });
});

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);
