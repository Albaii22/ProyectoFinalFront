import React from "react";

type RenderCardListContextType = {
  isListRendered: boolean;
  toggleIsListRendered: Function;
  userName: string;
  setUserName: Function;
};

const RenderCardListContext = React.createContext(
  {} as RenderCardListContextType
);

export { RenderCardListContext, RenderCardListContextType };
