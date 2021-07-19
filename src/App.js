import UploadModal from '../src/UploadModal'

function App() {
  const handleSave = (data) => {
    console.log(data)
  }
  return <UploadModal onSave={handleSave} />
}

export default App
