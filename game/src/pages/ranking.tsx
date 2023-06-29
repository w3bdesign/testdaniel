import { useUser } from "@clerk/nextjs";

import type { NextPage } from "next";

import { api } from "@/utils/api";

import { Layout } from "@/components/common/Layout";
import { AdvancedDataTable } from "@/components/ui";
import LoadingSpinner from "@/components/common/Loader/LoadingSpinner";

/**
 * Renders the Ranking page component, which displays the player ranking table.
 *
 * @return {JSX.Element} The RankingPage component to be rendered.
 */
const RankingPage: NextPage = () => {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn || !user.username) {
    return null;
  }

  const { data: paRanking, isLoading } = api.paUsers.getAll.useQuery();

  const { data: paPlayer } = api.paUsers.getPlayerByNick.useQuery({
    nick: user.username,
  });

  const columns = [
    { label: "Nick", accessor: "nick" },
    { label: "Score", accessor: "score" },
    { label: "Size", accessor: "size" },
    { label: "Rank", accessor: "rank" },
  ];

  const caption = `Player ranking`;

  if (!paRanking || !paPlayer) {
    return null;
  }

  return (
    <>
      <Layout paPlayer={paPlayer}>
        <div className="container mb-6 flex flex-col items-center justify-center">
          <div className="relative flex flex-col justify-center overflow-hidden bg-neutral-900">
            {isLoading && <LoadingSpinner />}
            {paPlayer && (
              <AdvancedDataTable
                columns={columns}
                data={paRanking}
                caption={caption}
              />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RankingPage;
