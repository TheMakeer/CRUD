import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMyContext } from "../context/eventsContext";
import  Select  from "react-select";

export function ParticipantsForm() {
  const { createParticipant, getParticipant, updateParticipant } =
    useMyContext();
  const navigate = useNavigate();
  const params = useParams();

  const [participant, setParticipant] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    _company:""
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const data = await getParticipant(params.id);
        console.log(data);
        setParticipant(data);
      }
    })();
  }, [getParticipant, params.id]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className=" flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">New participant</h3>
          <Link
            to="/participants/"
            className="text-gray-400 text-sm hover:text-gray-300"
          >
            Go Back
          </Link>
        </header>

        <Formik
          initialValues={participant}
          enableReinitialize
          validationSchema={Yup.object({
            first_name: Yup.string().required("First name is required"),
            last_name: Yup.string().required("Last name is required"),
            email: Yup.string()
              .email("Invalid email format")
              .required("Email is required"),
            phone: "",
            password: "",
            _company:""
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updateParticipant(params.id, values);
            } else {
              await createParticipant(values);
            }

            navigate("/participants");
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="first_name"
                className="text-sm block font-bold text-gray-400 "
              >
                First Name
              </label>
              <Field
                name="first_name"
                placeholder="Name"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component="p"
                name="first_name"
                className="text-white text-sm"
              />
              <label
                htmlFor="last_name"
                className="text-sm block font-bold text-gray-400 "
              >
                Last Name
              </label>
              <Field
                name="last_name"
                placeholder="Last Name"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component="p"
                name="last_name"
                className="text-white text-sm"
              />
              <label
                htmlFor="email"
                className="text-sm block font-bold text-gray-400 "
              >
                Email
              </label>
              <Field
                name="email"
                placeholder="Email"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                type="email"
              ></Field>
              <ErrorMessage
                component="p"
                name="email"
                className="text-white text-sm"
              />
              <label
                htmlFor="phone"
                className="text-sm block font-bold text-gray-400 "
              >
                Phone
              </label>
              <Field
                name="phone"
                placeholder="Phone"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                type="tel"
              ></Field>
              <ErrorMessage
                component="p"
                name="phone"
                className="text-white text-sm"
              />
              <label
                htmlFor="password"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                onChange={(e) => setFieldValue("password", e.target.value)}
              />
              <ErrorMessage
                component="p"
                name="password"
                className="text-red-400 text-sm"
              />
              <label
                htmlFor="companies"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                This participant belongs to the company
              </label>
              <Select
                options
              />
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-400 p-2 rounded-sm mt-2 focus:outline-none"
                >
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
