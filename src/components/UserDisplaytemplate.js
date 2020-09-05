import React, {useEffect, useState} from 'react';
import { db } from '../firebase';
import './UserDisplaytemplate.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Modal, Button } from "react-bootstrap";

const UserDisplaytemplate = ({real_name, country, city, userId, key}) => {
    const [showcalendar,setShowcalendar] = useState(false)      //used to toggle the calendar
    const [selecteddate,setSelecteddate] = useState(new Date())     // date selected by the user
    const [times,setTimes] = useState([])   //the state times = all the activity data of this user
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let temp
        if (userId){
            temp = db.collection("time_data")
            .doc(userId)
            .collection("start_end_times")   //each post doc has its own "start_end_times" collection
            .onSnapshot((snapshot) => {
            setTimes(snapshot.docs.map((doc) => doc.data()))
            })
        }

        return () => {
            temp()
        }
    },[userId])

    function filter_function(time) {
        const begindateInMillis  = time.start_time.seconds * 1000
        let begindate = new Date(begindateInMillis).toDateString()
        return begindate===selecteddate.toDateString()
    }

    let result_times = times.filter(filter_function)
    // result times is an array that holds all the activity data for the selected date

    const handleCalendar = () => {
        setShowcalendar(!showcalendar)
    }

    const handledateselection = (e) => {
        setSelecteddate(e)
        setShowcalendar(false)
    }

    return (
    <div className="m-5 mx-auto template">
    
        <div>
            <div className="name-heading">
                <a variant="primary" onClick={handleShow}>{real_name}</a>
            </div>
            
            <div>

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="mod-title p-2">{real_name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                        <h3 className="select-date">Select a date</h3>
                        <div className="cal-icon">
                            <i className="fa fa-calendar fa-3x m-2 p-2" aria-hidden="true" onClick={handleCalendar}></i>
                        </div>
                        <div className="cal">
                            {showcalendar ? <Calendar value={selecteddate} onClickDay={handledateselection}/> : ""}
                        </div>

                        <p className="date-display">Selected Date: {selecteddate.toDateString()}</p>
                    <div>
                            {result_times.length ? result_times.map((time) => {
                                const startdateInMillis  = time.start_time.seconds * 1000
                                const enddateInMillis  = time.end_time.seconds * 1000
                                let starttime = new Date(startdateInMillis).toLocaleTimeString()
                                let startdate = new Date(startdateInMillis).toDateString()
                                let endtime = new Date(enddateInMillis).toLocaleTimeString()
                                let enddate = new Date(enddateInMillis).toDateString()
                                return (
                                    <p className="msg">
                                        Logged in at {starttime} on {startdate} and logged out at {endtime} on {enddate}
                                    </p>
                                    )
                            }) : 
                            <p className="msg">There was no activity by {real_name} on {selecteddate.toDateString()}</p>}
                        </div>                
                
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </div>
     );
}
 
export default UserDisplaytemplate;