<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-item label="Role">
              <a-input v-model="queryParam.query"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">Search</a-button>
              <a-button style="margin-left: 8px" @click="resetSearchQuery" icon="reload">Reset</a-button>
            </span>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-button style="margin-left: 8px; float: right" @click="handleNote">
              <a-icon type="question-circle-o"></a-icon>
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">New</a-button>
    </div>

    <s-table
      ref="table"
      row-key="roleId"
      size="default"
      :columns="columns"
      :data="loadData"
      :expandedRowKeys="expandedRowKeys"
      @expand="handleExpand"
      showPagination="auto"
    >
      <div
        slot="expandedRowRender"
        slot-scope="record"
        style="margin: 0">
        <a-row
          :gutter="24"
          :style="{ marginBottom: '12px' }">
          <a-col
            :span="12"
            v-for="(role, index) in record.permissions"
            :key="index"
            :style="{ marginBottom: '12px', height: '23px' }">
            <a-col :lg="12" :md="24">
              <span>{{ role.permissionName }}：</span>
            </a-col>
            <a-col :lg="12" :md="24" v-if="role.actionList && role.actionList.length > 0">
              <a-tag color="geekblue" v-for="action in role.actionList" :key="action">{{ action | permissionFilter }}
              </a-tag>
            </a-col>
            <a-col :span="20" v-else>-</a-col>
          </a-col>
        </a-row>
      </div>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">Edit</a>
        <a-divider type="vertical"/>
        <a-dropdown>
          <a class="ant-dropdown-link">
            More <a-icon type="down"/>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">Detail</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="handleDelete(record.roleId)">Delete</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>

    <a-modal
      title="Operational"
      style="top: 20px;"
      :width="800"
      v-model="visible"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form class="permission-form" :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Code"
        >
          <a-input
            disabled="disabled"
            v-decorator="['code']"
          />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Role name"
        >
          <a-input
            v-decorator="['name', {rules: [{ required: true, message: 'Please input role name!' }]}]"
          />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Description"
        >
          <a-textarea
            :rows="5"
            id="describe"
            v-decorator="['description']"
          />
        </a-form-item>

        <a-divider>Have permissions</a-divider>
        <template v-for="permission in permissions">
          <a-form-item
            class="permission-group"
            v-if="permission.actionsOptions && permission.actionsOptions.length > 0"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            :key="permission.permissionId"
            :label="permission.permissionName"
          >
            <a-checkbox-group
              v-decorator="[`permissions.${permission.permissionId}`]"
              :options="permission.actionsOptions"/>
          </a-form-item>
        </template>

      </a-form>
    </a-modal>
    <a-modal
      title="Note"
      style="top: 20px;"
      :width="500"
      v-model="visibleNote"
      :footer="null"
    >
      <div v-for="action in actions" :key="action.key" style="padding-bottom: 15px">
        <a-row :gutter="24">
          <a-col :md="4" :sm="24" offset="2">
            <a-tag color="geekblue">{{ action.label }}</a-tag>
          </a-col>
          <a-col :md="18" :sm="24">
            <span>{{ action.description }}</span>
          </a-col>
        </a-row>
      </div>
    </a-modal>

  </a-card>
</template>

<script>
  import pick from 'lodash.pick'
  import { STable } from '@/components'
  import { PERMISSION_ENUM } from '@/utils/helper/permission'
  import { createRole, deleteRole, getPermission, getRoles, updateRole } from '@/api/api'

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code'
    },
    {
      title: 'Role Name',
      dataIndex: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Action',
      width: '150px',
      dataIndex: 'action',
      align: 'center',
      scopedSlots: { customRender: 'action' }
    }
  ]

  export default {
    name: 'RoleList',
    components: {
      STable
    },
    data () {
      return {
        roleId: -1,
        model: {},
        visible: false,
        visibleNote: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        form: this.$form.createForm(this),
        permissions: [],
        expandedRowKeys: [],
        selectedRowKeys: [],
        selectedRows: [],
        actions: [],
        confirmLoading: false,
        loading: false,

        // Advanced Search Expand / Close
        advanced: false,
        // Query parameters
        queryParam: {},
        // Header
        columns,
        // The load data method must be a Promise object
        loadData: parameter => {
          return getRoles(Object.assign(parameter, this.queryParam))
            .then(res => {
              // Expand all rows
              this.expandedRowKeys = res.body.data.map(item => item.roleId)
              return res.body
            })
        }
      }
    },
    filters: {
      permissionFilter (key) {
        const permission = PERMISSION_ENUM[key]
        return permission && permission.label
      }
    },
    methods: {
      searchQuery () {
        this.$refs.table.refresh(true)
      },
      resetSearchQuery () {
        this.queryParam = {}
        this.searchQuery()
      },
      onChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      handleExpand (expanded, record) {
        if (expanded) {
          this.expandedRowKeys.push(record.roleId)
        } else {
          this.expandedRowKeys = this.expandedRowKeys.filter(item => record.roleId !== item)
        }
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      handleDelete (roleId) {
        deleteRole(roleId).then((res) => {
          if (res.code === 200) {
            this.$message.success('Deleted role success!')
          }
          this.searchQuery()
        }).catch((err) => {
          this.$message.error(err.response.data.message)
        })
      },
      handleAdd () {
        this.handleEdit({})
      },
      handleEdit (record) {
        this.form.resetFields()
        this.visible = true
        this.roleId = record.roleId
        const checkboxGroup = {}
        var permissionsList
        if (this.roleId && record.permissions.length > 0) {
          permissionsList = record.permissions
        } else {
          getPermission().then((res) => {
            if (res.code === 200) {
              permissionsList = res.body
            }
          })
        }
        this.permissions = permissionsList.map(permission => {
          const groupKey = `permissions.${permission.permissionId}`
          checkboxGroup[groupKey] = permission.actionList
          const actionsOptions = permission.actionEntitySet.map(action => {
            return {
              label: action.describe,
              value: action.action,
              defaultCheck: action.defaultCheck
            }
          })
          return {
            ...permission,
            actionsOptions
          }
        })

        this.$nextTick(() => {
          this.form.setFieldsValue(pick(record, ['code', 'description', 'name']))
          this.form.setFieldsValue(checkboxGroup)
        })
      },
      handleOk (e) {
        e.preventDefault()
        const that = this
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            const formData = Object.assign(that.model, values)
            let obj
            if (that.roleId > 0) {
              obj = updateRole(that.roleId, formData)
            } else {
              obj = createRole(formData)
            }
            obj.then((res) => {
              if (res.code === 200) {
                if (that.roleId > 0) {
                  that.$message.success('Updated role success!')
                } else {
                  that.$message.success('Created role success!')
                }
              }
              that.handleClose()
              that.searchQuery()
            }).catch(() => {

            }).finally(() => {
              that.confirmLoading = false
            })
          }
        })
      },
      handleCancel () {
        this.handleClose()
        this.confirmLoading = false
      },
      handleClose () {
        this.visible = false
      },
      handleNote () {
        this.visibleNote = true
        this.actions = PERMISSION_ENUM
      }
    }
  }
</script>

<style lang="less" scoped>
  .permission-form {
    /deep/ .permission-group {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

</style>
