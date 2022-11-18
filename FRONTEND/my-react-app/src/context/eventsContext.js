import { useState, createContext, useContext, useEffect } from "react";
import {
  getEventsRequests,
  createEventRequest,
  deleteEventRequest,
  getEventRequest,
  updateEventRequest,
} from "../api/events";
import {
  getParticipantsRequests,
  createParticipantRequest,
  deleteParticipantRequest,
  getParticipantRequest,
  updateParticipantRequest,
} from "../api/participants";
import {
  getCompaniesRequests,
  createCompanyRequests,
  deleteCompanyRequests,
  getCompanyRequests,
  updateCompanyRequests,
} from "../api/companies";

const Context = createContext();

export const useMyContext = () => {
  const context = useContext(Context);
  return context;
};

export const Provider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [companies, setCompanies] = useState([]);

  //Events Context funcTions
  const getEvents = async () => {
    const res = await getEventsRequests();
    setEvents(res.data);
  };

  const createEvent = async (event) => {
    const res = await createEventRequest(event);
    setEvents([...events, res.data]);
  };

  const deleteEvent = async (id) => {
    await deleteEventRequest(id);
    setEvents(events.filter((event) => event._id !== id));
  };

  const getEvent = async (id) => {
    const res = await getEventRequest(id);
    return res.data;
  };

  const updateEvent = async (id, event) => {
    const res = await updateEventRequest(id, event);
    setEvents(events.map((event) => (event._id === id ? res.data : event)));
  };

  //Participants Context functions
  const getParticipants = async () => {
    const res = await getParticipantsRequests();
    setParticipants(res.data);
  };

  const createParticipant = async (participant) => {
    const res = await createParticipantRequest(participant);
    setParticipants([...participants, res.data]);
  };

  const deleteParticipant = async (id) => {
    await deleteParticipantRequest(id);
    setParticipants(
      participants.filter((participant) => participant._id !== id)
    );
  };

  const getParticipant = async (id) => {
    const res = await getParticipantRequest(id);
    return res.data;
  };

  const updateParticipant = async (id, participant) => {
    const res = await updateParticipantRequest(id, participant);
    setParticipants(
      participants.map((participant) =>
        participant._id === id ? res.data : participant
      )
    );
  };

  // Company Context functions
  const getCompanies = async () => {
    const res = await getCompaniesRequests();
    setCompanies(res.data);
  };

  const createCompany = async (company) => {
    const res = await createCompanyRequests(company);
    setCompanies([...companies, res.data]);
  };

  const deleteCompany = async (id) => {
    await deleteCompanyRequests(id);
    setCompanies(companies.filter((company) => company._id !== id));
  };

  const getCompany = async (id) => {
    const res = await getCompanyRequests(id);
    return res.data;
  };

  const updateCompany = async (id, participant) => {
    const res = await updateCompanyRequests(id, participant);
    setCompanies(
      companies.map((company) => (company._id === id ? res.data : company))
    );
  };

  useEffect(() => {
    getEvents();
    getParticipants();
    getCompanies();
  }, []);

  return (
    <Context.Provider
      value={{
        events,
        getEvents,
        createEvent,
        deleteEvent,
        getEvent,
        updateEvent,
        participants,
        getParticipants,
        createParticipant,
        deleteParticipant,
        getParticipant,
        updateParticipant,
        companies,
        getCompanies,
        createCompany,
        deleteCompany,
        getCompany,
        updateCompany,
      }}
    >
      {children}
    </Context.Provider>
  );
};
