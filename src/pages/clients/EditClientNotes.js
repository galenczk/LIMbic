// Import dependencies
import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

export default function EditClientNotes() {
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
      <div>
        <h1 className="text-2xl p-6 text-center"> Edit Client Notes</h1>
        <div className="flex justify-between mx-8 mb-12">
          <div>
            <h2>{client.client_name}</h2>
            <h2>{client.client_address}</h2>
          </div>
          <div>
            <h2>{client.client_phone}</h2>
            <h2>{client.client_email}</h2>
          </div>
          <div>
            <h2>{client.client_type}</h2>
          </div>
        </div>
      </div>

      <div className="flex mx-8">
        <div className="flex-1 bg-slate-200 p-4">
          <h2 className="mb-4 text-center">Existing Client Notes</h2>
          {client.client_notes}
        </div>
        <div className="w-16"/>
        <div className="flex-1">
          <Formik
            enableReinitialize={true}
            initialValues={{
              id_client: client.id_client,
              client_notes: client.client_notes,
            }}
            onSubmit={async (values) => {
              const response = await axios.post("http://localhost:3030/clients/update-notes", values);
              if (response.status === 200) {
                navigate(`/clients/${id_client}`);
              }
            }}
          >
            <Form className="flex flex-col">
              <Field type="text" id="client_notes" name="client_notes" as="textarea" className="h-72 overflow-y-scroll " />

              <div className="flex justify-between mt-6">
                <button className="btn " type="reset">
                  Reset
                </button>
                <button className="btn " type="submit">
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
