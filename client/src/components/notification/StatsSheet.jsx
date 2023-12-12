import { Link } from "react-router-dom";

export const StatsSheet = ({ stats }) => {
  return (
    <div className="w-full h-full space-y-5">
      <StatsItem title="Think Piece 5" value={89.567} />
      <StatsItem title="Literacy Test 1" value={84.5} />
      <StatsItem title="Numeracy Test 5" value={88.3} />
      <StatsItem title="Think Piece 5" value={75.0} />
      <StatsItem title="Advanced Numbering" value={84.5} />
      <StatsItem title="Phonix test 3" value={48.3} />
      <StatsItem title="Think Piece 5" value={35.0} />
    </div>
  );
};

export const StatsItem = ({ title, value }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col items-start justify-between">
        <Link
          to="/dashboard"
          className="text-[16px] opacity-70 w-full hover:underline"
        >
          {title}
        </Link>
        <span className="text-[12px]">{value}%</span>
      </div>
      {value >= 80 ? (
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      ) : value >= 60 ? (
        <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
      ) : (
        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
      )}
    </div>
  );
};
