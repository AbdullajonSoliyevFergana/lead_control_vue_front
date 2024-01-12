// We haven't added icon's computed property because it makes this mixin coupled with UI
export const togglePasswordVisibility = {
  data() {
    return {
      registerPasswordFieldType: 'text',
      confirmPasswordFieldType: 'password',
    }
  },
  methods: {
    toggleRegPasswordVisibility() {
      this.registerPasswordFieldType = this.registerPasswordFieldType === 'password' ? 'text' : 'password'
    },
    toggleConfPasswordVisibility() {
      this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password'
    },
  },
}

export const _ = null
