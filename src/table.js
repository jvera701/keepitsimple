import React, { useMemo } from 'react'
import { useFilters, useTable } from 'react-table'

function Table({ columns, data }) {
  function ColumnFilter() {
    return <> </>
  }
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: ColumnFilter,
    }),
    []
  )
  // Use the state and functions returned from useTable to build your UI
  // taken from https://github.com/tannerlinsley/react-table/blob/master/examples/basic/src/App.js
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useFilters
    )

  // Render the UI for your table
  return (
    <table {...getTableProps()} className='table-main'>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th className='table-th' {...column.getHeaderProps()}>
                {column.render('Header')}
                {/* Render the columns filter UI */}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td className='table-td' {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
