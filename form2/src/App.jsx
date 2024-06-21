import { useState,useEffect } from "react";
<link rel="stylesheet" href="style.css" />

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [statejson,  SetSelectData] = useState("");

  const [error, setError] = useState("");
  const [Perror, setPerror] = useState("");
  const [vPerror, setVPerror] = useState("");

  const [emailerror, setEmailError] = useState("");

  const [validemail, setValidEmailError] = useState("");
  const [summary, setSummary] = useState(null);

  const [selectValue, setSelectValue] = useState("");
  const [developerInput, setDeveloperInput] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [managementExperience, setManagementExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillsError, setSkillsError] = useState("");
  const [preferredInterviewTime, setPreferredInterviewTime] = useState("");
  const [interviewTimeError, setInterviewTimeError] = useState("");

  const fetchData = async () => {
    await fetch("")
      .then((res) => res.json())
      .then((data) => SetSelectData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setSkills((prevSkills) =>
      checked
        ? [...prevSkills, value]
        : prevSkills.filter((skill) => skill !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var flag = true;
    if (!name) {
      setError(<p>Name cannot be empty, please provide a name</p>);
      flag = false;
    } else {
      setError("");
    }
    if (!email) {
      setEmailError(<p>Provide an email</p>);
      flag = false;
    } else {
      setEmailError("");
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setValidEmailError(<p>Provide a valid email</p>);
        flag = false;
      } else {
        setValidEmailError("");
      }
    }
    if (!number) {
      setPerror(<p>Provide a number</p>);
      flag = false;
    } else {
      setPerror("");
      if (number < 999999999 || isNaN(number)) {
        setVPerror(<p>Provide a valid Phone number</p>);
        flag = false;
      } else {
        setVPerror("");
      }
    }
   
    if (skills.length === 0) {
      setSkillsError(<p>Please select at least one skill</p>);
      flag = false;
    } else {
      setSkillsError("");
    }
    if (!preferredInterviewTime) {
      setInterviewTimeError(<p>Please provide a preferred interview time</p>);
      flag = false;
    } else {
      setInterviewTimeError("");
    }
    if (flag) {
      const summaryData = {
        name,
        email,
        number,
        selectValue,
        developerInput: selectValue === "Developer" ? developerInput : "N/A",
        portfolioUrl: selectValue === "Designer" ? portfolioUrl : "N/A",
        managementExperience:
          selectValue === "Manager" ? managementExperience : "N/A",
        skills,
        preferredInterviewTime,
      };
      setSummary(summaryData);
    }
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <form className="contactForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
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
          <label htmlFor="phone">Phone Number</label>
          <input
            type="Number"
            name="phone"
            id="phone"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          {Perror}
          {vPerror}
        </div>

        <div>
          <label htmlFor="application">Applying for Position</label>
          <select
            name="dropdown"
            id="dropdown"
            value={selectValue}
            onChange={(e) => {
              setSelectValue(e.target.value);
            }}
          >
            <option value="">Select a position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        {selectValue === "Developer" && (
          <div>
            <label htmlFor="developerInput">Developer Experience</label>
            <input
              type="text"
              name="developerInput"
              id="developerInput"
              value={developerInput}
              onChange={(e) => setDeveloperInput(e.target.value)}
            />
          </div>
        )}

        {selectValue === "Designer" && (
          <div>
            <label htmlFor="portfolioUrl">Portfolio URL</label>
            <input
              type="text"
              name="portfolioUrl"
              id="portfolioUrl"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
            />
          </div>
        )}

        {selectValue === "Manager" && (
          <div>
            <label htmlFor="managementExperience">Management Experience</label>
            <input
              type="text"
              name="managementExperience"
              id="managementExperience"
              value={managementExperience}
              onChange={(e) => setManagementExperience(e.target.value)}
            />
          </div>
        )}

        <div>
          <label>Additional Skills</label>
          <div>
            <input
              type="checkbox"
              value="JavaScript"
              onChange={handleSkillChange}
            />{" "}
            JavaScript
          </div>
          <div>
            <input type="checkbox" value="CSS" onChange={handleSkillChange} />{" "}
            CSS
          </div>
          <div>
            <input
              type="checkbox"
              value="Python"
              onChange={handleSkillChange}
            />{" "}
            Python
          </div>
          <div>
            <input type="checkbox" value="C++" onChange={handleSkillChange} />{" "}
            C++
          </div>
          {skillsError}
        </div>

        <div>
          <label htmlFor="preferredInterviewTime">
            Preferred Interview Time
          </label>
          <input
            type="datetime-local"
            id="preferredInterviewTime"
            value={preferredInterviewTime}
            onChange={(e) => setPreferredInterviewTime(e.target.value)}
          />
          {interviewTimeError}
        </div>

        <button type="submit">Submit</button>
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
              <strong>Phone Number:</strong> {summary.number}
            </h4>
            <h4>
              <strong>Applying for Position:</strong> {summary.selectValue}
            </h4>
            {summary.selectValue === "Developer" && (
              <h4>
                <strong>Relevant Experience:</strong> {summary.developerInput}
              </h4>
            )}
            {summary.selectValue === "Designer" && (
              <h4>
                <strong>Portfolio URL:</strong> {summary.portfolioUrl}
              </h4>
            )}
            {summary.selectValue === "Manager" && (
              <h4>
                <strong>Management Experience:</strong>{" "}
                {summary.managementExperience}
              </h4>
            )}
            <h4>
              <strong>Additional Skills:</strong> {summary.skills.join(", ")}
            </h4>
            <h4>
              <strong>Preferred Interview Time:</strong>{" "}
              {summary.preferredInterviewTime}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default App