import { render, fireEvent } from '@testing-library/react'
import Modal from 'react-modal'
import UploadModal from '../UploadModal'

Modal.setAppElement(document.createElement('div'))

describe('Upload Modal', () => {
  it('renders the modal container', () => {
    const { queryByTitle } = render(<UploadModal onSave={() => {}} />)
    const modalContainer = queryByTitle('upload-modal')
    expect(modalContainer).toBeInTheDocument()
  })

  it('it renders the default init button', () => {
    const { queryByTitle } = render(<UploadModal onSave={() => {}} />)
    const btn = queryByTitle('default-init-button')
    expect(btn).toBeInTheDocument()
    const btn2 = queryByTitle('custom-init-button')
    expect(btn2).not.toBeInTheDocument()
  })

  it('it renders the custom init button', () => {
    const { queryByTitle } = render(
      <UploadModal buttonComponent={<button>Upload</button>} onSave={() => {}} />,
    )
    const btn = queryByTitle('custom-init-button')
    expect(btn).toBeInTheDocument()
    const btn2 = queryByTitle('default-init-button')
    expect(btn2).not.toBeInTheDocument()
  })

  it('renders modal', () => {
    const { queryByTitle } = render(<UploadModal onSave={() => {}} />)
    const btn = queryByTitle('default-init-button')
    let modal = queryByTitle('modal-wrapper')
    expect(modal).not.toBeInTheDocument()
    fireEvent.click(btn)
    modal = queryByTitle('modal-wrapper')
    expect(modal).toBeInTheDocument()
  })

  it('renders choose file button', () => {
    const { queryByTitle } = render(<UploadModal onSave={() => {}} />)
    const btn = queryByTitle('default-init-button')
    fireEvent.click(btn)
    const uploadBtn = queryByTitle('choose-file')
    expect(uploadBtn).toBeInTheDocument()
    const table = queryByTitle('table-wrapper')
    expect(table).toBeInTheDocument()
  })

  it('renders table wrapper', () => {
    const { queryByTitle } = render(<UploadModal onSave={() => {}} />)
    const btn = queryByTitle('default-init-button')
    fireEvent.click(btn)
    const table = queryByTitle('table-wrapper')
    expect(table).toBeInTheDocument()
  })
})
