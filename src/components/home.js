import React from "react";
import Compass from "./compass.jpg";
import moment from "moment";
import { Button } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import AddTransaction from "../components/addTransaction";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      description: null,
      amount: null,
      transaction: null,
      columnDefs: [
        { headerName: "Date", field: "date" },
        { headerName: "Description", field: "description" },
        { headerName: "Credit", field: "credit" },
        { headerName: "Debit", field: "debit" },
        { headerName: "Running balance", field: "runningBalance" },
      ],
      rowData: [
        { date: "Toyota", description: "Sample", debit: 35000, runningBalance: 1000, credit: 2000 },
        { date: "Ford", description: "Sample", debit: 32000, runningBalance: 1000, credit: 2000 },
        {
          date: "Porsche",
          description: "Sample",
          debit: 72000,
          runningBalance: 1000,
          credit: 2000,
        },
      ],
      errors: {
        description: "",
        amount: "",
        transaction: "",
      },
      overlayLoadingTemplate:
        '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
      overlayNoRowsTemplate: '<span class="ag-overlay-loading-center">No data to show</span>',
      addTransaction: false,
    };
    this.handleAddTransaction = this.handleAddTransaction.bind(this);
  }

  handleChange = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "desciption":
        errors.description = value.length < 4 ? "Description must be atleast 4 alphabet long!" : "";
      case "amount":
        errors.amount = value.length < 5 ? "Amount must be atleast 5 digit long!" : "";
        break;
      case "transaction":
        errors.transaction = value <= 0 ? "Please select the Transaction type" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {});
  };

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("INside");
    if (this.validateForm(this.state.errors)) {
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }
    let { description, amount, transaction } = this.state;

    console.log("=============STate=======================");
    console.log({ ...this.state });
    console.log("==============STate======================");
    let formData = new FormData();

    /* 
    TEMP FIELDS
    */
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("transaction", transaction);

    console.log("===========Current State Object=========================");
    console.log({ ...this.state });
    console.log("================Current State Object====================");
    let object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    let json = JSON.stringify(object);
    let response = await axios({
      method: "POST",
      url: `/v1/transactions/add-transaction`,
      headers: {
        "Content-type": "application/json; charset=utf-8",
        Accept: "application/json; charset=utf-8",
      },
      data: json,
    });
    console.log("============Status========================");
    console.log(response.status);
    console.log("=============Status=======================");
    if (response.status !== 200) {
      throw Error(response.message);
    } else {
      console.log("INside ");
      this.setState({ addTransaction: false }, () => {
        console.log("sUCCESSFULLY UPDATED");
      });
    }
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => {
        this.setState({ data: res });
      })
      .catch((err) => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch("/v1/transactions/get-transaction");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log("====================================");
    console.log({ body });
    console.log("====================================");
    return body;
  };

  handleAddTransaction(e) {
    console.log("Voila ");
    this.setState({ addTransaction: true });
  }

  render() {
    let { addTransaction,data } = this.state;
    return (
      <div>
        {addTransaction === false ? (
          <React.Fragment>
            <div>
              <div className='ag-theme-alpine' style={{ height: "600px", width: "1000px" }}>
                <AgGridReact
                  columnDefs={this.state.columnDefs}
                  rowData={data.length>0?data:this.state.rowData}
                  rowSelection='single'
                  onGridReady={(params) => (this.gridApi = params.api)}
                  pagination={true}
                  paginationPageSize={20}
                  overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                  overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
                />
              </div>
            </div>
            <Button
              type='button'
              className='btn btn-large btn-success custom_dealer_filter_button'
              onClick={(e) => this.handleAddTransaction(e)}
            >
              Add Transaction
            </Button>
          </React.Fragment>
        ) : (
          <AddTransaction
            value={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

export default Home;
