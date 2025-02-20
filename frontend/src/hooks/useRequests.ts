import { useQuery, useSubscription, useMutation } from "@apollo/client";
import {
  CREATE_REQUEST,
  GET_REQUESTS,
  REQUEST_UPDATED,
  RESOLVE_REQUEST,
} from "../services/graphql";
import { RequestObjectPayload } from "@/types/request";
// import { useState } from "react";

export function useRequests() {
  // const [mutationError, setMutationError] = useState();
  
  const { data, loading, error, refetch } = useQuery(GET_REQUESTS);

  useSubscription(REQUEST_UPDATED, {
    onData: ({ data }) => {
      console.log("Received update:", data.data.requestUpdated);
      refetch();
    },
  });

  const [resolveRequest] = useMutation(RESOLVE_REQUEST);

  const handleResolve = async (id: number) => {
    await resolveRequest({ variables: { id } });
  };

  const [createRequest] = useMutation(CREATE_REQUEST);

  const handleCreate = async (data: RequestObjectPayload) => {
    await createRequest({ variables: data });
  };

  return {
    data: data?.requests,
    loading,
    error,
    handleResolve,
    handleCreate,
  };
}
