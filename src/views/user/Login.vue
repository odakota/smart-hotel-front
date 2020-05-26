<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="Username"
          v-decorator="[
            'username',
            {rules: [{ required: true, message: 'Username required' }], validateTrigger: 'change'}
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="Password"
          v-decorator="[
            'password',
            {rules: [{ required: true, message: 'Password required' }], validateTrigger: 'blur'}
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">Remember me</a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >Forget password
        </router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >Submit
        </a-button>
      </a-form-item>
    </a-form>

    <a-modal
      :title="title"
      :width="800"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel"
      wrapClassName="ant-modal-cust-warp"
      style="top:5%;height: 85%;overflow-y: hidden"
    >
      <a-table
        ref="table"
        size="default"
        rowKey="hotelId"
        :columns="columns"
        :data-source="dataSource"
        showPagination="auto"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleSelect(record)" style="text-decoration: underline">{{ text }}&nbsp;&nbsp;&nbsp;</a>
        </span>
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { timeFix } from '@/utils/util'
  import { login, loginSpecial } from '@/api/api'

  export default {
    data () {
      return {
        loginBtn: false,
        isLoginError: false,
        title: 'Select Hotel',
        visible: false,
        dataSource: [],
        model: {},
        columns: [
          {
            title: '#',
            scopedSlots: { customRender: 'serial' }
          },
          {
            title: 'Code',
            dataIndex: 'code'
          },
          {
            title: 'Name',
            dataIndex: 'name',
            scopedSlots: { customRender: 'action' }
          }
        ],
        confirmLoading: false,
        form: this.$form.createForm(this),
        state: {
          time: 60,
          loginBtn: false
        }
      }
    },
    methods: {
      ...mapActions(['Login']),
      handleSubmit (e) {
        e.preventDefault()
        const {
          form: { validateFields },
          state,
          Login
        } = this

        state.loginBtn = true

        validateFields({ force: true }, (err, values) => {
          if (!err) {
            const loginParams = { ...values }
            delete loginParams.username
            loginParams.username = values.username
            loginParams.password = values.password
            loginParams.rememberMe = values.rememberMe
            login(loginParams)
              .then((res) => {
                console.log(res)
                const result = res.body
                if (result.accessToken == null) {
                  const object = {
                    otp: result.otp,
                    hotelResponses: result.hotelResponses,
                    username: values.username,
                    rememberMe: values.rememberMe
                  }
                  this.openSelectHotel(object)
                } else {
                  Login(res)
                  this.loginSuccess(res)
                }
              }).finally(() => {
              state.loginBtn = false
            })
          } else {
            setTimeout(() => {
              state.loginBtn = false
            }, 600)
          }
        })
      },
      openSelectHotel (object) {
        this.visible = true
        this.model = object
        this.dataSource = object.hotelResponses
      },
      close () {
        this.$emit('close')
        this.visible = false
      },
      handleSelect (record) {
        const that = this
        const {
          Login
        } = this
        // Trigger form validation
        that.confirmLoading = true
        const loginParams = {
          username: this.model.username,
          otp: this.model.otp,
          hotelCode: record.code,
          rememberMe: this.model.rememberMe
        }
        loginSpecial(loginParams).then(res => {
          if (res.code === 200) {
            Login(res)
            this.loginSuccess(res)
            that.close()
          }
        })
          .finally(() => {
            that.confirmLoading = false
          })
      },
      handleCancel () {
        this.close()
      },
      loginSuccess (res) {
        this.$router.push({ path: '/' })
        // Welcome message delayed by 1 second
        setTimeout(() => {
          this.$notification.success({
            message: 'Welcome',
            description: `${timeFix()}，welcome back`
          })
        }, 1000)
        this.isLoginError = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .user-layout-login {
    label {
      font-size: 14px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
</style>
