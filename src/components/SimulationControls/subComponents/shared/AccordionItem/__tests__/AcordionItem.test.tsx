import { renderWithWrappers } from "utils/testUtils";
import { AccordionItem } from "../AccordionItem";

describe("AccordianItem", () => {
  describe("GIVEN the component is rendered", () => {
    test("THEN it is rendered correctly", () => {
      const { asFragment } = renderWithWrappers(
        <AccordionItem summary="Test Title">
          <div>Test component</div>
        </AccordionItem>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
