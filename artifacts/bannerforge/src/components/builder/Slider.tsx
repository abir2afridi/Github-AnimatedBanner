import { Slider as UISlider } from "../ui/slider";

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  unit?: string;
  format?: (v: number) => string;
}

export function LabelSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit,
  format,
}: Props) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-mono">
          {format ? format(value) : `${value}${unit ?? ""}`}
        </span>
      </div>
      <UISlider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
      />
    </div>
  );
}
