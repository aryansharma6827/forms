import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import selectOptions from "./data.json"; // Import the data.json file

function App  () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  const [error, setError] = useState("");
  const [Perror, setPerror] = useState("");
  const [vPerror, setVPerror] = useState("");
  const [gerror, setGerror] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [guestname, setGuestName] = useState("");
  const [validemail, setValidEmailError] = useState("");
  const [summary, setSummary] = useState(null);
  const [selectData, setSelectData] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [developerInput, setDeveloperInput] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [managementExperience, setManagementExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillsError, setSkillsError] = useState("");
  const [preferredInterviewTime, setPreferredInterviewTime] = useState("");
  const [interviewTimeError, setInterviewTimeError] = useState("");
  const [favoriteLanguage, setFavoriteLanguage] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [exerciseFrequency, setExerciseFrequency] = useState("");
  const [dietPreference, setDietPreference] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  useEffect(() => {
    setSelectData(selectOptions);
  }, []);

  const selectDropdown = () => {
    return (
      <select
        name="dropdown"
        id="dropdown"
        value={selectValue}
        onChange={(e) => {
          setSelectValue(e.target.value);
          // Reset relevant state variables when the dropdown changes
          resetTechnologyState();
          resetHealthState();
          resetEducationState();
        }}
      >
        <option value="" disabled>
          Select a topic
        </option>
        {selectData?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  };

  const resetTechnologyState = () => {
    setFavoriteLanguage("");
    setYearsOfExperience("");
  };

  const resetHealthState = () => {
    setExerciseFrequency("");
    setDietPreference("");
  };

  const resetEducationState = () => {
    setHighestQualification("");
    setFieldOfStudy("");
  };

  // const handleSkillChange = (e) => {
  //   const { value, checked } = e.target;
  //   setSkills((prevSkills) =>
  //     checked
  //       ? [...prevSkills, value]
  //       : prevSkills.filter((skill) => skill !== value)
  //   );
  // };

  const handleFeedbackChange = (e) => {
    const { value } = e.target;
    setFeedback(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;

    // Validate Feedback field
    if (feedback.trim().length === 0) {
      setFeedbackError(<p>Feedback is required</p>);
      flag = false;
    } else if (feedback.trim().length < 50) {
      setFeedbackError(<p>Feedback must be at least 50 characters</p>);
      flag = false;
    } else {
      setFeedbackError("");
    }

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

    if (selectValue === "Technology") {
      if (!favoriteLanguage) {
        setError(<p>Please select a favorite programming language</p>);
        flag = false;
      } else {
        setError("");
      }
      if (!yearsOfExperience) {
        setPerror(<p>Please provide years of experience</p>);
        flag = false;
      } else {
        setPerror("");
        if (isNaN(yearsOfExperience)) {
          setVPerror(<p>Years of experience must be a number</p>);
          flag = false;
        } else {
          setVPerror("");
        }
      }
    }
    if (selectValue === "Health") {
      if (!exerciseFrequency) {
        setError(<p>Please select exercise frequency</p>);
        flag = false;
      } else {
        setError("");
      }
      if (!dietPreference) {
        setPerror(<p>Please select a diet preference</p>);
        flag = false;
      } else {
        setPerror("");
      }
    }
    if (selectValue === "Education") {
      if (!highestQualification) {
        setError(<p>Please select highest qualification</p>);
        flag = false;
      } else {
        setError("");
      }
      if (!fieldOfStudy) {
        setPerror(<p>Please provide field of study</p>);
        flag = false;
      } else {
        setPerror("");
      }
    }
    if (flag) {
      const summaryData = {
        name,
        email,
        selectValue,
        favoriteLanguage:
          selectValue === "Technology" ? favoriteLanguage : "N/A",
        yearsOfExperience:
          selectValue === "Technology" ? yearsOfExperience : "N/A",
        exerciseFrequency: selectValue === "Health" ? exerciseFrequency : "N/A",
        dietPreference: selectValue === "Health" ? dietPreference : "N/A",
        highestQualification:
          selectValue === "Education" ? highestQualification : "N/A",
        fieldOfStudy: selectValue === "Education" ? fieldOfStudy : "N/A",
        feedback,
      };
      setSummary(summaryData);
    }
  };

  const renderTechnologySection = () => {
    return (
      <>
        <div>
          <label htmlFor="favoriteLanguage">
            Favorite Programming Language
          </label>
          <select
            name="favoriteLanguage"
            id="favoriteLanguage"
            value={favoriteLanguage}
            onChange={(e) => setFavoriteLanguage(e.target.value)}
          >
            <option value="">Select language</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
          </select>
        </div>
        <div>
          <label htmlFor="yearsOfExperience">Years of Experience</label>
          <input
            type="number"
            name="yearsOfExperience"
            id="yearsOfExperience"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
          />
        </div>
      </>
    );
  };

  const renderHealthSection = () => {
    return (
      <>
        <div>
          <label htmlFor="exerciseFrequency">Exercise Frequency</label>
          <select
            name="exerciseFrequency"
            id="exerciseFrequency"
            value={exerciseFrequency}
            onChange={(e) => setExerciseFrequency(e.target.value)}
          >
            <option value="">Select frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Rarely">Rarely</option>
          </select>
        </div>
        <div>
          <label htmlFor="dietPreference">Diet Preference</label>
          <select
            name="dietPreference"
            id="dietPreference"
            value={dietPreference}
            onChange={(e) => setDietPreference(e.target.value)}
          >
            <option value="">Select preference</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
        </div>
      </>
    );
  };

  const renderEducationSection = () => {
    return (
      <>
        <div>
          <label htmlFor="highestQualification">Highest Qualification</label>
          <select
            name="highestQualification"
            id="highestQualification"
            value={highestQualification}
            onChange={(e) => setHighestQualification(e.target.value)}
          >
            <option value="">Select qualification</option>
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor s</option>
            <option value="Master's">Master s</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <div>
          <label htmlFor="fieldOfStudy">Field of Study</label>
          <input
            type="text"
            name="fieldOfStudy"
            id="fieldOfStudy"
            value={fieldOfStudy}
            onChange={(e) => setFieldOfStudy(e.target.value)}
          />
        </div>
      </>
    );
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
          <label htmlFor="dropdown">Survey Topic</label>
          {selectDropdown()}
        </div>

        {selectValue === "Technology" && renderTechnologySection()}

        {selectValue === "Health" && renderHealthSection()}

        {selectValue === "Education" && renderEducationSection()}

        <div>
          <label htmlFor="feedback">Feedback</label>
          <input
            type="text"
            id="feedback"
            value={feedback}
            onChange={handleFeedbackChange}
          />
          {feedbackError}
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
              <strong>Survey Topic:</strong> {summary.selectValue}
            </h4>
            {summary.selectValue === "Technology" && (
              <>
                <h4>
                  <strong>Favorite Programming Language:</strong>{" "}
                  {summary.favoriteLanguage}
                </h4>
                <h4>
                  <strong>Years of Experience:</strong>{" "}
                  {summary.yearsOfExperience}
                </h4>
              </>
            )}
            {summary.selectValue === "Health" && (
              <>
                <h4>
                  <strong>Exercise Frequency:</strong>{" "}
                  {summary.exerciseFrequency}
                </h4>
                <h4>
                  <strong>Diet Preference:</strong> {summary.dietPreference}
                </h4>
              </>
            )}
            {summary.selectValue === "Education" && (
              <>
                <h4>
                  <strong>Highest Qualification:</strong>{" "}
                  {summary.highestQualification}
                </h4>
                <h4>
                  <strong>Field of Study:</strong> {summary.fieldOfStudy}
                </h4>
              </>
            )}

            <h4>
              <strong>Feedback:</strong> {summary.feedback}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default App