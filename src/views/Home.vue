<template>
  <div class="row container">
    <div class="col s4 offset-s4 back">
      <div class="row rad" v-if="flag === false">
        <div class="input-field col s12">
          <input id="first_name" type="text" class="validate" v-model="message.name">
          <label for="first_name">Name</label>
        </div>
        <div class="input-field col s12">
          <input id="password" type="password" class="validate" v-model="password">
          <label for="password">Room password</label>
        </div>
        <div class="btn__box">
          <a class="waves-effect waves-light btn-small" @click="log">Log in</a>
        </div>
      </div>
      <div class="main" v-else-if="flag === true">
        <div class="link-box">
          <a class="waves-effect waves-light btn-small" @click="logOut">Log out</a>
        </div>
        <div class="content">
          <ul class="messages__list">
            <li class="messages__list-item"
                v-for="mess in messagesCol"
                :key="mess"
                :style="{textAlign: message.name === mess.name ? 'right' : 'left'}">
              {{ mess.name }}<br>
              {{ mess.sms}}
            </li>
          </ul>
        </div>
        <div class="bot">
          <input id="sms" type="text" class="validate" v-model="message.sms">
          <a class="waves-effect waves-light btn-small" @click="sendMessage"> > </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase'

export default {
  name: "Home",
  data(){
    return{
      password: '',
      flag: false,
      sms: '',
      message:{
        _id: Date.now(),
        name: '',
        sms: ''
      },
      messagesCol: []
    }
  },
  methods: {
    log(){
      if(this.password === '1234'){
        this.flag = true
      }
    },
    logOut(){
      this.flag = false
      this.message.name = ''
      this.password = ''
    },
    sendMessage(){
      db.collection('chat').add(this.message)
          .then(()=>{console.log('success')})
          .catch((error)=>{console.error(error)})
      this.message.sms = ''
    },
  },
  mounted() {
    db.collection('chat').onSnapshot((snapshotChange)=>{
      this.messagesCol = []
      snapshotChange.forEach((doc)=>{
        this.messagesCol.push({
          key: doc.id,
          _id: doc.data()._id,
          name: doc.data().name,
          sms: doc.data().sms
        })
      })
      function sortBy(arr) {
        arr.sort((a, b) => a._id > b._id ? 1 : -1);
      }
      sortBy(this.messagesCol)
      console.log(this.messagesCol)
    })
  }
}

</script>

<style scoped>

.back{
  background-image: url('../assets/back.jpg');
  height: 550px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0,0,0,0.7);
}

.rad{
  background-color: #fff;
  border-radius: 3px;
  margin-top: 100px;
}


.btn__box{
  text-align: right;
  padding: 15px;
}
/*/////////////////////////////////////////////////////////*/

.main{
  padding: 5px;
}

.link-box{
  text-align: right;
  padding-top: 8px;
}

.content{
  margin-top: 20px;
  background-color: #fff;
  border-radius: 5px;
  min-height: 385px;
  overflow-y: scroll;
}
.messages__list{
  padding: 0px 5px ;
}

.bot{
  margin-top: 20px;
  border-radius: 5px;
  padding: 0;
  /*min-width: 295px;*/
  background-color: #ffffff;
  display: flex;
  align-items: center;
}

.messages__list-item{

}

@media (max-width: 1200px) {
  .bot{
    min-width: 240px;
  }
}

@media (max-width: 1050px) {
  .bot{
    min-width: 200px;
  }
}

@media (max-width: 800px) {
  .bot{
    min-width: 165px;
  }
}
</style>