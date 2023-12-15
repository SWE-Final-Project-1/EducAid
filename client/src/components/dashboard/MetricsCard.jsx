export const MetricsCard = ({ color, icon, title, sub, value }) => {
  return (
    <div className="border cursor-pointer w-[350px] p-4 rounded-md shadow-app_shadow-light">
      <div className="flex flex-col items-start space-y-3">
        <div
          style={{ backgroundColor: color }}
          className={`w-12 h-12 space-y-3 opacity-60 border rounded-full flex items-center justify-center`}
        >
          {icon}
        </div>
        <div>
          <h1 className="text-[15px] font-logo opacity-80">{title}</h1>
          {/* <h1 className="text-[12px] opacity-70">{sub}</h1> */}
        </div>
        <div>
          <h1 className="text-[18px] font-medium">{value ? value : "-"} </h1>
          <span className="text-[12px]">{sub ? sub : "-"}%</span>
        </div>
      </div>
    </div>
  );
};
