import React  from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import EditUser from "./components/edit-user.component";
import Users from "./components/users-list.component";


function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <Route path="/" exact component={ExerciseList}/>
      <Route path="/edit/:id"  component={EditExercise}/>
      <Route path="/create"  component={CreateExercise}/>
      <Route path="/user"  component={CreateUser}/>
      <Route path="/editUser/:id" component={EditUser}/>
      <Route path="/allusers" component={Users}/> 
      

    </Router>
    
  );
}

export default App;
