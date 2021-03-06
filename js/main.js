import { db } from './db.js'

function renderCategoryList(data) {
    const html = data.map(el => {
        if (!el.parentId) {
            return `
                <li class="category-item" data-id="${el.id}">
                    <span data-last-el>${el.name}</span>
                </li>
            `
        }
    }).join('')

    document.querySelector('.categories').innerHTML = html
    clickCategoryHandler(data)
}

function clickCategoryHandler(data) {
    const categories = document.querySelectorAll('li[data-id] span')

    for (let i = 0; i < categories.length; i++) {
        categories[i].addEventListener('click', (e) => {
            const id = e.target.parentNode.dataset.id
            renderSubCategories(id, data)
        })
    }
}

function renderSubCategories(id, data) {
    const $el = document.querySelector(`li[data-id="${id}"]`)
    const firstChildren = Array.from($el.children)[0]
    const textContent = firstChildren.textContent.trim()
    const lastNestedCategories = lastNested–°ategories(data, textContent)
    let isOpened = firstChildren.hasAttribute('data-open')
    if (!lastNestedCategories && !isOpened) {
        const $ul = document.createElement('ul')
        $ul.classList.add('categories')
        $ul.innerHTML = `
            ${data.map(el => {
            if (el.parentId === +id) {
                return `
                    <li 
                        class="category-item" 
                        data-id="${el.id}">
                        <span>
                            ${el.name}
                        </span>
                    </li>
        `}
        }).join('')}`

        $el.append($ul)
        firstChildren.setAttribute('data-open', 'true')
    } else if (isOpened) {
        menuToggle($el, data)
    }
    clickGetDetailHandler($el, data)
}

function menuToggle($el) {
    if ($el.children[1]) {
        $el.children[1].remove()
        $el.children[0].removeAttribute('data-open')
    }
}

function lastNested–°ategories(data, categoryName) {
    const categories = []

    for (let i = 0; i < data.length; i++) {
        let isLastNested–°ategory = true
        for (let j = 1; j < data.length; j++) {
            if (data[i].id === data[j].parentId) {
                isLastNested–°ategory = false
            }
        }
        if (isLastNested–°ategory) categories.push(data[i].name)
    }

    return categories.includes(categoryName)
}

function clickGetDetailHandler($el, data) {
    let categories
    if ($el.children[1]) {
        categories = $el.children[1].querySelectorAll('li[data-id] span')
    }
    const firstChildren = Array.from($el.children)[0]
    const textContent = firstChildren.textContent.trim()
    const isLastNested–°ategory = lastNested–°ategories(data, textContent)

    if (!isLastNested–°ategory && categories) {
        for (let i = 0; i < categories.length; i++) {
            categories[i].addEventListener('click', (e) => {
                const id = e.target.parentNode.dataset.id
                renderSubCategories(id, data)
            })
        }
    } else if (isLastNested–°ategory && !categories) {
        db.getDataByCategory(textContent)
            .then(data => renderProducts(data))
            .catch(e => console.error(e))
    }


}

db.getNameAllCategory(renderCategoryList)

function renderProducts(data) {
    const html = `
        <h3 class="my-3">${data.title}</h3>
        <div class="row text-center">
            ${data.details.map(detail => {
        return `
        <div class="col-md-4 mt-3">
            <div class="card" style="width: 14rem;">
                <img src="/img/${detail.path}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">
                        ${detail.name}
                    </p>
                </div>
            </div>
        </div>
                
        `
    }).join('')}       
        </div>
    `
    document.querySelector('.product-catalog').innerHTML = html
}