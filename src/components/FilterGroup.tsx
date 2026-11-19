interface FilterGroupProps {
  title: string;
  inputType: "checkbox" | "radio";
  options: { text: string; value?: string }[];
  selected?: string[] | undefined;
  onChange?: (values: string[]) => void | undefined;
}

export function FilterGroup({ title, inputType, options, selected = [], onChange }: FilterGroupProps) {
  const name = title.toLowerCase().replace(/\s+/g, "-");
  const toggle = (value: string, checked: boolean) => {
    if (!onChange) return;
    if (inputType === "radio") onChange([value]);
    else onChange(checked ? [...selected, value] : selected.filter((v) => v !== value));
  };

  return (
    <fieldset className="mb-5">
      <legend className="mb-3 text-sm font-bold text-dark-gray-2">{title}</legend>
      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const value = opt.value ?? opt.text;
          return (
            <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-dark-gray-2">
              <input
                type={inputType}
                name={name}
                value={value}
                checked={selected.includes(value)}
                onChange={(e) => toggle(value, e.target.checked)}
                className="size-[22px] cursor-pointer accent-primary"
              />
              {opt.text}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
