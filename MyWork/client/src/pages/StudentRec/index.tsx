import type { InferencerComponentProps } from "@pankod/refine-inferencer";
import { ResourceRouterParams, useRouterContext } from "@pankod/refine-core";
import { StuRecList, StuRecCreate, StuRecEdit } from "./component";

export const StudentRec: React.FC<InferencerComponentProps> = ({
  action: actionFromProps,
  id: idFromProps,
  ...props
}) => {
  const { useParams } = useRouterContext();
  const { action } = useParams<ResourceRouterParams>();

  switch (actionFromProps ?? action) {
    // case "show":
    //   return <ShowInferencer  />;
    case "create":
      return <StuRecCreate />;
    case "edit":
      return <StuRecEdit />;
    default:
      return <StuRecList />;
  }
};
