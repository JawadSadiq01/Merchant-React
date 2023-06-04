import React, { useState } from "react";
import axios from "axios";

//title, description, date,, duration, poster, type, venue

function EventForm({ event, setOpen, setReRender, reRender }) {
  const [title, setTitle] = useState(event?.title);
  const [description, setDescription] = useState(event?.description);
  const [venue, setVenue] = useState(event?.venue);
  const [duration, setDuration] = useState(event?.duration);
  const [type, setType] = useState(event?.type);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [date, setDate] = useState(tomorrow.toISOString().substring(0, 10));
  const today = new Date().toISOString().slice(0, 10);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
  };

  const handleSubmit = (curent_event) => {
    console.log(event);
    // debugger

    curent_event.preventDefault();
    var url = event ? 'http://127.0.0.1:5000/api/event-update' : 'http://127.0.0.1:5000/api/event-create';
    // const user_id=localStorage.getItem("user_id");
    console.log(url);
    axios
      .post(url, {
        title: title,
        description: description,
        date: date,
        venue: venue,
        duration: duration,
        type: type,
        id: event._id,
      })
      .then((response) => {
        setOpen(false);
        setReRender(!reRender);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const style = {
    borderBottom: "1px dashed white",
  };

  return (
    <>
      <div style={{ zIndex: 1000 }}>
        {event ? <h1>Update An Transaction</h1> : <h1>Create An Transaction</h1>}
        <div>
          <div className="agileits-topp">
            <form onSubmit={handleSubmit}>
              <input
                className="text"
                style={style}
                type="text"
                name="Title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                className="text"
                style={style}
                type="text"
                name="Description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                type="date"
                className="text"
                style={style}
                name="Date"
                value={date}
                onChange={handleDateChange}
                min={today}
              />

              <input
                className="text"
                style={style}
                type="text"
                name="Venue"
                placeholder="Venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                required
              />

              <input
                className="text"
                style={style}
                type="text"
                pattern="[0-9]*"
                name="Duration"
                placeholder="Duration (Hours)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />

              <select
                className="text"
                style={style}
                type="text"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Select a type</option>
                <option value="PTM">Parent Teacher Meeting</option>
                <option value="Graduation">Graduation Ceremony</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Meeting">Meeting</option>
                <option value="Sports">Sports</option>
                <option value="Other">Other</option>
              </select>
              <input
                className="submitBtn"
                type="submit"
                value={event ? "Update An Transaction" : "Create An Transaction"}
                disabled={type === "" ? true : false}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventForm;
