<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>
      <!-- 一级分类  -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
          @change="changeTwoSubject"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <!-- 二级分类  -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subjectList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/eduoss/fileoss'"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate()"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";
import Tinymce from "@/components/Tinymce";
export default {
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: {
        cover: "/static/01.jpg",
      },
      teacherList: [], // 讲师列表
      subjectOneList: [],
      subjectList: [],
      BASE_API: process.env.BASE_API, // 接口API地址
      courseId:''
    };
  },
  created() {
     if(this.$route.params && this.$route.params.id ){
       this.courseId=this.$route.params.id;
       //根据id查询
       this.getinfo()
     }else{

    //初始化一级分类
    this.getOneSubject();
     }
      //初始化讲师
    this.getListTeacher()
  },
  methods: {
    //根据id查询
    getinfo(){
      course.selectCourseById(this.courseId)
      .then(response=>{
        this.courseInfo=response.data.courseInfoVo
        //查询出所有一级分类和二级分类
        subject.getSubjectList()
        .then(response=>{
          //获取所有一级分类
         this.subjectOneList= response.data.list
         //把所数组进行遍历，比较二级分了
         for(var i=0; this.subjectOneList.length;i++){
           var oneSubject =this.subjectOneList[i]
           if(this.courseInfo.subjectParentId==oneSubject.id){
             //获取二级分类
             this.subjectList=oneSubject.children
           }
         }
        })
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      console.log(res); // 上传响应
      console.log(URL.createObjectURL(file.raw)); // base64编码
      this.courseInfo.cover = res.data.url;
    },
    changeTwoSubject(value) {
      for (let i = 0; i < this.subjectOneList.length; i++) {
        if (this.subjectOneList[i].id === value) {
          this.subjectList = this.subjectOneList[i].children;
          this.courseInfo.teacherId = "";
        }
      }
    },
    getOneSubject() {
      subject.getSubjectList().then((response) => {
        this.subjectOneList = response.data.list;
      });
    },
    getListTeacher() {
      course.getList().then((response) => {
        this.teacherList = response.data.items;
      });
    },
    //添加课程方法
    addCourse(){
   course.addCouseInfo(this.courseInfo).then((response) => {
        //提示信息
        this.$message({
          type: "success",
          message: "添加课程基础信息成功",
        });
        this.$router.push({
          path: "/course/chapter/" + response.data.courseId,
        });
      });
    },
    updateCourse(){
      course.updateCourseById(this.courseInfo)
      .then(response=>{
             this.$message({
          type: "success",
          message: "修改课程基础信息成功",
        });
        this.$router.push({
          path: "/course/chapter/" + this.courseId,
        });
      })
    },
//     saveOrUpdate(){
// //         if(!this.courseInfo.id){
// // this.addCourse()
// //         }else{

// // this.updateCourse()
// //         }
// alert("222")
// //  this.addCourse
//     }
saveOrUpdate(){
         if(!this.courseInfo.id){
this.addCourse()
        }else{

this.updateCourse()
        }

 this.addCourse
    }
}

}

</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>