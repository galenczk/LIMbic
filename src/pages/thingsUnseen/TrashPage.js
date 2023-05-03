import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import TrashTable from "../../components/thingsUnseen/TrashTable";

function DelProjectsTable({ data, columns, restoreItem }) {
  return <TrashTable data={data} columns={columns} type={1} restoreItem={restoreItem} />
  
  //return columns.length ? (
  //  
  //) : (
  //  <div className="text-center mt-12">
  //    <p className="text-xl">There are no deleted projects at this time.</p>
  //  </div>
  //);
}

function DelClientsTable({ data, columns, restoreItem }) {
  return columns.length ? (
    <TrashTable data={data} columns={columns} type={2} restoreItem={restoreItem} />
  ) : (
    <div className="text-center mt-12">
      <p className="text-xl">There are no deleted clients at this time.</p>
    </div>
  );
}

function DelTechsTables({ data, columns, restoreItem }) {
  return columns.length ? (
    <TrashTable data={data} columns={columns} type={3} restoreItem={restoreItem} />
  ) : (
    <div className="text-center mt-12">
      <p className="text-xl">There are no deleted technicians at this time.</p>
    </div>
  );
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
      type === 1 ? (
        loadDeletedProjects()
      ) : type === 2 ? loadDeletedClients() : loadDeletedTechs();
      
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
      {activeTab === 1 &&
        (projectData.length ? (
          <DelProjectsTable data={projectData} columns={projectColumns} restoreItem={restoreItem} />
        ) : (
          <div className="text-center mt-12">
            <p className="text-xl">There are no deleted projects at this time.</p>
          </div>
        ))}
      {activeTab === 2 &&
        (clientData.length ? (
          <DelClientsTable data={clientData} columns={clientColumns} restoreItem={restoreItem} />
        ) : (
          <div className="text-center mt-12">
            <p className="text-xl">There are no deleted clients at this time.</p>
          </div>
        ))}
      {activeTab === 3 &&
        (techData.length ? (
          <DelTechsTables data={techData} columns={techColumns} restoreItem={restoreItem} />
        ) : (
          <div className="text-center mt-12">
            <p className="text-xl">There are no deleted technicians at this time.</p>
          </div>
        ))}
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
