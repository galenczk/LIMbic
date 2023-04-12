// Import dependencies
import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

export default function EditProjectPage() {
  const navigate = useNavigate();

  const { id_project } = useParams();

  const [project, setProject] = useState({});

  async function loadProject(id_project) {
    const response = await axios.get(`http://localhost:3030/projects/${id_project}`);
    const project = response.data[0];
    setProject(project);
  }

  useEffect(() => {
    loadProject(id_project);
  }, []);

  // DOM return
  return (
    <>
      <h1 class="text-3xl p-6 text-center"> Edit Project Details</h1>

      <div class="flex w-2/3 place-self-center">
        <div id="Existing Information" class="p-8 bg-gray-300 mx-auto w-1/2 flex flex-col">
          <h1 class="text-xl text-center">Current Information</h1>
          <div class="h-12" />
          <table class="text-left">
            <tbody>
              <tr>
                <th>Client</th>
                <div class="w-24" />
                <td>{project.id_client}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>Name</th>
                <div class="w-24" />
                <td>{project.project_name}</td>
              </tr>
              <tr>
                <th>Client's Project Number</th>
                <div class="w-24" />
                <td>{project.project_num_client}</td>
              </tr>
              <tr>
                <th>Number of Samples</th>
                <div class="w-24" />
                <td>{project.num_samples}</td>
              </tr>
              <tr>
                <th>Turn Around Time</th>
                <div class="w-24" />
                <td>{project.turn_around_time}</td>
              </tr>
              <tr>
                <th>Project Type</th>
                <div class="w-24" />
                <td>{project.project_type}</td>
              </tr>
            </tbody>
          </table>
          <div class="flex-grow" />
          <div class="">
            <button
              class="btn btn-blue"
              type="reset"
              onClick={() => {
                navigate(`/projects/${project.id_project}`);
              }}
            >
              Back
            </button>
          </div>
        </div>
        <div id="edit tech form" class="p-8 bg-gray-300 mx-auto w-1/2">
          <Formik
            enableReinitialize={true}
            initialValues={{
              id_project: project.id_project,
              id_client: project.id_client,
              project_name: project.project_name,
              project_num_client: project.project_num_client,
              num_samples: project.num_samples,
              turn_around_time: project.turn_around_time,
              project_type: project.project_type,
            }}
            onSubmit={async (values) => {
              const response = await axios.post("http://localhost:3030/projects/update", values);
              if (response.status === 200) {
                navigate(`/projects/${id_project}`);
              }
            }}
          >
            <Form class="flex flex-col">
              <label for="id_client">Client</label>
              <Field type="text" id="id_client" name="id_client" />
              <label for="project_name">Project Name</label>
              <Field type="text" id="project_name" name="project_name" />
              <label for="project_num_client">Client Project Number</label>
              <Field type="text" id="project_num_client" name="project_num_client" />
              <label for="num_samples">Number of Samples</label>
              <Field type="text" id="num_samples" name="num_samples" />
              <label for="turn_around_time">Turn Around Time</label>
              <Field type="text" id="turn_around_time" name="turn_around_time" />
              <label for="project_type">Project Type</label>
              <Field type="text" id="project_type" name="project_type" />

              <div class="flex justify-between mt-6">
                <button class="btn-small btn-gray" type="reset">
                  Reset
                </button>
                <button class="btn btn-green" type="submit">
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
