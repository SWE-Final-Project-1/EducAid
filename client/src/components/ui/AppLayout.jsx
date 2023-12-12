export const AppLayout = ({ sideNav, mainArea }) => {
  return (
    <>
      <main className="w-screen h-screen bg-app_bg_deepest bg-white text-white text-app-white font-display overflow-y-hidden space-y-8">
        <div className="w-screen overflow-x-hidden flex items-start h-full">
          {sideNav}
          <div className="grid grid-cols-10 w-full h-screen text-black overflow-y-hidden">
            <div className="col-span-10">{mainArea}</div>
          </div>
        </div>
      </main>
    </>
  );
};
