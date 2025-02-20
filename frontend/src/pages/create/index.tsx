// import Snackbar from "@/components/Snackbar";
import { useRequests } from "@/hooks/useRequests";
import { RequestObjectPayload } from "@/types/request";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const urgencyOpts = [
  {
    value: "NONE_URGENT",
    label: "Non Urgent",
  },
  {
    value: "LESS_URGENT",
    label: "Less Urgent",
  },
  {
    value: "URGENT",
    label: "Urgent",
  },
  {
    value: "EMERGENCY",
    label: "Emergency",
  },
];

const statusOpts = [
  {
    value: "OPEN",
    label: "Open",
  },
  {
    value: "RESOLVED",
    label: "Resolved",
  },
];

const CreateRequest = () => {
  const { handleCreate } = useRequests();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<RequestObjectPayload>();


  const onSubmit = async (data: RequestObjectPayload) => {
    const payload = {
      title: data.title,
      status: data.status || "OPEN",
      urgency: data.urgency,
      description: data.description,
    };

    try {
      await handleCreate(payload);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("Error creating request. please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full lg:w-[46dvw] px-[37.5px] pt-[25px] font-inter"
    >
      <div className="space-y-[25px]">
        <div className="space-y-2">
          <label className="block text-sm font-normal text-[#A1AFC3]">
            Urgency *
          </label>
          <Controller
            name="urgency"
            control={control}
            rules={{ required: "Urgency is required" }}
            render={({ field: { onChange, value } }) => (
              <Select
                className="w-full rounded-md text-sm font-normal text-[#0a0a0a] shadow-lg"
                options={urgencyOpts}
                value={urgencyOpts.find((urgency) => urgency.value === value)}
                onChange={(option) => onChange(option?.value)}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: 12,
                    border: 0,
                    color:'black',
                    ":focus": {
                      border: 0,
                      outline: 0,
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);",
                    },
                  }),
                  input: (base) => ({
                    ...base,
                    padding: "14px 16px",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    color: "#0a0a0a",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    color: "#0a0a0a",
                  }),
                  option: (base) => ({
                    ...base,
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    color: "#0a0a0a",
                  }),
                }}
              />
            )}
          />
          {errors.urgency && (
            <p className="text-red-500 text-sm">{errors.urgency.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-normal text-[#a1afc3]">
            Status
          </label>
          <Controller
            name="status"
            control={control}
            // rules={{ required: "Status is required" }}
            render={({ field: { onChange, value } }) => (
              <Select
                className="w-full rounded-md text-sm font-normal text-[#0a0a0a] shadow-lg"
                options={statusOpts}
                value={statusOpts.find((status) => status.value === value)}
                onChange={(option) => onChange(option?.value)}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: 12,
                    border: 0,
                    ":focus": {
                      border: 0,
                      outline: 0,
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);",
                    },
                  }),
                  input: (base) => ({
                    ...base,
                    padding: "14px 16px",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    color: "#0a0a0a",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    color: "#0a0a0a",
                  }),
                  option: (base) => ({
                    ...base,
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    color: "#0a0a0a",
                  }),
                }}
              />
            )}
          />
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-normal text-[#a1afc3]">
            Title *
          </label>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
            className="w-full py-[14px] px-4 rounded-xl text-sm font-normal sdt-text-strong-black shadow-lg "
          />
          {errors.title && (  
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-normal text-[#A1AFC3]">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full min-h-[11.75rem] py-[14px] px-4 rounded-xl text-sm font-normal text-sdt-text-black shadow-lg"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className="w-full bg-sdt-primary text-white px-6 py-3 rounded-lg mt-[3.375rem] disabled:opacity-50"
      >
        Save
      </button>
    </form>
  );
};

export default CreateRequest;
