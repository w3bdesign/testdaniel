import { useUser } from "@clerk/nextjs";

import { type NextPage } from "next";

import { api } from "@/utils/api";

import { Layout } from "@/components/common/Layout";
import { BUILDINGS } from "@/components/features/Research/constants/RESEARCH";
import {
  Button,
  AdvancedDataTable,
  ToastComponent,
} from "@/components/ui/common";

const ResearchPage: NextPage = () => {
  const ctx = api.useContext();
  const { user, isSignedIn } = useUser();

  if (!isSignedIn || !user.username) return null;

  const { data: paPlayer } = api.paUsers.getPlayerById.useQuery({
    nick: user.username,
  });

  const { mutate } = api.paUsers.researchBuilding.useMutation({
    onSuccess: async () => {
      ToastComponent({
        message: "Research started",
        type: "success",
      });
      await ctx.paUsers.getPlayerById.invalidate();
      await ctx.paUsers.getPlayerById.refetch();
    },
    onError: () => {
      ToastComponent({
        message: "Database error",
        type: "error",
      });
    },
  });

  if (!paPlayer) return null;

  const columns = [
    { label: "Name", accessor: "buildingName" },
    { label: "Description", accessor: "buildingDescription" },
    { label: "ETA", accessor: "buildingETA" },
    { label: "Cost", accessor: "buildingCost" },
    { label: "Action", accessor: <Button />, type: "button" },
  ];

  const caption = "Research";

  return (
    <>
      <Layout>
        <div className="container mb-6 flex flex-col items-center justify-center">
          <div className="relative flex flex-col justify-center overflow-hidden bg-neutral-900">
            <div className="relative sm:mx-auto">
              {paPlayer && (
                <AdvancedDataTable
                  columns={columns}
                  data={[paPlayer]}
                  caption={caption}
                  renderData={BUILDINGS}
                  action={mutate}
                  actionText="Research"
                  actionInProgress="Researching ..."
                />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ResearchPage;
