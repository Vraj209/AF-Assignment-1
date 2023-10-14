class EmployeeDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }
  async componentDidMount() {
    await this.getEmployeesData();
  }
  getEmployeesData = async () => {
    const fetchQuery = `
    query GetAll {
      getAllEmployees {
        FirstName
        LastName
        Age
        DateOfJoining
        Title
        Department
        EmployeeType
        CurrentStatus
      }
    }
  `;
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: fetchQuery
      })
    });
    if (response.ok) {
      const body = await response.json();
      this.setState({
        employees: body.data.getAllEmployees
      });
    } else {
      console.error("GraphQL request failed:", response.status);
    }
  };
  createNewEmployee = async emp => {
    const mutation = `
    mutation CreateNew {
      createNewEmployee(emp: {
        FirstName: "${emp.firstName}",
        LastName: "${emp.lastName}",
        Age: ${parseInt(emp.age)},
        DateOfJoining: "${emp.dateOfJoining}",
        Title: "${emp.title}",
        Department: "${emp.department}",
        EmployeeType: "${emp.employeeType}",
        CurrentStatus: "1"
      }) {
        FirstName
        LastName
        Age
        DateOfJoining
        Title
        Department
        EmployeeType
        CurrentStatus
      }
    }
  `;
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: mutation
      })
    });
    if (response.ok) {
      const body = await response.json();
      this.getEmployeesData();
    } else {
      console.error("GraphQL request failed :", response.status);
    }
  };
  render() {
    const Style = {
      border: "2px solid #79AC78",
      borderRadius: "20px",
      padding: "1rem 2rem",
      margin: "2% auto",
      textAlign: "center",
      width: "90%",
      backgroundColor: "#B0D9B1",
      color: "#186F65"
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: Style
    }, /*#__PURE__*/React.createElement("h2", null, "Employee Management System"), /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement(EmployeeCreate, {
      newEmployeeHandler: this.createNewEmployee
    }), /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: this.state.employees
    })));
  }
}
class EmployeeSearch extends React.Component {
  render() {
    const search = {
      width: "96%",
      borderRadius: "20px",
      padding: "0.5rem 10px",
      border: "2px solid #79AC78",
      color: "#186F65"
    };
    const hr = {
      width: "96%",
      margin: "2rem auto",
      borderTop: "3px double green "
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      style: search,
      type: "text",
      name: "",
      placeholder: "Search Employee here",
      id: ""
    }), /*#__PURE__*/React.createElement("hr", {
      style: hr
    }));
  }
}
class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const header = ["First Name", "Last Name", "Age", "Date of Joining", "Title", "Department", "Employee Type", "Current Status"];
    const tbStyle = {
      width: "100%",
      borderCollapse: "collapse",
      border: "2px solid #79AC78",
      padding: "10px",
      backgroundColor: "#B0D9B1",
      borderRadius: "20px"
    };
    const cStyle = {
      border: "2px solid #79AC78",
      padding: "10px",
      backgroundColor: "#B0D9B1"
    };
    const hr = {
      width: "96%",
      margin: "2rem auto",
      borderTop: "3px double green "
    };
    return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("hr", {
      style: hr
    }), /*#__PURE__*/React.createElement("table", {
      style: tbStyle
    }, /*#__PURE__*/React.createElement("caption", null, /*#__PURE__*/React.createElement("h2", null, "Employee Data")), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, header.map((header, index) => /*#__PURE__*/React.createElement("th", {
      key: index,
      style: cStyle
    }, header)))), /*#__PURE__*/React.createElement("tbody", null, this.props.employees.map((emp, index) => /*#__PURE__*/React.createElement("tr", {
      key: index
    }, /*#__PURE__*/React.createElement("td", {
      style: cStyle
    }, emp.FirstName), /*#__PURE__*/React.createElement("td", {
      style: cStyle
    }, emp.LastName), /*#__PURE__*/React.createElement("td", {
      style: cStyle
    }, emp.Age), /*#__PURE__*/React.createElement("td", {
      style: cStyle
    }, emp.DateOfJoining), /*#__PURE__*/React.createElement("td", {
      style: cStyle
    }, emp.Title), /*#__PURE__*/React.createElement("td", {
      style: cStyle
    }, emp.Department), /*#__PURE__*/React.createElement("td", {
      style: cStyle
    }, emp.EmployeeType), /*#__PURE__*/React.createElement("td", {
      style: cStyle
    }, emp.CurrentStatus))))));
  }
}
class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }
  employeeDataValidator = e => {
    e.preventDefault();
    const Values = {};
    new FormData(e.target).forEach((value, key) => {
      Values[key] = value.trim();
    });
    let error = "";
    if (Values.firstName === "") error += "\n First name is required";
    if (Values.lastName === "") error += "\n Last name is required";
    if (Values.age > 70 || Values.age < 20) error += "\n Age must be between 20 to 70";
    if (error.length > 0) {
      this.setState({
        error: error
      });
    } else {
      this.props.newEmployeeHandler(Values);
    }
  };
  render() {
    const buttonStyle = {
      padding: "0.6rem 1rem",
      cursor: "pointer",
      backgroundColor: "#618264",
      borderRadius: "20px"
    };
    const labelStyle = {
      display: "inline-block",
      width: "15%",
      color: "#618264",
      textAlign: "center"
    };
    const inputStyle = {
      width: "50%",
      padding: "10px",
      margin: "10px",
      color: "#618264",
      borderRadius: "20px",
      border: "2px solid #79AC78"
    };
    const errorStyle = {
      margin: "1rem",
      display: "block",
      color: "red"
    };
    return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", null, "Add Employee Data"), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.employeeDataValidator
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "firstName"
    }, "First Name:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "text",
      name: "firstName",
      id: "firstName",
      placeholder: "Enter first Name"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "lastName"
    }, "Last Name:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "text",
      name: "lastName",
      id: "lastName",
      placeholder: "Enter last Name"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "age"
    }, "Age:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "number",
      name: "age",
      id: "age",
      placeholder: "Enter age"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "dateOfJoining"
    }, "Date of joining:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "date",
      name: "dateOfJoining",
      id: "dateOfJoining",
      placeholder: "Enter date of joining"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "title"
    }, "Title:"), /*#__PURE__*/React.createElement("select", {
      style: inputStyle,
      id: "title",
      name: "title"
    }, /*#__PURE__*/React.createElement("option", {
      value: "Employee"
    }, "Employee"), /*#__PURE__*/React.createElement("option", {
      value: "Manager"
    }, "Manager"), /*#__PURE__*/React.createElement("option", {
      value: "Director"
    }, "Director"), /*#__PURE__*/React.createElement("option", {
      value: "VP"
    }, "VP"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "department"
    }, "Department:"), /*#__PURE__*/React.createElement("select", {
      style: inputStyle,
      id: "department",
      name: "department"
    }, /*#__PURE__*/React.createElement("option", {
      value: "IT"
    }, "IT"), /*#__PURE__*/React.createElement("option", {
      value: "Marketing"
    }, "Marketing"), /*#__PURE__*/React.createElement("option", {
      value: "HR"
    }, "HR"), /*#__PURE__*/React.createElement("option", {
      value: "Engineering"
    }, "Engineering"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle,
      htmlFor: "employeeType",
      name: "employeeTyle"
    }, "Employee Type:"), /*#__PURE__*/React.createElement("select", {
      style: inputStyle,
      name: "employeeType",
      id: "employeeType"
    }, /*#__PURE__*/React.createElement("option", {
      value: "FullTime"
    }, "FullTime"), /*#__PURE__*/React.createElement("option", {
      value: "PartTime"
    }, "PartTime"), /*#__PURE__*/React.createElement("option", {
      value: "Contract"
    }, "Contract"), /*#__PURE__*/React.createElement("option", {
      value: "Seasonal"
    }, "Seasonal"))), /*#__PURE__*/React.createElement("span", {
      style: errorStyle
    }, /*#__PURE__*/React.createElement("pre", null, this.state.error)), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      style: buttonStyle
    }, "Add Employee")));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(EmployeeDirectory, null), document.getElementById("contents"));