import $http from '../utils/http'
const CommonService = {}
// 获取书籍列表
CommonService.getBookList = function () {
  return $http.post('/api/book/list')
}
// 获取某一本书的目录
CommonService.getBookContents = function (_id, sort) {
  return $http.post('/api/book/chapterList', {bookid: _id, sort: sort})
}
// 获取某一话
CommonService.getBookDetails = function (_id) {
  return $http.post('/api/chapter/detail', {id: _id})
}
// 根据no和bookid获取下一话或者上一话的详情
CommonService.getBookDetailsByNoAndId = function (_id, no) {
  return $http.post('/api/chapter/detail', {bookid: _id, no: no})
}
export default CommonService
