import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-date-picker";
import * as Yup from "yup";
import { useMyContext } from "../context/eventsContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function EventsForm() {

  const { createEvent, getEvent, updateEvent } = useMyContext();
  const navigate = useNavigate();
  const params = useParams();

  const [event, setEvent] = useState({
    name: "",
    place: "",
    date_start: "",
    date_end: "",
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const data = await getEvent(params.id);
        console.log(data);
        setEvent(data);
      }
    })();
  }, [getEvent, params.id]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">

        <header className=" flex justify-between items-center py-4 text-white">
            <h3 className="text-xl">
                New Event
            </h3>
            <Link to="/events/" className="text-gray-400 text-sm hover:text-gray-300">Go Back</Link>
        </header>

      <Formik
        initialValues={event}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          place: Yup.string().required("Place is required"),
          date_start: Yup.date().required("Start date is required"),
          date_end: Yup.date().required("End date is required"),
        })}
        onSubmit={async (values, actions) => {

            if(params.id){
                await updateEvent(params.id, values)
            }else{
                await createEvent(values);                
            }


            navigate("/");
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="text-sm block font-bold text-gray-400 "
            >
              Name
            </label>
            <Field
              name="name"
              placeholder="Name"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
            />
            <ErrorMessage
              component="p"
              name="name"
              className="text-white text-sm"
            />
            <label
              htmlFor="place"
              className="text-sm block font-bold text-gray-400 "
            >
              Place
            </label>
            <Field
              name="place"
              placeholder="Place"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
            />
            <ErrorMessage
              component="p"
              name="place"
              className="text-white text-sm"
            />
            <label
              htmlFor="date_start"
              className="text-sm block font-bold text-gray-400 "
            >
              Start date
            </label>
            <div>
              <DatePicker
                name="date_start"
                fprmat="y-MM-dd"
                onChange={(date) => setFieldValue("date_start", date)}
                value={values.date_start}
              />
            </div>
            <ErrorMessage
              component="p"
              name="date_start"
              className="text-white text-sm"
            />
            <div>
              <label
                htmlFor="date_end"
                className="text-sm block font-bold text-gray-400 "
              >
                End date
              </label>
              <DatePicker
                name="date_end"
                fprmat="y-MM-dd"
                onChange={(date) => setFieldValue("date_end", date)}
                value={values.date_end}
              />
            </div>
            <ErrorMessage
              component="p"
              name="date_end"
              className="text-white text-sm"
            />
            <label
              htmlFor="place"
              className="text-sm block font-bold text-gray-400 "
            >
              Status
            </label>
            <Field
              name="status"
              placeholder="Status"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
            />
            <button type="submit" className="bg-gray-500 hover:bg-gray-400 p-2 rounded-sm mt-2 focus:outline-none">Create</button>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
}
