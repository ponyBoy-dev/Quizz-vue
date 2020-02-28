<template>
  <div>
    <b-nav pills>
      <b-nav-item disabled><b>Un quizz cool</b></b-nav-item>
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