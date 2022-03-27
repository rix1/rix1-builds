import FlowRoot from '../components/FlowRoot';

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  return (
    <div className="h-screen w-screen text-center">
      <h1 className="absolute top-1 left-2 z-10 bg-gradient-to-br from-yellow-400 to-red-400 bg-clip-text text-4xl font-black text-transparent ">
        FlowWriter
      </h1>
      <FlowRoot />
      <div id="editor-root" className="absolute z-10" />
    </div>
  );
};

export default HomePage;
