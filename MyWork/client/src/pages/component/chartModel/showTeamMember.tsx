import * as React from "react";
import { Dialog, DialogActions, DialogContent } from "@mui/material";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import { openDialogProps } from "pages/component/interface/form";
import { CustomButtonStyle } from "pages/component/button/cusButtonStyle";
import { PerRecords } from "../../studentHome/personalRecord";
import ShowDateDetail from "./showDateDetail";

export const ShowTeamMember = ({
  open,
  handleClose,
  id,
  name,
}: openDialogProps) => {
  const [openDateDetail, setOpenDateDetail] = React.useState(false);

  const [dateDetailQuery, setDateDetailQuery] = React.useState<{
    userId: string;
    year: string;
    month: string;
    date: string;
  }>({ userId: "", year: "", month: "", date: "" });

  const handleDateDetailOpen = (event: any, elements: any, chart: any) => {
    setDateDetailQuery({
      userId: elements[0].element.$context.raw.userId,
      year: elements[0].element.$context.raw.year,
      month: elements[0].element.$context.raw.month,
      date: elements[0].element.$context.raw.date,
    });

    setOpenDateDetail(true);
  };

  const handleDateDetailClose = () => {
    setOpenDateDetail(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogContent
          sx={{
            bgcolor: "#F5F9FD",
          }}
        >
          <PerRecords
            resource={`stu_records/${id}`}
            title={`${name}'s Workload`}
            handleClickOpen={handleDateDetailOpen}
          />
          <ShowDateDetail
            open={openDateDetail}
            handleClose={handleDateDetailClose}
            query={dateDetailQuery}
          />
        </DialogContent>

        <DialogActions
          sx={{
            bgcolor: "#F5F9FD",
            // justifyContent: "center",
          }}
        >
          <CustomButtonStyle
            onClick={handleClose}
            variant="contained"
            startIcon={<CancelPresentationIcon />}
          >
            Close
          </CustomButtonStyle>
        </DialogActions>
      </Dialog>
    </div>
  );
};
