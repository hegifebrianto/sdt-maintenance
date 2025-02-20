import React from "react";

type Props = {
  message: string;
  show: boolean;
};

const Snackbar = ({ message, show }: Props) => {
  return (
    <div
      className={`absolute ${
        show ? "block" : "hidden"
      } bottom-8 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out w-[90dvw] max-w-sm h-[50px] bg-red-400 text-white rounded-md shadow-lg p-4 text-center z-50 text-sm`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
