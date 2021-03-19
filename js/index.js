"use strict";

const messageSystem = {
  startFetching() {
  },

  sendMessage(msg) {
    // https://thecrew.cc/api/message/create.php?token=__TOKEN__ POST

    document.getElementById('messageForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const getMessage = document.getElementById('messageField').value;
      console.log(getMessage);
    });
  },

  fetchMessages() {
    // https://thecrew.cc/api/message/read.php?token=__TOKEN__ GET
    fetch('https://thecrew.cc/api/message/read.php?token='+userSystem.token)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    })
  }
};

const userSystem = {
  token: "",
  loggedIn: false,
  checkToken(){
    const localToken = this.getToken();
    if(localToken !== null){
      this.token = localToken;
      document.getElementById("loginWindow").style.display = "none";
      messageSystem.fetchMessages();
      messageSystem.sendMessage();
    }
  },
  
  saveToken() {
    localStorage.setItem("token", this.token);
  },

  getToken() {
    return localStorage.getItem("token");
  },

  logout() { 
    localStorage.removeItem("token");
  },

  login(email, password) {
    // https://thecrew.cc/api/user/login.php POST
    fetch('https://thecrew.cc/api/user/login.php', {
      method: 'POST',
      body: JSON.stringify({email: email, password: password})
    })
    .then((response) =>{
      return response.json();
    })
    .then((data) =>{
      console.log(data)
      const token = data.token;
      this.token = token;
      messageSystem.fetchMessages();
      this.saveToken();
      document.getElementById("loginWindow").style.display = "none";
    })
  },

  updateUser(password, handle) {
    // // https://thecrew.cc/api/user/update.php?token=__TOKEN__ POST
    // fetch(`https://thecrew.cc/api/user/update.php?token=${userSystem.token}`, {
    //   method : 'POST',
    //   body: JSON.stringify({password: password, handle: handle})
    // })
    // .then((response) =>{
    //   return response.json();
    // })
    // .then((data) =>{
    //   console.log(data)
    // })
  }
};

const display = {
  initFields() {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('emailField').value;
      const password = document.getElementById('passwordField').value;
      //console.log(email,password); OK
      userSystem.login(email, password);
    });
  }
};
  
  display.initFields();
  userSystem.checkToken();