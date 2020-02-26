<template>
  <div>
    <b-jumbotron>
      <template v-slot:lead>{{currentQuestion.question}}</template>

      <hr class="my-4" />
      <b-list-group>
        <b-list-group-item 
        v-for="(answer, index) in shuffledAnswers" 
        :key="index"
        @click="selectAnswer(index)"
        :class="answerClass(index)"
        >
          {{answer}}
        </b-list-group-item>
      </b-list-group>

      <b-button 
        variant="outline-primary" 
        @click='submitAnswer'
        :disabled="selectedAnswer === null || answered"
      >
      Valider
      </b-button>
      <b-button @click="nextQuest" variant="success" href="#">Suivante</b-button>
    </b-jumbotron>
  </div>
  
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    currentQuestion: Object,
    nextQuest: Function,
    increment : Function
  },
  data(){
    return {
      selectedAnswer : null,
      shuffledAnswers : [],
      correctIndex : null,
      answered : false
    }
  },
  watch: {
    currentQuestion:{
      immediate: true,
      handler() {
        this.selectedAnswer = null;
        this.answered = false;
        this.shuffleAnswers();
      }
      
    }
  },
  methods:{
    selectAnswer(index){
      this.selectedAnswer = index
    },
    shuffleAnswers(){
      let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
      this.shuffledAnswers = _.shuffle(answers)
      this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)

    },
    submitAnswer(){
      let isCorrect = false //move this from here

      if(this.selectedAnswer === this.correctIndex){
        isCorrect = true
      }

      this.increment(isCorrect)// to here => fct et bouton pour question suivante
      this.answered = true
    },
    answerClass(index){
      let answerClass = ''

      if(!this.answered && this.selectedAnswer === index){
        answerClass = 'selected'
      }else if (this.answered && this.correctIndex === index){
        answerClass = 'correctAnswer'
      }else if (this.answered && this.selectedAnswer === index && this.correctIndex !== index) {
        answerClass = 'incorrectAnswer'
      
      }

      return answerClass
    }
  },
  //mounted() { would have the same effect as in watch + immediate: true
    //this.shuffleAnswers()
  //},
  computed: {
    answers() {
      let answers = [...this.currentQuestion.incorrect_answers];
      answers.push(this.currentQuestion.correct_answer);
      return answers;
    }
  },
};
</script>

<style scoped>
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

.selected{
  background-color: aqua;
}
.correctAnswer{
  background-color: aquamarine;
}

.incorrectAnswer{
  background-color: red;
}
</style>