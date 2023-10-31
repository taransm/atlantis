import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InternalChipMultiSelect } from "../InternalChipMultiSelect";
import { Chip } from "..";

let handleChange: jest.Mock;
let handleClickChip: jest.Mock;
const chips = ["Amazing", "Fabulous", "Magical"];
const selectedChips = ["Amazing"];

beforeEach(() => {
  handleChange = jest.fn(value => value);
  handleClickChip = jest.fn((_, value) => value);

  render(
    <InternalChipMultiSelect
      selected={selectedChips}
      onChange={handleChange}
      onClick={handleClickChip}
    >
      {chips.map(chip => (
        <Chip key={chip} label={chip} value={chip} />
      ))}
    </InternalChipMultiSelect>,
  );
});

it("should have a label and a checkbox", () => {
  const component = screen.getByTestId("multiselect-chips");
  expect(component.querySelectorAll("label")).toHaveLength(chips.length);
  expect(component.querySelectorAll("input[type=checkbox]")).toHaveLength(
    chips.length,
  );
});

it("should show a checkmark on the selected chip", () => {
  expect(screen.queryAllByTestId("checkmark")).toHaveLength(
    selectedChips.length,
  );
});

describe("onChange", () => {
  it("should trigger the onChange selecting a chip", async () => {
    const target = chips[1];
    await userEvent.click(screen.getByLabelText(target));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveReturnedWith([...selectedChips, target]);
  });

  it("should trigger the onChange deselecting a chip", async () => {
    await userEvent.click(screen.getByLabelText(selectedChips[0]));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveReturnedWith([]);
  });
});

describe("onClick", () => {
  it("should trigger the chip onClick", async () => {
    const target = chips[2];
    await userEvent.click(screen.getByLabelText(target));
    expect(handleClickChip).toHaveBeenCalledTimes(1);
    expect(handleClickChip).toHaveReturnedWith(target);
  });
});
