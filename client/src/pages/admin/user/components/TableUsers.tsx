import { Button } from "antd";
import { IoCreateOutline, IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosInstance from "../../../../axios/axiosInstance";
import ModalDelete from "../../../../components/ModalDelete";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../../../components/Pagination";
import { LIMIT } from "../../../../globalVariable";

const TableUsers = () => {
  const [data, setData] = useState<IDataUser[]>([]);
  const [dataDelete, setDataDelete] = useState<IDataUser>({
    _id: "",
    name: "",
    username: "",
    phone: "",
    national_id: "",
    role: "",
    base_salary: "",
    hire_date: new Date(),
    gender: "",
    isAdmin: false,
    image: "",
    off_date: null,
    address: "",
    status: "",
    birth_date: null,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const name = searchParams.get("name");
      const page = searchParams.get("page")
        ? parseInt(searchParams.get("page")!)
        : 1;
      const response = await axiosInstance.get("/user/all", {
        params: { name, page, limit: LIMIT },
      });
      setData(response.data.data);
      setTotalCount(response.data.totalCount);
    } catch (e) {
      console.error(e);
      navigate("/login");
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleModalDeleteRef = useRef<IHandleModal>(null);

  const handleDelete = (data: IDataUser) => {
    setDataDelete(data);
    handleModalDeleteRef.current?.openModal();
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-200 text-green-600";
      case "Pending":
        return "bg-yellow-200 text-yellow-600";
      case "Resigned":
        return "bg-red-200 text-red-600";
      case "Leave":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th>Image</th>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Admin</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className="border-b border-gray-300" key={index}>
              <td>
                <img
                  className="w-9 h-9 rounded-full object-cover"
                  src={item.image || ""}
                  alt=""
                />
              </td>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.phone}</td>
              <td>{item.role}</td>
              <td>
                <span
                  className={
                    item.isAdmin
                      ? "text-green-500 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
                  {item.isAdmin ? "Yes" : "No"}
                </span>
              </td>
              <td>
                <span
                  className={`px-4 py-1 rounded-lg ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td>
              <td>
                <Button
                  onClick={() =>
                    navigate(`/admin/users/detail/${item._id}/profile`)
                  }
                  className="border-none"
                  icon={<IoEyeOutline size={20} />}
                />
                <Button
                  className="border-none"
                  icon={<IoCreateOutline size={20} />}
                  onClick={() => navigate(`/admin/users/edit/${item._id}`)}
                />
                <Button
                  onClick={() => handleDelete(item)}
                  className="border-none"
                  icon={<IoTrashOutline size={20} />}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalCount={totalCount} />
      <ModalDelete
        ref={handleModalDeleteRef}
        data={dataDelete}
        fetchData={fetchUsers}
      />
    </div>
  );
};

export default TableUsers;
