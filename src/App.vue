<template>
  <div id="app">
    <Header
    :numCorrect="numCorrect"
    :numTotal="numTotal"
    :index="index" />
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset="3">
          <PromiseReporter
          v-if="questions.length ===0"
          :promiseStatus="promiseStatus"/>
          <QuestionBox
          v-if="questions.length && index < 10"
          :question="questions[index]"
          :key="index"
          :nextQuest="nextQuest"
          @reponse="onReponse"
          @suivante="nextQuest"
          :numTotal="numTotal" />
          <FinalResults
          v-if="index > 9"
          :numCorrect="numCorrect"
          :numTotal="numTotal"
           />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import QuestionBox from "./components/QuestionBox.vue";
import Header from "./components/Header.vue";
import FinalResults from "./components/FinalResults";
import getQuestions from "./utils/opentdbClient"
import PromiseReporter from "./components/PromiseReporter"

export default {
  name: "App",
  components: {
    Header,
    PromiseReporter,
    QuestionBox,
    FinalResults
  },
  data(){
    return {
      promiseStatus : "Un peu de patience, nous récupérons un set de questions",
      questions: [],
      index : 0,
      numCorrect : 0,
      numTotal : 0
    }
  },
  methods : {
    nextQuest(){
      this.index++
    },
    onReponse(isCorrect){
  
      if(isCorrect){
        this.numCorrect++
      }
      this.numTotal++
    }
  },
  mounted: function (){
    getQuestions(10,18).then(questions => {
      this.questions = questions;
    }).catch(err =>{
      console.log(err);
      this.promiseStatus = "Nous n'avons pas pu récupérer de questions, rafraîchissez la page pour faire une nouvelle tentative"
      console.log(this.promiseStatus);
    })
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
