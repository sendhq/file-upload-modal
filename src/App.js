import UploadModal from 'file-upload-modal'

function App() {
  const handleSave = (data) => {
    console.log(data)
  }
  return <UploadModal onSave={handleSave} />
}

export default App
