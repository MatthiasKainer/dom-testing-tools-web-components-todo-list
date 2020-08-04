import "./todo-list";
import { screen } from "testing-library__dom";
import userEvent from "@testing-library/user-event";
import { fixture } from "@open-wc/testing-helpers";

describe("todo-list", () => {
  const input = () => screen.getByRole("textbox", { name: /add todo/i })

  beforeEach(async () => {
    await fixture(`<todo-list></todo-list>`);
  });

  it("has a headline", () => {
    expect(screen.getByRole("heading")).toBeDefined();
  });

  it("adds a todo", async () => {
    await userEvent.type(input(), "a new entry{enter}");
    expect(screen.getAllByRole("listitem")[0]).toContainHTML(">a new entry<");
  });

  it("adds multiple todos in order", async () => {
    await userEvent.type(input(), "first{enter}");
    await userEvent.type(input(), "another{enter}");
    expect(screen.getAllByRole("listitem")[0]).toContainHTML(">first<");
    expect(screen.getAllByRole("listitem")[1]).toContainHTML(">another<");
  });
});


