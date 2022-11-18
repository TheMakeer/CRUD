const express = require("express");
const eventSchema = require("../models/event");
const companySchema = require("../models/company")
const router = express.Router();

router.post("/createevent", (req, res) => {
  const event = eventSchema(req.body);
  event
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

router.get("/events", (req, res) => {
  eventSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

router.put("/deleteevent/:id", async (req, res) => {
  const { id } = req.params;
  await companySchema.updateMany({"_event": id},{update:true}, {"_event": ""})
  .then((data)=>(res.json(data)))
  .catch((e) => (res.status(500).json({message: e.message})))
  // eventSchema
    // .remove({ _id: id })
    // .then((data) => res.json(data))
    // .catch((error) => res.status(500).json({ message: error.message }));
});

router.put("/updateevent/:id", (req, res) => {
  const { id } = req.params;
  const { name, place, date_start, date_end, status } = req.body;
  eventSchema
    .findByIdAndUpdate(
      { _id: id },
      { $set: { name, place, date_start, date_end, status } },
      { new: true }
    )
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

router.get("/event/:id", (req, res) => {
  const { id } = req.params;
  eventSchema
    .findById({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});



module.exports = router;
