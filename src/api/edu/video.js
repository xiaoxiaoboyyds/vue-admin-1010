import request from '@/utils/request'

// export function getList(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }
export default {
  //添加小节
  addVideo(video) {
    return request({
     url: `/eduservice/video/addVideo`,
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'post',
      //条件对象
      //data表示把对象转换json进行传递到接口里面
        data:video
    })
  },
  //根据id查询章节
  getVideo(videoId) {
    return request({
     url: `/eduservice/video/getVideo/${videoId}`,
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'get',
      //条件对象
      //data表示把对象转换json进行传递到接口里面
    })
  },
  //修改章节
  updateVideo(video) {
    return request({
     url: `/eduservice/video/updateByid`,
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'post',
      //条件对象
      //data表示把对象转换json进行传递到接口里面
data:video
    })
  },
  //删除章节
  deleteChapter(videoId) {
    return request({
     url: `/eduservice/video/${videoId}`,
      // url:" /eduservice/teacher/pageTeacherCondition/"+current+"/"+limit,
      method: 'delete',
  
    })
  },
} 