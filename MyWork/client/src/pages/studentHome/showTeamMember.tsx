import * as React from "react";
import { Dialog, DialogActions, DialogContent } from "@mui/material";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import { openDialogProps } from "pages/component/interface/form";
import { CustomButtonStyle } from "pages/component/button/cusButtonStyle";
import { PerRecords } from "./personalRecord";
import { ShowEvidence } from "./showEvidence";

export const ShowTeamMember = ({
  open,
  handleClose,
  id,
  name,
}: openDialogProps) => {
  const [openPerEvidence, setOpenPerEvidence] = React.useState(false);

  const [perEvidenceId, setPerEvidenceId] = React.useState("");

  const handlePerEvidenceClickOpen = (
    event: any,
    elements: any,
    chart: any
  ) => {
    setPerEvidenceId(elements[0].element.$context.raw.id);

    setOpenPerEvidence(true);
  };

  const handlePerEvidenceClose = () => {
    setOpenPerEvidence(false);
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
            handleClickOpen={handlePerEvidenceClickOpen}
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
      <ShowEvidence
        open={openPerEvidence}
        handleClose={handlePerEvidenceClose}
        id={perEvidenceId}
      />
    </div>
  );
};
