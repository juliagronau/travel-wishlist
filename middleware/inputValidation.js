import { body, validationResult } from "express-validator";

export const validateBody = () => {
  return [
    body("name").not().isEmpty().isLength({ min: 2 }),
    body("alpha2Code").isISO31661Alpha2(),
    body("alpha3Code").isISO31661Alpha3(),
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json({ errors: errors.array() });
  }
};
