import React, { Component } from 'react';

const Fields = []
class Related extends Component {

  componentWillMount() {
    this.children = this.collectFormField(this.props.children)
  }

  handleRelatedChange(data) {
    console.log('related' , data)
    console.log(Fields[0])
  }

  collectFormField = (children) => {
    const handleRelatedChange = this.handleRelatedChange

    /* 简单粗暴，在 Form 更新的时候直接清空上一次保存的 formFields，全量更新，避免 formFields 内容或者数量发生变化时 this.formFields 数据不正确的问题 */
    const FormFields = this.formFields = []

    /**
     * 用来保存 clone 后的子组件的实例
     */
    // const Fields =this.field = []

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
            handleRelatedChange: handleRelatedChange.bind(this)
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
    debugger
    return getChildList(children)
  }

  onChange(data) {
    console.log('内部检测' , data);
  }


  render() {
    // debugger
    // const children = React.Children.map(this.props.children,
    //   (child, index) => React.cloneElement(child, {
    //     ref: `child${index}`,
    //     onChange: this.onChange
    //   })
    // );

    console.log('related')
    return (
      <div className="related">
        {this.children}
      </div>
    );
  }
}

export default Related;
