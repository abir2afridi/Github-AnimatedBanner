import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface Props {
  value: string;
  onChange: (v: string) => void;
  label?: string;
}

export function ColorSwatch({ value, onChange, label }: Props) {
  const [local, setLocal] = useState(value);
  return (
    <div className="space-y-1.5">
      {label ? (
        <div className="text-xs text-muted-foreground">{label}</div>
      ) : null}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-full h-9 rounded-md border border-border flex items-center gap-2 px-2 hover:border-primary transition-colors"
          >
            <span
              className="w-6 h-6 rounded border border-border shrink-0"
              style={{ background: value }}
            />
            <span className="text-xs font-mono text-foreground">{value}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <HexColorPicker
            color={local}
            onChange={(c) => {
              setLocal(c);
              onChange(c);
            }}
          />
          <input
            type="text"
            value={local}
            onChange={(e) => {
              const v = e.target.value;
              setLocal(v);
              if (/^#?[0-9a-fA-F]{3,8}$/.test(v)) {
                onChange(v.startsWith("#") ? v : `#${v}`);
              }
            }}
            className="mt-2 w-full h-8 rounded border border-border bg-input text-xs px-2 font-mono"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
