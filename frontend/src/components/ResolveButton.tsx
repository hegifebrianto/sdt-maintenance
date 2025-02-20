import React from "react";

type Props = {
  label: string;
  onClick: () => void;
};

const ResolveButton = ({ label, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={label === "Resolved"}
      className="bg-sdt-primary disabled:bg-sdt-text-gray py-[3px] px-[8px] rounded-full text-white text-sm"
    >
      {label}
    </button>
  );
};

export default ResolveButton;
