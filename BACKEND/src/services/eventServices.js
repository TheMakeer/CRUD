const eventSchema = require("../models/event");

exports.addCompanyToEvent = async (eventId, company) => {
  try {
    const event = await eventSchema.findById(eventId).exec();
    event.company_id.push(company);
    await event.save();
  } catch (e) {
    throw e;
  }
};

exports.removeCompanyFromEvent = async (companyId, eventId) => {
  try {
    const response = await eventSchema.findByIdAndUpdate(
      eventId,
      { $pull: { "company_id": companyId } }
    );
    return response
  } catch (e) {
    throw e;
  }
};

exports.updateCompanyFromEvent = async (companyId, eventId, _event) => {
    try {
      const updateResponse = await eventSchema.findByIdAndUpdate(
        eventId,
        { $pull: { "company_id": companyId }}
      );
      const event = await eventSchema.findById(_event).exec();
      event.company_id.push(companyId);
      const pushResponse = await event.save();
      return [updateResponse, pushResponse]
    } catch (e) {
      throw e;
    }
  };
  
