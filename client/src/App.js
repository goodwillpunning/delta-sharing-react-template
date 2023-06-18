import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';

import NavigationComponent from './components/NavigationComponent';
import ShareSummary from './components/ShareSummary';
import TablesSummary from './components/TablesSummary';
import SampleDataComponent from './components/SampleDataComponent';

import './App.css';

function App() {
  // Shares state
  let [showShares, setShowShares] = useState(true);
  let [availableShares, setAvailableShares] = useState(null);
  let [shareName, setShareName] = useState(null);
  // Tables state
  let [showTables, setShowTables] = useState(false);
  let [availableTables, setAvailableTables] = useState(null);
  let [tableName, setTableName] = useState(null);
  // Rows state
  let [showRows, setShowRows] = useState(false);
  let [dataframe, setDataframe] = useState(null);


  function openShare(e) {
    let parsedShareName = e.target.id.replace('_btn', '');
    console.log('Opening share: ' + parsedShareName);
    // Update state
    setShowShares(false);
    setShowTables(true);
    setShareName(parsedShareName);
    // Fetch a list of available tables in Share
    fetch('/getTables')
    .then(response => response.json())
    .then(
      (response) => {
        setAvailableTables(response);
      },
      (error) => {
        console.log(error.message);
      });
  }

  function closeShare(e) {
    console.log('Closing share: ' + shareName);
    // Wipe the share state
    setShowTables(false);
    setShowShares(true);
    setShareName(null);
    setAvailableTables(null);
  }

  function openTable(e) {
    let parsedTableName = e.target.id.replace('_btn', '');
    console.log('Opening table: ' + parsedTableName);
    setShowTables(false);
    setShowRows(true);
    setTableName(parsedTableName);
    // Fetch a the sample data
    fetch('/getDataFrame')
    .then(response => response.json())
    .then(
      (response) => {
        setDataframe(response);
      },
      (error) => {
        console.log(error.message);
      });
  }

  function closeTable(e) {
    console.log('Closing table: ' + tableName);
    // Wipe the table state
    setShowRows(false);
    setShowTables(true);
    setTableName(null);
    setDataframe(null);
  }

  // Fetch the shared datasets!
  useEffect(() => {
    fetch('/getShares')
      .then(response => response.json())
      .then(
        (response) => {
          setAvailableShares(response);
        },
        (error) => {
          console.log(error.message);
        });
  }, []);
    
  return (
    <>
      <NavigationComponent />
      <Container className="App-body">
        {showShares ? (
          <ShareSummary
            sharesList={availableShares}
            buttonClick={openShare.bind(this)} />
        ) : (
          <></>
        )}
        {showTables ? (
          <TablesSummary
            shareName={shareName}
            tablesList={availableTables}
            closeClick={closeShare.bind(this)}
            viewClick={openTable.bind(this)} />
        ) : (
          <></>
        )}
        {showRows ? (
          <SampleDataComponent
            name={tableName}
            dataframe={dataframe}
            closeClick={closeTable.bind(this)} />
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}

export default App;
