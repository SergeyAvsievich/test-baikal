import { db } from './db.js'

function renderOptions(data) {
    const $select = document.querySelector('.form-select')
    const categories = []

    for (let i = 0; i < data.length; i++) {
        let isLastNested–°ategory = true
        for (let j = 1; j < data.length; j++) {
            if (data[i].id === data[j].parentId) {
                isLastNested–°ategory = false
            }
        }
        if (isLastNested–°ategory) categories.push(data[i])
    }

    const html = categories.map(option => {
        return `
            <option value="${option.id}">${option.name}</option>
        `
    }).join('')

    $select.innerHTML += html
}

db.getNameAllCategory(renderOptions)