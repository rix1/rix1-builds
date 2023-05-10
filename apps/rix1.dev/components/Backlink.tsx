import { ArrowLeft } from '@geist-ui/icons';
import Link from 'next/link';

type BacklinkProps = {
  children: React.ReactNode;
  href: string;
};

const Backlink = ({ children, href }: BacklinkProps) => (
  <Link
    className="inline-flex items-center justify-center py-3 pr-5 text-base font-bold text-[#db2777]"
    href={href}
  >
    <ArrowLeft className="mr-1" />
    <span className="bg-gradient-to-r from-[#EA5634] to-[#db2777] bg-clip-text text-transparent hover:from-[#db2777] hover:to-[#553FA6]/90">
      {children}
    </span>
  </Link>
);

export default Backlink;
