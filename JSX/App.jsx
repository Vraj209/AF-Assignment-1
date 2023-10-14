class EmployeeDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: fetchQuery }),
    });

    if (response.ok) {
      const body = await response.json();
      this.setState({ employees: body.data.getAllEmployees });
    } else {
      console.error("GraphQL request failed:", response.status);
    }
  };
  createNewEmployee = async (emp) => {
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation }),
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
      color: "#186F65",
    };

    return (
      <div>
        <div style={Style}>
          <h2>Employee Management System</h2>
          <EmployeeSearch />
          <EmployeeCreate newEmployeeHandler={this.createNewEmployee} />
          <EmployeeTable employees={this.state.employees} />
        </div>
      </div>
    );
  }
}
class EmployeeSearch extends React.Component {
  render() {
    const search = {
      width: "96%",
      borderRadius: "20px",
      padding: "0.5rem 10px",
      border: "2px solid #79AC78",
      color: "#186F65",
    };

    const hr = {
      width: "96%",
      margin: "2rem auto",
      borderTop: "3px double green ",
    };
    return (
      <div>
        <input
          style={search}
          type="text"
          name=""
          placeholder="Search Employee here"
          id=""
        />
        <hr style={hr} />
      </div>
    );
  }
}

class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const header = [
      "First Name",
      "Last Name",
      "Age",
      "Date of Joining",
      "Title",
      "Department",
      "Employee Type",
      "Current Status",
    ];

    const tbStyle = {
      width: "100%",
      borderCollapse: "collapse",
      border: "2px solid #79AC78",
      padding: "10px",
      backgroundColor: "#B0D9B1",
      borderRadius: "20px",
    };
    const cStyle = {
      border: "2px solid #79AC78",
      padding: "10px",
      backgroundColor: "#B0D9B1",
    };
    const hr = {
      width: "96%",
      margin: "2rem auto",
      borderTop: "3px double green ",
    };
    return (
      <section>
        <hr style={hr} />
        <table style={tbStyle}>
          <caption>
            <h2>Employee Data</h2>
          </caption>
          <thead>
            <tr>
              {header.map((header, index) => (
                <th key={index} style={cStyle}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.employees.map((emp, index) => (
              <tr key={index}>
                <td style={cStyle}>{emp.FirstName}</td>
                <td style={cStyle}>{emp.LastName}</td>
                <td style={cStyle}>{emp.Age}</td>
                <td style={cStyle}>{emp.DateOfJoining}</td>
                <td style={cStyle}>{emp.Title}</td>
                <td style={cStyle}>{emp.Department}</td>
                <td style={cStyle}>{emp.EmployeeType}</td>
                <td style={cStyle}>{emp.CurrentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}
class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  employeeDataValidator = (e) => {
    e.preventDefault();

    const Values = {};
    new FormData(e.target).forEach((value, key) => {
      Values[key] = value.trim();
    });

    let error = "";

    if (Values.firstName === "") error += "\n First name is required";
    if (Values.lastName === "") error += "\n Last name is required";
    if (Values.age > 70 || Values.age < 20)
      error += "\n Age must be between 20 to 70";

    if (error.length > 0) {
      this.setState({ error: error });
    } else {
      this.props.newEmployeeHandler(Values);
    }
  };
  render() {
    const buttonStyle = {
      padding: "0.6rem 1rem",
      cursor: "pointer",
      backgroundColor: "#618264",
      borderRadius: "20px",
    };

    const labelStyle = {
      display: "inline-block",
      width: "15%",
      color: "#618264",
      textAlign: "center",
    };

    const inputStyle = {
      width: "50%",
      padding: "10px",
      margin: "10px",
      color: "#618264",
      borderRadius: "20px",
      border: "2px solid #79AC78",
    };

    const errorStyle = {
      margin: "1rem",
      display: "block",
      color: "red",
    };

    return (
      <section>
        <h2>Add Employee Data</h2>
        <form onSubmit={this.employeeDataValidator}>
          <div>
            <label style={labelStyle} htmlFor="firstName">
              First Name:
            </label>
            <input
              style={inputStyle}
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first Name"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="lastName">
              Last Name:
            </label>
            <input
              style={inputStyle}
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last Name"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="age">
              Age:
            </label>
            <input
              style={inputStyle}
              type="number"
              name="age"
              id="age"
              placeholder="Enter age"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="dateOfJoining">
              Date of joining:
            </label>
            <input
              style={inputStyle}
              type="date"
              name="dateOfJoining"
              id="dateOfJoining"
              placeholder="Enter date of joining"
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="title">
              Title:
            </label>
            <select style={inputStyle} id="title" name="title">
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </div>
          <div>
            <label style={labelStyle} htmlFor="department">
              Department:
            </label>
            <select style={inputStyle} id="department" name="department">
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
          <div>
            <label
              style={labelStyle}
              htmlFor="employeeType"
              name="employeeTyle"
            >
              Employee Type:
            </label>
            <select style={inputStyle} name="employeeType" id="employeeType">
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
          <span style={errorStyle}>
            <pre>{this.state.error}</pre>
          </span>
          <button type="submit" style={buttonStyle}>
            Add Employee
          </button>
        </form>
      </section>
    );
  }
}

ReactDOM.render(<EmployeeDirectory />, document.getElementById("contents"));
