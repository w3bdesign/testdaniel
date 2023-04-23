import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

import { type FC } from "react";
import type { PaUsers } from "@prisma/client";

import { ENERGY } from "./constants/ENERGY";

import { api } from "@/utils/api";
import { IEnergy } from "./types/types";

interface PaPlayer extends PaUsers {
  [key: string]: any; // TODO Improve this later
}

interface BuildingRowProps {
  paPlayer: PaPlayer;
  energy: IEnergy;
}

interface IEnergyProps {
  paPlayer: PaPlayer;
}

const EnergyRow: FC<BuildingRowProps> = ({ paPlayer, energy }) => {
  const ctx = api.useContext();
  const { user, isLoaded } = useUser();

  const constructionToast = () => toast("Construction started");
  const errorToast = () => toast("Database error");

  const { isLoading } = api.paUsers.constructBuilding.useMutation({
    onSuccess: async () => {
      constructionToast();
      if (user && user.username) {
        await ctx.paUsers.getPlayerById.invalidate({ nick: user.username });
      }
    },
    onError: () => {
      errorToast();
    },
  });

  if (!isLoaded) {
    return <div>Loading user data...</div>;
  }

  return (
    <tr
      key={energy.buildingName}
      className="block border-b bg-white last:border-b-0 sm:table-row sm:border-none"
    >
      <td
        data-th="Name"
        className="flex h-12 items-center px-6 py-2 text-base text-black transition duration-300 before:inline-block before:w-24 before:font-medium before:text-black before:content-[attr(data-th)':'] first:border-l-0  sm:table-cell sm:border-l sm:border-t sm:before:content-none"
      >
        {energy.buildingName}
      </td>
      <td
        data-th="Info"
        className="flex h-12 items-center px-6 py-2 text-base text-black transition duration-300 before:inline-block before:w-24 before:font-medium before:text-black before:content-[attr(data-th)':'] first:border-l-0  sm:table-cell sm:border-l sm:border-t sm:before:content-none"
      >
        <span className="w-[12.5rem]">{energy.buildingDescription}</span>
      </td>

      <td
        data-th="Production"
        className="flex h-12 items-center px-6 py-2 text-base text-black transition duration-300 before:inline-block before:w-24 before:font-medium before:text-black before:content-[attr(data-th)':'] first:border-l-0  sm:table-cell sm:border-l sm:border-t sm:before:content-none"
      >
        {isLoading && "Starting construction ..."}
        {!isLoading && (
          <>
            <input
              type="text"
              aria-label="Amount"
              className="border-1 peer relative block min-h-[auto] w-32 rounded bg-slate-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput1"
              placeholder="Amount"
            />
          </>
        )}
      </td>
      <td
        data-th="Cost"
        className="flex h-12 items-center px-6 py-2 text-base text-black transition duration-300 before:inline-block before:w-24 before:font-medium before:text-black before:content-[attr(data-th)':'] first:border-l-0  sm:table-cell sm:border-l sm:border-t sm:before:content-none"
      >
        {energy.buildingCost}
      </td>
    </tr>
  );
};

const EnergyTable: FC<IEnergyProps> = ({ paPlayer }) => {
  return (
    <table className="w-full text-left ring-1 ring-slate-400/10">
      <tbody>
        <tr>
          <th
            scope="col"
            className="hidden h-12  bg-slate-200/90 px-6  text-base font-bold  text-black  first:border-l-0 sm:table-cell"
          >
            Name
          </th>
          <th
            scope="col"
            className="hidden h-12  bg-slate-200/90 px-6  text-base font-bold  text-black  first:border-l-0 sm:table-cell"
          >
            Description
          </th>
          <th
            scope="col"
            className="hidden h-12  bg-slate-200/90 px-6  text-base font-bold  text-black  first:border-l-0 sm:table-cell"
          >
            Amount
          </th>
          <th
            scope="col"
            className="hidden h-12  bg-slate-200/90 px-6  text-base font-bold  text-black  first:border-l-0 sm:table-cell"
          >
            Cost
          </th>
        </tr>
        {ENERGY.map((energy) => (
          <EnergyRow
            key={energy.buildingId}
            paPlayer={paPlayer}
            energy={energy}
          />
        ))}
      </tbody>
    </table>
  );
};

const Energy: FC<IEnergyProps> = ({ paPlayer }) => (
  <EnergyTable paPlayer={paPlayer} />
);

export default Energy;
