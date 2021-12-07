import React, { useMemo, useState } from 'react'
import { useFilters, useTable } from 'react-table'
import { CSVLink } from 'react-csv'

function Table({ columns, data }) {
  function ColumnFilter() {
    return <> </>
  }
  const defaultColumn = useMemo(
    () => ({
      // Empty default filter
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
  rows.sort(function (x, y) {
    if (x.values.Supervisor < y.values.Supervisor) {
      return -1
    } else if (x.values.Supervisor > y.values.Supervisor) return 1
    else {
      if (x.values.Nombre < y.values.Nombre) {
        return -1
      } else if (x.values.Nombre > y.values.Nombre) {
        return 1
      }
      return 0
    }
  })

  const newRows = []
  rows.map(cell => {
    newRows.push(cell.values)
  })

  return (
    <>
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
      <div>
        <CSVLink data={newRows}> Download CSV </CSVLink>
      </div>
    </>
  )
}

export default Table
