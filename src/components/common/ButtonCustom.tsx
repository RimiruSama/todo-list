import React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from "@mui/material";

type Props = {
    title: string,
    styleCss?: object,
    colorBtn?: ButtonProps['color'],
    handleOnclick?: React.MouseEventHandler
}

const ButtonCustom: React.FC<Props> = ({title, styleCss, colorBtn, handleOnclick}) => {
    return (
        <>
            <Button
                variant="contained"
                sx={styleCss}
                color={colorBtn}
                onClick={handleOnclick}
            >
                {title}
            </Button>
        </>
    );
}

export default ButtonCustom;