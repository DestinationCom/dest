import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        console.log(name,value.length,value)
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    
    const handleInputChangeCap = e => {
        const { name, value } = e.target
        console.log(value)
        setValues({
            ...values,
            [name]: String(e.target.value).toUpperCase(),
        })
        if (validateOnChange)
            validate({ [name]: String(e.target.value).toUpperCase(), })
    }

    const changeFile=e=>{
        const { name, value } = e.target
        console.log(e.target.files[0]['name'],name)
        const reader = new FormData(); 
        reader.append('image',e.target.files[0],name)
        console.log(reader);
       
            setValues({
                ...values,
                [name]:e.target.files[0],
                // [name] :reader,
                // image1:reader.result
            

        });
        
        // reader.readAsDataURL(e.target.files[0]);
        
        
        if (validateOnChange)
            validate({ [name]: e.target.files, })
    
       


    }
    const resetForm = () => {
        setValues(initialFValues);
        setErrors({});
        window.location.reload(true);
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleInputChangeCap,
        changeFile,
        resetForm

    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

