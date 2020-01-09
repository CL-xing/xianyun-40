export const state =()=>({
    //历史搜素记录
    history:[]
});

export const mutations = {
    setHistory(state,data){
    state.history.unshift(data);
    
    }
}