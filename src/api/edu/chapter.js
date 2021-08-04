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
  addAllChapterVideo(courseId) {
    return request({
     url: `/eduservice/chapter/getChapterVideo/${courseId}`,
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'get',
      //条件对象
      //data表示把对象转换json进行传递到接口里面

    })
  },
  //添加章节
  addChapter(chapter) {
    return request({
     url: `/eduservice/chapter/addChapter`,
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'post',
      //条件对象
      //data表示把对象转换json进行传递到接口里面
data:chapter
    })
  },
  //根据id查询章节
  getChapter(chapterId) {
    return request({
     url: `/eduservice/chapter/getChapterInfo/${chapterId}`,
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'get',
      //条件对象
      //data表示把对象转换json进行传递到接口里面
    })
  },
  //修改章节
  updateChapter(chapter) {
    return request({
     url: `/eduservice/chapter/updateChapter`,
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'post',
      //条件对象
      //data表示把对象转换json进行传递到接口里面
data:chapter
    })
  },
  //删除章节
  deleteChapter(chapterId) {
    return request({
     url: `/eduservice/chapter/${chapterId}`,
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'delete',
  
    })
  },
} 