import axios from "axios";

export const getCompaniesRequests = async () =>
  await axios.get("/api/companies");

export const createCompanyRequests = async (participant) =>
  await axios.post("/api/createcompany", participant);

export const deleteCompanyRequests = async (id) =>
  await axios.delete("/api/deletecompany/" + id);

export const getCompanyRequests = async (id) =>
  await axios.get("/api/company/" + id);

export const updateCompanyRequests = async (id, newFields) =>
  await axios.put("/api/updatecompany/" + id, newFields);
