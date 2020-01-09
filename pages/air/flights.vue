<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList"  />
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
                <div>
                    <FlightsListHead/>
                </div>
                
                
                <!-- 航班信息 -->
                <div>
                        <!-- 航班列表 -->
                    <FlightsItem v-for="(item,index) in dataList"
                    :key="index"
                    :data="item" />

                <!-- 分页组件 -->
                <!-- size-change: 切换条数时候触发事件
                current-change: 切换你页数时候触发的事件
                current-page: 当然显示的页面
                total: 总条数 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                     
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside/>
            </div>
        </el-row>
    </section>
</template>

<script>
import  FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"
import FlightsFilters from "@/components/air/flightsFilters.vue"
import FlightsAside from "@/components/air/flightsAside.vue"

import moment from "moment";

export default {
    data(){
        return {
             // 航班总数据 { info, flights, total, options }
            flightsData:{
                info:{},
                options:{},
                flights:[]
            },
            // 缓存数据
            cacheFlightsData:{
                 info:{},
                 options:{},
                 flights:[] 
            },
            // dataList:[],

            // 当前的页面
            pageIndex: 1,
            // 当前的条数
            pageSize: 5,
            // 总条数
            total: 0
        }
    },
    components: {
        FlightsListHead,
        FlightsItem,
        FlightsFilters,
        FlightsAside
    },
    watch: {
          $route(){
               // 获取航班总数据
              // 请求机票的列表，
            this.getData()
             // 分页初始化为1
            this.pageIndex= 1

          }
    },
    computed: {
          // 计算属性监听函数内部引用实例的属性变化，一旦发生了变化，该函数会重新计算，并且返回新的值
          dataList(){
            // 通过计算属性计算分页的数据
            if (!this.flightsData.flights) return []
            console.log(this.pageIndex);
            
            
            return  this.flightsData.flights.slice(
                (this.pageIndex-1) * this.pageSize , this.pageIndex * this.pageSize)
          }    
    },
    methods: {
        // 获取航班总数据
       getData(){
            // 请求机票的列表，（请求尽量放到父组件中，好处方便管理数据，和组件之间的数据共享）
            this.$axios({
                url: `airs`,
                params: this.$route.query // 来自URL的5个参数
            }).then(res => {
                console.log(res);
                
                this.flightsData = res.data;
                this.cacheFlightsData = {...res.data}
                
                // 切割出第一页数据
                // this.dataList = this.flightsData.flights.slice(0,5);
                this.total = this.flightsData.total
            });
        },
        // 切换分页条数时候触发
        handleSizeChange(value){
            // console.log(value);
             this.pageSize = value;
            // this.dataList = this.flightsData.flights.slice(
            //     (this.pageIndex - 1) * this.pageSize, 
            //     this.pageIndex * this.pageSize
            // );
            
        },
        // 切换你页数时候触发的事件
        handleCurrentChange(value){
            // console.log(value);
            this.pageIndex =value;
        //     this.dataList = this.flightsData.flights.slice(
        //         (this.pageIndex - 1)*this.pageSize,
        //         this.pageIndex*this.pageSize
        //     )
        },
        
        // 传递给子组件的事件，为了改变this.flightsData.flights，触发computed
        setDataList(arr){
            this.flightsData.flights = arr;
        }
        
    },
    mounted () {
        this.getData()
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>