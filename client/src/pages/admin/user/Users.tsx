import TableUsers from "./components/TableUsers";
import ActionUsers from "./components/ActionUsers";

const Users = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">Employees</h1>
      <ActionUsers />
      <TableUsers />
    </div>
  );
};

export default Users;
