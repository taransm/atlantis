import { Table } from "@tanstack/react-table";
import React, { useMemo } from "react";
import styles from "./Footer.css";
import { Option, Select } from "../Select";
import { Button } from "../Button";

interface FooterProps<T> {
  table: Table<T>;
  itemsPerPage?: number[];
  totalItems: number;
}

export function Footer<T extends object>({
  table,
  itemsPerPage,
  totalItems,
}: FooterProps<T>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = totalItems;
  const firstPosition = pageIndex * pageSize + 1;
  const secondPosition = Math.min(totalRows, pageSize * (pageIndex + 1));

  const defaultItemsPerPageOptions = useMemo(
    () => ["10", "20", "30", "40", "50"],
    [],
  );

  const itemsPerPageOptions = useMemo(
    () => itemsPerPage?.map(item => String(item)) ?? defaultItemsPerPageOptions,
    [itemsPerPage],
  );

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationInfo}>
        {`Showing ${firstPosition}-${secondPosition} of ${totalRows} items`}
      </div>
      <div className={styles.paginationNav}>
        <div className={styles.paginationSelect}>
          <Select
            value={table.getState().pagination.pageSize}
            onChange={value => {
              table.setPageSize(Number(value));
            }}
          >
            {itemsPerPageOptions.map(numOfPages => (
              <Option key={numOfPages} value={numOfPages}>
                {numOfPages}
              </Option>
            ))}
          </Select>
          <span className={styles.paginationSelectLabel}>per page</span>
        </div>
        <div className={styles.paginationButtons}>
          <Button
            type="secondary"
            variation="subtle"
            icon="arrowLeft"
            ariaLabel="arrowLeft"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
          <Button
            type="secondary"
            variation="subtle"
            icon="arrowRight"
            ariaLabel="arrowRight"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
        </div>
      </div>
    </div>
  );
}
