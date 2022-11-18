const CompanyServices = require("../services/companyServices");
const express = require("express");
const participantSchema = require("../models/participant");
const router = express.Router();
const genericResponse = {
  data: {},
};

router.post("/createparticipant", async (req, res, next) => {
  try {
    const participant = await participantSchema(req.body);
    const savedParticipant = await participant.save();
    if (participant._company) {
      await CompanyServices.addParticipantToCompany(participant._company, savedParticipant);
    }
    const response = Object.assign({}, genericResponse, {
      data: { savedParticipant },
    });
    res.status(200).json(response).end();
  } catch (error) {
    next(error);
  }
});

router.get("/participants", (req, res) => {
  participantSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// delete company
router.delete("/deleteparticipant/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const participant = await participantSchema.findById({ _id: id });
    const companyResponse = await CompanyServices.removeParticipantFromCompany(
      id,
      participant._company
    );
    const participantResponse = await participantSchema.remove({ _id: id });
    res.json({ companyResponse, participantResponse });
  } catch (e) {
    next();
  }
});

// update company
router.put("/updateparticipant/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, password, _company } = req.body;
  const participant = await participantSchema.findById({ _id: id });
  const participantResponse = await participantSchema.findByIdAndUpdate(
    { _id: id },
    { $set: { first_name, last_name, email, phone, password, _company } },
    { new: true }
  );
  const updateResponse = await CompanyServices.updateParticipantFromCompany(
    id,
    participant._company,
    _company
  );
  res.json(
    participantResponse,
    updateResponse["updateResponse"],
    updateResponse["pushResponse"]
  );
});

router.get("/participant/:id", (req, res) => {
  const { id } = req.params;
  participantSchema
    .findById({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
