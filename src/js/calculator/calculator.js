var calculator = require("./calcObj");


var Calc = React.createClass({
        getInitialState: function(){
            return {screen: "0"};
        },

        handleClick: function(e){
          var button = e.target.textContent;
        //checks if button was clicked and not the containing div by mistake
        if(button.length>3)
          return;
        var newScreen;
        ((isNaN(button))&& (button !="."))?
          newScreen = calculator.pressOperator(e.target, this.state.screen) :
          newScreen = calculator.pressNumber(button, this.state.screen);
          this.setState({screen: newScreen});
        },

        render: function(){

            return (
                <div>
                <div id="display">{this.state.screen}</div>
                <Buttons localHandleClick = {this.handleClick} />
                </div>
            );
        }
});

var Buttons = React.createClass({
    render: function(){
        return (
          <div onClick={this.props.localHandleClick}>
            <div className="button gray" id="clearCalc">C</div>
            <div className="button gray" id="switchSign">+/-</div>
            <div className="button gray" id="percent">%</div>
            <div className="button gray" id="divide">/</div>
            <div className="button">7</div>
            <div className="button">8</div>
            <div className="button">9</div>
            <div className="button gray" id="multi">x</div>
            <div className="button">4</div>
            <div className="button">5</div>
            <div className="button">6</div>
            <div className="button gray" id="subtract">-</div>
            <div className="button">1</div>
            <div className="button">2</div>
            <div className="button">3</div>
            <div className="button gray" id="addition">+</div>
            <div className="button zero">0</div>
            <div className="button">.</div>
            <div className="button red" id="evalCalc">=</div>
            <div style={{clear: 'both'}} />
          </div>
        );
    }
});

module.exports = {
  Calc: Calc,
  Buttons: Buttons
};
