<template>
  <div>
    <b-jumbotron>
      <template v-slot:lead>{{question.question}}</template>

      <hr class="my-4" />
      <b-list-group>
        <b-list-group-item
        v-for="(answer, index) in shuffledAnswers"
        :key="index"
        @click="selectAnswer(index)"
        :class="answerClass(index)"
        :disabled="selectedAnswer !== null"
        >

        {{answer.text}} 
        
        </b-list-group-item>
      </b-list-group>


      <b-button  
        variant="success"
        :disabled="selectedAnswer === null"
        @click="nextQuestion()"
         >
        Suivante
      </b-button>
    </b-jumbotron>
  </div>
  
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    question: Object,
  },
  data(){
    return {
      selectedAnswer : null 
  }
  },
  computed:{
    shuffledAnswers(){
      return _.shuffle(this.question.answers)
    },
    correctIndex(){
      let correctIndex = this.shuffledAnswers.findIndex(x => x.id ===1)
      return correctIndex
    }
  },
  methods:{
    answerClass(index){
      let answerClass = ''
      if(index === this.correctIndex && this.selectedAnswer !== null){
        answerClass = 'correctAnswer'
      }else if(index === this.selectedAnswer){
        answerClass = 'incorrectAnswer'
      }
      return answerClass
    },
    selectAnswer(index){
      this.selectedAnswer = index
      this.isCorrect(index)
    },
    isCorrect(index){
      let isCorrect = false
      if(index === this.correctIndex){
        isCorrect = true
      }
      this.$emit('reponse', isCorrect)
    },
    nextQuestion(){
      this.$emit('suivante')
    }
    
  }
};
</script>

<style scoped>
.jumbotron{
  margin-top: 1em;
}
.list-group{
  margin-bottom : 15px;
}
.list-group-item:hover{
  background: #EEE;
  cursor: pointer;
}
.btn{
  margin : 0 5px;
}

.correctAnswer{
  background: aquamarine;
}
.correctAnswer:hover{
  background: aquamarine
}

.incorrectAnswer, .incorrectAnswer:hover{
  background: red;
}
.incorrectAnswer:hover{
  background: red
}
</style>
