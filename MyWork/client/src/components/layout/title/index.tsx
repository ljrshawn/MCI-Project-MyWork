import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant='text' disableRipple>
      <Link to='/'>
        {collapsed ? (
          <img src='/mywork-logo.svg' alt='Refine' width='28px' />
        ) : (
          <img src='/mywork-logo.svg' alt='Refine' width='80px' />
        )}
      </Link>
    </Button>
  );
};
