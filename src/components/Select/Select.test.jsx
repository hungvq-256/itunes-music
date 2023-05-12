import React from "react";
import { fireEvent, screen, within } from "@testing-library/react";
import Select from "@/components/Select";
import { renderWithProviders } from "@/utils/test-utils";

describe("onChange events", () => {
  it("should test onChange behavior", () => {
    const { getByRole } = renderWithProviders(<Select />);
    fireEvent.mouseDown(getByRole("button"));
    const listbox = within(getByRole("listbox"));
    const selectVal = screen.getByTestId("test-select-id");

    fireEvent.click(listbox.getByText("all"));
    expect(selectVal.value).toBe("-1");

    fireEvent.click(listbox.getByText("explicitly"));
    expect(selectVal.value).toBe("0");

    fireEvent.click(listbox.getByText("un-explicitly"));
    expect(selectVal.value).toBe("1");
  });
});
