<template>
  <div id="app">
    <Header
    :numCorrect="numCorrect"
    :numTotal="numTotal"
    :index="index" />
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset="3">
          <QuestionBox
          v-if="questions.length && index < 10"
          :currentQuestion="questions[index]"
          :nextQuest="nextQuest"
          :increment="increment"
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

export default {
  name: "App",
  components: {
    Header,
    QuestionBox,
    FinalResults
  },
  data(){
    return {
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
    increment(isCorrect){
      if(isCorrect){
        this.numCorrect++
      }
      this.numTotal++
    }
  },
  mounted: function (){
    fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple', {
      method:'get'
    }).then((response)=>{
      return response.json();
    }).then((jsonData)=>{
      this.questions = jsonData.results
    });
  
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
