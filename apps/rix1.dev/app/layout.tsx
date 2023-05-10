import { ReactNode } from 'react';
import '../styles/globals.css';

function RooyLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

export default RooyLayout;
