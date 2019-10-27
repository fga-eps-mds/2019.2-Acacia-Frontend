import { mount } from '@vue/test-utils'
import RegisterButton from '@/components/input/RegisterButton.vue'

describe('Counter', () => {
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
