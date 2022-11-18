import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { useMyContext } from "../context/eventsContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function CompanyForm() {

  const { createCompany, getCompany, updateCompany, events } = useMyContext();
  const navigate = useNavigate();
  const params = useParams();

  const [company, setCompany] = useState({
    name: "",
    status: "",
    _event: "",
  });

  const options = events.map(event => { return { value: event._id, label:event.name }})

  useEffect(() => {
    (async () => {      
      if (params.id) {
        const data = await getCompany(params.id);
        console.log(options)
        setCompany(data);
      }
    })();
  }, [getCompany, params.id]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">

        <header className=" flex justify-between items-center py-4 text-white">
            <h3 className="text-xl">
                New Company
            </h3>
            <Link to="/company/" className="text-gray-400 text-sm hover:text-gray-300">Go Back</Link>
        </header>

      <Formik
        initialValues={company}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          status: "",
          _event: "",
        })}
        onSubmit={async (values, actions) => {

            if(params.id){
                await updateCompany(params.id, values)
            }else{
                await createCompany(values);                
            }


            navigate("/company/");
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
              htmlFor="status"
              className="text-sm block font-bold text-gray-400 "
            >
              Status
            </label>
            <Field
              name="status"
              placeholder="Status"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
            />
            <ErrorMessage
              component="p"
              name="status"
              className="text-white text-sm"
            />
            <label htmlFor="_event">
              Select an Event
            </label>
            <Select
              inputId="_event"
              inputValueinputValue = {values._event}
              options = {options}
              onChange={(e) => setFieldValue('_name', e._event)}
            />
            <button type="submit" className="bg-gray-500 hover:bg-gray-400 p-2 rounded-sm mt-2 focus:outline-none">Create</button>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
}
