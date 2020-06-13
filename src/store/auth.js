import firebase from "firebase/app";
/* eslint-disable */
export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password, name, admin }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");
        await firebase.database().ref(`/users/${uid}/info`).set({
          name,
          admin
        });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null
    },
    async logout() {
      await firebase.auth().signOut();
    }
  }
};
