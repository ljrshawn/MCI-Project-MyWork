import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  ImageListItem,
} from "@mui/material";
import { useList } from "@pankod/refine-core";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import { openDialogProps } from "pages/component/interface/form";
import { CustomButtonStyle } from "pages/component/button/cusButtonStyle";

export const ShowEvidence = ({ open, handleClose, id }: openDialogProps) => {
  const { data, isLoading } = useList({
    resource: `records/${id}`,
    config: {
      hasPagination: false,
    },
  });

  const ShowImg = () => {
    if (open && data?.data[0] !== null) {
      console.log(data);
      return data?.data.map((el) => {
        return (
          <ImageListItem key={el.fullDate}>
            <img src={el.evidence[0].url} alt={el.fullDate} loading="lazy" />
          </ImageListItem>
        );
      });
    } else {
      return (
        <img
          src="https://i.stack.imgur.com/kOnzy.gif"
          alt="loading"
          width={50}
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      );
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogContent
          sx={{
            bgcolor: "#F5F9FD",
          }}
        >
          {ShowImg()}
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: "#F5F9FD",
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
