import { message, Button, DatePicker } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoTrashOutline } from "react-icons/io5";
import dayjs, { Dayjs } from "dayjs";
import ModalDelete from "../../../../../components/ModalDelete";
import axiosInstance from "../../../../../axios/axiosInstance";
import { useParams, useSearchParams } from "react-router-dom";

interface IDataDeleteRequest extends IDataRequest {
  name: string;
}

const DetailRequest = () => {
  const [dataRequest, setDataRequest] = useState<IDataRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataDelete, setDataDelete] = useState<IDataDeleteRequest>(
    {} as IDataDeleteRequest
  );
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleModalDeleteRef = useRef<IHandleModal>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const month = searchParams.get("month") || new Date().getMonth() + 1;
      const year = searchParams.get("year") || new Date().getFullYear();
      const response = await axiosInstance.get("/request/user-admin", {
        params: { month, year, userId: id },
      });
      setDataRequest(response.data.requests);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        message.error(err.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [id, searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData, searchParams]);

  const handleDelete = (data: IDataRequest) => {
    setDataDelete({ ...data, name: data.title });
    handleModalDeleteRef.current?.openModal();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const handleMonthChange = (date: Dayjs | null) => {
    if (date) {
      searchParams.set("month", (date.month() + 1).toString());
      searchParams.set("year", date.year().toString());
      setSearchParams(searchParams);
    }
  };

  return (
    <div className=" bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <DatePicker
          size="large"
          picker="month"
          placeholder="Select Month"
          onChange={handleMonthChange}
          value={dayjs(
            `${searchParams.get("year") || new Date().getFullYear()}-${
              searchParams.get("month") || new Date().getMonth() + 1
            }`
          )}
          className="w-full"
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center text-lg font-medium text-gray-600">
          Loading...
        </div>
      ) : dataRequest.length > 0 ? (
        <div className="space-y-3">
          {dataRequest.map((request) => (
            <div
              key={request._id}
              className={`flex flex-col md:flex-row items-start md:items-center gap-4 p-3 rounded-lg shadow-md border ${getStatusColor(
                request.status
              )}`}
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {request.title}
                </h3>
                <div className="flex justify-between mt-2 pr-10">
                  <div>
                    <p className="text-sm text-gray-600">
                      {request.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="text-gray-700 font-medium">Date:</span>{" "}
                      {new Date(request.date).toLocaleDateString()}
                    </p>
                  </div>
                  {request.title === "Attendance Change" && (
                    <div>
                      <p className="text-sm text-gray-700 font-medium">
                        Check-in:{" "}
                        <span className="font-normal">
                          {request.check_in || "Not provided"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-700 font-medium mt-1">
                        Check-out:{" "}
                        <span className="font-normal">
                          {request.check_out || "Not provided"}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mr-2">
                <Button
                  type="text"
                  icon={<IoTrashOutline size={22} />}
                  className="text-red-600 hover:!text-red-400"
                  onClick={() => handleDelete(request)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center text-gray-500 font-medium">
          No requests found.
        </div>
      )}
      <ModalDelete
        nameItem="request"
        ref={handleModalDeleteRef}
        data={dataDelete}
        fetchData={fetchData}
      />
    </div>
  );
};

export default DetailRequest;
