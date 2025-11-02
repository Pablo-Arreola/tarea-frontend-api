import React from "react";

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export default function Table<T extends object>({
  columns,
  data,
  emptyMessage = "No hay registros disponibles.",
}: Props<T>) {
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-500 py-6 italic">{emptyMessage}</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-blue-600 text-white">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="p-2 text-left">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-b hover:bg-gray-50 transition-colors duration-150"
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="p-2">
                  {col.render ? col.render(row) : (row[col.key] as string)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
