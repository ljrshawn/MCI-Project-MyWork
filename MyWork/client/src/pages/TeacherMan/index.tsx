import type { InferencerComponentProps } from "@pankod/refine-inferencer";
import { ResourceRouterParams, useRouterContext } from "@pankod/refine-core";
import { TecManList, TecManCreate, TecManEdit } from "./component";

export const TeacherMan: React.FC<InferencerComponentProps> = ({
  action: actionFromProps,
  id: idFromProps,
  ...props
}) => {
  const { useParams } = useRouterContext();
  const { action, id } = useParams<ResourceRouterParams>();

  switch (actionFromProps ?? action) {
    // case "show":
    //   return <ShowInferencer  />;
    case "create":
      return <TecManCreate />;
    case "edit":
      return <TecManEdit />;
    default:
      return <TecManList />;
  }
};
