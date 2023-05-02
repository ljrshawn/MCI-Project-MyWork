import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  ImageListItem,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useList } from "@pankod/refine-core";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import { openDialogProps } from "pages/component/interface/form";
import { CustomButtonStyle } from "pages/component/button/cusButtonStyle";

export const ShowEvidence = ({ open, handleClose, id }: openDialogProps) => {
  const { data, isLoading } = useList({
    resource: `records/img/${id}`,
    config: {
      hasPagination: false,
    },
  });

  const ShowImg = () => {
    if (open && data?.data[0] !== null) {
      let src;
      if (data?.data[0].evidence[0].name !== "") {
        src = data?.data[0].evidence[0].url;
      } else {
        src =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
      }

      return (
        <img
          src={src}
          alt={data?.data[0].fullDate}
          loading="lazy"
          style={{
            width: "50%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      );
    } else {
      return <CircularProgress color="inherit" />;
    }
  };

  return (
    <div>
      <Backdrop
        sx={{
          color: "#FCFCFC",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        onClick={handleClose}
      >
        {ShowImg()}
      </Backdrop>
      {/* <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
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
      </Dialog> */}
    </div>
  );
};
