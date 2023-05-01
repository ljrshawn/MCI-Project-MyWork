import { GetListResponse, BaseRecord } from "@pankod/refine-core";

export interface newRecordsForm {
  start: Dayjs;
  end: Dayjs;
  hour: string;
  task: string;
  handleStartTime: (file) => void;
  startMaxTime: () => void;
  handleEndTime: (file) => void;
  handleHourTime: () => void;
  handleEvidenceChange: (file) => void;
  handleTask: (file) => void;
  register: any;
  errors: any;
  formLoading: boolean;
  handleSubmit: any;
  onFinishHandler: (data: FieldValues) => Promise<void> | void;
  evidenceImg: { name: string; url: string };
}

export interface personalRecordsProps {
  resource: string;
  title?: string;
  handleClickOpen?: (event: any, elements: any, chart: any) => void;
}

export interface openDialogProps {
  open: boolean;
  handleClickOpen?: (event: any, elements: any, chart: any) => void;
  handleClose?: () => void;
  id?: string;
  name?: string;
}

export interface openShowAddDialogProps {
  oriData: any;
  handleData: (value: any) => void;
  handleClose: () => void;
}
