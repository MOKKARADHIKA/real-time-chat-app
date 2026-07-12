import { useEffect, useRef, useState } from "react";
import API from "../services/api";
import socket from "../socket";
import Message from "./Message";


function ChatBox() {


  const [messages,setMessages] = useState([]);


  const [username,setUsername] = useState(
    sessionStorage.getItem("username") || ""
  );


  const [joined,setJoined] = useState(
    sessionStorage.getItem("username") ? true : false
  );


  const [tempUsername,setTempUsername] = useState("");


  const [text,setText] = useState("");


  const messagesEndRef = useRef(null);





  // Load previous messages

  useEffect(()=>{


    const fetchMessages = async()=>{


      try{


        const res = await API.get("/messages");


        setMessages(res.data);


      }
      catch(error){

        console.log(error);

      }


    };


    fetchMessages();


  },[]);







  // Receive realtime messages

  useEffect(()=>{


    socket.on("newMessage",(message)=>{


      setMessages(prev=>[

        ...prev,

        message

      ]);


    });



    return ()=>{

      socket.off("newMessage");

    };


  },[]);








  // Auto scroll

  useEffect(()=>{


    messagesEndRef.current?.scrollIntoView({

      behavior:"smooth"

    });


  },[messages]);









  const joinChat=()=>{


    if(!tempUsername.trim()) return;


    sessionStorage.setItem(
      "username",
      tempUsername.trim()
    );


    setUsername(
      tempUsername.trim()
    );


    setJoined(true);


  };








  const sendMessage = async()=>{


    if(!text.trim()) return;



    try{


      await API.post("/messages",{


        username:username,


        text:text.trim()


      });



      setText("");



    }
    catch(error){

      console.log(error);

    }


  };







  const handleEnter=(e)=>{


    if(e.key==="Enter"){

      sendMessage();

    }


  };








  // Username login screen

  if(!joined){


    return (

      <div className="login-container">


        <div className="login-box">


          <h2>

            💬 Join Chat

          </h2>



          <input


          type="text"


          placeholder="Enter your username"


          value={tempUsername}


          onChange={(e)=>

            setTempUsername(e.target.value)

          }


          onKeyDown={(e)=>{


            if(e.key==="Enter"){

              joinChat();

            }

          }}


          />




          <button onClick={joinChat}>


            Join Chat


          </button>



        </div>


      </div>


    );


  }









  return (


    <div className="chat-container">





      <div className="chat-header">



        <div className="profile-circle">


          {username
          .charAt(0)
          .toUpperCase()}


        </div>





        <div className="header-details">


          <h3>

            {username}

          </h3>



          <span>

            🟢 online

          </span>



        </div>




      </div>









      <div className="messages">



        {

          messages.map((msg)=>(



            <Message


            key={msg._id}


            message={msg}


            username={username}


            />


          ))


        }



        <div ref={messagesEndRef}/>



      </div>









      <div className="input-area">



        <input



        value={text}



        placeholder="Type a message"



        onChange={(e)=>

          setText(e.target.value)

        }



        onKeyDown={handleEnter}



        />





        <button onClick={sendMessage}>


          ➤


        </button>



      </div>





    </div>


  );


}



export default ChatBox;