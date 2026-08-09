import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column {
  key: string;
  label: string;
  className?: string;
  /** Hide this column's label/inline offset on small screens where it is the primary cell. */
  primary?: boolean;
}

/**
 * Responsive data table: a real table on md+ and stacked, labeled cards
 * on small screens. Routine admin tasks never require horizontal scrolling.
 */
export function DataTable({
  columns,
  children,
  emptyState,
  pagination,
}: {
  columns: Column[];
  children: ReactNode;
  emptyState?: ReactNode;
  pagination?: {
    currentPage: number;
    totalPages: number;
    basePath: string;
  };
}) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <table className="block w-full md:table">
        <thead className="hidden md:table-header-group">
          <tr className="border-b border-border bg-surface/70 text-left">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "px-4 py-3.5 text-[0.65rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase",
                  column.className,
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">{children}</tbody>
      </table>
      {emptyState}
      {pagination && pagination.totalPages > 1 ? (
        <div className="flex items-center justify-between border-t border-border px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            {pagination.currentPage > 1 ? (
              <Link
                href={`${pagination.basePath}?page=${pagination.currentPage - 1}`}
                className="relative inline-flex items-center rounded-sm border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-surface"
              >
                Previous
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-sm border border-border bg-surface/50 px-4 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed">
                Previous
              </span>
            )}
            {pagination.currentPage < pagination.totalPages ? (
              <Link
                href={`${pagination.basePath}?page=${pagination.currentPage + 1}`}
                className="relative ml-3 inline-flex items-center rounded-sm border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-surface"
              >
                Next
              </Link>
            ) : (
              <span className="relative ml-3 inline-flex items-center rounded-sm border border-border bg-surface/50 px-4 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed">
                Next
              </span>
            )}
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing page <span className="font-semibold text-foreground">{pagination.currentPage}</span> of{" "}
                <span className="font-semibold text-foreground">{pagination.totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-sm shadow-xs" aria-label="Pagination">
                {pagination.currentPage > 1 ? (
                  <Link
                    href={`${pagination.basePath}?page=${pagination.currentPage - 1}`}
                    className="relative inline-flex items-center rounded-l-sm border border-border bg-card px-2 py-2 text-muted-foreground hover:bg-surface focus:z-20"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="relative inline-flex items-center rounded-l-sm border border-border bg-surface/50 px-2 py-2 text-muted-foreground/50 cursor-not-allowed">
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
                {pagination.currentPage < pagination.totalPages ? (
                  <Link
                    href={`${pagination.basePath}?page=${pagination.currentPage + 1}`}
                    className="relative inline-flex items-center rounded-r-sm border border-border bg-card px-2 py-2 text-muted-foreground hover:bg-surface focus:z-20"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="relative inline-flex items-center rounded-r-sm border border-border bg-surface/50 px-2 py-2 text-muted-foreground/50 cursor-not-allowed">
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function DataRow({ children, className }: { children: ReactNode[] | ReactNode; className?: string }) {
  return (
    <tr
      className={cn(
        "flex flex-col border-b border-border px-4 py-4 last:border-b-0 transition-colors hover:bg-surface/40 md:table-row md:px-0 md:py-0",
        className,
      )}
    >
      {children}
    </tr>
  );
}

export function DataCell({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <td
      data-label={label}
      className={cn(
        "flex items-center justify-between gap-4 py-1.5 text-sm text-foreground before:text-[0.6rem] before:font-semibold before:tracking-[0.18em] before:text-muted-foreground/70 before:uppercase before:content-[attr(data-label)] md:table-cell md:px-4 md:py-3.5 md:before:hidden",
        className,
      )}
    >
      {children}
    </td>
  );
}
