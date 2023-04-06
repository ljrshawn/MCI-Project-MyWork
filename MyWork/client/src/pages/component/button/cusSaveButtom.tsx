import React from "react";
import SaveIcon from "@mui/icons-material/Save";

import { CustomLoadingButtonStyle } from "pages/component/button/cusButtonStyle";
import { CusSaveButtonProps } from "../interface/cusSaveButtonProp";

export const CustomSaveButton: React.FC<CusSaveButtonProps> = ({
  value,
  type,
}) => {
  return (
    <CustomLoadingButtonStyle
      type={type === "submit" ? "submit" : "button"}
      variant="contained"
      startIcon={<SaveIcon />}
    >
      {value}
    </CustomLoadingButtonStyle>
  );
};
