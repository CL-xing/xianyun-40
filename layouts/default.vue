<template>
  <div>
     <!-- 头部组件 -->
    <Header/>

 <!-- 内容占位组件 -->
    <nuxt />

    <!--  导入页脚组件 -->
    <Footer/>
  </div>
</template>


<script>
// 导入头部组件
import Header from "@/components/header"
// 导入页脚组件
import Footer from "@/components/footer"
export default {
  // 注册组件
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  li,
  ol,
  ul{
    list-style: none;
  }
  a{
    color: inherit;
    text-decoration: none
  }
  i,
  em{
    font-style: normal
  }
</style>
