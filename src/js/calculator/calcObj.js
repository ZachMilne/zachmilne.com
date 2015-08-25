var calculator = {
  queue : "",
  args : [],
  operator : "",
  pressNumber : pressNumberFunc,
  pressOperator : pressOperatorFunc,
  clearCalc : clearCalc,
  percent : percent,
  switchSign : switchSign,
  addition : addition,
  subtract : subtract,
  divide : divide,
  multi : multi,
  evalCalc : evalCalc
};

function pressNumberFunc(button, viewState) {
  //remove the "0" on the display if it's the first button that has been pressed.
  if(!this.args[0] && !this.queue && viewState=="0")
    viewState = "";
  this.queue = this.queue.concat(button);
  return viewState.concat(button);
}

function pressOperatorFunc(buttonDiv, viewState){
  var char = buttonDiv.textContent;

  if(!this.queue && char != "C"){
    return viewState;
  }
  if(["/","x","+","-"].indexOf(char)>=0){
    if(this.args.length<1){
      this.args.push(this.queue);
      this.queue = "";
      this.operator = buttonDiv.id;
      return viewState.concat(" ",char," ");
    }
    else{
      this.args.push(this.queue);
      var eval = this[this.operator](this.args);
      this.operator = buttonDiv.id;
      this.args = [eval];
      this.queue = "";
      return viewState.concat(" ",char," ");
    }
  }
  return this[buttonDiv.id](viewState);
}

function clearCalc(viewState){
  this.queue = "";
  this.args = [];
  this.operator = "";
  viewState = "0";
  return viewState;
}

function switchSign(viewState){
  viewState = viewState.substr(0,(viewState.length-this.queue.length))
    .concat("(",this.queue*(-1),")");
  this.queue= this.queue*(-1);
  return viewState;
}

function percent(viewState){
  if(this.args.length<1)return viewState;
  viewState = viewState.substr(0,(viewState.length-this.queue.length))
    .concat((this.queue*.01)*this.args[0]);
  this.queue = (this.queue*.01)*this.args[0];
  return viewState;
}

function evalCalc(viewState){
  if(this.args==0)
    return viewState;
  this.args.push(this.queue);
  var eval = this[this.operator](this.args);
  this.operator = "";
  this.args = [];
  this.queue = eval.toString();
  return eval.toString();
}

function addition(arr){
  return parseFloat(arr[0],10)+parseFloat(arr[1],10);
}
function multi(arr){
  return parseFloat(arr[0],10)*parseFloat(arr[1],10);
}
function subtract(arr){
  return parseFloat(arr[0],10)-parseFloat(arr[1],10);
}
function divide(arr){
  return parseFloat(arr[0],10)/parseFloat(arr[1],10);
}

module.exports = calculator;
