import NextLink from 'next/link';

type LinkProps = {
  children: React.ReactNode;
  href: string;
};

const Link = ({ children, href }: LinkProps) => {
  const classNames =
    'bg-gradient-to-r from-[#EA5634] to-[#db2777] bg-clip-text text-transparent hover:from-[#db2777] hover:to-purple-900';

  const isAbsolute = href.startsWith('http');
  if (isAbsolute) {
    return (
      <a href={href} target="_blank" className={classNames} rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href}>
      <a className={classNames}>{children}</a>
    </NextLink>
  );
};

export default Link;
