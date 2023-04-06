import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "@pankod/refine-react-hook-form";
import { FieldValues } from "react-hook-form";

import AddNewRecordsForm from "./addNewRecordsForm";

export default function AddNewRecords() {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    refineCoreProps: {
      resource: "records",
    },
  });

  const [start, setStart] = React.useState<Dayjs | null>(dayjs());
  const [end, setEnd] = React.useState<Dayjs | null>(dayjs());
  const [hour, setHour] = React.useState("0");
  const [evidenceImg, setEvidenceImage] = React.useState({
    name: "",
    url: "",
  });

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
    await onFinish({
      start,
      end,
      hour,
      task: `${data.task}`,
      evidence: {
        name: evidenceImg.name,
        url: evidenceImg.url,
      },
    });
  };

  return (
    <AddNewRecordsForm
      start={start}
      end={end}
      hour={hour}
      handleStartTime={handleStartTime}
      startMaxTime={startMaxTime}
      handleEndTime={handleEndTime}
      handleHourTime={handleHourTime}
      handleEvidenceChange={handleEvidenceChange}
      register={register}
      errors={errors}
      handleSubmit={handleSubmit}
      formLoading={formLoading}
      onFinishHandler={onFinishHandler}
      evidenceImg={evidenceImg}
    />
  );
}
