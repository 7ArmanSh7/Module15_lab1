import React from 'react'
import EmployeeFilter from './EmployeeFilter.jsx';
import EmployeeAdd from './EmployeeAdd.jsx'

function EmployeeRow(props) {
  
    const style = props.rowStyle
    function onDeleteClick(){
      props.deleteEmployee(props.employee._id)
   }
    return (<tr style={style}>
      <td style={style}>{props.employee.name}</td>
      <td style={style}>{props.employee.extension}</td>
      <td style={style}>{props.employee.email}</td>
      <td style={style}>{props.employee.title}</td>
      <td style={style}>{props.employee.dateHired.toDateString()}</td>
      <td style={style}>{props.employee.currentlyEmployed?"Yes":"No"}</td>
      <td style={style}><button onClick={onDeleteClick}>Delete</button></td>
      </tr>)
  
}

function EmployeeTable(props){
  var rowStyle = {border:"1px solid silver", padding:4}
  const employeeRows = props.employees.map(employee=> <EmployeeRow  
    key={employee._id} 
    rowStyle={rowStyle} 
    employee={employee}
    deleteEmployee={props.deleteEmployee}
    />)
  return (
    <table className="bordered-table">
      <thead>
            <tr>
            <th>Name</th>
            <th>Extension</th>
            <th>Email</th>
            <th>Title</th>
            <th>Date Hired</th>
            <th>Employed?</th>
            <th></th>
          </tr>
      </thead>
      <tbody>
        {employeeRows}
      </tbody>
    </table>
    )
}
export default class EmployeeList extends React.Component{
  constructor(){
    super()
    this.state ={
      employees :[]
    }
    this.createEmployees = this.createEmployees.bind(this)
    this.deleteEmployee = this.deleteEmployee.bind(this)
  }

  componentDidMount(){
    this.loadData()
  }

  loadData(){
      fetch("/api/employees")
      .then(response=>response.json())
      .then(
          (data)=>{
            console.log("Total count of employees:", data.count)
            data.employees.forEach(employee => {
              employee.dateHired = new Date(employee.dateHired)
            });
            this.setState({employees:data.employees})
          }
      )
      .catch((err)=>console.log(err))
  }

  createEmployees(employee){
    fetch("/api/employees",{method:"POST",headers:{"Content-Type":"application/json"}, 
  body:JSON.stringify(employee)})
    .then(response=>response.json())
    .then(
        (data)=>{
            data.employee.dateHired = new Date( data.employee.dateHired)
            const newEmployees = this.state.employees.concat(data.employee)
            this.setState({employees:newEmployees})
        }
    )
    .catch((err)=>console.log(err))
  }

  deleteEmployee(id){
    fetch(`/api/employees/${id}`,{method:"DELETE"})
    .then(response=>{
      if(!response.ok){
        console.log("Failed to delete employee")
      }
      else{
        this.loadData()
      }
    })
    .catch((err)=>console.log(err))
  }
  
  render(){
   return (
   <React.Fragment>
          <title>React documents</title>
          <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee}/>
          <hr/>
          <EmployeeFilter/>
          <hr/>
          <EmployeeAdd createEmployees ={this.createEmployees.bind(this)} />
    </React.Fragment>
    );
  }
}