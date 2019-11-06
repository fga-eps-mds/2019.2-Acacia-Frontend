import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils'
import moxios from 'moxios'
import sinon from 'sinon'
import Signin from '@/views/Signin.vue'
import i18n from '@/plugins/i18n.js'
import Toasted from 'vue-toasted'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const store = new Vuex.Store({})
const localVue = createLocalVue();
localVue.use(Toasted)
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe('Signin', () => {
  let wrapper;
  let vm;
  beforeEach(() => {
    moxios.install();
    wrapper = mount(Signin, { store, i18n, localVue });
    vm = wrapper.vm;
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('check login and validateInput functions existence', () => {
    expect(typeof Signin.methods.login).toBe('function')
    expect(typeof Signin.methods.validateInput).toBe('function')
  });

  it('sets correct default data', () => {
    expect(typeof Signin.data).toBe('function')
    const defaultData = Signin.data()
    expect(defaultData.email).toBe('')
    expect(defaultData.password).toBe('')
  })
/*
  it('post Signin', () => {
    vm.dialog = true;
    vm.email = 'teste';
    vm.password = 'dhb';
    moxios.install();

    const onFulfilled = sinon.spy();
    moxios.stubRequest(vm.login().then(onFulfilled), {
      status: 200,
    });

    moxios.wait(() => {
      equal(onFulfilled.called, true);
      expect(vm.dialog).toBe(false);
    });

    moxios.uninstall();
  });

  it('not post Signin', () => {
    expect(typeof Signin.methods.login).toBe('function');
    vm.username = undefined;
    vm.password = undefined;
    moxios.install();

    const onFulfilled = sinon.spy();
    moxios.stubRequest(vm.login().then(onFulfilled), {
      status: 400,
    });

    moxios.wait(() => {
      equal(onFulfilled.called, false);
      expect(vm.token).toBe(null);
    });

    moxios.uninstall();
  });*/
});
