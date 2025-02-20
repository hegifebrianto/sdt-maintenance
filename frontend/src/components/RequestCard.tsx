import { RequestObject } from "@/types/request";
import { formatDate } from "@/utils/formatDate";
import React from "react";
import UrgencyBadge from "./UrgencyBadge";
import ResolveButton from "./ResolveButton";
import { useRequests } from "@/hooks/useRequests";

type Props = {
  request: RequestObject;
};

const RequestCard = ({ request }: Props) => {
  const { handleResolve } = useRequests();

  const onClick = async () => {
    try {
      await handleResolve(request.id);
    } catch (error) {
      console.log(error);
      alert("Error resolving request. please try again.");
    }
  };

  return (
    <div className="w-full bg-white rounded-xl flex flex-col justify-center p-4 gap-[10px] shadow-lg font-inter">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-sdt-text-black text-sm font-medium">
          {request.title}
        </h2>

        <p className="text-sdt-text-gray text-xs font-normal">
          {formatDate(new Date(parseInt(request.createdAt)))}
        </p>
      </div>

      <div className="w-full flex justify-between items-center">
        <UrgencyBadge value={request.urgency} />

        <ResolveButton
          label={request.status === "OPEN" ? "Mark as Resolved" : "Resolved"}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default RequestCard;
