import type { ReactNode } from "react";
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
}: {
  columns: Column[];
  children: ReactNode;
  emptyState?: ReactNode;
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
