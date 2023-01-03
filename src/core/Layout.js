import React from "react";
import Menu from './Menu';
import '../styles.css'

// Layout is a shared component, that receives props as argument, we destructure the props in the argument of the Layout component, and then provide a default value in case any of the properties of the object received in the props was not provided, a default value will be set to cover. we receive the className of the content under the header 'jumbtron' in the className property we receive in the props. 
// we also receive the content of the component that we want to apply the Layout on, in the chldren property we receive in the props.
// We can use {return} or () which implicitly returns what it contains
// const Layout  = ({title = 'Title', description = 'Description',children}) => {
//   return 
// };
const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);


export default Layout ;
