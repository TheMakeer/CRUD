const companySchema = require("../models/company");

exports.addParticipantToCompany = async (companyId, participant) => {
  try {
    const company = await companySchema.findById(companyId).exec();
    company.participant_id.push(participant);
    await company.save();
  } catch (e) {
    throw e;
  }
};

exports.removeParticipantFromCompany = async (participantId, companyId) => {
  try {
    const response = await companySchema.findByIdAndUpdate(
      companyId,
      { $pull: { "company_id": participantId } }
    );
    return response
  } catch (e) {
    throw e;
  }
};

exports.updateParticipantFromCompany = async (participantId, companyId, _company) => {
    try {
      const updateResponse = await companySchema.findByIdAndUpdate(
        companyId,
        { $pull: { "participant_id": participantId }}
      );
      const company = await companySchema.findById(_company).exec();
      company.participant_id.push(participantId);
      const pushResponse = await company.save();
      return [updateResponse, pushResponse]
    } catch (e) {
      throw e;
    }
  };
  