import { pureLit, LitElementWithProps } from "pure-lit";
import { html } from "lit-element";

pureLit("submitting-input", 
  (el: LitElementWithProps<{ label: string }>) =>
    html`<input
      type="text"
      aria-label=${el.label}
      @keypress=${(e: KeyboardEvent) => {
        const element = e.target as HTMLInputElement;
        if (element.value !== "" && e.key === "Enter") {
          el.dispatchEvent(new CustomEvent("submit", { detail: element.value }));
          element.value = "";
        }
      }}
    />`
, {defaults: {label: "input"}});