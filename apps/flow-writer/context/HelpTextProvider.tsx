import { createContext, useContext, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const HelpTextContext = createContext(false);

type HelpTextProviderProps = {
  children: React.ReactNode;
};

const HelpTextProvider = ({ children }: HelpTextProviderProps) => {
  const [showHelpText, setShowHelpText] = useState(false);

  useHotkeys('command+/', () => {
    setShowHelpText((prev) => !prev);
  });

  return (
    <HelpTextContext.Provider value={showHelpText}>
      {children}
    </HelpTextContext.Provider>
  );
};

function useShowHelpText() {
  const showHelpText = useContext(HelpTextContext);
  if (showHelpText === undefined) {
    throw new Error(
      'useShowHelpText used outside of a <HelpTextProvider> component',
    );
  }
  return showHelpText;
}

export { HelpTextProvider, useShowHelpText };
