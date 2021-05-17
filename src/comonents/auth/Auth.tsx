import * as React from "react"
import {IAuthProps} from "../../../types/components/auth/IAuth";
import Button from "../reusebale/button/Button";
import Input from "../reusebale/input/Input";
import firebase, {auth} from "../../firebase";
import {useState} from "react";



const Auth: React.FunctionComponent<IAuthProps> = (props: IAuthProps) => {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    //const ref = firebase.firestore().collection("admin")

    //console.log("ref", ref)

    React.useEffect(() => {
        getSystemUsers();
    })


    const getSystemUsers = () => {
        // ref.get().then((item) => {
        //     const items = []
        //     console.log("doc", item)
        //     item.forEach((doc) => {
        //         console.log("doc", doc.data())
        //         items.push(doc.data())
        //     })
        // })
    }

    const onClickHandler = (e:React.MouseEvent) => {
        console.log("mtaaaaaaaav")
        e.preventDefault()
        auth.createUserWithEmailAndPassword("testdsdf", "password")
    }


    return <div>
        <form>
            <div>
                <h1> Login </h1>
                <div>
                    <Input placeholder ={"Username"}/>
                    <Input placeholder ={"Password"}/>
                </div>

                <div>
                    <Button
                        type = "submit"
                        text = "Submit"
                        onClick = {onClickHandler}
                    />
                </div>
            </div>
        </form>
    </div>

}


export default Auth