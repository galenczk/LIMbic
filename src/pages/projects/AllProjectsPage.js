import AllEntitiesPage from "../AllEntitiesPage";

const projectColumns = [
  {
    Header: "Project ID",
    accessor: "id_project",
  },
  {
    Header: "Client",
    accessor: "id_client",
  },
  {
    Header: "Client's Project No.",
    accessor: "project_num_client",
  },
  {
    Header: "Name",
    accessor: "project_name",
  },
  {
    Header: "No. Samples",
    accessor: "num_samples",
  },
  {
    Header: "TAT",
    accessor: "turn_around_time",
  },
  {
    Header: "Type",
    accessor: "project_type",
  },
  {
    Header: "Type",
    accessor: "project_type",
  },
  {},
];
export default function AllProjectsPage() {
  return (
    <div >
      <AllEntitiesPage name={"projects"} url={"projects"} columns={projectColumns} />
    </div>
  );
}
