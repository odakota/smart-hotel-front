<template>
  <div>
    <a-card class="card" title="Hotel information" :bordered="false">
      <a-form @submit="handleSubmit" :form="form" class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="4" :md="12" :sm="24">
            <a-form-item label="Code">
              <a-input disabled="disabled" v-decorator="['code']"/>
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 5, offset: 1}" :lg="{span: 6}" :md="{span: 12}" :sm="24">
            <a-form-item label="Name">
              <a-input
                v-decorator="[ 'name', {rules: [{ required: true, message: 'Please enter the warehouse name', whitespace: true}]} ]"/>
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 5, offset: 1}" :lg="{span: 6}" :md="{span: 12}" :sm="24">
            <a-form-item label="Admin">
              <a-select v-decorator="[ 'hotelAdmin' ]">
                <a-select-option value="王晓丽">王晓丽</a-select-option>
                <a-select-option value="李军">李军</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-item label="Address">
              <a-input v-decorator="['address']"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="4" :md="12" :sm="24">
            <a-form-item label="Country">
              <a-select
                mode="default"
                style="width: 100%"
                optionFilterProp="children"
                allowClear
                v-decorator="[ 'country' ]"
                showSearch
                @change="handleCountryChange"
              >
                <a-select-option v-for="c in country" :key="c.alpha2Code" :value="c.alpha2Code">
                  {{ c.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 5, offset: 1}" :lg="{span: 6}" :md="{span: 12}" :sm="24">
            <a-form-item label="Language">
              <a-select
                mode="default"
                style="width: 100%"
                optionFilterProp="children"
                allowClear
                v-decorator="[ 'language' ]"
                showSearch
              >
                <a-select-option v-for="l in language" :key="l.iso639_1" :value="l.iso639_1">
                  {{ l.nativeName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 5, offset: 1}" :lg="{span: 6}" :md="{span: 12}" :sm="24">
            <a-form-item label="Region">
              <a-input v-decorator="['region']" disabled="disabled"/>
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-item label="City">
              <a-select v-decorator="[ 'city' ]">
                <a-select-option value="公开">公开</a-select-option>
                <a-select-option value="私密">私密</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="4" :md="12" :sm="24">
            <a-form-item label="Zip code">
              <a-input v-decorator="['zipCode']"/>
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 5, offset: 1}" :lg="{span: 6}" :md="{span: 12}" :sm="24">
            <a-form-item label="Fax">
              <a-input v-decorator="['fax']"/>
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 5, offset: 1}" :lg="{span: 6}" :md="{span: 12}" :sm="24">
            <a-form-item label="Phone">
              <a-input
                v-decorator="[ 'phone', {rules: [{ required: true, message: 'Please enter the warehouse name', whitespace: true}]} ]"/>
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-item label="Email">
              <a-input v-decorator="['email']"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-card class="card" title="Advanced information" :bordered="false">
      <a-form @submit="handleSubmit" :form="form" class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item
              label="Check-in time"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-time-picker format="HH:mm" v-decorator="[ 'checkInTime' ]"/>
            </a-form-item>
            <a-form-item
              label="Check-out time"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-time-picker format="HH:mm" v-decorator="[ 'checkOutTime' ]"/>
            </a-form-item>
            <a-form-item
              label="Time zone"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-select v-decorator="[ 'timeZone' ]">
                <a-select-option value="公开">公开</a-select-option>
                <a-select-option value="私密">私密</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="Currency"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-select v-decorator="[ 'currency' ]">
                <a-select-option value="公开">公开</a-select-option>
                <a-select-option value="私密">私密</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item
              label="Total room"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-input v-decorator="['totalRoom']"/>
            </a-form-item>
            <a-form-item
              label="Room overbook"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-checkbox v-decorator="['roomOverBook']"/>
            </a-form-item>
            <a-form-item
              label="Extra beds"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-input v-decorator="['extraBed']"/>
            </a-form-item>
            <a-form-item
              label="Bed overbook"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-checkbox v-decorator="['bedOverBook']"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <!-- table -->
    <!--    <a-card class="card" title="Exchange information" :bordered="false">-->
    <!--      <a-table-->
    <!--        bordered-->
    <!--        :columns="exchangeColumns"-->
    <!--        :dataSource="exchangeRateData"-->
    <!--        :pagination="false"-->
    <!--        :loading="memberLoading"-->
    <!--      >-->
    <!--        <template v-for="(col, i) in ['name', 'workId', 'department']" :slot="col" slot-scope="text, record">-->
    <!--          <a-input-->
    <!--            :key="col"-->
    <!--            v-if="record.editable"-->
    <!--            style="margin: -5px 0"-->
    <!--            :value="text"-->
    <!--            :placeholder="exchangeColumns[i].title"-->
    <!--            @change="e => handleChange(e.target.value, record.key, col, 1)"-->
    <!--          />-->
    <!--          <template v-else>{{ text }}</template>-->
    <!--        </template>-->
    <!--        <template slot="action" slot-scope="text, record">-->
    <!--          <template v-if="record.editable">-->
    <!--            <span v-if="record.isNew">-->
    <!--              <a @click="saveRow(record)">Save</a>-->
    <!--              <a-divider type="vertical"/>-->
    <!--              <a-popconfirm title="Do you want to delete this line?" @confirm="remove(record.key)">-->
    <!--                <a>Delete</a>-->
    <!--              </a-popconfirm>-->
    <!--            </span>-->
    <!--            <span v-else>-->
    <!--              <a @click="saveRow(record)">Save</a>-->
    <!--              <a-divider type="vertical"/>-->
    <!--              <a @click="cancel(record.key)">Cancel</a>-->
    <!--            </span>-->
    <!--          </template>-->
    <!--          <span v-else>-->
    <!--            <a @click="toggle(record.key)">Edit</a>-->
    <!--            <a-divider type="vertical"/>-->
    <!--            <a-popconfirm title="Do you want to delete this line?" @confirm="remove(record.key)">-->
    <!--              <a>Delete</a>-->
    <!--            </a-popconfirm>-->
    <!--          </span>-->
    <!--        </template>-->
    <!--      </a-table>-->
    <!--      <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember(1)">-->
    <!--        New member-->
    <!--      </a-button>-->
    <!--    </a-card>-->

    <!-- table -->
    <a-card class="card" title="Tax management" :bordered="false">
      <a-table
        row-key="taxId"
        :columns="taxColumns"
        :dataSource="taxData"
        :pagination="false"
        :loading="memberLoading"
      >
        <template v-for="(col, i) in ['code', 'name', 'value', 'type']" :slot="col" slot-scope="text, record">
          <a-input
            :key="col"
            :disabled="col === 'code'"
            v-if="record.editable && col !== 'type'"
            style="margin: -5px 0"
            :value="text"
            :placeholder="taxColumns[i].title"
            @change="e => handleChange(e.target.value, record.taxId, col, 2)"
          />
          <!--          <a-switch-->
          <!--            :key="col"-->
          <!--            v-if="record.editable && col === 'type'"-->
          <!--            :checked="text === 'PERCENTAGE'"-->
          <!--            checked-children="PERCENTAGE"-->
          <!--            un-checked-children="AMOUNT"-->
          <!--            default-checked-->
          <!--            @change="e => handleChange(e, record.taxId, col, 2)"-->
          <!--          />-->
          <!--          <a-select-->
          <!--            :key="col"-->
          <!--            v-if="record.editable && col === 'type'"-->
          <!--            style="margin: -5px 0; width: 100%"-->
          <!--            @change="e => handleChange(e.target.value, record.taxId, col, 2)"-->
          <!--          >-->
          <!--            <a-select-option :value="'AMOUNT'">AMOUNT</a-select-option>-->
          <!--            <a-select-option :value="'PERCENTAGE'">PERCENTAGE</a-select-option>-->
          <!--          </a-select>-->
          <a-select
            :key="col"
            v-if="record.editable && col === 'type'"
            style="margin: -5px 0; width: 100%"
            @change="e => handleChange(e, record.taxId, col, 2)">
            <a-select-option v-for="c in CALCULATION_TYPE" :key="c.key" :value="c.key">
              {{ c.label }}
            </a-select-option>
          </a-select>
          <template v-if="!record.editable">{{ text }}</template>
        </template>
        <template slot="action" slot-scope="text, record">
          <template v-if="record.editable">
            <span v-if="record.isNew">
              <a @click="saveRow(record, 2)">Save</a>
              <a-divider type="vertical"/>
              <a-popconfirm title="Do you want to delete this line?" @confirm="remove(record.taxId, 2)">
                <a>Delete</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="saveRow(record, 2)">Save</a>
              <a-divider type="vertical"/>
              <a @click="cancel(record.taxId, 2)">Cancel</a>
            </span>
          </template>
          <span v-else>
            <a @click="toggle(record.taxId, 2)">Edit</a>
            <a-divider type="vertical"/>
            <a-popconfirm title="Do you want to delete this line?" @confirm="remove(record.taxId, 2)">
              <a>Delete</a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
      <a-button
        style="width: 100%; margin-top: 16px; margin-bottom: 8px"
        type="dashed"
        icon="plus"
        @click="newMember(2)">
        New member
      </a-button>
    </a-card>

    <!-- table -->
    <!--    <a-card class="card" title="Fee management" :bordered="false">-->
    <!--      <a-table-->
    <!--        :columns="feeColumns"-->
    <!--        :dataSource="feeData"-->
    <!--        :pagination="false"-->
    <!--        :loading="memberLoading"-->
    <!--      >-->
    <!--        <template v-for="(col, i) in ['name', 'workId', 'department']" :slot="col" slot-scope="text, record">-->
    <!--          <a-input-->
    <!--            :key="col"-->
    <!--            v-if="record.editable"-->
    <!--            style="margin: -5px 0"-->
    <!--            :value="text"-->
    <!--            :placeholder="feeColumns[i].title"-->
    <!--            @change="e => handleChange(e.target.value, record.key, col, 3)"-->
    <!--          />-->
    <!--          <template v-else>{{ text }}</template>-->
    <!--        </template>-->
    <!--        <template slot="operation" slot-scope="text, record">-->
    <!--          <template v-if="record.editable">-->
    <!--            <span v-if="record.isNew">-->
    <!--              <a @click="saveRow(record)">添加</a>-->
    <!--              <a-divider type="vertical"/>-->
    <!--              <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">-->
    <!--                <a>删除</a>-->
    <!--              </a-popconfirm>-->
    <!--            </span>-->
    <!--            <span v-else>-->
    <!--              <a @click="saveRow(record)">保存</a>-->
    <!--              <a-divider type="vertical"/>-->
    <!--              <a @click="cancel(record.key)">取消</a>-->
    <!--            </span>-->
    <!--          </template>-->
    <!--          <span v-else>-->
    <!--            <a @click="toggle(record.key)">编辑</a>-->
    <!--            <a-divider type="vertical"/>-->
    <!--            <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">-->
    <!--              <a>删除</a>-->
    <!--            </a-popconfirm>-->
    <!--          </span>-->
    <!--        </template>-->
    <!--      </a-table>-->
    <!--      <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">-->
    <!--        新增成员-->
    <!--      </a-button>-->
    <!--    </a-card>-->

    <!-- fixed footer toolbar -->
    <footer-tool-bar
      :style="{ width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">
      <span class="popover-wrapper">
        <a-popover
          title="表单校验信息"
          overlayClassName="antd-pro-pages-forms-style-errorPopover"
          trigger="click"
          :getPopupContainer="trigger => trigger.parentNode">
          <template slot="content">
            <li
              v-for="item in errors"
              :key="item.key"
              @click="scrollToField(item.key)"
              class="antd-pro-pages-forms-style-errorListItem">
              <a-icon type="cross-circle-o" class="antd-pro-pages-forms-style-errorIcon"/>
              <div class="">{{ item.message }}</div>
              <div class="antd-pro-pages-forms-style-errorField">{{ item.fieldLabel }}</div>
            </li>
          </template>
          <span class="antd-pro-pages-forms-style-errorIcon" v-if="errors.length > 0">
            <a-icon type="exclamation-circle"/>{{ errors.length }}
          </span>
        </a-popover>
      </span>
      <a-button type="primary" @click="validate" :loading="loading">提交</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import { mixin, mixinDevice } from '@/utils/mixin'
  import {
    createFee,
    createHotel,
    createTax,
    externalAPIGetCountries,
    getCurrentHotel,
    updateFee,
    updateHotel,
    updateTax
  } from '@/api/api'
  import pick from 'lodash.pick'

  const fieldLabels = {
    name: '仓库名',
    url: '仓库域名',
    owner: '仓库管理员',
    approver: '审批人',
    dateRange: '生效日期',
    type: '仓库类型',
    name2: '任务名',
    url2: '任务描述',
    owner2: '执行人',
    approver2: '责任人',
    dateRange2: '生效日期',
    type2: '任务类型'
  }

  export default {
    name: 'HotelGeneralSetting',
    mixins: [mixin, mixinDevice],
    components: {
      FooterToolBar
    },
    data () {
      return {
        hotelId: -1,
        loading: false,
        memberLoading: false,
        model: {},
        form: this.$form.createForm(this),
        country: [],
        language: [],
        taxData: [],
        feeData: [],
        exchangeRateData: [],
        // table
        exchangeColumns: [
          {
            title: 'Currency',
            children: [
              {
                title: 'From',
                dataIndex: 'from',
                key: 'from',
                width: '10%',
                scopedSlots: { customRender: 'from' }
              },
              {
                title: 'To',
                dataIndex: 'to',
                key: 'to',
                width: '10%',
                scopedSlots: { customRender: 'to' }
              }
            ]
          },
          {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
            width: '25%',
            scopedSlots: { customRender: 'rate' }
          },
          {
            title: 'Conversion Rate',
            dataIndex: 'conversionRate',
            key: 'conversionRate',
            width: '20%',
            scopedSlots: { customRender: 'conversionRate' }
          },
          {
            title: 'Conversion margin',
            dataIndex: 'conversionMargin',
            key: 'conversionMargin',
            width: '20%',
            scopedSlots: { customRender: 'conversionMargin' }
          },
          {
            title: 'Action',
            align: 'center',
            key: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ],
        taxColumns: [
          {
            title: 'Tax code',
            dataIndex: 'code',
            key: 'code',
            width: '10%',
            scopedSlots: { customRender: 'code' }
          },
          {
            title: 'Tax name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            scopedSlots: { customRender: 'name' }
          },
          {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            width: '20%',
            scopedSlots: { customRender: 'value' }
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '15%',
            scopedSlots: { customRender: 'type' }
          },
          {
            title: 'Action',
            align: 'center',
            key: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ],
        feeColumns: [
          {
            title: 'Fee code',
            dataIndex: 'code',
            key: 'feeCode',
            width: '10%',
            scopedSlots: { customRender: 'feeCode' }
          },
          {
            title: 'Fee name',
            dataIndex: 'name',
            key: 'feeName',
            width: '20%',
            scopedSlots: { customRender: 'feeName' }
          },
          {
            title: 'Value',
            dataIndex: 'value',
            key: 'feeValue',
            width: '20%',
            scopedSlots: { customRender: 'feeValue' }
          },
          {
            title: 'Type',
            dataIndex: 'feeType',
            key: 'type',
            width: '15%',
            scopedSlots: { customRender: 'feeType' }
          },
          {
            title: 'Action',
            align: 'center',
            key: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ],
        CALCULATION_TYPE: [
          {
            key: 'AMOUNT',
            label: 'AMOUNT'
          },
          {
            key: 'PERCENTAGE',
            label: 'PERCENTAGE'
          }
        ],
        data: [
          {
            key: '1',
            name: '小明',
            workId: '001',
            editable: false,
            department: '行政部'
          },
          {
            key: '2',
            name: '李莉',
            workId: '002',
            editable: false,
            department: 'IT部'
          },
          {
            key: '3',
            name: '王小帅',
            workId: '003',
            editable: false,
            department: '财务部'
          }
        ],

        errors: []
      }
    },
    created () {
      this.initCountries()
      if (this.hotelId < 0) {
        this.handleSimpleOpen()
      }
    },
    methods: {
      handleSimpleOpen () {
        getCurrentHotel().then(res => {
          if (res.code === 200) {
            this.handleSpecialOpen(res.body)
          }
        }).catch((err) => {
          this.getMessage(err)
        })
      },
      handleSpecialOpen (record) {
        this.form.resetFields()
        this.model = Object.assign({}, record)

        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, ['code', 'name', 'address', 'country', 'language', 'phone', 'email',
            'hotelAdmin', 'region', 'city', 'zipCode', 'fax', 'checkInTime', 'checkOutTime', 'timeZone', 'currency',
            'totalRoom', 'roomOverBook', 'extraBed', 'bedOverBook']))
        })
      },
      initCountries () {
        externalAPIGetCountries().then(res => {
          this.country = res.body.country
          this.language = res.body.language
        })
      },
      handleCountryChange (id) {
        const obj = this.country.filter(tmp => tmp.alpha2Code === id).shift()
        this.model.region = obj.region
      },
      handleSubmit (e) {
        e.preventDefault()
      },
      newMember (type) {
        if (type === 1) {
          const length = this.data.length
          this.data.push({
            key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
            name: '',
            workId: '',
            department: '',
            editable: true,
            isNew: true
          })
        }
        if (type === 2) {
          const length = this.taxData.length
          this.taxData.push({
            taxId: length === 0 ? 1 : this.taxData.reduce((prev, current) => (prev.taxId > current.taxId) ? prev : current).taxId + 1,
            name: '',
            code: '',
            value: '',
            editable: true,
            isNew: true
          })
        }
        if (type === 3) {
          const length = this.data.length
          this.data.push({
            key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
            name: '',
            workId: '',
            department: '',
            editable: true,
            isNew: true
          })
        }
      },
      remove (key) {
        const newData = this.data.filter(item => item.key !== key)
        this.data = newData
      },
      saveRow (record, type) {
        this.memberLoading = true
        if (type === 1) {
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
        }

        if (type === 2) {
          const { taxId, name, value, type } = record
          if (!name || !value || !type) {
            this.memberLoading = false
            this.$message.error('Please fill in the complete member information。')
            return
          }
          let obj
          if (record.isNew) {
            obj = createTax(record)
          } else {
            obj = updateTax(record.taxId, record)
          }
          obj.then((res) => {
            if (res.code === 200) {
              if (record.isNew) {
                this.$message.success('Created tax success!')
              } else {
                this.$message.success('Updated tax success!')
              }
              const targetTax = this.taxData.find(item => item.taxId === taxId)
              targetTax.editable = false
              targetTax.isNew = false
            }
            this.loadData()
          }).catch((err) => {
            this.getMessage(err)
          }).finally(() => {
            this.memberLoading = false
          })
        }

        if (type === 3) {
          const { hotelId, name, phone, email } = record
          if (!name || !phone || !email) {
            this.memberLoading = false
            this.$message.error('Please fill in the complete member information。')
            return
          }
          let obj
          if (record.isNew) {
            obj = createFee(record)
          } else {
            obj = updateFee(record.hotelId, record)
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
        }
      },
      toggle (key, type) {
        const target = this.data.find(item => item.key === key)
        target._originalData = { ...target }
        target.editable = !target.editable
      },
      getRowByKey (key, newData) {
        const data = this.data
        return (newData || data).find(item => item.key === key)
      },
      cancel (key, type) {
        const target = this.data.find(item => item.key === key)
        Object.keys(target).forEach(key => {
          target[key] = target._originalData[key]
        })
        target._originalData = undefined
      },
      handleChange (value, key, column, type) {
        console.log(key)
        console.log(value)
        if (type === 1) {
          const newData = [...this.data]
          const target = newData.find(item => key === item.key)
          if (target) {
            target[column] = value
            this.data = newData
          }
        }
        if (type === 2) {
          const newTaxData = [...this.taxData]
          const targetTax = newTaxData.find(item => key === item.taxId)
          if (targetTax) {
            targetTax[column] = value
            this.taxData = newTaxData
          }
        }
        if (type === 3) {
          const newData = [...this.data]
          const target = newData.find(item => key === item.key)
          if (target) {
            target[column] = value
            this.data = newData
          }
        }
      },

      // 最终全页面提交
      validate () {
        const { $refs: { repository, task }, $notification } = this
        const repositoryForm = new Promise((resolve, reject) => {
          repository.form.validateFields((err, values) => {
            if (err) {
              reject(err)
              return
            }
            resolve(values)
          })
        })
        const taskForm = new Promise((resolve, reject) => {
          task.form.validateFields((err, values) => {
            if (err) {
              reject(err)
              return
            }
            resolve(values)
          })
        })

        // clean this.errors
        this.errors = []
        Promise.all([repositoryForm, taskForm]).then(values => {
          $notification['error']({
            message: 'Received values of form:',
            description: JSON.stringify(values)
          })
        }).catch(() => {
          const errors = Object.assign({}, repository.form.getFieldsError(), task.form.getFieldsError())
          const tmp = { ...errors }
          this.errorList(tmp)
        })
      },
      errorList (errors) {
        if (!errors || errors.length === 0) {
          return
        }
        this.errors = Object.keys(errors)
          .filter(key => errors[key])
          .map(key => ({
            key: key,
            message: errors[key][0],
            fieldLabel: fieldLabels[key]
          }))
      },
      scrollToField (fieldKey) {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
        if (labelNode) {
          labelNode.scrollIntoView(true)
        }
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

  .popover-wrapper {
    /deep/ .antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content {
      min-width: 256px;
      max-height: 290px;
      padding: 0;
      overflow: auto;
    }
  }

  .antd-pro-pages-forms-style-errorIcon {
    user-select: none;
    margin-right: 24px;
    color: #f5222d;
    cursor: pointer;

    i {
      margin-right: 4px;
    }
  }

  .antd-pro-pages-forms-style-errorListItem {
    padding: 8px 16px;
    list-style: none;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      background: #e6f7ff;
    }

    .antd-pro-pages-forms-style-errorIcon {
      float: left;
      margin-top: 4px;
      margin-right: 12px;
      padding-bottom: 22px;
      color: #f5222d;
    }

    .antd-pro-pages-forms-style-errorField {
      margin-top: 2px;
      color: rgba(0, 0, 0, .45);
      font-size: 12px;
    }
  }
</style>
