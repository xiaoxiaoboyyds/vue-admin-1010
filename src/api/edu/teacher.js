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
  getTeacherListPage(current,limit,teacherQuery) {
    return request({
     url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'post',
      //条件对象
      //data表示把对象转换json进行传递到接口里面
      data: teacherQuery
    })
  }
}
