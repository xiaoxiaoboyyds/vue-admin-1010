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
  addCouseInfo(courseInfo) {
    return request({
      url: '/eduservice/edu_course/addCourseInfo',
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'post',
      //条件对象
      //data表示把对象转换json进行传递到接口里面
      data: courseInfo
    })
  },
  getList() {
    return request({
      url: `/eduservice/teacher/findAll`,
      method: 'get'
    })
  },
  //根据课程id查询基本信息
  selectCourseById(courseId) {
    return request({
      url: `/eduservice/edu_course/getCourseInfo/${courseId}`,
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'get',
      //条件对象
      //data表示把对象转换json进行传递到接口里面
      // data:courseInfo
    })
  },
  //修改基本信息
 updateCourseById(courseInfo) {
    return request({
      url: "/eduservice/edu_course/updateCourseInfo",
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'post',
      //条件对象
      //data表示把对象转换json进行传递到接口里面
      data:courseInfo
    })
  },
  //课程确认信息显示
  getPubilCourseInfo(id){
    return request({
      url: `/eduservice/edu_course/getCouse/${id}`,
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'get',
      //条件对象
      //data表示把对象转换json进行传递到接口里面
      
    })
  },
  publishCourse(id){
    return request({
      url: `/eduservice/edu_course/publishCourse/${id}`,
      method: 'get'  
    })
  },
  //分页条件查询所有课程
    getAllCourse(current,limit,courseVo) {
      return request({
       url: `/eduservice/edu_course/getAllCourse/${current}/${limit}`,
        // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
        method: 'post',
        //条件对象
        //data表示把对象转换json进行传递到接口里面
        data: courseVo
      })
    },
    //删除课程
    DataCourseById(id){
      return request({
        url: `/eduservice/edu_course/deleteCourse/${id}`,
         // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
         method: 'delete',
       })
    },
}
