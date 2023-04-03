import React from "react";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { useNavigate } from "react-router-dom";

import { CustomButtonStyle } from "pages/component/button/customButton";
import { CusButtonProps } from "../interface/button";

export const CustomButton: React.FC<CusButtonProps> = ({ url, value }) => {
  const navigate = useNavigate();

  const handleClickAdd = () => {
    navigate(url);
  };

  return (
    <>
      <CustomButtonStyle
        onClick={handleClickAdd}
        variant="contained"
        // backgroundColor="#2ECC71"
        startIcon={<AddToPhotosIcon />}
      >
        {value}
      </CustomButtonStyle>
    </>
  );
};
