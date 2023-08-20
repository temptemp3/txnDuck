import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

// This mock makes sure any components using the translate hook can use it without a warning being
// shown
// From https://react.i18next.com/misc/testing
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  Trans: ({ lng }: { lng: string }) => lng,
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  }
}));

describe("Home Page", () => {
  it("should render without crashing", () => {
    render(<HomePage params={{lang: ''}} />);

    const startBtn = screen.getByText(/start_button/);

    expect(startBtn).toBeInTheDocument();
  });
});
