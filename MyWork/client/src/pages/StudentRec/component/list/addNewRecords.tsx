import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "@pankod/refine-react-hook-form";
import { FieldValues } from "react-hook-form";

import AddNewRecordsForm from "./addNewRecordsForm";
import { openShowAddDialogProps } from "pages/component/interface/form";

export default function AddNewRecords({
  oriData,
  handleData,
  handleClose,
}: openShowAddDialogProps) {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    refineCoreProps: {
      resource: "records",
      onMutationSuccess: (data, variables, context) => {
        if (data !== undefined) {
          handleData(data);
          handleClose();
        }
      },
    },
  });

  const [start, setStart] = React.useState<Dayjs | null>(
    dayjs(oriData?.startDate)
  );

  const [end, setEnd] = React.useState<Dayjs | null>(dayjs(oriData?.endDate));
  const [hour, setHour] = React.useState(
    String(((end?.diff(start, "minute") ?? 0) / 60).toFixed(2)) || "0"
  );
  const [task, setTask] = React.useState(oriData?.title || "");
  const [evidenceImg, setEvidenceImage] = React.useState(
    oriData?._reactName !== "onDoubleClick"
      ? oriData?.evidence[0]
      : {
          name: "",
          url: "",
        }
  );

  const handleStartTime = (newValue: any) => {
    setStart(newValue);
    setEnd(newValue);
  };

  const handleEndTime = (newValue: any) => {
    setEnd(newValue);
  };

  const handleHourTime = () => {
    const minutes = end?.diff(start, "minute") ?? 0;
    const hour = String((minutes / 60).toFixed(2));

    setHour(hour);
  };

  const handleTask = (newValue: any) => {
    setTask(newValue);
  };

  const startMaxTime = () => {
    if (!start?.isBefore(dayjs(dayjs().format().slice(0, 10)))) {
      return dayjs();
    }
  };

  const handleEvidenceChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) => {
      setEvidenceImage({ name: file?.name, url: result });
    });
  };

  const onFinishHandler = async (data: FieldValues) => {
    // const date = start
    await onFinish({
      year: `${start?.year()}`,
      month: `${start?.month()}`,
      date: `${start?.date()}`,
      day: `${start?.day()}`,
      fullDate: `${start?.format().slice(0, 10)}`,
      start: `${start?.format()}`,
      end: `${end?.format()}`,
      hour,
      task: `${data.task}`,
      evidence: {
        name: evidenceImg.name,
        url: evidenceImg.url,
      },
    });
    setStart(dayjs());
    setEnd(dayjs());
    setHour("0");
    setTask("");
    setEvidenceImage({ name: "", url: "" });
  };

  return (
    <AddNewRecordsForm
      start={start}
      end={end}
      hour={hour}
      task={task}
      handleStartTime={handleStartTime}
      startMaxTime={startMaxTime}
      handleEndTime={handleEndTime}
      handleHourTime={handleHourTime}
      handleEvidenceChange={handleEvidenceChange}
      handleTask={handleTask}
      register={register}
      errors={errors}
      handleSubmit={handleSubmit}
      formLoading={formLoading}
      onFinishHandler={onFinishHandler}
      evidenceImg={evidenceImg}
    />
  );
}
