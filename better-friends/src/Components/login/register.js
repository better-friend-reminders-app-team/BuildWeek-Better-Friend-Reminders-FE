import React from 'react';
import {Form, Input, Button} from './styledComponents';
import { register } from '../../Actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

class Register extends React.Component {
    state = {
        un: '',
        pw: '',
        fn: '',
        pn: '',
        reg: false
    }


    handleChanges = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();
        localStorage.setItem('username', this.state.un)
        localStorage.setItem('password', this.state.pw)
        localStorage.setItem('firstname', this.state.fn)
        localStorage.setItem('phonenumber', this.state.pn)
        localStorage.setItem('token', this.props.token)
        this.props.register();
        this.props.history.push('/protected')
        this.setState({
            un: '',
            pw: '',
            fn: '',
            pn: '',
            reg: true
        })
    }

    render() {
        if(!this.state.reg){
        return (
            <Form onSubmit={this.submit}>
                <Input name="fn" onChange={this.handleChanges} value={this.state.fn} placeholder="First Name" />
                <Input name="pn" onChange={this.handleChanges} value={this.state.pn} placeholder="Phone Number" />
                <Input name="un" onChange={this.handleChanges} value={this.state.un} placeholder="username" />
                <Input name="pw" onChange={this.handleChanges} value={this.state.pw} placeholder="password" />
                <Button>Register</Button>
            </Form>
        )
        }
        return(
            <Redirect to="/cred/login" />
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, {register})(Register);