import React from 'react'
import PropTypes from 'prop-types'

export const ModalFooter = ({ closeModal, handleSave, showSave }) => {
  return (
    <div className="table-action-btns" title="table-action-btns">
      <button onClick={closeModal} id="close-modal-btn" title="close-modal">
        Close
      </button>
      {showSave && (
        <button onClick={handleSave} id="save-updates-btn" title="save-updates">
          Save
        </button>
      )}
    </div>
  )
}

ModalFooter.propTypes = {
  closeModal: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  showSave: PropTypes.bool.isRequired,
}

export default ModalFooter
