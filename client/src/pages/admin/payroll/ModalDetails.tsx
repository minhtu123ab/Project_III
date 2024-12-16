import { Modal, Tabs } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

interface IPropModal {
  data: IDataPayroll;
}

const ModalDetails = forwardRef(
  ({ data }: IPropModal, ref: React.ForwardedRef<unknown>) => {
    const [visible, setVisible] = useState(false);

    const openModal = () => {
      setVisible(true);
    };
    const closeModal = () => {
      setVisible(false);
    };

    useImperativeHandle(ref, () => ({
      openModal,
      closeModal,
    }));

    const personalInfo = (
      <table className="w-full text-left border-collapse">
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-medium text-gray-600">User Name:</td>
            <td className="py-2">{data?.user_id?.name}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium text-gray-600">Month:</td>
            <td className="py-2">{data?.month}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium text-gray-600">Year:</td>
            <td className="py-2">{data?.year}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium text-gray-600">Salary:</td>
            <td className="py-2">
              {data?.salary?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </td>
          </tr>
        </tbody>
      </table>
    );

    const payrollDetails = (
      <table className="w-full text-left border-collapse">
        <tbody>
          {[
            { label: "Total Leave", value: `${data?.total_leaves} days` },
            { label: "Total Days Late", value: `${data?.total_late} days` },
            { label: "Total Absent", value: `${data?.total_absent} days` },
            {
              label: "Total Under Hours",
              value: `${data?.total_under_hours} hours`,
            },
            { label: "Total Present", value: `${data?.total_present} days` },
            { label: "Total Holidays", value: `${data?.total_holidays} days` },
            {
              label: "Total Business Trip",
              value: `${data?.total_business_trip} days`,
            },
            {
              label: "Total Salary",
              value: `${data?.total_salary?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}`,
            },
            { label: "Total Hours", value: `${data?.total_hours} hours` },
          ].map((item, index) => (
            <tr className="border-b" key={index}>
              <td className="py-2 font-medium text-gray-600">{item.label}:</td>
              <td className="py-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    const statusInfo = (
      <div>
        <div className="py-2 font-medium text-gray-600">Status:</div>
        <div
          className={`py-2 font-semibold ${
            data?.status === "Completed"
              ? "text-green-500"
              : data?.status === "Rejected"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {data?.status}
        </div>
      </div>
    );

    return (
      <Modal
        title={
          <span className="text-xl font-bold text-gray-700">
            Details Payroll: {data?.user_id?.name}
          </span>
        }
        open={visible}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
        className="custom-modal"
      >
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Personal Info",
              children: personalInfo,
            },
            {
              key: "2",
              label: "Payroll Details",
              children: payrollDetails,
            },
            {
              key: "3",
              label: "Status",
              children: statusInfo,
            },
          ]}
        />
      </Modal>
    );
  }
);

export default ModalDetails;
