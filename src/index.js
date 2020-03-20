const { reactive, toRefs, watch, effect } = Vue
let ChildApp = {
  // 子组件
  template: `
    <div>我是ChildApp</div>
  `,
  setup(props) {
    console.log('传进来的参数', props)
  }
}

let SumApp = {
  // 加法处理
  template: `
    <div>
      <input v-model="sum_1"/><input v-model="sum_2"/>
      <span @click="add">开始计算</span>
      <span>add计算结果:{{sum}}</span>
    </div>
  `,
  setup() {
    const state = reactive({
      sum_1: '',
      sum_2: '',
      sum: ''
    })
    const add = () => {
      state.sum = Number(state.sum_1) + Number(state.sum_2)
    }
    watch(
      // watch监听变化
      () => state.sum,
      val => {
        console.log('watch监听sum变化', val)
      }
    )
    effect(
      // effect监听变化
      () => {
        console.log('effect监听sum变化', state.sum)
      }
    )
    return {
      ...toRefs(state),
      add // toRefs把一组的响应式对象拆成单个的响应式对象，就能够在模板中直接访问 把响应式对象解构出来供模板单独使用
    }
  }
}

var App = {
  template: `
    <div class="container">
      <input v-model="message"/>
      {{message}}
    </div>
    <ChildApp title="test props"/>
    <SumApp></SumApp>`,
  components: { ChildApp, SumApp },
  setup() {
    const state = reactive({ message: '' })
    return {
      ...state
    }
  }
}
Vue.createApp().mount(App, '#app')

// setup是一个组件的入口，运行在组件被实例化时候，props属性被定义之后，相当于vue2.x版本的时候beforeCreate和Created这两个生命周期
// setup接受两个参数，第一个是props，一个是context

// 在Vue3中，可以把数据经过 reactive 加工变成响应式的对象 reactive 自带深度监听，也就是说你这个数据不管套了多少层，json里有多少数组，都会监听的

// 数据响应式 vue2.x中的Object.defineProperty 换成了 Proxy

// effect 在响应式数据变化的时候就会执行，执行次数根据响应式数据的个数来决定
// watch执行次数是和个数无关

// 主要生命周期变化
// Vue2              ====>        Vue3
// beforeCreate                  setup(替代)
// created                       setup(替代)
// beforeMount                   onBeforeMount
// mounted                       onMounted
// beforeUpdate                  onBeforeUpdate
// updated                       onUpdated
// beforeDestroy                 onBeforeUnMount
// destroyed                     onUnMount
