import { useEffect } from "react";
import { useBuilder } from "../store/builder";

export function useKeyboardShortcuts() {
  const undo = useBuilder((s) => s.undo);
  const redo = useBuilder((s) => s.redo);
  const randomize = useBuilder((s) => s.randomize);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const inForm =
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable);
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (
        (meta && e.key.toLowerCase() === "y") ||
        (meta && e.shiftKey && e.key.toLowerCase() === "z")
      ) {
        e.preventDefault();
        redo();
      } else if (!inForm && e.key.toLowerCase() === "r" && !meta) {
        e.preventDefault();
        randomize();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, randomize]);
}
