import React from "react";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { ComboboxContext } from "../../ComboboxProvider";

interface ComboboxActivatorProps {
  readonly children: React.ReactElement;
}

export function ComboboxActivator(props: ComboboxActivatorProps) {
  const { open, setOpen } = React.useContext(ComboboxContext);

  if (props.children.type === Button || props.children.type === Chip) {
    return React.cloneElement(props.children, {
      role: "combobox",
      onClick: () => setOpen(!open),
    });
  }

  return props.children;
}