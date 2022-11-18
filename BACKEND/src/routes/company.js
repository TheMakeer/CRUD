const EventServices = require("../services/eventServices");
const express = require("express");
const companySchema = require("../models/company");
const router = express.Router();
const genericResponse = {
  data: {},
};

router.post("/createcompany", async (req, res, next) => {
  try {
    const company = companySchema(req.body);
    const savedCompany = await company.save();
    if (company._event) {
      await EventServices.addCompanyToEvent(company._event, savedCompany);
    }
    const response = Object.assign({}, genericResponse, {
      data: { savedCompany },
    });
    res.status(200).json(response).end();
  } catch (error) {
    next(error);
  }
});

// get companies
router.get("/companies", (req, res) => {
  companySchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// delete company
router.delete("/deletecompany/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const company = await companySchema.findById({ _id: id });
    const eventResponse = await EventServices.removeCompanyFromEvent(
      id,
      company._event
    );
    const companyResponse = await companySchema.remove({ _id: id });
    res.json({ eventResponse, companyResponse });
  } catch (e) {
    next();
  }
});

// update company
router.put("/updatecompany/:id", async (req, res) => {
  const { id } = req.params;
  const { name, status, _event } = req.body;
  const company = await companySchema.findById({ _id: id });
  const eventResponse = await companySchema.findByIdAndUpdate(
    { _id: id },
    { $set: { name, status, _event } },
    { new: true }
  );
  const updateResponse = await EventServices.updateCompanyFromEvent(
    id,
    company._event,
    _event
  );
  res.json(
    eventResponse,
    updateResponse["updateResponse"],
    updateResponse["pushResponse"]
  );
});

// Get Gompany
router.get("/company/:id", (req, res) => {
  const { id } = req.params;
  companySchema
    .findById({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
