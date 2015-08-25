var content = require("./content.txt");
var React = require("react");
var CalcComponents = require("./calculator/calculator");
var Calc = CalcComponents.Calc, Buttons = CalcComponents.Buttons;
document.addEventListener("DOMContentLoaded", function(){


  var index = 0;
  fixDoubleLineIssue();
  writeContent(index);

  function writeContent(index){
    if(index<content.length) {
      //variables
      var char = content[index], charPrev = content[index-1];

      //add character to tags
      document.getElementById("the-pre").innerHTML += char;
      document.getElementById("style-tag").innerHTML += char;

      //can't just write tags into <pre> without the browser trying to fix it and messing it up
      addMarkup(index);

      //adjust the scroll to always see what's being written
      var thePre = document.getElementById("the-pre");
      thePre.scrollTop = thePre.scrollHeight;

      //set the delay to make the effect like someone is really typing
      var delay = setDelay(charPrev,char,index);

      //initialize the calculator via React
      if(index===1750)
        React.render(<Calc />, document.getElementById('calc'));

      //recurse through each character of the text file
      index++;
      setTimeout(writeContent, delay, index);
    }
  }


  function addMarkup(idx){
    var preHtml;
    if(content.slice(idx-1,idx+1)=="*/"){
      preHtml = document.getElementById("the-pre").innerHTML;
      preHtml = preHtml.replace(/(\/\*[^}]*\*\/$)/g,"<span class='comment'>$1</span>");
      document.getElementById("the-pre").innerHTML = preHtml;
    }
    else if(content.slice(idx,idx+1)=="{"){
      preHtml = document.getElementById("the-pre").innerHTML;
      preHtml = preHtml.replace(/(.*){$/g,"<span class='selector'>$1</span> {");
      document.getElementById("the-pre").innerHTML = preHtml;
    }
    else if(content.slice(idx,idx+1)==":"){
      preHtml = document.getElementById("the-pre").innerHTML;
      preHtml = preHtml.replace(/([{| ][a-zA-Z-]*):$/g,"<span class='key'>$1</span>:");
      document.getElementById("the-pre").innerHTML = preHtml;
    }
    else if(content.slice(idx,idx+1)==";"){
      preHtml = document.getElementById("the-pre").innerHTML;
      preHtml = preHtml.replace(/([^:]*);$/g,"<span class='value'>$1</span>;");
      document.getElementById("the-pre").innerHTML = preHtml;
    }
    else if(content.slice(idx-1,idx+1)=="px"){
      preHtml = document.getElementById("the-pre").innerHTML;
      preHtml = preHtml.replace(/(px)$/g,"<span class='px'>$1</span>");
      document.getElementById("the-pre").innerHTML = preHtml;
    }
  }

  //the stringify module adds both "\r" and "\n" that causes double line spacing.
  function fixDoubleLineIssue(){
    content = content.replace(/\r/g, "");
  }

  // pause for punctuation, but don't pause if it's CSS
  function setDelay(charPrev,char,index){

    var setTo;
    ((char==="." || char==="?")&& !(/[0-9| ]/.test(charPrev)))
      ? setTo=1000
      : (char==="," && !(/[0-9]/.test(charPrev)))
        ? setTo=300
        : (char==="}" && charPrev !==";" )
          ? setTo=1000
          : (1766<index && index<2685)
            ? setTo=0
              : setTo= 30;

    return setTo;
  }


});

