<template>
  <div class="tab">
      <div>
          <span v-for="(item,index) in news" :key="index" @click="dianji(index)" :class="{value:surrect===index} " >{{item}}</span>
         
      </div>
      <div v-if="surrect===0">
          <ul>
              <li>普通新闻</li>
              <li>普通新闻</li>
              <li>普通新闻</li>
          </ul>
      </div>
       <div v-if="surrect===1">
          <ul>
              <li>体育新闻</li>
              <li>体育新闻</li>
              <li>体育新闻</li>
          </ul>
      </div>
       <div v-if="surrect===2">
          <ul>
              <li>娱乐新闻</li>
              <li>娱乐新闻</li>
              <li>娱乐新闻</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
data () {
    return {
        news:['新闻','体育','娱乐'],
        surrect:0 
    }
},
methods: {
    dianji(index){
        this.surrect=index
    }
}
}
</script>

<style lang="less" scoped>
.value{
    color: pink;
    font-size:20px
}
</style>