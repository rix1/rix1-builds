import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { isHotkeyPressed } from 'react-hotkeys-hook';
import { useShowHelpText } from '../context/HelpTextProvider';

type HotkeyTooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
} & TooltipPrimitive.TooltipContentProps;

function HotkeyTooltip({ children, content, ...props }: HotkeyTooltipProps) {
  const showHelpText = useShowHelpText();

  return (
    <TooltipPrimitive.Root open={showHelpText}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        side="top"
        align="center"
        {...props}
        className="flex rounded-md bg-slate-200 text-slate-600"
      >
        {content}
        <TooltipPrimitive.Arrow
          offset={100}
          width={11}
          height={5}
          className="fill-current text-slate-200"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
}

export default HotkeyTooltip;
