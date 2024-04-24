import Score from "@/app/components/score";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Score", () => {
  it("Display a score of 10", () => {
    render(<Score score={10} />);
    const text = screen.getAllByRole("paragraph");

    expect(text).toHaveLength(2);
  });
});
