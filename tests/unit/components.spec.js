import { mount } from '@vue/test-utils'
import RegisterButton from '@/components/input/RegisterButton.vue'
import SelectField from '@/components/input/SelectField.vue'
import TextField from '@/components/input/TextField.vue'

describe('RegisterButton', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(RegisterButton)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('div')
  })

  // it's also easy to check for the existence of elements
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})

describe('SelectField', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(SelectField)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('div')
  })

  // it's also easy to check for the existence of elements
  it('has a select', () => {
    expect(wrapper.contains('select')).toBe(true)
  })
})

describe('TextField', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(TextField)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('div')
  })
  // it's also easy to check for the existence of elements
  it('has an input', () => {
    expect(wrapper.contains('input')).toBe(true)
  })
})
