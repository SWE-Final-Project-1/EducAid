import { Oval, RotatingLines } from "react-loader-spinner";

export const Loader = ({ width, height }) => {
  return (
    <>
      <Oval
        height={height}
        width={width}
        color="#7289DA"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#fff"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </>
    // <dialog id="my_modal_1" className="modal">
    //   {/* <div className="modal-box flex justify-center rounded-[0.4rem]  bg-app_white shadow-app_shadow"> */}
    //   <div className="flex flex-col items-center space-x-2">
    //     <RotatingLines width="40" strokeColor="grey" />
    //     <span className="">Hello world </span>
    //   </div>
    //   {/* <div className="modal-action">
    //       <form method="dialog">
    //         <button className="btn">Close</button>
    //       </form>
    //     </div> */}
    //   {/* </div> */}
    // </dialog>
  );
};
