import React, { useState, useEffect} from 'react';
import io from 'socket.io-client';
import axios from 'axios'
function WS1(){
const socket= io.connect('http://localhost:3000')

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
 
 
  useEffect(()=>{
    // Event listener on io.emit 
   socket.on('new-message',(data)=>{
     console.log(data.name);
     console.log(data.message);
     console.log(data)
     setMessages(messages=>messages.concat(data));
   })
   
},[]);
const handlechange= (e) => {
  const {target: {value}}= e; 
  setInput(value);
  
}
const Namechange= (e) => {
  const {target: {value}}= e;
  setName(value)
}

const handleSubmit= (e) => {
  e.preventDefault();
  socket.emit('message',{input,name}); //when user click sumbit i send msg to server
  setInput('');
  setName('');
}
  return(
    <div>
      <form id="form" onSubmit={handleSubmit} >
      <h3>Name</h3><input id="name" type="text" name="name" onChange={Namechange} value={name}/>
        <h3>Content</h3><input id="content" type="text" name="content" onChange={handlechange} value={input}/><br/><br/>
        <button type="submit" >send</button><br/>
      </form>
      <div>
        
        {
          messages.map(m => (<div key={m}>
          {console.log(m)}
          <span>
          <h1>{m.name}:{m.input} </h1>
          
           
          </span>
          </div>)
        )
        }
      </div>
    </div>
  )
    }


export default WS1;
