// Import dependencies
import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

export default function EditClientPage() {
  const navigate = useNavigate();

  const { id_client } = useParams();

  const [client, setClient] = useState({});

  async function loadClient(id_client) {
    const response = await axios.get(`http://localhost:3030/clients/${id_client}`);
    const client = response.data[0];
    setClient(client);
  }

  useEffect(() => {
    loadClient(id_client);
  }, []);

  // DOM return
  return (
    <>
      <h1 className="text-3xl p-6 text-center"> Edit Client Details</h1>

      <div className="flex w-2/3 place-self-center">
        <div id="Existing Information" className="p-8 bg-gray-300 mx-auto w-1/2 flex flex-col">
          <h1 className="text-xl text-center">Current Information</h1>
          <div className="h-12" />
          <table className="text-left">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{client.client_name}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>Address</th>
                <td>{client.client_address}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{client.client_phone}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{client.client_email}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{client.client_type}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex-grow" />
          <div className="">
            <button
              className="btn btn-blue"
              type="reset"
              onClick={() => {
                navigate(`/clients/${client.id_client}`);
              }}
            >
              Back
            </button>
          </div>
        </div>
        <div id="edit tech form" className="p-8 bg-gray-300 mx-auto w-1/2">
          <Formik
            enableReinitialize={true}
            initialValues={{
              id_client: client.id_client,
              client_name: client.client_name,
              client_address: client.client_address,
              client_phone: client.client_phone,
              client_email: client.client_email,
              client_type: client.client_type,
            }}
            onSubmit={async (values) => {
              const response = await axios.post("http://localhost:3030/clients/update", values);
              if (response.status === 200) {
                navigate(`/clients/${id_client}`);
              }
            }}
          >
            <Form className="flex flex-col">
              <label for="client_name">Name</label>
              <Field type="text" id="client_name" name="client_name" />
              <label for="client_address">Address</label>
              <Field type="text" id="client_address" name="client_address" />
              <label for="client_phone">Phone</label>
              <Field type="text" id="client_phone" name="client_phone" />
              <label for="client_email">Email</label>
              <Field type="text" id="client_email" name="client_email" />
              <label for="client_type">Type</label>
              <Field type="text" id="client_type" name="client_type" />

              <div className="flex justify-between mt-6">
                <button className="btn-small btn-gray" type="reset">
                  Reset
                </button>
                <button className="btn btn-green" type="submit">
                  Update
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
