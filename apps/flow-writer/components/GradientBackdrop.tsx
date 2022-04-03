import clsx from 'clsx';

type GradientBackdropProps = {
  active?: boolean;
};

const GradientBackdrop = ({ active = false }: GradientBackdropProps) => {
  return (
    <div
      className={clsx(
        'absolute -inset-1 -z-10 rounded-[10px] bg-gradient-to-br from-yellow-400 to-red-400 blur-sm',
        active ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-100',
      )}
    />
  );
};

export default GradientBackdrop;
