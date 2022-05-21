import NextLink from 'next/link';

type LinkProps = {
  children: React.ReactNode;
  href: string;
};

const Link = ({ children, href }: LinkProps) => {
  const isAbsolute = href.startsWith('http');
  if (isAbsolute) {
    return (
      <a
        href={href}
        target="_blank"
        className="bg-gradient-to-r from-[#EA5634] to-[#db2777] bg-clip-text text-transparent"
      >
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href}>
      <a className="bg-gradient-to-r from-[#EA5634] to-[#db2777] bg-clip-text text-transparent">
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
