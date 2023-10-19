import React from "react";
import { render } from "@testing-library/react";
import { ComboboxContentList } from "./ComboboxContentList";

describe("ComboboxContentList", () => {
  it("should render a list of options if provided", () => {
    const { getByText } = render(
      <ComboboxContentList
        multiselect={false}
        options={[
          { id: "1", label: "Michael" },
          { id: "2", label: "Jason" },
        ]}
        showEmptyState={false}
        selected={[]}
        optionsListRef={React.createRef()}
        setFirstSelectedElement={jest.fn()}
        selectionHandler={jest.fn()}
        searchValue=""
      />,
    );
    expect(getByText("Michael")).toBeInTheDocument();
    expect(getByText("Jason")).toBeInTheDocument();
  });
  it("should not show the empty message if list of options provided", () => {
    const { queryByText } = render(
      <ComboboxContentList
        multiselect={false}
        options={[
          { id: "1", label: "Michael" },
          { id: "2", label: "Jason" },
        ]}
        showEmptyState={false}
        selected={[]}
        optionsListRef={React.createRef()}
        setFirstSelectedElement={jest.fn()}
        selectionHandler={jest.fn()}
        searchValue=""
      />,
    );
    expect(queryByText("No Options yet")).not.toBeInTheDocument();
  });
  it("should render a generic message if no options, nor subjectNoun are provided", () => {
    const { getByText } = render(
      <ComboboxContentList
        multiselect={false}
        options={[]}
        showEmptyState={true}
        selected={[]}
        optionsListRef={React.createRef()}
        setFirstSelectedElement={jest.fn()}
        selectionHandler={jest.fn()}
        searchValue=""
      />,
    );
    expect(getByText("No options yet")).toBeInTheDocument();
  });
  it("should render a message if no options are provided and a subjectNoun is provided", () => {
    const { getByText } = render(
      <ComboboxContentList
        multiselect={false}
        options={[]}
        showEmptyState={true}
        selected={[]}
        optionsListRef={React.createRef()}
        setFirstSelectedElement={jest.fn()}
        selectionHandler={jest.fn()}
        searchValue=""
        subjectNoun="Plumbus"
      />,
    );
    expect(getByText("You don't have any Plumbus yet")).toBeInTheDocument();
  });
  it("should render a message if no options are provided and a search term is entered", () => {
    const { getByText } = render(
      <ComboboxContentList
        multiselect={false}
        options={[]}
        showEmptyState={true}
        selected={[]}
        optionsListRef={React.createRef()}
        setFirstSelectedElement={jest.fn()}
        selectionHandler={jest.fn()}
        searchValue="Rick"
      />,
    );
    expect(getByText("No options yet")).toBeInTheDocument();
  });
  it("should render a message if no options are provided and a search term is entered and no results are found", () => {
    const { getByText } = render(
      <ComboboxContentList
        multiselect={false}
        options={[]}
        showEmptyState={false}
        selected={[]}
        optionsListRef={React.createRef()}
        setFirstSelectedElement={jest.fn()}
        selectionHandler={jest.fn()}
        searchValue="Frederick"
      />,
    );
    expect(getByText("No results for “Frederick”")).toBeInTheDocument();
  });
  it("should only apply a selected style to the selected options", () => {
    const { getByText } = render(
      <ComboboxContentList
        multiselect={false}
        options={[
          { id: "1", label: "Michael" },
          { id: "2", label: "Jason" },
          { id: "3", label: "Leatherface" },
        ]}
        showEmptyState={false}
        selected={[
          { id: "1", label: "Michael" },
          { id: "3", label: "Leatherface" },
        ]}
        optionsListRef={React.createRef()}
        setFirstSelectedElement={jest.fn()}
        selectionHandler={jest.fn()}
        searchValue=""
      />,
    );
    expect(getByText("Michael")).toHaveAttribute("aria-selected", "true");
    expect(getByText("Leatherface")).toHaveAttribute("aria-selected", "true");
    expect(getByText("Jason")).not.toHaveAttribute("aria-selected", "true");
  });

  it("should have a selected option when selected id is a number and option id is a string", () => {
    const { getByText } = render(
      <ComboboxContentList
        multiselect={false}
        options={[
          { id: "1", label: "Michael" },
          { id: "2", label: "Jason" },
        ]}
        showEmptyState={false}
        selected={[{ id: 1, label: "Michael" }]}
        optionsListRef={React.createRef()}
        setFirstSelectedElement={jest.fn()}
        selectionHandler={jest.fn()}
        searchValue=""
      />,
    );
    expect(getByText("Michael")).toHaveAttribute("aria-selected", "true");
    expect(getByText("Jason")).not.toHaveAttribute("aria-selected", "true");
  });

  it("has no selected option when a null selected value is passed", () => {
    const { getByText } = render(
      <ComboboxContentList
        multiselect={false}
        options={[
          { id: "1", label: "Michael" },
          { id: "2", label: "Jason" },
        ]}
        showEmptyState={false}
        selected={[]}
        optionsListRef={React.createRef()}
        setFirstSelectedElement={jest.fn()}
        selectionHandler={jest.fn()}
        searchValue=""
      />,
    );
    expect(getByText("Michael")).not.toHaveAttribute("aria-selected", "true");
    expect(getByText("Jason")).not.toHaveAttribute("aria-selected", "true");
  });
});