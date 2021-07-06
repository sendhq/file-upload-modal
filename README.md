## File Upload Modal 

Select a csv file, preview, edit and/or delete rows before submitting. 

![file-upload-modal](https://github.com/sendhq/file-upload-modal/blob/master/file-modal-upload.gif)

### Installation

`yarn add file-upload-modal react-file-reader-input react-modal csvtojson`

### Usage
```
import UploadModal from 'file-upload-modal'

export const Upload = () => {
    const handleSave = (data) => {
        console.log(data)
    }
    return (
        <UploadModal onSave={handleSave} />
    )
}
```

### Props
| Name      | Description |
| ----------- | ----------- |
| onSave (required)      | A function to receive the data (as json) of the selected file after editing |
| buttonComponent (optional)   | A button component to be rendered instead of the default button component |