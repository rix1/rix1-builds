type PagePatternProps = {
  children: React.ReactNode;
};

const PagePattern = ({ children }: PagePatternProps) => (
  <div
    style={{
      background: `linear-gradient(180deg,hsla(0,0%,100%,0) 0,#fff 300px),fixed 0 0 /20px 20px radial-gradient(#d1d1d1 1px,transparent 0),fixed 10px 10px /20px 20px radial-gradient(#d1d1d1 1px,transparent 0)`,
    }}
  >
    {children}
  </div>
);

export default PagePattern;
