<template>
    <div style="width: 70%;margin-top: 5%">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-dynamic"
      >
        <el-form-item
          style="width: 49%"
          label="昵称修改"
          prop="alias"
          :rules="[
              { required: true, message: '请注意昵称长度在3~15个字符', trigger: 'blur' },
              { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
            ]"
        >
          <el-input v-model="ruleForm.alias"></el-input>
        </el-form-item>
    
        <el-form-item
          style="width: 49%"
          label="社区编号"
          prop="community_id"
          :rules="[
              { required: false, message: '请注意长度在3~20个字符', trigger: 'blur' },
              { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
            ]"
        >
          <el-input v-model="ruleForm.community_id"></el-input>
        </el-form-item>
    
        <el-form-item
          style="width: 60%"
          label="紧急联系人"
          prop="emergency_call"
          :rules="[
          { required: true, message: '请输入紧急联系方式', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的电话号码', trigger: 'blur' }
        ]"
        >
          <el-input v-model="ruleForm.emergency_call"></el-input>
        </el-form-item>

        <el-form-item
          style="width: 80%"
          label="家庭住址"
          prop="address"
          :rules="[
              { required: false, message: '请输入家庭住址', trigger: 'blur' },
              { min: 0, max: 30, message: '请注意长度不能超过30个字符', trigger: 'blur' }
            ]"
        >
          <el-input type="textarea" style="height: 100px;resize: none" v-model="ruleForm.address"></el-input>
        </el-form-item>
    
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交修改</el-button>
    
        </el-form-item>
      </el-form>
    </div>
    </template>
    
    <script>
    export default {
      name: "infoeditor",
      data() {
        return {
          ruleForm: {
            alias: '',
            address: '',
            community_id: '',
            emergency_call: '',
    
          },
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('提交成功!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
    
      }
    
    }
    </script>
    
    <style scoped>
    
    </style>