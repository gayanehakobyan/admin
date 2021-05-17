import * as React from "react"
import {IInputProps} from "../../../../types/components/reusebale/input/IInput";



const Input: React.FunctionComponent<IInputProps> = (props: IInputProps) => {

    return <input
        type={props.type || "text"}
        placeholder={props.placeholder}
    />

}


export default Input