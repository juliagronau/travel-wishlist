import express from "express";
import {
  addNewCountry,
  deleteCountry,
  getAllCountries,
  getSingleCountry,
  updateCountry,
} from "../controllers/countries.js";
import {
  validate,
  validateBody,
} from "../middleware/inputValidation.js";
const countries = express.Router();

countries
  .route("/")
  .get(getAllCountries)
  .post(validateBody(), validate, addNewCountry);
countries
  .route("/:code")
  .get(getSingleCountry)
  .put(validateBody(), validate, updateCountry)
  .delete(deleteCountry);

export default countries;
