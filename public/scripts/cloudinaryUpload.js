const fileInput = document.getElementById('image')

const URL = 'https://api.cloudinary.com/v1_1/dh0z1a9nd/image/upload'

const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "DayTripper")

    const response = await fetch(URL, {
        method:"POST",
        body: formData
    })

    return response.json()
}


const upload = async (e) => {
    const files = [...e.target.files]
    const uploads = await Promise.all(files.map(file => uploadImage(file)))
    console.log(uploads)

}

fileInput.addEventListener('change', upload)