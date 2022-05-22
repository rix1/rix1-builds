import { ArrowLeft } from '@geist-ui/icons';
import Link from 'next/link';

type BacklinkProps = {
  children: React.ReactNode;
  href: string;
};

const Backlink = ({ children, href }: BacklinkProps) => (
  <Link href={href}>
    <a className="inline-flex items-center justify-center py-3 pr-5 text-base font-bold text-[#EA5634]">
      <ArrowLeft className="mr-1" />
      <span className="bg-gradient-to-r from-[#EA5634] to-[#db2777] bg-clip-text text-transparent hover:from-[#db2777] hover:to-purple-500">
        {children}
      </span>
    </a>
  </Link>
);

export default Backlink;
