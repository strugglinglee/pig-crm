import api from './init-api'

//api路径
const url={
  categoryList: '/api/categories',
  deleteCategory: id => `/api/category/delete/${id}`,
  updateCategory: `/api/category/update`,
  addCategory: '/api/category/add'
}

export const getCategoryList= (params={}) => {
  return api.get(url.categoryList, {params}).then(res=>res.data)
}

export const deleteCategory= (id) => {
  return api.delete(url.deleteCategory(id)).then(res=>res.data)
}

export const updateCategory= (param) => {
  return api.put(url.updateCategory, param).then(res=>res.data)
}

export const addCategory= (param) => {
  return api.post(url.addCategory, param).then(res=>res.data)
}
