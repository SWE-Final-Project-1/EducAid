import { Link } from "react-router-dom";

export const StatsSheet = ({ stats }) => {
  return (
    <div className="w-full h-full space-y-5">
      <StatsItem title="Think Piece 5" value={"89.567"} />
      <StatsItem title="Think Piece 5" value={"84.5"} />
      <StatsItem title="Think Piece 5" value={"88.3"} />
      <StatsItem title="Think Piece 5" value={"85.0"} />
    </div>
  );
};

export const StatsItem = ({ title, value }) => {
  return (
    <div className="flex items-start justify-between">
      <Link to="/dashboard" className="text-[18px] font-logo w-full">
        {title}
      </Link>
      <span className="text-[20px]">{value}%</span>
    </div>
  );
};
