import { useState } from "react";
<link rel="stylesheet" href="style.css" />

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setval] = useState("");
  const [isAttendingWithGuest, setIsAttendingWithGuest] = useState(false);

  const [error, setError] = useState("");
  const [aerror, setAerror] = useState("");
  const [gerror, setGerror] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [ageError, setageError] = useState("");
  const [guestname, setGuestName] = useState("");
  const [validemail, setValidEmailError] = useState("");

  const [summary, setSummary] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    var flag = true;
    if (!name) {
      setError(<p>Name cannot be empty,please provide a name</p>);
      flag = false;
    } else {
      setError("");
      flag = true;
    }
    if (!email) {
      setEmailError(<p>provide an email</p>);
      flag = false;
    } else {
      setEmailError("");
      flag = true;
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setValidEmailError(<p>provide a valid email</p>);
        flag = false;
      } else {
        setValidEmailError("");
        flag = true;
      }
    }

    if (!age) {
      setAerror(<p>Age cannot be empty,please provide a name</p>);
      flag = false;
    } else {
      setAerror("");
      flag = true;
      if (age <= 0 || isNaN(age)) {
        setageError(<p>please provide a valid age</p>);
        flag = false;
      } else {
        setageError("");
        flag = true;
      }
    }
    if (isAttendingWithGuest) {
      if (!guestname) {
        setGerror(<p>please provide the guest name</p>);
        flag = false;
      } else {
        setGerror("");
        flag = true;
      }
    }
    if (flag) {
      const summaryData = {
        name,
        email,
        age,
        isAttendingWithGuest,
        guestName: isAttendingWithGuest ? guestname : "N/A",
      };
      setSummary(summaryData);
    }
  };

  const handleGuestChange = (e) => {
    setIsAttendingWithGuest(e.target.value === "yes");
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <form className="contactForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          {error}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailerror}
          {validemail}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="text"
            name="age"
            id="age"
            value={age}
            onChange={(e) => setval(e.target.value)}
          />
          {aerror}
          {ageError}
        </div>
        <div className="radio">
          <label>Are you attending with a guest?</label>
          <label htmlFor="guestYes">Yes</label>
          <div>
            <input
              type="radio"
              id="guestYes"
              name="guest"
              value="yes"
              onChange={handleGuestChange}
            />
            <label htmlFor="guestNo">No</label>
          </div>
          <div>
            <input
              type="radio"
              id="guestNo"
              name="guest"
              value="no"
              onChange={handleGuestChange}
            />
          </div>
        </div>
        {isAttendingWithGuest && (
          <div>
            <label htmlFor="guestName">Guest Name</label>
            <input
              type="text"
              name="guestName"
              id="guestName"
              value={guestname}
              onChange={(e) => setGuestName(e.target.value)}
            />
            {gerror}
          </div>
        )}
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <div className="sum">
        {summary && (
          <div className="summary">
            <h2>Summary</h2>
            <h4>
              <strong>Name:</strong> {summary.name}
            </h4>
            <h4>
              <strong>Email:</strong> {summary.email}
            </h4>
            <h4>
              <strong>Age:</strong> {summary.age}
            </h4>
            <h4>
              <strong>Attending with Guest:</strong>{" "}
              {summary.isAttendingWithGuest ? "Yes" : "No"}
            </h4>
            {summary.isAttendingWithGuest && (
              <h4>
                <strong>Guest Name:</strong> {summary.guestName}
              </h4>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App
