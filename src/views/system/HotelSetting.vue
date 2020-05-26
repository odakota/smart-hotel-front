<template>
  <a-card>
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="false"
      :loading="memberLoading"
    >
      <template v-for="(col, i) in ['code', 'name', 'phone', 'email']" :slot="col" slot-scope="text, record">
        <a-input
          :key="col"
          :disabled="col === 'code'"
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          :placeholder="columns[i].title"
          @change="e => handleChange(e.target.value, record.hotelId, col)"
        />
        <template v-else>{{ text }}</template>
      </template>
      <template slot="action" slot-scope="text, record">
        <template v-if="record.editable">
          <span v-if="record.isNew">
            <a @click="saveRow(record)">Save</a>
            <a-divider type="vertical"/>
            <a @click="handleSetting(record)">Setting</a>
            <a-divider type="vertical"/>
            <a-popconfirm title="Do you want to delete this line？" @confirm="remove(record.hotelId)">
              <a>Delete</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="saveRow(record)">Save</a>
            <a-divider type="vertical"/>
            <a @click="cancel(record.hotelId)">Cancel</a>
          </span>
        </template>
        <span v-else>
          <a @click="toggle(record.hotelId)">Edit</a>
          <a-divider type="vertical"/>
          <a @click="handleSetting(record)">Setting</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="Do you want to delete this line？" @confirm="remove(record.hotelId)">
            <a>Delete</a>
          </a-popconfirm>
        </span>
      </template>
    </a-table>
    <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">
      New member
    </a-button>
  </a-card>
</template>

<script>
  import { createHotel, deleteHotel, getHotels, updateHotel } from '@/api/api'

  export default {
    name: 'HotelSetting',
    data () {
      return {
        loading: false,
        memberLoading: false,
        data: [],

        // table
        columns: [
          {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            width: '10%',
            scopedSlots: { customRender: 'code' }
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
            scopedSlots: { customRender: 'name' }
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: '20%',
            scopedSlots: { customRender: 'phone' }
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '25%',
            scopedSlots: { customRender: 'email' }
          },
          {
            title: 'Action',
            align: 'center',
            key: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ]
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
      },
      loadData () {
        getHotels().then(res => {
          this.data = res.body.map(obj => ({ ...obj, editable: false }))
        }).catch(() => {

        })
      },
      newMember () {
        const length = this.data.length
        const max = this.data.reduce((prev, current) => (prev.hotelId > current.hotelId) ? prev : current)
        this.data.push({
          hotelId: length === 0 ? 1 : max.hotelId + 1,
          code: '',
          name: '',
          phone: '',
          email: '',
          editable: true,
          isNew: true
        })
      },
      remove (hotelId) {
        this.memberLoading = true
        deleteHotel(hotelId).then(res => {
          if (res.code === 200) {
            this.$message.success('Deleted hotel success!')
            this.loadData()
          }
        }).catch((err) => {
          this.getMessage(err)
        }).finally(() => {
          this.memberLoading = false
        })
      },
      saveRow (record) {
        this.memberLoading = true
        const { hotelId, name, phone, email } = record
        if (!name || !phone || !email) {
          this.memberLoading = false
          this.$message.error('Please fill in the complete member information。')
          return
        }
        let obj
        if (record.isNew) {
          obj = createHotel(record)
        } else {
          obj = updateHotel(record.hotelId, record)
        }
        obj.then((res) => {
          if (res.code === 200) {
            if (record.isNew) {
              this.$message.success('Created hotel success!')
            } else {
              this.$message.success('Updated hotel success!')
            }
            const target = this.data.find(item => item.hotelId === hotelId)
            target.editable = false
            target.isNew = false
          }
          this.loadData()
        }).catch((err) => {
          this.getMessage(err)
        }).finally(() => {
          this.memberLoading = false
        })
      },
      toggle (hotelId) {
        console.log(hotelId)
        const target = this.data.find(item => item.hotelId === hotelId)
        target._originalData = { ...target }
        target.editable = !target.editable
      },
      getRowByKey (hotelId, newData) {
        const data = this.data
        return (newData || data).find(item => item.hotelId === hotelId)
      },
      cancel (hotelId) {
        const target = this.data.find(item => item.hotelId === hotelId)
        Object.keys(target).forEach(hotelId => {
          target[hotelId] = target._originalData[hotelId]
        })
        target._originalData = undefined
      },
      handleChange (value, hotelId, column) {
        const newData = [...this.data]
        const target = newData.find(item => hotelId === item.hotelId)
        if (target) {
          target[column] = value
          this.data = newData
        }
      },
      handleSetting () {

      },
      getMessage (err) {
        const data = err.response.data
        if ((err.response.status === 400 && data.code !== 4000) || (err.response.status === 404 && data.code !== 4400)) {
          this.$message.error(data.message)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .card {
    margin-bottom: 24px;
  }
</style>
