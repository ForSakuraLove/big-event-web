import request from '@/util/request.js';

export function getArticleListService(params) {
    return request.get('/article', { params: params })
}

export function addArticleService(articleData) {
    return request.post('/article', articleData)
}

export function articleCategoryService() {
    return request.get('/category')
}
export function addCategoryService(categoryData) {
    return request.post('/category', categoryData)
}

export function updateCategoryService(categoryData) {
    return request.put('/category', categoryData)
}

export function deleteCategoryService(id) {
    return request.delete('/category?id=' + id)
}

export function updateArticleService(articleData) {
    return request.put('/article', articleData)
}

export function deleteArticleService(id) {
    return request.delete('/article?id=' + id)
}