function Message({message,username}){


const mine =
message.username === username;



return (


<div className={
mine 
? "message-row mine"
: "message-row"
}>


<div className="message-bubble-wrapper">



{
!mine &&

<div className="sender-name">

{message.username}

</div>

}




<div className={
mine
?
"bubble mine-bubble"
:
"bubble received-bubble"
}>


<div className="text">

{message.text}

</div>



<div className="time">


{
new Date(message.timestamp)
.toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

})
}


{
mine &&

<span className="ticks">

✓✓

</span>

}


</div>



</div>




</div>


</div>


);


}


export default Message;