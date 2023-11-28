export const Dialog = ({ heading,  content }) => {
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box  bg-white w-full max-w-2xl">
          <div className="text-center text-[18px] font-semibold">
            {heading}
          </div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="pt-5">{content}</div>
          {/* <button className="btn">Close</button> */}
        </div>
      </dialog>
    </>
  );
};
