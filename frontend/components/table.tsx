import React from 'react';

interface ColumnDefinition<T> {
    key: keyof T;
    header: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
    columns: ColumnDefinition<T>[];
    data: T[];
    hoverEffect?: boolean;
    stripedRows?: boolean;
    className?: string;
}

const Table = <T extends object>({
    columns,
    data,
    hoverEffect = true,
    stripedRows = true,
    className = ''
}: TableProps<T>) => {
    return (
        <div className={`overflow-x-auto rounded-lg border border-gray-200 ${className}`}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key as string}
                                scope="col"
                                className={`
                  px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500
                  ${column.align === 'center' ? 'text-center' : ''}
                  ${column.align === 'right' ? 'text-right' : ''}
                  ${column.width ? `w-[${column.width}]` : ''}
                `}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`
                ${hoverEffect ? 'hover:bg-gray-50' : ''}
                ${stripedRows && rowIndex % 2 === 0 ? 'bg-gray-50' : ''}
              `}
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.key as string}
                                    className={`
                    px-6 py-4 text-sm
                    ${column.align === 'center' ? 'text-center' : ''}
                    ${column.align === 'right' ? 'text-right' : ''}
                    ${!column.align ? 'text-left' : ''}
                  `}
                                >
                                    {column.render
                                        ? column.render(row[column.key], row)
                                        : (row[column.key] as React.ReactNode)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && (
                <div className="bg-white py-8 text-center text-gray-500">
                    No data available
                </div>
            )}
        </div>
    );
};

export default Table;
