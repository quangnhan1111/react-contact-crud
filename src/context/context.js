import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import api from "../api/contacts";
import {uuid} from "uuidv4";
import paginate from "../utils/helper";

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const LOCAL_STORAGE_KEY = "contacts";
    const [data, setData] = useState([])
    const [dataPaginate, setDataPaginate] = useState([])
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)

    const showAlert = (show = false, type = '', msg = '') => {
        setAlert({ show, type, msg });
        console.log(alert)
    };
    const clearList = () => {
        showAlert(true, 'danger', 'empty list');
        // await api.delete(`/contacts/`);
        setData([]);
    };


    //RetrieveContacts
    const retrieveContacts = async () => {
        const response = await api.get("/contacts");
        return response.data;
    };

    const addContactHandler = async (contact) => {
        const request = {
            id: uuid(),
            ...contact,
        };
        //save in db
        const response = await api.post("/contacts", request);
        console.log(response);
        //save in local
        showAlert(true, 'success', 'item added to the list');
        setData([...data, response.data])
        console.log(response.data)
    };

    const updateContactHandler = async (contact) => {
        //save in db
        const response = await api.put(`/contacts/${contact.id}`, contact);
        const { id, name, email } = response.data;
        setContacts(
            contacts.map((contact) => {
                return contact.id === id ? { ...response.data } : contact;
            })
        );
        showAlert(true, 'success', 'value changed');
    };

    const removeContactHandler = async (id) => {
        await api.delete(`/contacts/${id}`);
        const newContactList = data.filter((contact) => {
            return contact.id !== id;
        });
        showAlert(true, 'success', 'DELETE success');
        setData((newContactList))
    };

    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm !== "") {
            const newContactList = contacts.filter((contact) => {
                return Object.values(contact)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });
            setSearchResults(newContactList);
        } else {
            setSearchResults(contacts);
        }
        showAlert(true, 'success', 'search value');
    };

    const nextPage = () => {
        setPage((oldPage) => {
            console.log(oldPage)
            let nextPage = oldPage + 1
            if (nextPage > dataPaginate.length - 1) {
                nextPage = 0
            }
            return nextPage
        })
    }
    const prevPage = () => {
        //oldPage la page truoc do cua var Page
        setPage((oldPage) => {
            console.log(oldPage)
            let prevPage = oldPage - 1
            if (prevPage < 0) {
                prevPage = dataPaginate.length - 1
            }
            return prevPage
        })
    }

    const handlePage = (index) => {
        setPage(index)
    }


    useEffect(() => {
        // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        // if (retriveContacts) setContacts(retriveContacts);
        const getAllContacts = async () => {
            const allContacts = await retrieveContacts();
            if (allContacts) {
                setData((allContacts))
            }
            setLoading(false)
        };

        getAllContacts();
        showAlert(true, 'success', 'get all contacts');
    }, []);

    useEffect(() => {
        if (loading) return
        if(data.length>0){
            console.log((data))
            setDataPaginate(paginate(data))
            // console.log(dataPaginate)
            setContacts(paginate(data)[page]);
            console.log(contacts)
            //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
        }
        else {
            setDataPaginate([])
            setContacts([])
        }
    }, [data,loading, page]);


    // setContacts(searchTerm.length < 1 ? contacts : searchResults)
    return (
        <AppContext.Provider
            value={
                {
                    alert,
                    loading,
                    prevPage,
                    nextPage,
                    handlePage,
                    dataPaginate,
                    page,
                    contacts,
                    searchTerm,
                    setSearchTerm,
                    searchResults,
                    removeContactHandler,
                    clearList,
                    searchHandler,
                    showAlert,
                    addContactHandler,
                    updateContactHandler
                }

            }
        >
            {children}
        </AppContext.Provider>
    )
}
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }
