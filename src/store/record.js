import firebase from "firebase/app";

/* eslint-disable */
export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUid");
        await firebase.database().ref(`/users/${uid}/records`).push(record);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch("getUid");
        const isAdmin = (await firebase.database().ref(`/users/${uid}/info`).once("value")).val().admin;

        if (isAdmin) {
          const adminRecords = (await firebase.database().ref(`/users/`).once("value")).val() || {};

          let allRecords = [];
          
          Object.keys(adminRecords).forEach(key => {            
            if (adminRecords[key]["records"]) {
              Object.keys(adminRecords[key]["records"]).forEach(newKey => {

                allRecords.push({
                  ...adminRecords[key]["records"][newKey],
                  id: newKey
                });
                
              });             
            }        
          });
        
          return allRecords;
             
        } else {
          const records = (await firebase.database().ref(`/users/${uid}/records`).once("value")).val() || {};

          console.log(Object.keys(records).map(key => ({
            ...records[key], 
            id: key
          })));

          return Object.keys(records).map(key => ({
            ...records[key], 
            id: key
          }));
        }

        

      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const uid = await dispatch("getUid");
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once("value")).val() || {};
        return { 
          ...record,
          id
        };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    }
  }
};
