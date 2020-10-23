import React , {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import {updateObject, checkValidity} from '../../shared/utility';
import {connect} from 'react-redux';
import classes from './Post.module.css';
import * as actions from '../../store/actions/index';
import Posts from './Posts';


class Post extends Component {
        state = {
            controls : {
                title: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter Title'
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },
                post: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Post....'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6,
                    },
                    valid: false,
                    touched: false
                }
            },
            formIsValid: false,
        }

        componentDidMount() {
            if(this.props.token !== null) {
                this.props.getPosts(this.props.token);
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
                title : this.state.controls.title.value,
                post : this.state.controls.post.value,
            }
            this.props.onPostSubmit(this.props.token, data);
            setTimeout(function(){
                this.afterSubmitHandler();
            }.bind(this),1000);
        }

        afterSubmitHandler = () => {
                const updatedControls = updateObject(this.state.controls, {
                    ['title']: updateObject(this.state.controls['title'], {
                        value: '',
                        valid: false,
                        touched: false,
                    })
                });
                
                this.setState({controls: updatedControls, formIsValid: false});

            
            

                const updatedEmailControls = updateObject(this.state.controls, {
                    ['post']: updateObject(this.state.controls['post'], {
                        value: '',
                        valid: false,
                        touched: false,
                    })
                });
            
                this.setState({controls: updatedEmailControls });
           
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
        let posts = null;
        if(this.props.posts !== null) {
            posts = this.props.posts
            .map( post => {
                return [...Array( this.props.posts[post] )].map( ( _, i ) => {
                    return <Posts key={post.id} id={post.id} title={post.title} post={post.post}  token={this.props.token} />;
                } );
            } )
            .reduce((arr, el) => {
                return arr.concat(el)
            }, []);
        }
       

        return (
            <div className="App">
                <label>Posts</label>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
                    {/* <Button btnType="Danger" clicked={this.props.onEditCancel}>Cancel</Button> */}
                </form>
                <div style={{display: "flex-box"}}>
                {posts}

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        posts: state.post.posts,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostSubmit : (token, data) => dispatch(actions.storePost(token, data)),
        getPosts : (token) => dispatch(actions.getPosts(token)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Post);