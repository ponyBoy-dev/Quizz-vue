<template>
  <div>
    <b-jumbotron header="Score Final">
        <h2>{{numCorrect}}/{{numTotal}}</h2>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  props: [
    'numTotal',
    'numCorrect',
  ]
}
</script>

<style scoped>
    .jumbotron{
        background-color: aquamarine
    }
</style>