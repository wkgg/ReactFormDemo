var React = require ('react')
// var Select = require('react-select');

function addChangeHandler(target) {
  target.prototype.changeHandler = function(key, attr, event) {
    var state = {};
    state[key] = this.state[key] || {};
    state[key][attr] = event.currentTarget.value;
    this.setState(state);
    this.props.onChange(attr, event.currentTarget.value)
  };
  return target;
}

function addValidateHandler(target) {
  target.prototype.componentWillReceiveProps = function(nextProps) {
    this.setState({
      validate: nextProps.validate
    })
  };
  target.prototype.showErrorIfNotValid = function() {
    if(this.state.validate && !this.isValid())
      return <a>error !</a>
  };
  return target;
}

@addChangeHandler
class NameComponent extends React.Component{
  constructor(){
    super()
    this.state = {
      name: {},
      validate: false
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      validate: nextProps.validate
    });
  }
  isFirstNameValid(){
    return this.state.name.firstName.length > 5
  }
  isLastNameValid(){
    return this.state.name.lastName.length > 5
  }
  render(){
    return(
      <div>
        <h4>Personal Details</h4>
        <div>
          <label>First Name</label>
          <input name='firstName' value={this.state.name.firstName} onChange={this.changeHandler.bind(this, 'name','firstName')}/>       
          {(() => {
            if(this.state.validate && !this.isFirstNameValid())
              return <a>error !</a>
          })()}
        </div>
        <div>
          <label>Last Name</label>
          <input name='lastName' value={this.state.name.lastName} onChange={this.changeHandler.bind(this, 'name', 'lastName')}/>                 
          {(() => {
            if(this.state.validate && !this.isLastNameValid())
              return <a>error !</a>
          })()}
        </div>
      </div>
    );
  }
}

@addChangeHandler
@addValidateHandler
class TextArea extends React.Component {
  constructor(){
    super()
    this.state = {
      container: {},
      validate: false
    }
  }

  componentWillReceiveProps(nextProps){
    this.componentWillReceiveProps(nextProps);
  }

  isValid(){
    return this.state.container[this.props.name].length > 5
  }
  render(){
    return(
      <div>
        <textarea name={this.props.name} value={this.state.container[this.props.name]} onChange={this.changeHandler.bind(this, 'container', this.props.name)}/>
        {this.showErrorIfNotValid()}
      </div>
    );
  }
}

class Form extends React.Component{
  constructor(){
    super()
    this.state = {
      firstName: '',
      lastName: '',
      country: '',
      comment1: '',
      comment2: '',
      validate: false
    }
  }
  handleChange(key, value){
    var nextState = {};
    nextState[key] = value;
    this.setState(nextState);
  }
  handleSelect(value){
    this.setState({
      country: value
    });
  }
  handleClick(){
    this.setState({
      validate: true
    })
    return false
  }
  render(){
    let options = [
        { value: 'china', label: 'China' },
        { value: 'america', label: 'America' },
        { value: 'frence', label: 'Frence'}
    ];
    return(
      <form>
        <h1>Service Initiation Request</h1>
        <NameComponent onChange={this.handleChange.bind(this)} validate={this.state.validate}/>
        <h4>Additional Comments</h4>
        <TextArea onChange={this.handleChange.bind(this)} name='comment1' validate={this.state.validate}/>
        <TextArea onChange={this.handleChange.bind(this)} name='comment2' validate={this.state.validate}/>
        <div>
          <button onClick={this.handleClick.bind(this)}>Submit</button>
        </div>
      </form>
    );
  }
}

React.render(<Form />, document.getElementById('react-container'));
