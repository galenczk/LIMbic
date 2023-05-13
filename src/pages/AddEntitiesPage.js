import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddEntityForm({ name, initialValues, onSubmit, fields }) {
  const navigate = useNavigate();


  async function createSamples(values) {
    const response = await axios.post("http://localhost:3030/samples", values);
    if (response.status === 201) {
      navigate(`/projects/edit-samples/${values.id_project}`);
      // Navigate to sample editing page.
    }
  }

  async function onAdd(values) {
    const response = await axios.post(`http://localhost:3030/${initialValues.entity}`, values);
    if (response.status === 201) {
      values.id_project = response.data[0].id_project;

      if (values.num_samples > 0) {
        createSamples(values);
      } else {
        navigate(`/projects/${values.id_project}`);
      }
    }
  }
 

  return (
    <>
      <h1 className="text-3xl p-6 text-center">New {name}</h1>

      <div className="p-8 bg-gray-300 mx-auto w-1/2">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => (onSubmit ? onSubmit(values) : onAdd(values))}
        >
          <Form className="flex flex-col">
            {fields.map((field) => (
              <React.Fragment key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                {field.type === "select" ? (
                  <Field as="select" id={field.id} name={field.name}>
                    <option value="">-</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                ) : (
                  <Field type={field.type} id={field.id} name={field.name} />
                )}
              </React.Fragment>
            ))}
            <div className="mt-4">
              <button className="btn btn-green" type="submit">
                {initialValues.buttonText || "Add Samples"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}
