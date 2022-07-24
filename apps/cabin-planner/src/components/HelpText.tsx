import clsx from 'clsx';

type HelpTextProps = {
  children: React.ReactNode;
  className?: string;
};

function HelpText({ children, className }: HelpTextProps) {
  return (
    <p className={clsx('mt-2 text-sm text-gray-500 w-full', className)}>
      {children}
    </p>
  );
}

export default HelpText;
