const fileInput = document.getElementById('image')

const upload = (e) => {
    const files = e.target.files
    for(const file of files) {
        console.log(file)
    }

}

fileInput.addEventListener('change', upload)