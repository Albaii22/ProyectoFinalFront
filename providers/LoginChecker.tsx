import React from "react";
import {
  RenderCardListContext,
  RenderCardListContextType,
} from "../contexts/LoginContext";

type LoginCheckerProps = {
  children: JSX.Element | JSX.Element[];
};

export const LoginChecker = (props: LoginCheckerProps) => {
  const { children } = props;

  const [isListRendered, setIsListRendered] = React.useState(false);
  const [userName, setUserName] = React.useState("");

  const toggleIsListRendered = (list: boolean) =>
    setIsListRendered(!isListRendered);

  const defaultValue: RenderCardListContextType = {
    isListRendered,
    toggleIsListRendered,
    userName,
    setUserName,
  };

  return (
    <RenderCardListContext.Provider value={defaultValue}>
      {children}
    </RenderCardListContext.Provider>
  );
};
