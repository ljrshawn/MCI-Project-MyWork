import * as React from "react";
import { Dialog, DialogActions, DialogContent } from "@mui/material";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import { openDetailDialogProps } from "pages/component/interface/form";
import { CustomButtonStyle } from "pages/component/button/cusButtonStyle";
import { PerRecords } from "../../studentHome/personalRecord";

export const ShowTeam = ({
  detailOpen,
  handleDetailOpen,
  handleDetailClose,
  number,
}: openDetailDialogProps) => {
  return (
    <div>
      <Dialog
        open={detailOpen}
        onClose={handleDetailClose}
        maxWidth="lg"
        fullWidth={true}
      >
        <DialogContent
          sx={{
            bgcolor: "#F5F9FD",
          }}
        >
          <PerRecords
            resource={`stu_records/teamDetail/${number}`}
            title={`Team ${number}'s Workload`}
            // handleClickOpen={handlePerEvidenceClickOpen}
          />
        </DialogContent>

        <DialogActions
          sx={{
            bgcolor: "#F5F9FD",
            // justifyContent: "center",
          }}
        >
          <CustomButtonStyle
            onClick={handleDetailClose}
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
