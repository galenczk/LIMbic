import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import TrashTable from "../../components/thingsUnseen/TrashTable";

function DelProjectsTable({ data, columns, restoreItem }) {
  return <TrashTable data={data} columns={columns} type={1} restoreItem={restoreItem} />;
}

function DelClientsTable({ data, columns, restoreItem }) {
  return <TrashTable data={data} columns={columns} type={2} restoreItem={restoreItem} />;
}

function DelTechsTables({ data, columns, restoreItem }) {
  return <TrashTable data={data} columns={columns} type={3} restoreItem={restoreItem} />;
}

function TabNavigation() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const [clientData, setClientData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [techData, setTechData] = useState([]);
  const [clientColumns, setClientColumns] = useState([]);
  const [projectColumns, setProjectColumns] = useState([]);
  const [techColumns, setTechColumns] = useState([]);

  async function loadDeletedClients() {
    const response = await axios.get(`http://localhost:3030/delClients`);
    const clients = response.data;
    if (clients[0]) {
      setClientColumns(Object.keys(clients[0]));
    }
    setClientData(clients);
  }

  async function loadDeletedProjects() {
    const response = await axios.get(`http://localhost:3030/delProjects`);
    const projects = response.data;
    if (projects[0]) {
      setProjectColumns(Object.keys(projects[0]));
    }
    setProjectData(projects);
  }

  async function loadDeletedTechs() {
    const response = await axios.get(`http://localhost:3030/delTechs`);
    const techs = response.data;
    if (techs[0]) {
      setTechColumns(Object.keys(techs[0]));
    }
    setTechData(techs);
  }

  async function restoreItem(id, type) {
    const response = await axios.post(`http://localhost:3030/restore`, { id, type });
    if (response.status === 200) {
      type === 1
        ? setProjectData((prevData) => prevData.filter((project) => project.id_project !== id))
        : type === 2
        ? setClientData((prevData) => prevData.filter((client) => client.id_client !== id))
        : setTechData((prevData) => prevData.filter((tech) => tech.id_tech !== id));
    }
  }

  useEffect(() => {
    loadDeletedClients();
    loadDeletedProjects();
    loadDeletedTechs();
  }, []);

  return (
    <div>
      <div className="flex ">
        <button
          className={activeTab === 1 ? "btn btn-red flex-grow w-1/3" : "btn flex-grow "}
          onClick={() => handleTabClick(1)}
        >
          Projects
        </button>
        <button
          className={activeTab === 2 ? "btn btn-red flex-grow w-1/3" : "btn flex-grow "}
          onClick={() => handleTabClick(2)}
        >
          Clients
        </button>
        <button
          className={activeTab === 3 ? "btn btn-red flex-grow w-1/3" : "btn flex-grow "}
          onClick={() => handleTabClick(3)}
        >
          Technicians
        </button>
      </div>
      {activeTab === 1 && <DelProjectsTable data={projectData} columns={projectColumns} restoreItem={restoreItem} />}
      {activeTab === 2 && <DelClientsTable data={clientData} columns={clientColumns} restoreItem={restoreItem} />}
      {activeTab === 3 && <DelTechsTables data={techData} columns={techColumns} restoreItem={restoreItem} />}
    </div>
  );
}

export default function TrashPage() {
  return (
    <div>
      <h1>Deleted Items</h1>
      <TabNavigation />
    </div>
  );
}
