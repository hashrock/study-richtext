import type { Signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import {
  createEditor,
  Descendant,
} from "https://esm.sh/slate";
import {
  Editable,
  Slate,
  withReact,
} from "https://esm.sh/slate-react?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat&external=preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import { RouteConfig } from "$fresh/server.ts";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const handleChange = (value: Descendant[]) => {
    setValue(value);
  };
  return (
    <div className="flex gap-8 py-6">
      <div>
        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={handleChange}
        >
          <Editable />
        </Slate>
      </div>
    </div>
  );
}

export const config: RouteConfig = {
  csp: false,
};
