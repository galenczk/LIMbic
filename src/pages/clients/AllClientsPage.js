import AllEntitiesPage from "../AllEntitiesPage";

const clientColumns = [
  {
    Header: "Client ID",
    accessor: "id_client",
  },
  {
    Header: "Name",
    accessor: "client_name",
  },
  {
    Header: "Address",
    accessor: "client_address",
  },
  {
    Header: "Phone",
    accessor: "client_phone",
  },
  {
    Header: "Email",
    accessor: "client_email",
  },
  {
    Header: "Type",
    accessor: "client_type",
  }
];
export default function AllProjectsPage() {
  return <AllEntitiesPage name={"clients"} url={"clients"} columns={clientColumns} />;
}
