// 1. функция для полуечниея всех категории по имени
function getNameAllCategory(fn) {
    const request = new XMLHttpRequest()
    const params = 'getNameAllCategory=getNameAllCategory'

    request.onload = function () {
        if (request.readyState == 4 && request.status === 200) {
            fn(JSON.parse(request.response))
        }
    }

    request.open('POST', `../db/reducer.php`)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.send(params)
}

// 2. функция для получение данных по имени категории
function getDataByCategory(name) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest()
        const params = `categoryName=${name}&getDataByCategory=getDataByCategory`

        request.open('GET', `../db/reducer.php?${params}`)

        request.onload = () => {
            if (request.status >= 400) {
                reject(request.response)
            } else {
                resolve(request.response)
            }
        }

        request.onerror = () => {
            reject(request.response)
        }

        request.responseType = 'json'

        request.send()
    })
}

// 3. функция создания категории
function createCategory(params) {
    const request = new XMLHttpRequest()

    request.load = function () {
        if (request.readyState == 4 && request.status === 200) {
            alert('Вы добавили новую категорию')
        }
    }

    request.onerror = () => {
        throw new Error("Что-то пошло не так...")
    }

    request.open('POST', `../db/reducer.php`)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.send(params)
}

export const db = {
    getNameAllCategory,
    getDataByCategory,
    createCategory,
}