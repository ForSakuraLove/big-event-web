<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { addCategoryService, articleCategoryService, updateCategoryService, deleteCategoryService } from '@/api/article.js'
import { ElMessage, ElMessageBox } from 'element-plus'
const categorys = ref([])

const articleCotegoryList = async () => {
    let result = await articleCategoryService()
    categorys.value = result.data
}

articleCotegoryList()

//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const categoryModel = ref({
    categoryName: '',
    categoryAlias: ''
})
//添加分类表单校验
const rules = {
    categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    categoryAlias: [
        { required: true, message: '请输入分类别名', trigger: 'blur' },
    ]
}

const validateDialogForm = () => {
    if (!categoryModel.value.categoryName) {
        ElMessage.error('分类名称不能为空');
        return false;
    }
    if (!categoryModel.value.categoryAlias) {
        ElMessage.error('分类别名不能为空');
        return false;
    }
    return true; // 如果验证通过，返回 true
}


const addCategory = async () => {
    const valid = validateDialogForm()
    if (valid) {
        await addCategoryService(categoryModel.value)
        clearDialog()
        ElMessage.success('添加成功')
        articleCotegoryList()
    }
}

const title = ref('')

const showDialog = (row) => {
    categoryModel.value = { categoryName: row.categoryName, categoryAlias: row.categoryAlias }
    categoryModel.value.id = row.id
    dialogVisible.value = true
    title.value = '编辑分类'
}

const clearDialog = () => {
    categoryModel.value = { categoryName: '', categoryAlias: '' }
    dialogVisible.value = false
}

const updateCategory = async () => {
    const valid = validateDialogForm()
    if (valid) {
        await updateCategoryService(categoryModel.value)
        clearDialog()
        ElMessage.success('更新成功')
        articleCotegoryList()
    }
}

const deleteDialog = (row) => {
    ElMessageBox.confirm(
        `确定要删除${row.categoryName}分类吗?`,
        '删除分类确认',
        {
            confirmButtonText: '确认删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            await deleteCategoryService(row.id)
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            articleCotegoryList()
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分类</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogVisible = true, title = '添加分类'">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
            <el-table-column label="操作" width="100">

                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteDialog(row)"></el-button>
                </template>
            </el-table-column>

            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 添加分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="分类别名" prop="categoryAlias">
                    <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="clearDialog">取消</el-button>
                    <el-button type="primary" @click="title == '添加分类' ? addCategory() : updateCategory()"> 确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>