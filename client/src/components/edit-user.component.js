import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username : '',
        }
    }

  
    componentDidMount(){
        axios.get("/users/"+this.props.match.params.id)
             .then(res => {
                 console.log(res.data.username)
                 this.setState({
                     username : res.data.username
                 })
             })
        
    }

    onChangeUsername(e){
        this.setState({
            username : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            username : this.state.username
        }
        
        console.log(user);

        axios.post("/users/update/"+this.props.match.params.id,user)
             .then(res => console.log(res.data));

             window.location = "/allusers";

    }

    render(){
        return(
            <div className="container">
                <h3>Edit User</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                    <label>Username: </label>
                        <input type="text"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            className="form-control"
                            />
                        </div>
                    <div className="form-group">
                        <input  type="submit"
                                value="Create User"
                                className="btn btn-primary"
                        />
                    </div>
                </form>                
            </div>
        );
    }
}



