import decodeHTML from './decodeHTML'

function getQuestions(amount,categoryID, difficulty='any'){
    let URL = ''
    if(difficulty === 'any' ){
      URL = `https://opentdb.com/api.php?amount=${amount}&category=${categoryID}&type=multiple` 
    }else{
      URL = `https://opentdb.com/api.php?amount=${amount}&category=${categoryID}&difficulty=${difficulty}&type=multiple`
    }   
    return fetch(URL)
      .then(resp => resp.json())
      .then(json => makeDataUsable(json.results))     
}


function makeDataUsable(arr){
    let questions = []
    arr.map(objet=>{
        questions.push({
            questID: arr.indexOf(objet), 
            question: decodeHTML(objet.question), 
            answers: [],
            correctAnswerID: 1
        })
    })
    for(let i=0;i<arr.length;i++){
        questions[i].answers.push({
          text: decodeHTML(arr[i].correct_answer),
          id: 1
        });
        for(let k=0;k<3;k++){
            questions[i].answers.push({
              text: decodeHTML(arr[i].incorrect_answers[k]),
              id: k + 2
            })
        }    
    }
    return questions
    
}
/*const questionsFactory = (questID, question, answers, correctAnswerID)=>{
    return {
        questID,
        question,
        answers,
        correctAnswerID
    }
}*/
/*
const answersFactory = (text, id) => {
    return {
        text,
        id
    }
}*/

export default getQuestions//terminer export et import dans App.vue
/*
"results": [
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "easy",
      "question": "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
      "correct_answer": "Final",
      "incorrect_answers": [
        "Static",
        "Private",
        "Public"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "easy",
      "question": "The series of the Intel HD graphics generation succeeding that of the 5000 and 6000 series (Broadwell) is called:",
      "correct_answer": "HD Graphics 500",
      "incorrect_answers": [
        "HD Graphics 700 ",
        "HD Graphics 600",
        "HD Graphics 7000"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "easy",
      "question": "In web design, what does CSS stand for?",
      "correct_answer": "Cascading Style Sheet",
      "incorrect_answers": [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "On which day did the World Wide Web go online?",
      "correct_answer": "December 20, 1990",
      "incorrect_answers": [
        "December 17, 1996",
        "November 12, 1990",
        "November 24, 1995"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "In computing terms, typically what does CLI stand for?",
      "correct_answer": "Command Line Interface",
      "incorrect_answers": [
        "Common Language Input",
        "Control Line Interface",
        "Common Language Interface"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": ".rs is the top-level domain for what country?",
      "correct_answer": "Serbia",
      "incorrect_answers": [
        "Romania",
        "Russia",
        "Rwanda"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "hard",
      "question": "What internet protocol was documented in RFC 1459?",
      "correct_answer": "IRC",
      "incorrect_answers": [
        "HTTP",
        "HTTPS",
        "FTP"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "easy",
      "question": "How many values can a single byte represent?",
      "correct_answer": "256",
      "incorrect_answers": [
        "8",
        "1",
        "1024"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "hard",
      "question": "Dutch computer scientist Mark Overmars is known for creating which game development engine?",
      "correct_answer": "Game Maker",
      "incorrect_answers": [
        "Stencyl",
        "Construct",
        "Torque 2D"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "How many bytes are in a single Kibibyte?",
      "correct_answer": "1024",
      "incorrect_answers": [
        "2400",
        "1000",
        "1240"
      ]
    }
  ]
}*/
