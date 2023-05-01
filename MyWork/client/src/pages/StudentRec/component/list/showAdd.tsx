import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import {
  openDialogProps,
  openShowAddDialogProps,
} from "pages/component/interface/form";
import AddNewRecords from "./addNewRecords";

type Props = openDialogProps & openShowAddDialogProps;

export const ShowAdd = ({ open, handleClose, oriData, handleData }: Props) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogContent
          sx={{
            bgcolor: "#F5F9FD",
          }}
        >
          <AddNewRecords
            handleClose={handleClose}
            oriData={oriData}
            handleData={handleData}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
