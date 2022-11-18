import axios from "axios";

export const getParticipantsRequests = async () => await axios.get("/api/participants");

export const createParticipantRequest = async (participant) =>
  await axios.post("/api/createparticipant", participant);

export const deleteParticipantRequest = async (id) =>
  await axios.delete("/api/deleteparticipant/" + id);

export const getParticipantRequest = async (id) =>
  await axios.get("/api/participant/" + id);

export const updateParticipantRequest = async (id, newFields) =>
  await axios.put("/api/updateparticipant/" + id, newFields);
