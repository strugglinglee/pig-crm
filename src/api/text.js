import api from './init-api'

//api路径
const url={
  textList: '/api/texts',
  deleteText: id => `/api/text/delete/${id}`,
  updateText: `/api/text/update`,
  addText: '/api/text/add'
}

export const getTextList= (params={}) => {
  return api.get(url.textList, {params}).then(res=>res.data)
}

export const deleteText= (id) => {
  return api.delete(url.deleteText(id)).then(res=>res.data)
}

export const updateText= (param) => {
  return api.put(url.updateText, param).then(res=>res.data)
}

export const addText= (param) => {
  return api.post(url.addText, param).then(res=>res.data)
}
