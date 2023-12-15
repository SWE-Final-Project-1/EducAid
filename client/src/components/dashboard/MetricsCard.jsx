export const MetricsCard = ({ color, icon, title, sub, value }) => {
  return (
    <div className="border w-[350px] p-4 rounded-md shadow-app_shadow-light">
      <div className="flex flex-col items-start space-y-3">
        <div
          style={{backgroundColor: color}}
          className={`w-14 h-14 space-y-3 rounded-full flex items-center justify-center`}
        >
          {icon}
        </div>
        <div>
          <h1 className="text-[18px] font-logo opacity-80">{title}</h1>
          <h1 className="text-[12px] opacity-70">{sub}</h1>
        </div>
        <div>
          <h1 className="text-[18px] font-medium">{value}</h1>
          <span>+9%</span>
        </div>
      </div>
    </div>
  );
};
