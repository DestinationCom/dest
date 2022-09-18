import React from 'react'
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import DirectionsCarFilled from '@material-ui/icons/DirectionsCarOutlined';
// import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { Paper,makeStyles } from '@material-ui/core';
import './Employee.css'

const useStyles = makeStyles(theme => ({
    // pageContent: {
    //     margin: theme.spacing(5),
    //     padding: theme.spacing(3)
    // }
}))

export default function Employees() {

    const classes = useStyles();

    return (
        <>
        {/* <div className='header'>
            <PageHeader
                
                title="Vehicle Registration"
                subTitle="All fields are compulsory"
                icon={<DirectionsCarFilled fontSize="large"  />}
            />
            </div> */}
            <br/>
            <div className='reg-vehicle'><b>Register Vehicle</b></div>
            <br/>
            <Paper className={classes.pageContent}>
                <EmployeeForm />
            </Paper>
        </>
    )
}
