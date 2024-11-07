import { Button, Input } from "antd";
import { useState } from "react";
import { IoAddCircleOutline, IoSearchOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

const ActionUsers = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("name") || "");

  const handleClickCreate = () => {
    navigate("/admin/users/create");
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchParams.set("name", search);
    setSearchParams(searchParams);
    if (search === "") {
      searchParams.delete("name");
      setSearchParams(searchParams);
    }
  };
  return (
    <div className="flex justify-between">
      <form onSubmit={handleSearch}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="large"
          placeholder="Search"
          prefix={<IoSearchOutline size={20} />}
          className="w-72"
        />
      </form>
      <Button
        onClick={handleClickCreate}
        size="large"
        type="primary"
        icon={<IoAddCircleOutline size={20} />}
        className="bg-cyan-400 hover:!bg-cyan-500 text-white"
      >
        Add New Employee
      </Button>
    </div>
  );
};

export default ActionUsers;
