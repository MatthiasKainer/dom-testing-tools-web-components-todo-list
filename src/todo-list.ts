import { pureLit } from "pure-lit";
import {useState} from "lit-element-state-decoupler"
import { html, LitElement } from "lit-element";

import "./submitting-input"

pureLit("todo-list", (el: LitElement) => {
  const {getState, publish} = useState(el, [] as string[])
  return html`
    <h1>My Todo List</h1>
    <submitting-input 
      label="add todo" 
      @submit=${(e: CustomEvent<string>) => publish([...getState(), e.detail])}></submitting-input>
    <ul>
      ${getState().map((item) => html`<li>${item}</li>`)}
    </ul>
  `
});

