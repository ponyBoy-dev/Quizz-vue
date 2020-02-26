<template>
  <div>
    <b-nav tabs>
      <b-nav-item disabled><b>Un quizz cool</b></b-nav-item>
      <b-nav-item disabled>Question {{numCorrect}}/{{numTotal}}</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  props: [
    'numCorrect',
    'numTotal'
  ]
}
</script>