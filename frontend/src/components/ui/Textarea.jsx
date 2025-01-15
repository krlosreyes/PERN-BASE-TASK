import { forwardRef } from "react";

export const Textarea = forwardRef((props, ref) => {
  return (
    <textarea
      className="bg-zinc-800 px-3 py-2 block my-2 w-full"
      ref={ref}
      {...props}
    />
  );
});

// Asigna un nombre legible al componente
Textarea.displayName = "Textarea";

export default Textarea;
