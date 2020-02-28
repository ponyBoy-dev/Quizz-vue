<template>
  <div>
      <b-img
        :src='levelMeme()'
        fluid-grow
        alt="stupid meme correlated with your score"
      ></b-img>

      <b-button 
        
        variant="outline-primary" 
        @click='refresh()'
      >
      Encore !
      </b-button>
  </div>

</template>

<script>
export default {
  props: ["numTotal", "numCorrect"],
  methods : {
      refresh(){
          window.location.reload();
      },
      levelMeme(){
          let memeSrc = ''
          if(this.numCorrect > 7){
              memeSrc = "https://www.memesmonkey.com/images/memesmonkey/2c/2c49f4d8c84c50d2c7e5b8091af60f78.jpeg"
          }else if(this.numCorrect > 4){
              memeSrc = 'https://lh3.googleusercontent.com/proxy/0pZFxWmOwad4nR2lQt-5HZt3N1eNm7RksSQqnRjt6ppbRJMUhJvuAbN8aHylaekA1KQG7hV5X-IofyAw6Is_wcyp6UgM23sCuNSZNmNik4F_CBWBhw-__aVtXg'
          }
          else {
              memeSrc = 'https://media.makeameme.org/created/just-keep-working-mh8dpn.jpg'
          }
          return memeSrc
      }

  }
};
</script>

<style scoped>
img{
    margin-top:1em;
    margin-bottom: 1em;
}
</style>