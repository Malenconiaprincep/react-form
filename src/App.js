import React, { Component } from 'react';
import Form from './components/form'
import Input from './components/input'
import Related from './components/related'

class App extends Component {

  state = {}

  onChange(data) {
    this.setState({
      data
    })
  }

  onSubmit() {

  }


  render() {

    const data = this.state.data || {};

    return (
      <Form
        onSubmit={this.onSubmit.bind(this)}
        onChange={this.onChange.bind(this)}>
          <Related>
            <div className="col">
              <Input
                formkey={'name'}
                value={data.name}
              />
            </div>
            <div className="col">
              <Input
                formkey={'age'}
                value={data.age}
              />
            </div>
          </Related>
          <Related>
            <div className="col">
              <Input
                formkey={'name1'}
                value={data.name}
              />
            </div>
            <div className="col">
              <Input
                formkey={'age1'}
                value={data.age}
              />
            </div>
          </Related>
      </Form>
    );
  }
}

export default App;
