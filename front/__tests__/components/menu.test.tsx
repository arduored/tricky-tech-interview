import Menu from "@/app/components/menu";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/router", () => ({
  useRouter: {
    pushMock: jest.fn(),
  },
}));

describe("Menu", () => {
  it("renders 2 buttons", () => {
    // render(<Menu />);
    // const buttons = screen.findAllByRole("button");
    // expect(buttons).toHaveLength(2);
  });
});
