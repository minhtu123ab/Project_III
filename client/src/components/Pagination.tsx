import { Pagination as AntPagination } from "antd";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../globalVariable";

const Pagination = ({ totalCount }: { totalCount: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="p-2">
      <AntPagination
        current={parseInt(searchParams.get("page") || "1")}
        total={totalCount}
        pageSize={LIMIT}
        align="center"
        onChange={(page) => {
          searchParams.set("page", page.toString());
          setSearchParams(searchParams);
        }}
      />
    </div>
  );
};

export default Pagination;
