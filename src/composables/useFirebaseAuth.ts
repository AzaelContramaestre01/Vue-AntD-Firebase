import { ref } from 'vue'
import router from '../router'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
  } from 'firebase/auth'

const loading = ref(false)
const errMsg = ref('')

export const useFirebaseAuth = () => {
    const onSignUp = (values: any) => {
        loading.value = true
        createUserWithEmailAndPassword(getAuth(), values.email, values.password)
          .then((userCredential) => {
            // Signed in
            router.push('/juice')
            const user = userCredential.user
            console.log(user)
            // ...
          })
          .catch((error) => {
            switch (error.code) {
              case 'auth/email-already-in-use':
                errMsg.value = 'That email address is already in use!'
                break
              case 'auth/invalid-email':
                errMsg.value = 'Invalid email address format.'
                break
              case 'auth/weak-password':
                errMsg.value = 'Password should be at least 6 characters'
                break
              default:
                errMsg.value = 'Email or password was incorrect'
                break
            }
            setTimeout(() => {
              loading.value = false
            }, 500)
          })
      }



      const onSignIn = (values: any) => {
        loading.value = true
        signInWithEmailAndPassword(getAuth(), values.email, values.password)
          .then((userCredential) => {
            // Signed in
            router.push('/juice')
            const user = userCredential.user
            console.log(user)
            // ...
          })
          .catch((error) => {
            switch (error.code) {
              case 'auth/invalid-email':
                errMsg.value = 'Invalid email address format.'
                break
              case 'auth/user-not-found':
                errMsg.value = 'User not found.'
                break
              case 'auth/wrong-password':
                errMsg.value = 'Incorrect password.'
                break
              default:
                errMsg.value = 'Email or password was incorrect'
                break
            }
          })
          setTimeout(() => {
            loading.value = false
          }, 500)
      }


      const signIniwthGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(getAuth(), provider)
          .then((result) => {
            router.push('/juice')
          })
          .catch((error) => {
            console.log(error)
          })
      }


      return { onSignUp, loading, errMsg, onSignIn, signIniwthGoogle }
}