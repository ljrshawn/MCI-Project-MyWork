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
