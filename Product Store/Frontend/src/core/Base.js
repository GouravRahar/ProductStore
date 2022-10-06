import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          Built using <span className="text-white">MERN</span> 
        </span>
      </div>
    </footer>
  </div>
);

export default Base;

//TIP :- In line 10 ex whenever we use Curly bracekts we have to use return keyword to return anything
//...And if we dont want to use return keyword we have to use () this bracket instead
//Line 5 Here we are defining variable name and we use that anywhere in this file and we will
//...not have to write that part everytime now we can also use Base in other files and we can
//...change description and title acc to that page but the basic layout will be same in that case 
//...in other fileex in home page title and desc will be diff and in signin it will be diff
//...So we can reuse this kind of stuff
//Line 13 Here we are writing thr code for footer so that we can use it everywhere
//Line 18 Here we are writing children and anything we write inside in base will be included as chidlren
//...with all the class having of this children here.Basically Base will act as enclosing parent and
//...anything inside of it will be considered as children