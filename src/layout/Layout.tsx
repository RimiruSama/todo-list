import React, {Fragment} from "react";
import { JsxEmit } from "typescript";

interface Props {
    children: React.ReactNode
}


const Layout: React.FC<Props> = ({children}) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;