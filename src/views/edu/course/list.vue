<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="课程名称">
        <el-input v-model="CourseVo.title" placeholder="请输入课程名称" />
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="CourseVo.begtn"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="CourseVo.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getlist()"
        >查询
      </el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="名称" />
      <el-table-column prop="teacherName" label="讲师名称" />
      <el-table-column prop="subjectName" label="科目" />
      <el-table-column prop="subjectName" label="技术" width="80" />
      <el-table-column prop="price" label="价格" width="80" />
      <el-table-column prop="lessonNum" label="课时" width="80" />
      <el-table-column prop="buyCount" label="销售数量" width="80" />
      <el-table-column prop="viewCount" label="浏览数量" />
      <el-table-column label="课程状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status == "Draft" ? "未发布" : "已发布" }}
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改
            </el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getlist"
    />
  </div>
</template>
<script>
import course from "@/api/edu/course";

export default {
  //写入核心代码
  data() {
    return {
      list: null,
      total: 0,
      page: 1,
      limit: 5,
      CourseVo:{
       
      },
    };
  },
  created() {
    this.getlist();
  },
  methods: {

    //讲师列表方法
    getlist(page = 1) {
      this.page = page;
      course
        .getAllCourse(this.page, this.limit, this.CourseVo)
        .then((response) => {
          this.list = response.data.addAllController.list;
          this.total = response.data.addAllController.total;
        }); //请求成功
    },
    //讲师删除犯法
    removeDataById(id) {
      this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          course.DataCourseById(id)
            .then((response) => {
              this.getlist()
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
    },
    //清空的方法
    resetData() {
      this.CourseVo = {};
      this.getlist();
    },
  },
};
</script>