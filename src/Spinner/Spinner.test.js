import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Spinner from './Spinner';
import svg from './images/spinner.svg';

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const component = shallow(<Spinner />)

  return {
    component
  }
}


describe('Spinner', () => {
  it('should render spinner svg', () => {
    const { component } = setup()

    expect(component.find('img').prop('src')).toEqual(svg);
  })
})
