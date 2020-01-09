export const state =()=>({
    //历史搜素记录
    history:[],
    allPrice:0
});
    // 存储历史搜索列表
export const mutations = {
    setHistory(state,data){
    state.history.unshift(data);
    
    },
   // 存储总价格
    allPrice(state,data){ 
    state.allPrice = data
    }
}