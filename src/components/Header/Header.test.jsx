import { screen } from "@testing-library/react";
import Header from "@/components/Header";
import { renderWithProviders } from "@/utils/test-utils";

test("change text input", () => {
  it("should render input ", () => {
    renderWithProviders(<Header />);
    const field = screen.getByTestId("test-input-id");
    expect(field).toBeInTheDocument();

    fireEvent.change(field, { target: { value: "some text" } });
    expect(field.value).toBe("some text");
  });
});
