import "./todo-list";
import { screen } from "testing-library__dom";
import userEvent from "@testing-library/user-event";
import { fixture, html } from "@open-wc/testing-helpers";

describe("submitting-input", () => {
    const onSubmit = jest.fn()
    const input = () => screen.getByRole("textbox", { name: /example/i })
  
    beforeEach(async () => {
      await fixture(html`<submitting-input 
        @submit=${(e: CustomEvent) => onSubmit(e.detail)}
        label="example"></submitting-input>`);
    })
    
    it("submits valid text correctly", async () => {
      await userEvent.type(input(), "a new entry{enter}");
      expect(onSubmit).toBeCalledWith("a new entry")
    });

    it("doesn't submit empty text", async () => {
      await userEvent.type(input(), "{enter}");
      expect(onSubmit).not.toBeCalled()
    });
  
    it("keeps the text if not submitting", async () => {
      await userEvent.type(input(), "a new entry");
      expect(input()).toHaveValue("a new entry")
    })
  
    it("clears the input after submitting", async () => {
      await userEvent.type(input(), "a new entry{enter}");
      expect(input()).toHaveValue("")
    })
  })