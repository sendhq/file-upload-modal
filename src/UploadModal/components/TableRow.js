import React from 'react'
import PropTypes from 'prop-types'

export const TableRow = ({
  row,
  handleChange,
  handleSubmit,
  handleEdit,
  handleDelete,
  cancelEdit,
  index,
  editing,
  rowToEdit,
}) => {
  return (
    <tr title="table-row" key={index}>
      {Object.keys(row)
        .slice(1)
        .map((rowKey, idx) => (
          <td key={idx}>
            {row.editing ? (
              <input
                className="modal-input"
                title="row-input"
                onChange={handleChange}
                key={idx}
                name={rowKey}
                value={rowToEdit[rowKey]}
              />
            ) : (
              <p title="row-text">{row[rowKey]}</p>
            )}
          </td>
        ))}
      <td>
        {row.editing ? (
          <div title="edit-actions">
            <button
              title="action-save"
              className="action-save"
              onClick={() => handleSubmit(index)}
            >
              Save
            </button>
            <button
              title="action-cancel"
              onClick={() => cancelEdit(row, index)}
              className="action-cancel"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div title="non-edit-actions">
            {!editing && (
              <button
                title="action-edit"
                className="action-edit"
                onClick={() => handleEdit(row, index)}
              >
                Edit
              </button>
            )}
            <button
              title="action-delete"
              onClick={() => handleDelete(index)}
              className="action-delete"
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

TableRow.propTypes = {
  row: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  editing: PropTypes.bool.isRequired,
  rowToEdit: PropTypes.object,
}
export default TableRow
