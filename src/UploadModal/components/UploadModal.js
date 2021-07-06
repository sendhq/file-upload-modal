import React, { useState } from 'react'
import Modal from 'react-modal'
import csvtojson from 'csvtojson'
import FileReaderInput from 'react-file-reader-input'
import Table from './Table'
import PropTypes from 'prop-types'
import './index.css'

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root')

export const UploadModal = ({ buttonComponent = null, onSave }) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [tableHeaders, setTableHeaders] = useState([])
  const [tableRows, setTableRows] = useState([])

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setTableRows([])
    setTableHeaders([])
  }

  const handleFileUpload = (e, results) => {
    results.forEach((result) => {
      // eslint-disable-next-line no-unused-vars
      const [e, file] = result
      if (file.type === 'text/csv' || 'application/vnd.ms-excel') {
        loadFile(file)
      } else alert('Invalid file type. Expected a csv file')
    })
  }

  const loadFile = async (file) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.fileName = file.name
    reader.onload = loadHandler
    reader.onerror = function () {
      alert('Unable to read ' + file.name)
    }
  }

  const loadHandler = (event) => {
    const csv = event.target.result
    csvReader(csv)
  }

  const csvReader = async (csv) => {
    const result = await csvtojson({
      output: 'json',
    }).fromString(csv)
    const data = []
    createTableHeader(result[0])
    for (let i = 0; i < result.length; i++) {
      const tempItem = result[i]
      const item = {}
      item.editing = false
      for (const key in tempItem) {
        item[key.toLowerCase().replaceAll(' ', '_')] = tempItem[key]
      }

      data.push(item)
    }
    setTableRows(data)
  }

  const createTableHeader = (row) => {
    const headers = []
    if (row) {
      for (const key in row) {
        headers.push(key)
      }
      setTableHeaders(headers)
    }
  }

  const handleDelete = (index) => {
    const tempData = [...tableRows]
    tempData.splice(index, 1)
    setTableRows(tempData)
  }

  return (
    <div title="upload-modal">
      {buttonComponent ? (
        <div title="custom-init-button" onClick={openModal}>
          {' '}
          {buttonComponent}{' '}
        </div>
      ) : (
        <button
          title="default-init-button"
          onClick={openModal}
          className="modal-open-btn"
        >
          Upload Files
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="File Upload Modal"
      >
        <div title="modal-wrapper" className="row">
          <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
            <FileReaderInput as={'url'} onChange={handleFileUpload}>
              <button title="choose-file" className="upload-btn">
                Choose File
              </button>
            </FileReaderInput>
          </div>
        </div>
        <Table
          handleDelete={handleDelete}
          tableHeaders={tableHeaders}
          tableRows={tableRows}
          closeModal={closeModal}
          onSave={onSave}
        />
      </Modal>
    </div>
  )
}

UploadModal.propTypes = {
  buttonComponent: PropTypes.node,
  onSave: PropTypes.func.isRequired,
}

export default UploadModal
