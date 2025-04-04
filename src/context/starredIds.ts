import { createContext } from "react";

type ContextType = {
  starredIds: string[];
  setStarredIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export const StarredIdsContext = createContext<ContextType>({
  starredIds: [],
  setStarredIds: () => {},
});
