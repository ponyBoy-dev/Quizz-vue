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
              memeSrc = 'http://united-endoc.fr/wp-content/uploads/2019/01/obama-not-bad.png'
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