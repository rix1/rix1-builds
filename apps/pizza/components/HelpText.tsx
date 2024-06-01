import { useEffect, useRef, useState } from "preact/hooks";
import { ComponentChild } from "preact";

const HelpText = (
  { children, label }: { children: ComponentChild; label: string },
) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Act on click outside the dialog element

    const handleClick = (e: Event) => {
      if (
        isOpen && dialogRef.current &&
        !dialogRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  return (
    <>
      <button class="help" type="button" onClick={() => setIsOpen(!isOpen)}>
        {label}
      </button>
      <dialog
        ref={dialogRef}
        open={isOpen}
        class="max-w-xs shadow-sm ring-2 ring-inset ring-[rgb(var(--gray))] rounded-md p-5 pb-3"
      >
        <p class="font-normal text-sm">{children}</p>
        <form
          class="text-right"
          method="dialog"
          onSubmit={() => setIsOpen(false)}
        >
          <button class="font-rzaLight text-base">Close</button>
        </form>
      </dialog>
    </>
  );
};

export default HelpText;
