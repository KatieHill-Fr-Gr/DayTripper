const fileInput = document.getElementById('image')
const userMessages = document.getElementById('uploadMessages')

// Note: This is an unsigned upload for demo purposes only
const URL = 'https://api.cloudinary.com/v1_1/dh0z1a9nd/image/upload'

const uploadImage = async (file) => {
    try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "DayTripper")

        const response = await fetch(URL, {
            method: "POST",
            body: formData
        })

        if (!response.ok) {
            throw new Error(`Upload failed with status ${response.status}`)
        }

        return response.json()

    } catch (error) {
    console.log('Error uploading file'. error)
    return { error: error.message }
        }
}


const upload = async (e) => {
    userMessages.innerHTML = ''
    const files = [...e.target.files]
    const uploads = await Promise.all(files.map(file => uploadImage(file)))

    uploads.forEach(result => {
        const message = document.createElement('p')
        if (result.error) {
            message.textContent = `Failed to upload  ${result.fileName} || 'file'`
            
        } else {
            message.textContent = `${result.fileName} || 'file' successfully uploaded`
        }
    })

    console.log(uploads)

}

fileInput.addEventListener('change', upload)