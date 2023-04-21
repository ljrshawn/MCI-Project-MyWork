import * as React from "react";
import { Dialog, DialogActions, DialogContent } from "@mui/material";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import { openDialogProps } from "pages/component/interface/form";
import { CustomButtonStyle } from "pages/component/button/cusButtonStyle";
import { PerRecords } from "./personalRecord";

export const ShowTeamMember = ({
  open,
  handleClose,
  id,
  name,
}: openDialogProps) => {
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
