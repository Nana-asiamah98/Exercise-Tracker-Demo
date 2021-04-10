import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios  from 'axios'

const AllUsers = props => (
    <tr>
        <td>{props.user.username}</td>
        <td>
            <Link to={"/editUser/"+props.user._id}>Edit</Link> | <a href="/#" onClick={() => {props.deleteUser(props.user._id)}}>Delete</a>
        </td>
    </tr>
)


export default class Users extends Component{
    constructor(props){
        super(props);

        this.deleteUser = this.deleteUser.bind(this);
        this.state = {users : []}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users')
             .then(response => {
                this.setState({users: response.data})
             })
             .catch((error) => {
                 console.log(error)
;             })
    }


    deleteUser(id){
        console.log(id)
        axios.delete('http://localhost:5000/users/'+id)
             .then(response => {
              console.log(response.data)
             })
             .catch((error) => {
                 console.log(error);
             })
             this.setState({
                 users: this.state.users.filter(el => el._id !== id)
             })

    }

    userList(){
        return this.state.users.map(
            currentuser => {
                return <AllUsers user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
            }
        )
    }

    render(){
        return(
            <div className="container">
                <h3>Users</h3>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Username</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userList()}
                    </tbody>
                </table>
            </div>
        );
    }
}
