import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./api", () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  }
}));

test("renders tracker heading, add form and empty state", async () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: "Freelance Project Tracker" })
  ).toBeInTheDocument();

  expect(screen.getByLabelText("Client Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Project Title")).toBeInTheDocument();
  expect(screen.getByLabelText("Budget (₹)")).toBeInTheDocument();
  expect(screen.getByLabelText("Deadline")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Add Project" })
  ).toBeInTheDocument();

  expect(
    await screen.findByText("No projects yet. Add your first one above.")
  ).toBeInTheDocument();
});
