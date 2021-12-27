import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import api from "./api/contacts"
import "./App.css";
import Header from "./components/Header"
import Alert from "./components/Alert"
import AddContact from "./components/AddContact"
import ContactList from "./pages/ContactList"
import ContactDetail from "./components/ContactDetail"
import EditContact from "./components/EditContact"
import paginate from "./utils/helper";
import About from "./pages/About";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import {useGlobalContext} from "./context/context";

function App() {

  const {alert, showAlert, contacts} = useGlobalContext()

  return (
      <div className="ui container">
        <Router>
          <Navbar />
          {/*<Header />*/}
          {alert.show && <Alert {...alert} removeAlert={showAlert} contacts={contacts} />}
          <Switch>
            <Route
                path="/"
                exact
                render={(props) => (
                    <ContactList
                  /*      {...props}
                        loading={loading}
                        prevPage={prevPage}
                        nextPage={nextPage}
                        handlePage={handlePage}
                        dataPaginate={dataPaginate}
                        page={page}
                        contacts={searchTerm.length < 1 ? contacts : searchResults}
                        getContactId={removeContactHandler}
                        term={searchTerm}
                        clearList={clearList}
                        searchKeyword={searchHandler}*/
                    />
                )}
            />
            <Route
                path="/add"
                render={(props) => (
                    <AddContact
                        {...props}
                        /*{...props}
                        showAlert={showAlert}
                        addContactHandler={addContactHandler}*/
                    />
                )}
            />

            <Route
                path="/edit"
                render={(props) => (
                    <EditContact
                        {...props}
                     /*   {...props}
                        updateContactHandler={updateContactHandler}
                        showAlert={showAlert}*/
                    />
                )}
            />

            <Route
                path="/about"
                render={(props) => (
                    <About/>
                )}
            />

            <Route path="/contact/:id" component={ContactDetail} />
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
      </div>
  );

}

export default App;
