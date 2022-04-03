type KbdProps = {
  children: React.ReactNode;
};

const Kbd = ({ children }: KbdProps) => {
  return (
    <kbd className="font-inter py-1 px-2 text-xs font-normal">{children}</kbd>
  );
};

export default Kbd;
