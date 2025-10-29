const fileInput = document.getElementById('image')
const userMessages = document.getElementById('uploadMessages')

// Note: Unsigned upload for demo purposes only
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

        const data = await response.json()
        return { success: true, url: data.secure_url, fileName: file.name }
    } catch (error) {
            return { success: false, error: error.message, fileName: file.name }
    }
}


const cloudinaryUpload = async (files) => {
    if (!userMessages) return
    userMessages.innerHTML = ''

    const form = document.getElementById('uploadForm')
    const uploads = await Promise.all([...files].map(uploadImage))

    uploads.forEach(result => {
        const message = document.createElement('p')
        if (result.error) {
            message.textContent = `Failed to upload ${result.fileName}`
            
        } else {
            message.textContent = `${result.fileName} successfully uploaded`

            const input = document.createElement('input')
            input.type = 'hidden'
            input.name = 'images'
            input.value = result.url
            form.appendChild(input)
        }
        userMessages.appendChild(message)
    })

}
