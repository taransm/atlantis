import React from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
import styles from "./ComboboxContent.css";
import { ComboboxContentSearch } from "./ComboboxContentSearch";
import { ComboboxContentList } from "./ComboboxContentList";
import { ComboboxContentHeader } from "./ComboboxContentHeader";
import { ComboboxContext } from "../../ComboboxProvider";
import { useComboboxContent } from "../../hooks/useComboboxContent";
import { useComboboxAccessibility } from "../../hooks/useComboboxAccessibility";
import { ComboboxContentProps, ComboboxOption } from "../../Combobox.types";

export function ComboboxContent(props: ComboboxContentProps): JSX.Element {
  const { open, setOpen, wrapperRef, multiselect } =
    React.useContext(ComboboxContext);
  const optionsExist = props.options.length > 0;

  const {
    searchValue,
    setSearchValue,
    setFirstSelectedElement,
    filteredOptions,
    optionsListRef,
    selectedOptions,
    optionsSelectionHandler,
  } = useComboboxContent(
    props.options,
    open,
    props.selected,
    props.onClose,
    props.onSelect,
  );

  const { popperRef, popperStyles, attributes } = useComboboxAccessibility(
    handleSelection,
    filteredOptions,
    optionsListRef,
    open,
    setOpen,
    wrapperRef,
  );

  const template = (
    <div
      ref={popperRef}
      id="ATL-Combobox-Content"
      data-testid="ATL-Combobox-Content"
      tabIndex={0}
      className={classnames(styles.content, { [styles.hidden]: !open })}
      style={popperStyles.popper}
      {...attributes.popper}
    >
      <ComboboxContentSearch
        open={open}
        placeholder={props.subjectNoun}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      {multiselect && optionsExist && (
        <ComboboxContentHeader
          hasOptionsVisible={filteredOptions.length > 0}
          subjectNoun={props.subjectNoun}
          selectedCount={selectedOptions.length}
          onClearAll={() => {
            optionsSelectionHandler([]);
          }}
          onSelectAll={() => {
            optionsSelectionHandler(filteredOptions);
          }}
        />
      )}

      <ComboboxContentList
        multiselect={multiselect}
        showEmptyState={!optionsExist}
        options={filteredOptions}
        selected={selectedOptions}
        optionsListRef={optionsListRef}
        setFirstSelectedElement={setFirstSelectedElement}
        selectionHandler={handleSelection}
        searchValue={searchValue}
        subjectNoun={props.subjectNoun}
      />
      {props.children && (
        <div className={styles.actions} role="group">
          {React.Children.toArray(props.children).map(
            (child, index, childrenArray) => (
              <div
                key={index}
                className={classnames({
                  [styles.actionPadding]: index === childrenArray.length - 1,
                })}
              >
                {child}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );

  return ReactDOM.createPortal(template, document.body);

  function handleSelection(selection: ComboboxOption) {
    if (multiselect) {
      handleMultiSelect(optionsSelectionHandler, selectedOptions, selection);
    } else {
      handleSingleSelect(optionsSelectionHandler, selection);
    }
  }

  function handleSingleSelect(
    selectCallback: (selected: ComboboxOption[]) => void,
    selection: ComboboxOption,
  ) {
    selectCallback([selection]);
    setSearchValue("");
    setOpen(false);
  }
}

function handleMultiSelect(
  selectCallback: (selected: ComboboxOption[]) => void,
  selected: ComboboxOption[],
  selection: ComboboxOption,
) {
  if (selected.some(s => s.id === selection.id)) {
    selectCallback(selected.filter(s => s.id !== selection.id));
  } else {
    selectCallback([...selected, selection]);
  }
}
