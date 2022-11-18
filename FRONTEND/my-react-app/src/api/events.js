import axios from "axios";

export const getEventsRequests = async () => await axios.get("/api/events");

export const createEventRequest = async (event) =>
  await axios.post("/api/createevent", event);

export const deleteEventRequest = async (id) =>
  await axios.delete("/api/event/" + id);

export const getEventRequest = async (id) =>
  await axios.get("/api/event/" + id);

export const updateEventRequest = async (id, newFields) =>
  await axios.put("/api/updateevent/" + id, newFields);
