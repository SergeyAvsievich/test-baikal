import { db } from "./db.js"

function renderOptions(data) {
    const $select = document.querySelector('.form-select')
    const html = data.map(option => {
        return `
            <option value="${option.id}">${option.name}</option>
        `
    }).join('')

    $select.innerHTML += html
}

db.getNameAllCategory(renderOptions)


window.onload = function () {
    const inpCategory = document.querySelector('#inputName')
    const selectParentCategory = document.querySelector('#select-categoty')

    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.addEventListener('click', e => {
        e.preventDefault()
        const params = `newcategory=${inpCategory.value}&select-category=${selectParentCategory.value}`
        db.createCategory(params)
    })
}

