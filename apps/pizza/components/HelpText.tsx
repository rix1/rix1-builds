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
      <button className="help" type="button" onClick={() => setIsOpen(!isOpen)}>
        {label}
      </button>
      <dialog
        ref={dialogRef}
        open={isOpen}
        className="max-w-xs shadow-sm ring-2 ring-inset ring-[rgb(var(--gray))] rounded-md"
      >
        <p className="font-normal text-sm font-sans">{children}</p>
        <form
          className="text-right"
          method="dialog"
          onSubmit={() => setIsOpen(false)}
        >
          <button className="font-rzaLight text-base">Close</button>
        </form>
      </dialog>
    </>
  );
};

export default HelpText;
