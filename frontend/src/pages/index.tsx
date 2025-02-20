"use client";
import React, { useEffect, useState } from "react";
import StatsCard from "@/components/StatsCard";
import { useRequests } from "@/hooks/useRequests";
import { RequestObject } from "@/types/request";
import RequestCard from "@/components/RequestCard";
import Link from "next/link";

const RequestList = () => {
  const { data, loading, error } = useRequests();

  const [openRequest, setOpenRequest] = useState([]);
  const [urgentRequest, setUrgentRequest] = useState([]);
  const [averageTime, setAverageTime] = useState(0);

  useEffect(() => {
    if (data) {
      const open = data.filter(
        (request: RequestObject) => request.status === "OPEN"
      );
      setOpenRequest(open);
      const urgent = data.filter((request: RequestObject) =>
        ["URGENT", "EMERGENCY"].includes(request.urgency)
      );
      setUrgentRequest(urgent);
      const average = data.reduce(
        (acc: number, request: RequestObject) => acc + request.timeToResolve,
        0
      );
      setAverageTime(Math.round((average / data.length) * 10) / 10);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="w-full h-full lg:w-[46dvw] relative lg:flex lg:flex-col">
      <div className="w-full flex justify-center gap-5 px-4">
        <StatsCard title="Open Requests" value={openRequest.length} />
        <StatsCard title="Urgent Requests" value={urgentRequest.length} />
        <StatsCard title="Average time (days) to resolve" value={averageTime} />
      </div>

      <ul className="w-full flex flex-col justify-center items-center pt-5 gap-5">
        {data &&
          data.map((request: RequestObject) => {
            return (
              <li key={request.id} className="w-full px-4">
                <RequestCard request={request} />
              </li>
            );
          })}
      </ul>

      <Link
        href={"/create"}
        className="fixed lg:relative bottom-8 right-4 lg:bottom-0 lg:right-0 lg:ml-[42dvw] lg:mt-4 lg:pb-6"
      >
        <button className="rounded-full bg-sdt-primary w-[3rem] h-[3rem] flex justify-center items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 10H10M19 10H10M10 10V1M10 10V19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Link>
    </section>
  );
};

export default RequestList;
