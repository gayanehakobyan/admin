import * as React from "react";
import {useState} from "react";
import {auth, db} from "./firebase.js"

import './App.css';

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<any>(null)
  const [guides, setGuides] = useState<any>(null)
  const [name, setName] = useState<any>("")
  const [fullname, setFullname] = useState<any>("")
  const [userData, setUserData] = useState<any>(null)

  React.useEffect(() => {
    auth.onAuthStateChanged((user:any) => {
      //console.log("onAuthStateChanged", user);
      if(user){
         // console.log("login", user.uid)
          setUser(user)
          getCollection(user.uid)
      } else {
          console.log("logout")
          setUser(null)
      }
    })
  }, [])


    // get user data in collection
    const getCollection = (userId?: any) => {

      // get all collection by collection name
      //   db.collection("users").get().then(snapshot => {
      //       let dbUsers:any = [];
      //       // console.log("snapshots", snapshot.docs)
      //
      //       snapshot.docs.forEach(doc => {
      //           dbUsers.push(doc.data())
      //           // console.log("snapshots", doc.data())
      //       })
      //       // console.log("snapshots", dbUsers)
      //       setUsers(dbUsers)
      //   }, error => {
      //       console.log("err", error.message)
      //   })

          db.collection("users").doc(userId).get().then((doc: any) => {
              console.log("dfgvdfg", doc.data())
             setUserData(doc.data())

          }, error => {
              console.log("err", error.message)
          })
    }

    // get guid collection
    const getGuidCollection = () => {
          db.collection("guides").get().then(snapshot => {
              let dbGuides:any = [];
              // console.log("snapshots", snapshot.docs)

              snapshot.docs.forEach(doc => {
                  dbGuides.push(doc.data())
                  // console.log("snapshots", doc.data())
              })
              // console.log("snapshots", dbUsers)
              setGuides(dbGuides)
          }, error => {
              console.log("err", error.message)
          })
    }

   // create user or anouther data in collection
  const createGuides = () => {
      db.collection("guides").doc(user.uid).set({
          name,
          fullname,
      }).then(() => {
            getGuidCollection();
      })
  }

  // create user in auth
  const onclickHandler = () => {
    auth.createUserWithEmailAndPassword(username, password).then((cred: any) => {
      console.log("cred", cred)
        // create in firestore collection with user id and keep in it data
        return db.collection("users").doc(cred.user.uid).set({
            age: 26,
            name: "gayane"
        })
    }).then(() => {
        setUsername("")
        setPassword("")
    })
  }

  //logout user
  const logoutHandler = () => {
    auth.signOut().then(() => {
      // console.log("usrr sign out")
    });
  }

  //login user
  const logInHandler = () => {
    console.log(username, password)
    auth.signInWithEmailAndPassword(username, password).then(() => {
      console.log("user sign in")
    });
  }

  console.log("guides", guides)
  return (
    <div className="App">
        {
            user ? <div>{user.email}</div> : <div>no user</div>
        }
        {/*{*/}
        {/*    users && users.length ?*/}
        {/*      <ul>*/}
        {/*        {*/}
        {/*            users.map((item: any, i:number) => (*/}
        {/*                <li key={i}>*/}
        {/*                    <span>{item.name}</span>*/}
        {/*                    <span>{item.age}</span>*/}
        {/*               </li>*/}
        {/*            ))*/}
        {/*        }*/}
        {/*    </ul> : <div> No list</div>*/}
        {/*}*/}

        {
            userData ? <div>{userData.name}</div> : null
        }
        <input value ={username} onChange = {(e) => setUsername(e.currentTarget.value)}/>
        <input value = {password} onChange = {(e) => setPassword(e.currentTarget.value)}/>
        <button onClick = {onclickHandler}>
            Submit
        </button>
        <button onClick = {logoutHandler}>
            log out
        </button>
        <button onClick = {logInHandler}>
            log in
        </button>

        <div>
            <input value ={name} onChange = {(e) => setName(e.currentTarget.value)}/>
            <input value = {fullname} onChange = {(e) => setFullname(e.currentTarget.value)}/>
            <button onClick = {createGuides}>
               Create guides
            </button>
        </div>
    </div>
  );
}

export default App;
