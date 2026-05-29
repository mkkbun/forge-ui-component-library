/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

export interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  enableSearch?: boolean;
  searchPlaceholder?: string;
  searchKey?: keyof T;
  rowsPerPageDefault?: number;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  enableSearch = true,
  searchPlaceholder = "Search...",
  searchKey,
  rowsPerPageDefault = 5,
}: DataTableProps<T>) {
  // State for search/filter
  const [searchTerm, setSearchTerm] = useState("");

  // State for sorting
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(rowsPerPageDefault);

  // 1. Filter Data
  const filteredData = useMemo(() => {
    if (!searchTerm || !enableSearch) return data;
    
    return data.filter((item) => {
      if (searchKey) {
        const val = item[searchKey];
        return String(val).toLowerCase().includes(searchTerm.toLowerCase());
      }
      
      // Global search across all string/number fields of the row
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [data, searchTerm, enableSearch, searchKey]);

  // Handle automatic reset of page index when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 2. Sort Data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const compare = String(aVal).localeCompare(String(bVal), undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return sortDirection === "asc" ? compare : -compare;
    });

    return sorted;
  }, [filteredData, sortKey, sortDirection]);

  // 3. Paginate Data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;

  const toggleSort = (accessor: keyof T) => {
    if (sortKey === accessor) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortKey(null);
      }
    } else {
      setSortKey(accessor);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const renderCell = (row: T, col: ColumnDef<T>) => {
    if (typeof col.accessorKey === "function") {
      return (col.accessorKey as Function)(row);
    }
    return String(row[col.accessorKey as keyof T]);
  };

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-left">
      {/* Top action grid */}
      {enableSearch && (
        <div className="flex justify-between items-center gap-4">
          <Input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
            className="max-w-xs"
            leftAddon={
              <svg className="h-4 w-4 text-muted-fg-forge" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          <div className="text-xs text-muted-fg-forge select-none">
            Showing <span className="font-semibold text-foreground">{paginatedData.length}</span> of{" "}
            <span className="font-semibold text-foreground">{sortedData.length}</span> entries
          </div>
        </div>
      )}

      {/* Main Table Layer */}
      <div className="w-full border border-border-forge rounded-[var(--forge-radius-lg)] overflow-hidden bg-card-forge shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-forge bg-muted-forge/50 text-xs font-semibold uppercase tracking-wider text-muted-fg-forge select-none">
                {columns.map((col, idx) => {
                  const isSortable = col.sortable && typeof col.accessorKey === "string";
                  const keyStr = col.accessorKey as string;

                  return (
                    <th
                      key={idx}
                      className={`px-4 py-3.5 font-bold align-middle transition-colors text-left ${
                        isSortable ? "cursor-pointer hover:bg-muted-forge hover:text-foreground" : ""
                      }`}
                      onClick={() => isSortable && toggleSort(keyStr as keyof T)}
                      role={isSortable ? "button" : undefined}
                      tabIndex={isSortable ? 0 : undefined}
                      onKeyDown={(e) => {
                        if (isSortable && (e.key === "Enter" || e.key === " ")) {
                          e.preventDefault();
                          toggleSort(keyStr as keyof T);
                        }
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{col.header}</span>
                        {isSortable && (
                          <span className="shrink-0 text-muted-fg-forge">
                            {sortKey === keyStr ? (
                              sortDirection === "asc" ? (
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                                </svg>
                              ) : (
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                              )
                            ) : (
                              <svg className="h-3 w-3 opacity-40 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                              </svg>
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-forge bg-background">
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="hover:bg-muted-forge/30 transition-colors"
                  >
                    {columns.map((col, colIdx) => (
                      <td key={colIdx} className="px-4 py-3.5 text-foreground align-middle font-medium">
                        {renderCell(row, col)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-fg-forge">
                    No matching results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-fg-forge select-none">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="h-8 pl-2 pr-8 text-xs bg-background border border-border-forge rounded-[var(--forge-radius-sm)] text-foreground outline-none cursor-pointer focus:ring-1 focus:ring-primary"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 select-none">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
            aria-label="Previous Page"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <div className="text-xs text-muted-fg-forge">
            Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
            <span className="font-semibold text-foreground">{totalPages}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
            aria-label="Next Page"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
