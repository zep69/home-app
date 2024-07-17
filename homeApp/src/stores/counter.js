import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {auth} from '../firebase'
import router from "../router";
import {db} from "../firebase";
import { collection, addDoc, doc, getDoc, query, where, getDocs, onSnapshot, updateDoc } from "firebase/firestore";

export const useUserStore = defineStore('userStore', {
    state:() =>({
      userData: {
        name:null,
        email:null,
      },
      userFamily:{
        kitchen:{},
        bathroom:{},
        name:null
      },
      loadingUser: false,
      loadingSession: false,
      isLoggedIn:false
    }),
  actions:{
    async registerUser(email, password, name) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        let dataUpload = await addDoc(collection(db,'users'), {
          email:user.email,
          uid:user.uid,
          name:name
        })
        console.log('Id ', dataUpload.id)
        router.push('/home');
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid, };
        router.push("/home");
        localStorage.token = user.accessToken
        localStorage.uid =  user.uid

      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
        this.isLoggedIn = true
      }
    },
    async logoutUser() {
      try {
        await signOut(auth);
        this.userData = null;
        localStorage.clear()
       router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
    async getUserInfo(uid){
      const q = query(collection(db, "users"), where("uid", "==", uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.userData = doc.data()
        console.log('Profile ', this.userData)
        localStorage.family = this.userData.family
      });
    },
    async getUserRealtimeFamily(){
      const unsub = onSnapshot(doc(db, "families", this.userData.family), (doc) => {
        console.log("Current data: ", doc.data());
        this.userFamily = doc.data()
      });
    },
    async getUserFamily(){
      console.log('Start 123')
      const docRef = doc(db, "families", this.userData.family);
      const docSnap = await getDoc(docRef);


        this.userFamily = docSnap.data()
        console.log('Family ', this.userFamily)


    },
    async updateFamily(){
      const family = doc(db, "families", this.userData.family);

// Set the "capital" field of the city 'DC'
      await updateDoc(family, {
        bathroom: this.userFamily.bathroom,
        kitchen: this.userFamily.kitchen,
      });
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = {
                email: user.email,
                uid: user.uid,
              };
            } else {
              this.userData = null;
            }
            resolve(user);
          },
          (e) => reject(e)
        );
        unsuscribe();
      });
    },
  }
})