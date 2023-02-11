      /*  VARIABLES  */
      const socket = io();
      const btnSend = document.getElementById("send-message");
      const message = document.getElementById("message-area");
      const nick = document.getElementById('nick-area');
      const boxMessages = document.getElementById("chat-box");

      /*  FUNCION DE HORA  */
      function hora() {
          var d = new Date();
          var horas = d.getHours();
          var minutos = d.getMinutes();
          return horas + ":" + minutos;
      }

      /*  ENVIAR MENSAJE  */
      btnSend.addEventListener("click", () => {
        if (message.value == "") {
          message.focus();
        } else if(nick.value == ""){
          nick.focus();
        }else{
          message.focus();
          nick.disabled = true;
          boxMessages.innerHTML += `
            <!-- MI MENSAJE -->
              <div class="chat from-message">
                <div class="detalles">
                  <p>${message.value}<br><span>${nick.value} &nbsp&nbsp&nbsp${hora()}</span></p>
                </div>
              </div>
            `;
          scrollBottom();
          socket.emit("message", { msg: message.value + "<br><span>" + nick.value + "</span>" });
          message.value = null;
        }
      });

      /* TECLA ENTER */
      function enterkey() {
        keyenter = event.keyCode;
        if (keyenter == 13) {
          btnSend.click();
          scrollBottom();
        }
      }
      window.onkeydown = enterkey;

      /*  ACTIVAR LA BARRA DE SCROLL  */
      function scrollBottom() {
        boxMessages.scrollTop = boxMessages.scrollHeight;
      }

      /* RECIBIR MENSAJE */
      socket.on("message", (data) => {
        boxMessages.innerHTML += `
          <!-- MENSAJE AMIGO -->
          <div class="chat to-message">
            <div class="detalles">
              <p>${data.msg}</p>
            </div>
          </div>
        `;
        scrollBottom();
      });