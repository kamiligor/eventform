import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Info from './Info'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    type: 'success',
  }
  const component = shallow(<Info {...props}>Text</Info>)

  return {
    props,
    component
  }
}

describe('Info', () => {
  it('should render self', () => {
    const { component } = setup()
    
    expect(component.find('.Info').hasClass('Info--success')).toBe(true)
    expect(component.text()).toBe('Text')

  })
})
