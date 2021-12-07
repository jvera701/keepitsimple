import logo from './logo.svg'
import './App.css'
import data from './data.json'
import Table from './table'
import React, { useMemo } from 'react'

function App() {
  function sort(rowA, rowB, id, desc) {
    if (rowA.Supervisor[id] > rowB.Supervisor[id]) {
      return -1
    } else if (rowB.Supervisor[id] > rowA.Supervisor[id]) {
      return 1
    } else {
      if (rowA.Nombre[id] > rowB.Nombre[id]) {
        return -1
      } else if (rowB.Nombre[id] > rowA.Nombre[id]) {
        return 1
      }
      return 0
    }
  }

  // This is a custom filter UI for selecting
  // a unique option from a list
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value=''>All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
  const columns = useMemo(
    () => [
      { Header: 'Nombre', accessor: 'Nombre' },
      { Header: 'Cargo', accessor: 'Cargo' },
      {
        Header: 'Supervisor',
        accessor: 'Supervisor',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Clase',
        accessor: 'Clase',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Subsidiaria',
        accessor: 'Subsidiaria',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Departamento',
        accessor: 'Departamento',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
    ],
    []
  )

  return (
    <div className='app'>
      <Table columns={columns} data={data.Employees} />
    </div>
  )
}

export default App
