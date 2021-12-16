const X = "fas fa-times fa-7x "
const O = "far fa-circle fa-7x"
const x_color = "#ff7675"
const o_color = "#fdcb6e"
const default_color ="#2d3436"

var checked_squares = [0,0,0,0,0,0,0,0,0]
var turn = 9
var squares = document.querySelectorAll("span");
var step = new Audio("./sounds/step.mp3")
var gameover = new Audio("./sounds/gameover.mp3")



if (window.localStorage.getItem("mute") == null)
{
    window.localStorage.setItem("mute", 1)
    document.body.className = "modeoff"
    
} else if (window.localStorage.getItem("mute") == 1)
{
    document.body.className = "modeoff"
}
else if (window.localStorage.getItem("mute") == 0 )
{
    document.body.className = ""
}


function changeSoundMode()
{

    
    if (window.localStorage.getItem("mute") == 1) 
    {
        window.localStorage.setItem("mute", 0)
        document.body.className = ""
    }
    else
    { 
        window.localStorage.setItem("mute", 1)
        document.body.className = "modeoff"
    }  
    

}

function playSound(sound) {

    
    if((window.localStorage.getItem("mute") == 0))
    {
        sound.play()
    }

    
}

function restartTheGame() {
    location.reload()
}

function showResult(msg)
{
    var div = document.createElement("div")
    div.style.position ="absolute"
    div.style.width="100%"
    div.style.height="100%"
    div.style.overflow ="hidden"
    div.style.left = '0px';
    div.style.top = '0px';
    div.style.justifyContent ="center"
    div.style.alignItems="center"
    div.style.textAlign ="center"
    div.style.background = '#2d3436';
    div.style.opacity= ".7"
    div.style.display = "block"
    div.style.color = "#d63031"

    document.body.appendChild(div)
    var h1 = document.getElementById("txt")
    var button = document.getElementById("btn")
    h1.style.display ="inherit"
    h1.innerText = msg
    button.style.display ="inherit"
    button.className = "button blue"
    button.addEventListener("click", function () {
        restartTheGame()
    })


 


}
function checkWinner(checked_squares,turn) {
    
    player1 = 0
    player2 = 0

   if (checked_squares[0] == "o" && checked_squares[1] =="o" && checked_squares[2]=="o"   || 
    checked_squares[0]  == "o" && checked_squares[3] =="o" && checked_squares[6]=="o" ||
     checked_squares[0] =="o" && checked_squares[4] =="o" && checked_squares[8]=="o"  ||
     checked_squares[1] =="o" && checked_squares[4] =="o" && checked_squares[7]=="o"   ||
     checked_squares[2] =="o" && checked_squares[5] =="o" && checked_squares[8]=="o"  ||
     checked_squares[3] =="o" && checked_squares[4] =="o" && checked_squares[5]=="o"  ||
     checked_squares[6] =="o"  && checked_squares[7] =="o" && checked_squares[8]=="o" ||
     checked_squares[2] =="o"  && checked_squares[4] =="o" && checked_squares[6]=="o")
    {
        
          player1 = 1
    }

    if (checked_squares[0] == "x" && checked_squares[1] =="x" && checked_squares[2]=="x"   || 
    checked_squares[0]  == "x" && checked_squares[3] =="x" && checked_squares[6]=="x" ||
     checked_squares[0] =="x" && checked_squares[4] =="x" && checked_squares[8]=="x"  ||
     checked_squares[1] =="x" && checked_squares[4] =="x" && checked_squares[7]=="x"   ||
     checked_squares[2] =="x" && checked_squares[5] =="x" && checked_squares[8]=="x"  ||
     checked_squares[3] =="x" && checked_squares[4] =="x" && checked_squares[5]=="x"  ||
     checked_squares[6] =="x"  && checked_squares[7] =="x" && checked_squares[8]=="x"||
     checked_squares[2] =="x"  && checked_squares[4] =="x" && checked_squares[6]=="x")
    {
        player2 = 1 
    }
    if(player1)
    {
        playSound(gameover)
        showResult("Player O Won")
    }
    else if(player2)
    {
        playSound(gameover)
        showResult("Player X Won")
    }
    else if (player1 === 0 && player2 === 0 && turn == 0) 
     {  
        playSound(gameover) 
        showResult("It's a Tie")
     }
    }
    




for (let i=0; i<squares.length;i++)
{
    squares[i].addEventListener("mouseover", function (){

        if (turn % 2 != 0)
        {
             color = default_color
             clsname = O
        }
        else 
        {
            color = default_color
            clsname = X
        }

        
        if (!(squares[i].getAttribute("checked")))
        {
            
            squares[i].style.transition ='background-color 0.1s ease-in'
            squares[i].style.backgroundColor = color
            squares[i].style.color ="#636e72"
            squares[i].className = clsname
            
        }

    })


    squares[i].addEventListener("mouseout",function (){ 

        if (!(squares[i].getAttribute("checked")))
        {
            squares[i].style.backgroundColor ="rgba(255, 255, 255, 0.75)"
            squares[i].style.transition ="background-color 0.5s ease-out"
            squares[i].className = ""
        }

    })

    squares[i].addEventListener("click",function (){ 
        if (turn== 0) return
        if (turn % 2 != 0)
        {
             color = o_color
             clsname = O
             marked = "o"
        }
        else 
        {
            color = x_color
            clsname = X
            marked = "x"
        }
        if (!(squares[i].getAttribute("checked")))
        {
            playSound(step)
            squares[i].style.transition ="0.3s ease-in"
            squares[i].style.backgroundColor = color
            squares[i].className = clsname
            squares[i].style.color ="white"
            squares[i].setAttribute("checked",true)
            squares[i].setAttribute("marked",marked)
            squares[i].style.cursor = "default"
            checked_squares[i] = marked
            turn--;
            checkWinner(checked_squares,turn)
        }

        

    })


}

