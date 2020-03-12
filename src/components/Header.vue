<template>
  <div>
    <b-nav pills fill>
      <b-nav-item 
      disabled
      v-if="questionN<11"><b>Question  {{questionN}}/ 10</b></b-nav-item>
      <b-nav-item 
      disabled
      :class="highlight()">
      Score: {{numCorrect}}/{{numTotal}}</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  props: [
    'numCorrect',
    'numTotal',
    'index'
  ],
  computed:{
    questionN(){
      return this.index+1
    }
  },
  /*data(){
    return{
      questionN : this.index +1
    }
  },*/
  methods:{
    highlight(){
      if(this.index > 9){
        return 'highlight'
      }

    }
  }
}
</script>

<style scoped>
  .highlight{
    font-weight: bold;
    background-color: gold

  }

</style>