import { DocumentTextIcon } from '@heroicons/react/outline';
import { useReactFlow } from 'react-flow-renderer';
import { useHotkeys } from 'react-hotkeys-hook';
import { useMouse } from 'rooks';
import { createNodesFromContent } from '../lib/createNodesFromContent';
import { useStore } from '../lib/store';
import { NodeType } from '../lib/types';
import HotkeyTooltip from './HotkeyTooltip';
import Kbd from './Kbd';

type CustomControlsProps = {};

const CustomControls = ({}: CustomControlsProps) => {
  const { x: mouseX, y: mouseY } = useMouse();
  const createNode = useStore((store) => store.addContent);

  const { addNodes } = useReactFlow();

  const addNewNode = () => {
    const newNode = createNode();
    addNodes(
      createNodesFromContent({ [newNode.id]: newNode }, NodeType.TextArea),
    );
  };

  useHotkeys('c', addNewNode, [mouseX, mouseY]);

  return (
    <HotkeyTooltip content={<Kbd>C</Kbd>} side="right" sideOffset={10}>
      <button
        className="flex h-[26px] w-[27px] items-center justify-center bg-white p-1 hover:bg-slate-100"
        onClick={addNewNode}
      >
        <DocumentTextIcon className="max-h-[18px] w-full max-w-[18px]" />
      </button>
    </HotkeyTooltip>
  );
};

export default CustomControls;
