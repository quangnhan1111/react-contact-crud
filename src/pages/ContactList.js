import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard";
import { useGlobalContext } from '../context/context'

const ContactList = (props) => {
    const {contacts, page, dataPaginate, handlePage, nextPage, prevPage, searchTerm, loading, searchHandler, removeContactHandler, searchResults, clearList } = useGlobalContext()
    const inputEl = useRef("");
    React.useEffect(() => {
        inputEl.current.focus()
    }, [])

    const deleteContactHandler = (id) => {
        // props.getContactId(id);
        removeContactHandler(id)
    };

    const list = searchTerm.length < 1 ? contacts : searchResults
    const renderContactList = list.map((contact) => {
    // const renderContactList = props.contacts.map((contact) => {
        return (
            <div>
                <ContactCard
                    contact={contact}
                    clickHander={deleteContactHandler}
                    key={contact.id}
                />

            </div>
        );
    });

    const getSearchTerm = () => {
        // props.searchKeyword(inputEl.current.value);
        searchHandler(inputEl.current.value)
    };
    return (
        <div className="main">
            <div className='section-title'>
                {/*<h1>{props.loading ? 'loading...' : 'pagination'}</h1>*/}
                <h1>{loading ? 'loading...' : 'pagination'}</h1>
                <div className='underline'></div>
            </div>
            <h2>
                Contact List
                <Link to="/add">
                    <button className="ui button blue right">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input
                        ref={inputEl}
                        type="text"
                        placeholder="Search Contacts"
                        className="prompt"
                        // value={props.term}
                        value={searchTerm}
                        onChange={getSearchTerm}
                    />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {renderContactList.length > 0
                    ? renderContactList
                    : "No Contacts available"}

                {/*{!props.loading && (*/}
                    {!loading && (
                    <div className='btn-container'>
                        <button
                            className='prev-btn'
                            // onClick={props.prevPage}
                            onClick={prevPage}
                        >
                            prev
                        </button>
                        {/*{props.dataPaginate.map((item, index) => {*/}
                            {dataPaginate.map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    // className={`page-btn ${index === props.page ? 'active-btn' : null}`}
                                    className={`page-btn ${index === page ? 'active-btn' : null}`}
                                    // onClick={() => props.handlePage(index)}
                                    onClick={() => handlePage(index)}
                                >
                                    {index + 1}
                                </button>
                            )
                        })}
                        <button
                            className='next-btn'
                            // onClick={props.nextPage}
                            onClick={nextPage}
                        >
                            next
                        </button>
                    </div>
                )}
            </div>
            <button
                className='clear-btn'
                // onClick={props.clearList}
                onClick={clearList}
            >
                clear all items
            </button>
        </div>
    );
};

export default ContactList;
