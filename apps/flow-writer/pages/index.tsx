import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useHotkeys } from 'react-hotkeys-hook';
import FlowRoot from '../components/FlowRoot';
import { HelpTextProvider } from '../context/HelpTextProvider';

dayjs.extend(relativeTime);

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  return (
    <HelpTextProvider>
      <div className="h-screen w-screen">
        <h1 className="absolute top-1 left-2 z-10 bg-gradient-to-br from-yellow-400 to-red-400 bg-clip-text text-4xl font-black text-transparent ">
          FlowWriter
        </h1>
        <FlowRoot />
        <div id="editor-root" className="absolute z-10" />
      </div>
    </HelpTextProvider>
  );
};

export default HomePage;
