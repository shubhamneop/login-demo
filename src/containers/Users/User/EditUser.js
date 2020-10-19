import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import {updateObject, checkValidity} from '../../../shared/utility';
import classes from './EditUser.module.css';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';


class EditUser extends Component {
    state = {
        controls : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isShow: true,
    }

    componentDidMount() {
        setTimeout(function(){
            this.assignValue();
            this.setState({isShow: false});
        }.bind(this),1000);
    }

    assignValue = () => {
        if(this.props.user !== null) {
            if(this.props.user.name) {
                const updatedControls = updateObject(this.state.controls, {
                    ['name']: updateObject(this.state.controls['name'], {
                        value: this.props.user.name,
                        valid: checkValidity(this.props.user.name, this.state.controls['name'].validation),
                        touched: true,
                    })
                });
                let formIsValid = true;
                for (let inputIdentifier in updatedControls) {
                    formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
                }
                
                this.setState({controls: updatedControls, formIsValid: formIsValid});

            }
            
            if(this.props.user.email) {

                const updatedEmailControls = updateObject(this.state.controls, {
                    ['email']: updateObject(this.state.controls['email'], {
                        value: this.props.user.email,
                        valid: checkValidity(this.props.user.email, this.state.controls['email'].validation),
                        touched: true,
                    })
                });

                let formIsValid = true;
                for (let inputIdentifier in updatedEmailControls) {
                    formIsValid = updatedEmailControls[inputIdentifier].valid && formIsValid;
                }
            
                this.setState({controls: updatedEmailControls, formIsValid:formIsValid });
            }
            
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            })
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }

        this.setState({controls: updatedControls, formIsValid: formIsValid});
    }

    submitHandler = (event) => {
        event.preventDefault();
        const data = {
            name: this.state.controls.name.value,
            email: this.state.controls.email.value,
        }

        this.props.onUpdate(this.props.token,this.props.userId,data);
    }


    render() {
        let form = null;
        
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
         form = formElementsArray.map(formElement => (
            <Input key={formElement.id}
                   elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   shouldValidate={formElement.config.validation}
                   touched={formElement.config.touched}
                   changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));
        if(this.state.isShow) {
            form = <Spinner />;
        }

        return (
            <div className={classes.EditUser}>
                <label>Edit User</label>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
                    {/* <Button btnType="Danger" clicked={this.props.onEditCancel}>Cancel</Button> */}
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userEdit,
        token: state.auth.token,
        userId: state.user.id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEditCancel: () => dispatch(actions.editCancel()),
        onUpdate: (token,id,data) => dispatch(actions.userUpdate(token,id,data)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditUser);