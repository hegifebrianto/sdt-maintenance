import React from "react";

type Props = {
  title: string;
  value: number;
};

const StatsCard = ({ title, value }: Props) => {
  return (
    <div className="bg-white rounded-[10px] flex flex-col items-center justify-center py-4 px-[6px] h-[90px] max-w-[90px] text-center flex-1 shadow-lg">
      <h2 className="text-sdt-primary text-4xl py-1">{value}</h2>
      <p className="text-mini text-sdt-text-black">{title}</p>
    </div>
  );
};

export default StatsCard;
