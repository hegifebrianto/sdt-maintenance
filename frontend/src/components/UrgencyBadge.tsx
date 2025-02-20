import React from "react";

type Props = {
  value: string;
};

const UrgencyBadge = ({ value }: Props) => {
  switch (value) {
    case "LESS_URGENT":
      return (
        <p>
          🔨{" "}
          <span className="text-[#157AD8] text-sm font-light">Less Urgent</span>
        </p>
      );

    case "URGENT":
      return (
        <p>
          ⚡ <span className="text-[#E3903F] text-sm font-light">Urgent</span>
        </p>
      );

    case "EMERGENCY":
      return (
        <p>
          🔥{" "}
          <span className="text-[#D74B4B] text-sm font-light">Emergency</span>
        </p>
      );

    default:
      return (
        <p>
          🙂{" "}
          <span className="text-[#24BF5F] text-sm font-light">Non Urgent</span>
        </p>
      );
  }
};

export default UrgencyBadge;
