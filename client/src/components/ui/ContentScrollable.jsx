export const ContentScrollable = ({ nav1, content }) => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center scroll">
        <div className="w-full flex items-center sticky top-0 justify-center">
          {nav1}
        </div>
        {/* <div className="w-full flex items-center justify-center py-4 px-10">
          {nav2}
        </div> */}
        <div  className="space-y-2 w-full h-[100vh] text-black">
          {content}
          {/* {content}
          {selectedContent === "all" && (
            <div>
              <ChapterContent chapterData={CourseData} /> <VideoContent />{" "}
              <SimulationContent />
            </div>
          )}
          {selectedContent === "chapter" && (
            <ChapterContent chapterData={CourseData} />
          )}
          {selectedContent === "video" && <VideoContent />}
          {selectedContent === "simulation" && <SimulationContent />} */}
        </div>
      </div>
    </>
  );
};
