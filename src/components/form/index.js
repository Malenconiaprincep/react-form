import React, { Component } from 'react';

class Form extends Component {


  state =  {
    isComplete: false,
    isValidate: false,
    data: {},
    errorMsgList: []
  }

  componentWillMount () {
    this.children = this.collectFormField(this.props.children)
    // this.initFormDataStructure()
  }

  collectFormField = (children) => {
    const handleFieldChange = this.handleFieldChange

    /* 简单粗暴，在 Form 更新的时候直接清空上一次保存的 formFields，全量更新，避免 formFields 内容或者数量发生变化时 this.formFields 数据不正确的问题 */
    const FormFields = this.formFields = []

    /**
     * 用来保存 clone 后的子组件的实例
     */
    const Fields = this.field = []

    function getChildList (children) {
      return React.Children.map(children, (el, i) => {
        if (!el || el === null) return null

        const childName = el.props.formkey
        if (childName) {
          const child = React.cloneElement(el, {
            key: i,
            ref: (ref) => {
              ref && Fields.push(ref)
            },
            handleFieldChange
          })
          FormFields.push(child)
          return child
        } else {
          if (el.props && el.props.children) {
            const children = getChildList(el.props.children)
            return React.cloneElement(el, {
              key: i,
              children
            })
          } else {
            return el
          }
        }
      })
    }

    return getChildList(children)
  }

  handleFieldChange = (fieldData) => {

    let state = this.state;
    let name = fieldData.name

    if (state.data[name]) {
      state.data[name] = {
        ...state.data[name],
        ...fieldData
      }
    } else {
      state.data[name] = fieldData
    }

    console.log(state);
    //
    // // TODO 重写 isFormComplete
    // state.isComplete = isFormComplete(state.data)
    // this.props.onFieldChange(fieldData)
    //
    // // 为了避免传入 state 被外界修改，所以传入一个新的对象
    const nextState = {
      ...state,
      data: {
        ...state.data
      }
    }
    this.handleFormChange(nextState)
    // this.setStateAndCurrentStatus(nextState, STATUS.Normal)
  }

  get data() {
    const { value, isError } = this.state
    const { name, errorMsg, required, shouldRsa } = this.props
    return {
      name,
      value,
      isError,
      errorMsg,
      required,
      shouldRsa
    }
  }

  handleFormChange(state) {
    this.props.onChange(state)
  }


  render() {



    return (
      <form>
        {this.children}
        <button>submit</button>
      </form>
    );
  }
}

export default Form;
