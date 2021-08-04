import request from '@/utils/request'

// export function getList(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }
export default {
  //讲师列表（条件查询分页）
  getSubjectList() {
    return request({
     url: '/eduservice/subject/getAllSubject',
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'get',
      //条件对象
      //data表示把对象转换json进行传递到接口里面
      
    })
  },
  
}
