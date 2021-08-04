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
  },
  //讲师删除方法
  DataTeacherById(id){
    return request({
      url: `/eduservice/teacher/${id}`,
       // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
       method: 'delete',
     })
  },
  //添加讲师
  addTeacher(teacher){
    return request({
      url: `/eduservice/teacher/addTeacher`,
       // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
       method: 'post',
       data:teacher
     })
  },
  //根据id得到讲师
  getTeacherInfo(id){
    return request({
      url: `/eduservice/teacher/find/${id}`,
       // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
       method: 'get',
     })
  },
  //根据id查询讲师
  getTeacherInfo(id){
    return request({
      url: `/eduservice/teacher/find/${id}`,
       // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
       method: 'get',
     })
  },
  //讲师修改
  updateTeacher(teacher){
    return request({
      url: `/eduservice/teacher/updateTeacher`,
       // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
       method: 'post',
       data:teacher
    })
  },

}
