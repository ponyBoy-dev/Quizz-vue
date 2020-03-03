<template>
  <div>
    <b-jumbotron>
      <template v-slot:lead>{{theQuestion}}</template>

      <hr class="my-4" />
      <b-list-group>
        <b-list-group-item 
        v-for="(answer, index) in shuffledAnswers" 
        :key="index"
        @click="selectAnswer(index)"
        :class="answerClass(index)"
        :disabled="answered === true"
        >
          {{answer}}
        </b-list-group-item>
      </b-list-group>

      <!-- <b-button 
        v-show="numTotal <10"
        variant="outline-primary" 
        @click='updateResults'
        :disabled="selectedAnswer === null || answered">
        Valider
      </b-button> -->

      <b-button 
        v-show="numTotal <10"
        @click="submit"
        :disabled="answered === false" 
        variant="success" >
        Suivante
      </b-button>

      <b-button 
        v-show="numTotal === 10"
        @click="submit" 
        variant="success" >
        Fini !
      </b-button>
    </b-jumbotron>
  </div>
  
</template>

<script>
import _ from 'lodash'


export default {
  props: {
    currentQuestion: Object,
    nextQuest: Function,
    increment : Function,
    numTotal : Number
  },
  data(){
    return {
      selectedAnswer : null,
      shuffledAnswers : [],
      correctIndex : null,
      answered : false,
      theQuestion : ''
    }
  },
  watch: {
    currentQuestion:{
      immediate: true,
      handler() {
        this.selectedAnswer = null;
        this.answered = false;
        this.shuffleAnswers();
        this.theQuestion = this.decodeHTML(this.currentQuestion.question);
      }
      
    }
  },
  methods:{
    decodeHTML(html){
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    selectAnswer(index){
      this.selectedAnswer = index
      this.updateResults()
    },
    shuffleAnswers(){
      let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
      this.shuffledAnswers = _.shuffle(answers)
      this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
      this.shuffledAnswers = this.shuffledAnswers.map(reponse => {
        return this.decodeHTML(reponse)
      }) 

    },
    updateResults(){
      let isCorrect = false 

      if(this.selectedAnswer === this.correctIndex){
        isCorrect = true
      }

      this.increment(isCorrect)
      this.answered = true
    },
    answerClass(index){
      let answerClass = ''

      if (this.answered && this.correctIndex === index){
        answerClass = 'correctAnswer'
      }else if (this.answered && this.selectedAnswer === index && this.correctIndex !== index) {
        answerClass = 'incorrectAnswer'
      }

      return answerClass
    },
    submit(){
      const isCorrect = this.selectedAnswer === this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
      this.$emit('submit', isCorrect)
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
    },
    isCorrect(){
      return this.question.correctAnswerId === this.answeredId
    }
  },
};

{
  question: 'quid?',
  answers: [
    {text: 'moi', id: 1},
    {text: 'toi', id: 2, correct: true},
  ]
}

{
  question: 'quid?',
  answers: [
    {text: 'moi', id: 1},
    {text: 'toi', id: 2},
  ],
  correctAnswerId: 2
}
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