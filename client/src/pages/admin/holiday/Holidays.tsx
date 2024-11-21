import TableHolidays from "./components/TableHolidays";

const Holidays = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">Holidays</h1>
      <TableHolidays />
    </div>
  );
};

export default Holidays;
