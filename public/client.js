const socket = io();

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')


do{
name=prompt("Enter you name: ")
}while(!name) 

textarea.addEventListener('keyup',(e)=>{
    
    if(e.key === 'Enter' ){
        sendmessage(e.target.value )
    }
})

function sendmessage(message){
    let msg = {
        user : name,
        message : message.trim()
    }

    appendmessage(msg,'outgoing')
    textarea.value=''
    scroll()
socket.emit('message',msg)
}

function appendmessage(msg,type){
    let maindiv = document.createElement('div')
    let classname = type
    maindiv.classList.add(classname,'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    maindiv.innerHTML = markup

    messageArea.appendChild(maindiv) 
}

socket.on('message',(msg)=>{
    appendmessage(msg,'incoming')
    scroll()

})

function scroll(){
    messageArea.scrollTop=messageArea.scrollHeight
}