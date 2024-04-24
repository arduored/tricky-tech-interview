import Title from "@/app/components/title";
import { render } from "@testing-library/react";

describe("Title", () => {
  it("should display BURNOUT as a title", () => {
    const comp = render(<Title />);

    expect(comp).toMatchSnapshot();
  });
});
