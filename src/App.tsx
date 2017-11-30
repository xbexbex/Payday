import * as React from 'react';
import './styles/App.css';
import Dropzone from 'react-dropzone';
import { Employee } from './classes/Employee';
import { FileReaderEvent, LineObject } from './constants/interfaces';

const reader = new FileReader();
let newFile: string;

class App extends React.Component {

  state = {
    fileParsed: false,
    loading: false,
    error: null,
    dropActive: false,
    errorLines: null
  };

  constructor(props: {}) {
    super(props);
    this.readerFinishCallback = this.readerFinishCallback.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.rejectFile = this.rejectFile.bind(this);
    this.setError = this.setError.bind(this);
    this.setErrorLine = this.setErrorLine.bind(this);
  }

  parseFile(accepted: File[], finishCallback: Function, setError: Function, setErrorLine: Function) {
    this.setState({
      fileParsed: false,
      loading: true,
      error: null,
      errorLines: null
    });

    reader.onload = function (event: FileReaderEvent) { // new event interface due to a typescript issue
      let errorLines: string = '';
      const employees: Employee[] = [];
      const file = event.target.result;
      const lines = file.split(/\r\n|\n/);
      for (let i = 1; i < lines.length; i++) { // loops through each line in the csv line, saves the data to an array of employee -objects
        try {
          if (lines[i]) {
            let employee: Employee;
            const lineObject: LineObject = csvLineToObject(lines[i]);
            const index = employees.findIndex(function (e: Employee) {
              return (e.getId() === lineObject.id);
            });
            if (index != -1) {
              employee = employees[index];
            } else {
              employee = new Employee(lineObject.id);
              employee.setName(lineObject.name);
              employees.push(employee);
            }
            employee.addWorkShift(lineObject.date, lineObject.start, lineObject.end);
          }
        } catch (error) { // catches a faulty row and saves it for error message
          errorLines += i + ', ';
        }
      }
      newFile = 'Person ID,Person Name,Salary';
      for (let employee of employees) { // creates a string out of the employee array
        newFile += '\r\n';
        newFile += employee.toString();
      }
      if (errorLines) {
        setError('The file had invalid rows: ');
        setErrorLine(errorLines.replace(/,\s*$/, ''));
      } else {
        setError('Success!');
      }
      if (employees.length > 0) {
        let fn = 'salaries(' + employees[0].getFirstDayMonth() + ')' + '.csv';
        finishCallback(fn);
      } else {
        finishCallback(null);
      }
    };
    reader.readAsText(accepted[0]);
  }

  rejectFile() {
    this.setState({
      error: 'Invalid file. Please use a csv file.',
      errorLines: null
    });
  }

  setError(error: string) {
    this.setState({
      error: error
    });
  }

  setErrorLine(errorLines: number[]) {
    this.setState({
      errorLines: errorLines
    });
  }

  downloadCsvFile = (filename: string) => { // creates a csv file from the string
    const element = document.createElement('a');
    const file = new Blob([newFile], { type: 'text/csv;charset=UTF-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    element.click();
  }

  readerFinishCallback(filename: string) {
    this.setState({
      fileParsed: true,
      loading: false
    });
    if (filename) {
      this.downloadCsvFile(filename);
    } else {
      this.setState({
        error: 'Invalid csv file',
        errorLines: null
      });
    }
  }

  onDragEnter() {
    this.setState({
      dropActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropActive: false
    });
  }

  onDrop() {
    this.setState({
      dropActive: false
    });
  }

  render() {
    if (this.state.loading) { // shows loading screen while processing csv
      return (
        <div className="Loading-container">
          <img className="Loading-image" src="./assets/gear.svg" />
        </div>
      );
    }
    return (
      <div className={this.state.dropActive ? 'Drop-container-active' : 'Drop-container'}  >
        <Dropzone
          className="Drop-zone"
          disableClick={false}
          accept=".csv, text/csv, application/vnd.ms-excel" // accepted file formats, "application/vnd.ms-excel" is csv in Windows
          onDropRejected={this.rejectFile}
          onDropAccepted={(accepted) => { (this.parseFile(accepted, this.readerFinishCallback, this.setError, this.setErrorLine)); }}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
        >
          <h1 className="Header-text">
            Drag or click to upload a csv file
          </h1>
          {this.state.error ? // shows errors if those exist
            <p className="Error-text">
              {this.state.error}
            </p>
            : <p />}
          {this.state.errorLines ?
            <p className="Error-text-lines">
              {this.state.errorLines}
            </p>
            : <p />}
        </Dropzone >
      </ div>
    );
  }
}

function csvLineToObject(line: string): LineObject { // parses a row of csv into an object
  if (line && line.includes(',')) {
    const words = line.split(',');
    if (words.length >= 5 && words[0] && words[1] && words[2] && words[3] && words[4]) {
      return {
        name: words[0],
        id: parseInt(words[1], 10),
        date: words[2],
        start: words[3],
        end: words[4]
      };
    }
  }
  throw ('Invalid row');
}

export default App;
