import { render, fireEvent } from '@testing-library/react'
import Table from '../Table'

describe('Upload Table', () => {
  it('renders table wrapper', () => {
    const { queryByTitle } = render(
      <Table onSave={() => {}} tableHeaders={[]} tableRows={[]} />,
    )
    const table = queryByTitle('table-wrapper')
    expect(table).toBeInTheDocument()
  })

  it('shows empty component when no data is provided', () => {
    const { queryByTitle } = render(
      <Table onSave={() => {}} tableHeaders={[]} tableRows={[]} />,
    )
    const emptyState = queryByTitle('empty-state')
    expect(emptyState).toBeInTheDocument()
  })

  it('does not show empty state when headers are available', () => {
    const { queryByTitle } = render(
      <Table
        onSave={() => {}}
        tableHeaders={['Email']}
        tableRows={[{ email: 'test@test.ng' }]}
      />,
    )
    const emptyState = queryByTitle('empty-state')
    const table = queryByTitle('table')
    expect(emptyState).not.toBeInTheDocument()
    expect(table).toBeInTheDocument()
  })

  it('renders accurate number of rows', () => {
    const rows = [
      { email: 'test@test.ng' },
      { email: 'test@test.ng' },
      { email: 'test@test.ng' },
      { email: 'test@test.ng' },
    ]
    const { queryAllByTitle } = render(
      <Table onSave={() => {}} tableHeaders={['Email']} tableRows={rows} />,
    )
    const tableRows = queryAllByTitle('table-row')
    expect(tableRows.length).toBe(4)
  })
})
