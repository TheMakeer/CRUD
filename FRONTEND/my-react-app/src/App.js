import { Routes, Route } from "react-router-dom";
import { Provider } from "./context/eventsContext.js";
import { Toaster } from "react-hot-toast";
import {
  EventsPage,
  EventsForm,
  ParticipantsPage,
  ParticipantsForm,
  CompanyForm,
  CompanyPage,
} from "./pages";

function App() {
  return (
    <div className="bg-neutral-900 min-h-screen flex items-center">
      <div className="px-10 container m-auto">
        <Provider>
          <Routes>
            <Route path="/events/" element={<EventsPage />} />
            <Route path="/events/new" element={<EventsForm />} />
            <Route path="/events/:id" element={<EventsForm />} />
            <Route path="/participants/" element={<ParticipantsPage />} />
            <Route path="/participants/new" element={<ParticipantsForm />} />
            <Route path="/participants/:id" element={<ParticipantsForm />} />
            <Route path="/company/" element={<CompanyPage />} />
            <Route path="/companies/new" element={<CompanyForm />} />
            <Route path="/companies/:id" element={<CompanyForm />} />
          </Routes>
          <Toaster />
        </Provider>
      </div>
    </div>
  );
}

export default App;
