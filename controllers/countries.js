import countries from "../countries.js";

export const getAllCountries = (req, res) => {
  try {
    const { sort } = req.query;
    if (sort) {
      const sortedCountries = countries.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      res.status(200).json(sortedCountries);
    } else {
      res.status(200).json(countries);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addNewCountry = (req, res) => {
  try {
    const { name, alpha2Code, alpha3Code } = req.body;
    const findCountry = countries.find(
      (country) =>
        country.alpha2Code === alpha2Code ||
        country.alpha3Code === alpha3Code
    );
    if (findCountry) {
      res
        .status(403)
        .json("Country already exists, duplicates are not allowed");
    } else {
      countries.push({
        id: countries.length + 1,
        name: name,
        alpha2Code: alpha2Code,
        alpha3Code: alpha3Code,
        visited: false,
      });
      res.status(201).json(countries);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleCountry = (req, res) => {
  try {
    const { code } = req.params;
    const findCountry = countries.find(
      (country) =>
        country.alpha2Code === code || country.alpha3Code === code
    );
    if (!findCountry) {
      res.status(404).json("requested country doesn't exist");
    } else {
      res.status(200).json(findCountry);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCountry = (req, res) => {
  try {
    const { code } = req.params;
    const { name, alpha2Code, alpha3Code, visited } = req.body;
    const findCountry = countries.find(
      (country) =>
        country.alpha2Code === code || country.alpha3Code === code
    );
    if (!findCountry) {
      res
        .status(404)
        .json("Country is not in the list, hence not editable");
    } else {
      findCountry.name = name;
      findCountry.alpha2Code = alpha2Code;
      findCountry.alpha3Code = alpha3Code;
      findCountry.visited = visited;
      res.status(200).json(findCountry);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCountry = (req, res) => {
  try {
    const { code } = req.params;
    const findIndex = countries.findIndex(
      (country) =>
        country.alpha2Code === code || country.alpha3Code === code
    );
    // Delete from array:
    // countries.splice(findIndex, 1);
    // res.status(200).json("Country deleted successfully");
    // Set visited to true:
    countries[findIndex].visited = true;
    res
      .status(200)
      .json(`You have visited ${countries[findIndex].name}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
