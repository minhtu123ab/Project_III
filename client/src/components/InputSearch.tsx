import { Input } from "antd";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const InputSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("name") || "");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchParams.set("name", search);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    if (search === "") {
      searchParams.delete("name");
      setSearchParams(searchParams);
    }
  };

  return (
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
  );
};

export default InputSearch;
