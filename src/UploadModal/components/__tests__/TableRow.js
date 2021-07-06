import { render, fireEvent } from '@testing-library/react'
import TableRow from '../TableRow'

const DEFAULT_FUNCS = {
  handleChange: () => {},
  handleDelete: () => {},
  cancelEdit: () => {},
  handleSubmit: () => {},
  handleEdit: () => {},
  index: 0,
}

describe('Table Row', () => {
  it('renders accurate row value', () => {
    const email = 'test@test.ng'
    const ROW = { editing: false, email }
    const { queryByTitle } = render(
      <TableRow {...DEFAULT_FUNCS} row={ROW} editing={false} />,
    )
    const p = queryByTitle('row-text')
    expect(p).toBeInTheDocument()
    expect(p.innerHTML).toBe(email)
  })

  it('renders matching number of p tags', () => {
    const email = 'test@test.ng'
    const ROW = { editing: false, email, name: 'John Doe', phone: '090910' }
    const { queryAllByTitle } = render(
      <TableRow {...DEFAULT_FUNCS} row={ROW} editing={false} />,
    )
    const p = queryAllByTitle('row-text')
    expect(p.length).toBe(3)
  })

  it('renders input when editing row', () => {
    const email = 'test@test.ng'
    const ROW = { editing: true, email }
    const { queryByTitle } = render(
      <TableRow
        {...DEFAULT_FUNCS}
        handleChange={() => {}}
        row={ROW}
        editing={true}
        rowToEdit={ROW}
      />,
    )
    const input = queryByTitle('row-input')
    expect(input).toBeInTheDocument()
    expect(input.value).toBe(email)
  })

  it('renders edit actions when editing a row', () => {
    const email = 'test@test.ng'
    const ROW = { editing: true, email }
    const { queryByTitle } = render(
      <TableRow
        {...DEFAULT_FUNCS}
        handleChange={() => {}}
        row={ROW}
        editing={true}
        rowToEdit={ROW}
      />,
    )
    const editActions = queryByTitle('edit-actions')
    expect(editActions).toBeInTheDocument()
  })

  it('does not render edit actions when not editing a row', () => {
    const email = 'test@test.ng'
    const ROW = { editing: false, email }
    const { queryByTitle } = render(
      <TableRow
        {...DEFAULT_FUNCS}
        handleChange={() => {}}
        row={ROW}
        editing={false}
        rowToEdit={ROW}
      />,
    )
    const editActions = queryByTitle('edit-actions')
    expect(editActions).not.toBeInTheDocument()
  })

  it('renders non-edit actions when not editing a row', () => {
    const email = 'test@test.ng'
    const ROW = { editing: false, email }
    const { queryByTitle } = render(
      <TableRow
        {...DEFAULT_FUNCS}
        handleChange={() => {}}
        row={ROW}
        editing={false}
        rowToEdit={ROW}
      />,
    )
    const actions = queryByTitle('non-edit-actions')
    expect(actions).toBeInTheDocument()
  })

  it('calls appropriate edit functions when clicked', () => {
    const email = 'test@test.ng'
    const ROW = { editing: true, email }
    const CHANGE_FUNC = jest.fn()
    const SUBMIT_FUNC = jest.fn()
    const CANCEL_EDIT_FUNC = jest.fn()
    const INDEX = 0
    const { queryByTitle } = render(
      <TableRow
        {...DEFAULT_FUNCS}
        handleChange={CHANGE_FUNC}
        handleSubmit={SUBMIT_FUNC}
        cancelEdit={CANCEL_EDIT_FUNC}
        row={ROW}
        index={INDEX}
        editing={true}
        rowToEdit={ROW}
      />,
    )
    const saveBtn = queryByTitle('action-save')
    const cancelBtn = queryByTitle('action-cancel')
    const input = queryByTitle('row-input')

    fireEvent.click(saveBtn)
    expect(SUBMIT_FUNC).toBeCalledWith(INDEX)

    fireEvent.click(cancelBtn)
    expect(CANCEL_EDIT_FUNC).toBeCalledWith(ROW, INDEX)

    fireEvent.change(input, { target: { value: 'test' } })
    expect(CHANGE_FUNC).toHaveBeenCalled()
  })

  it('calls appropriate non-edit functions when clicked', () => {
    const email = 'test@test.ng'
    const ROW = { editing: false, email }
    const DELETE_FUNC = jest.fn()
    const EDIT_FUNC = jest.fn()
    const INDEX = 0
    const { queryByTitle } = render(
      <TableRow
        {...DEFAULT_FUNCS}
        handleDelete={DELETE_FUNC}
        handleEdit={EDIT_FUNC}
        row={ROW}
        index={INDEX}
        editing={false}
        rowToEdit={ROW}
      />,
    )
    const editBtn = queryByTitle('action-edit')
    const deleteBtn = queryByTitle('action-delete')

    fireEvent.click(deleteBtn)
    expect(DELETE_FUNC).toBeCalledWith(INDEX)

    fireEvent.click(editBtn)
    expect(EDIT_FUNC).toBeCalledWith(ROW, INDEX)
  })
})
