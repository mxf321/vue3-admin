export const validatePassword = () => {
  return (rule: any, value: any, callback: any) => {
    if (value.length < 6) {
      callback(new Error('Please input the password'))
    } else {
      callback()
    }
  }
}
