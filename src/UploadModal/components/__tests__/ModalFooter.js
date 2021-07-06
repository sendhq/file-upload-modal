import { render, fireEvent } from '@testing-library/react'
import ModalFooter from '../ModalFooter'

describe('Modal Footer', () => {
  it('renders the modal footer', () => {
    const { queryByTitle } = render(
      <ModalFooter closeModal={() => {}} handleSave={() => {}} showSave={false} />,
    )
    const modalFooterContainer = queryByTitle('table-action-btns')
    expect(modalFooterContainer).toBeInTheDocument()
  })

  it('it renders the close button', () => {
    const { queryByTitle } = render(
      <ModalFooter closeModal={() => {}} handleSave={() => {}} showSave={false} />,
    )
    const tableclosebtn = queryByTitle('close-modal')
    expect(tableclosebtn).toBeInTheDocument()
  })

  it('it renders the save button', () => {
    const { queryByTitle } = render(
      <ModalFooter closeModal={() => {}} handleSave={() => {}} showSave={true} />,
    )
    const tablesavebtn = queryByTitle('save-updates')
    expect(tablesavebtn).toBeInTheDocument()
  })

  it('it does not render the save button because showSave is false', () => {
    const { queryByTitle } = render(
      <ModalFooter closeModal={() => {}} handleSave={() => {}} showSave={false} />,
    )
    const tablesavebtn = queryByTitle('save-updates')
    expect(tablesavebtn).not.toBeInTheDocument()
  })

  it('calls onSave function when save is clicked', () => {
    const SAVE_FUNC = jest.fn()
    const { queryByTitle } = render(
      <ModalFooter closeModal={() => {}} handleSave={SAVE_FUNC} showSave={true} />,
    )
    const tablesavebtn = queryByTitle('save-updates')
    fireEvent.click(tablesavebtn)
    expect(SAVE_FUNC).toHaveBeenCalled()
  })

  it('calls closeModal function when close is clicked', () => {
    const CLOSE_FUNC = jest.fn()
    const { queryByTitle } = render(
      <ModalFooter closeModal={CLOSE_FUNC} handleSave={() => {}} showSave={true} />,
    )
    const tablesavebtn = queryByTitle('close-modal')
    fireEvent.click(tablesavebtn)
    expect(CLOSE_FUNC).toHaveBeenCalled()
  })
})
