<template>
  <div>
    <!-- username -->
    <div class="chat-name">
      <input type="text" placeholder="Enter the name" v-model="sender">
    </div>
    <!-- chat messages -->
    <div class="chat-list">
      <div class="chat-list-item" v-for="(m, index) in messages" :key="index"
      :class="{ active: m.sender === sender}"
      >
        <h1>{{ m.sender }}</h1>
        <span>{{ m.message }}</span>
        <small>{{ m.time }}</small>
      </div>
    </div>
    <!-- chat control panel -->
    <div class="chat-control">
      <form @submit.prevent="sendMessage">
        <input type="text" placeholder="Type here..." v-model="message">
        <button type="submit">
          send
        </button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    messages: [],
    message: '',
    sender: ''
  }),
  methods: {
    sendMessage() {
      this.$socket.emit('send',
        (
          {
            message: this.message,
            sender: this.sender,
            time: this.$moment().format('hh:mm')
          }
        ));
        this.message = '';
    }
  },
  mounted() {
    // 
    this.$socket.on('update', (data) => {
      this.messages = data;
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.active{
  background-color: lightgray;
}

.chat-list-item{
  display: flex;
  flex-direction: column;
  padding: 0.5em 1em;
  border: 1px solid;
}


.chat-name,
.chat-control {
  margin-top: 1em;
  margin-bottom: 1em;
}

.chat-name input {
  padding: 1em;
  width: 50%;
}

.chat-control form {
  display: flex;
}

.chat-control form input {
  width: 100%;
  padding: 1em;
}

.chat-list {
  border: 2px solid;
  width: 600px;
  height: 600px;
  overflow-y: scroll;
}

.chat-list::-webkit-scrollbar{
  width: 0px;
}
</style>
