import BackButton from "@/app/components/backButton";
import { prettyDOM, render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => {
  const originalModule = jest.requireActual("next/navigation");
  return {
    __esModule: true,
    ...originalModule,
    useSelectedLayoutSegment: jest
      .fn()
      .mockImplementationOnce(() => "omeletteDuFromage"),
  };
});

describe("BackButton", () => {
  afterAll(() => jest.clearAllMocks());

  it("should render the link", async () => {
    render(<BackButton />);

    const link = await screen.findByRole("link");

    expect(link).toBeInTheDocument;
  });

  it("should not render anything", () => {
    render(<BackButton />);
    expect(() => screen.getByRole("link")).toThrow();
  });
});
