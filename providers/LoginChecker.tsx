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
  const [themeMode, setThemeMode] = React.useState(false);

  const toggleIsListRendered = (list: boolean) =>
    setIsListRendered(!isListRendered);

  const defaultValue: RenderCardListContextType = {
    isListRendered,
    toggleIsListRendered,
    userName,
    setUserName,
    themeMode,
    setThemeMode,
  };

  return (
    <RenderCardListContext.Provider value={defaultValue}>
      {children}
    </RenderCardListContext.Provider>
  );
};
