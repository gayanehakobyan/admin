import * as React from "react"
import {IButtonProps} from "../../../../types/components/reusebale/button/IButton"



const Button: React.FunctionComponent<IButtonProps> = (props: IButtonProps) => {

    return <button onClick={props.onClick}>
             {props.text}
            </button>

}


export default Button