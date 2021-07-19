import React, { useState } from 'react'
import ModalFooter from './ModalFooter'
import EmptyState from './EmptyState'
import TableRow from './TableRow'
import PropTypes from 'prop-types'

export const Table = ({
  tableHeaders,
  tableRows,
  onSave,
  handleDelete = () => {},
  closeModal = () => {},
}) => {
  const [editing, setEditing] = useState(false)
  const [rowToEdit, setRowToEdit] = useState({})

  const handleEdit = (row, idx) => {
    row.editing = true
    setRowToEdit(row)
    tableRows.splice(idx, 1, row)
    setEditing(true)
  }

  const cancelEdit = (row, idx) => {
    row.editing = false
    tableRows.splice(idx, 1, row)
    setRowToEdit({})
    setEditing(false)
  }

  const handleSubmit = (idx) => {
    rowToEdit.editing = false
    tableRows.splice(idx, 1, rowToEdit)
    setRowToEdit({})
    setEditing(false)
  }

  const handleChange = (e) => {
    let tempRow = { ...rowToEdit }
    tempRow[e.target.name] = e.target.value
    setRowToEdit(tempRow)
  }

  const handleSave = () => {
    tableRows.forEach((row) => {
      delete row.editing
      return row
    })
    onSave(tableRows)
    closeModal()
  }

  return (
    <div className="modal-wrapper">
      <div title="table-wrapper" className="table-wrapper">
        {tableHeaders.length > 0 && (
          <table className="modal-table" title="table">
            <thead>
              <tr>
                {tableHeaders.map((header, idx) => (
                  <th key={idx}>{header}</th>
                ))}
                {tableHeaders.length > 0 && <th>...</th>}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, idx) => (
                <TableRow
                  rowToEdit={rowToEdit}
                  index={idx}
                  key={idx}
                  row={row}
                  handleDelete={handleDelete}
                  handleChange={handleChange}
                  handleEdit={handleEdit}
                  handleSubmit={handleSubmit}
                  cancelEdit={cancelEdit}
                  editing={editing}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      {tableHeaders.length === 0 && <EmptyState />}
      <ModalFooter
        handleSave={handleSave}
        closeModal={closeModal}
        showSave={tableRows.length > 0}
      />
    </div>
  )
}

Table.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  tableRows: PropTypes.array.isRequired,
  closeModal: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
}
export default Table
