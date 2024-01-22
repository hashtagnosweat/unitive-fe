import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../services/appApi";
import axios from "axios";

import "./OnBoarding.css";
import botImg from "../assets/bot.jpeg";

function OnBoarding() {
  const user = useSelector((state) => state.user);
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  // setImage
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      return alert("Max file size is 1 mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "h5ajwmxy");
    try {
      setUploadingImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dwr7dpnc9/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  const [formData, setFormData] = useState({
    _id: user._id,
    picture: "",
    name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    gender_identity: "",
    mother_tongue: "",
    learning_languages: [],
    about: "",
  });

  async function getUserOnboarding() {
    
      setFormData((prevState) => ({
        ...prevState,
        picture: user.picture,
        name: user.name,
        dob_day: user.dob_day,
        dob_month: user.dob_month,
        dob_year: user.dob_year,
        gender_identity: user.gender_identity,
        mother_tongue: user.mother_tongue,
        learning_languages: user.learning_languages,
        about: user.about,
      }));
    }

  useEffect(() => {
    getUserOnboarding();
  }, []);

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const url = await uploadImage(image);
   await updateUser({user_id: user._id, formData, picture: url}).then(({data}) => { 
      if(data) {
      navigate("/chat")
      console.log("DATA DARI EDIT", data)
      }
    })
      
  }

  // handle String
  function handleChange(e) {
    console.log("e", e);
    const { value, name } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // handle Array

  function handleMultipleChange(e) {
    const { value, checked, name } = e.target;
    console.log(value, checked, name);

    // check if true or false
    if (checked) {
      setFormData((prevState) => {
        const checkedLanguages = [...prevState.learning_languages, value];

        return { ...prevState, [name]: checkedLanguages };
      });
    } else {
      setFormData((prevState) => {
        // It fetches all data from the prevState and get all languages that don't have the same value as the unselected box(es).
        const uncheckedLanguages = prevState.learning_languages.filter(
          (language) => language !== value
        );
        console.log(uncheckedLanguages);

        return { ...prevState, [name]: uncheckedLanguages };
      });
    }
  }

  console.log(formData);

  return (
    <>
      <div className="onboarding">
        <h2>EDIT ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            {/* picture */}
            <div className="signup-profile-pic__container">
              <img
                src={ imagePreview || formData.picture}
                className="signup-profile-pic"
              />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input
                type="file"
                id="image-upload"
                hidden
                accept="image/png, image/jpeg"
                onChange={validateImg}
              />
            </div> 

            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="name"
              placeholder="Username"
              required={true}
              value={formData.name}
              onChange={handleChange}
            />

            <label>Birthday (Day / Month / Year)</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value={"man"}
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value={"woman"}
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value={"more"}
                onChange={handleChange}
                checked={formData.gender_identity === "more"}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>


            <label>Mother Tongue</label>
            <div className="multiple-input-container">
              <input
                id="native_english"
                type="radio"
                name="mother_tongue"
                value={"english"}
                onChange={handleChange}
                checked={formData.mother_tongue === "english"}
              />
              <label htmlFor="native_english">English</label>
              <input
                id="native_german"
                type="radio"
                name="mother_tongue"
                value={"german"}
                onChange={handleChange}
                checked={formData.mother_tongue === "german"}
              />
              <label htmlFor="native_german">German</label>
              <input
                id="native_french"
                type="radio"
                name="mother_tongue"
                value={"french"}
                onChange={handleChange}
                checked={formData.mother_tongue === "french"}
              />
              <label htmlFor="native_french">French</label>
              <input
                id="native_spanish"
                type="radio"
                name="mother_tongue"
                value={"spanish"}
                onChange={handleChange}
                checked={formData.mother_tongue === "spanish"}
              />
              <label htmlFor="native_spanish">Spanish</label>
              <input
                id="native_korean"
                type="radio"
                name="mother_tongue"
                value={"korean"}
                onChange={handleChange}
                checked={formData.mother_tongue === "korean"}
              />
              <label htmlFor="native_korean">Korean</label>
              <input
                id="native_mandarin"
                type="radio"
                name="mother_tongue"
                value={"mandarin"}
                onChange={handleChange}
                checked={formData.mother_tongue === "mandarin"}
              />
              <label htmlFor="native_mandarin">Mandarin</label>
              <input
                id="native_japanese"
                type="radio"
                name="mother_tongue"
                value={"japanese"}
                onChange={handleChange}
                checked={formData.mother_tongue === "japanese"}
              />

              <label htmlFor="native_japanese">Japanese</label>
              <input
                id="native_indonesian"
                type="radio"
                name="mother_tongue"
                value={"indonesian"}
                onChange={handleChange}
                checked={formData.mother_tongue === "indonesian"}
              />
              <label htmlFor="native_indonesian">Indonesian</label>
            </div>

            <label>Learning Languages</label>
            <div className="multiple-input-container">
              <input
                id="learning_english"
                type="checkbox"
                name="learning_languages"
                value={"english"}
                onChange={handleMultipleChange}
                checked={formData.learning_languages.includes("english")}
              />
              <label htmlFor="learning_english">English</label>
              <input
                id="learning_german"
                type="checkbox"
                name="learning_languages"
                value={"german"}
                onChange={handleMultipleChange}
                checked={formData.learning_languages.includes("german")}
              />
              <label htmlFor="learning_german">German</label>
              <input
                id="learning_french"
                type="checkbox"
                name="learning_languages"
                value={"french"}
                onChange={handleMultipleChange}
                checked={formData.learning_languages.includes("french")}
              />
              <label htmlFor="learning_french">French</label>
              <input
                id="learning_spanish"
                type="checkbox"
                name="learning_languages"
                value={"spanish"}
                onChange={handleMultipleChange}
                checked={formData.learning_languages.includes("spanish")}
              />
              <label htmlFor="learning_spanish">Spanish</label>
              <input
                id="learning_korean"
                type="checkbox"
                name="learning_languages"
                value={"korean"}
                onChange={handleMultipleChange}
                checked={formData.learning_languages.includes("korean")}
              />
              <label htmlFor="learning_korean">Korean</label>
              <input
                id="learning_mandarin"
                type="checkbox"
                name="learning_languages"
                value={"mandarin"}
                onChange={handleMultipleChange}
                checked={formData.learning_languages.includes("mandarin")}
              />
              <label htmlFor="learning_mandarin">Mandarin</label>
              <input
                id="learning_japanese"
                type="checkbox"
                name="learning_languages"
                value={"japanese"}
                onChange={handleMultipleChange}
                checked={formData.learning_languages.includes("japanese")}
              />
              <label htmlFor="learning_japanese">Japanese</label>
              <input
                id="learning_indonesian"
                type="checkbox"
                name="learning_languages"
                value={"indonesian"}
                onChange={handleMultipleChange}
                checked={formData.learning_languages.includes("indonesian")}
              />
              <label htmlFor="learning_indonesian">Indonesian</label>
            </div>

            <label htmlFor="about">About Me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I want to study Spanish"
              value={formData.about}
              maxLength={230}
              onChange={handleChange}
            />

            <div className="arrow-submit">
              <button type="submit">
                <FaAngleRight className="submit-btn" />
              </button>
            </div>
          </section>
        </form>
      </div>
    </>
  );
}
export default OnBoarding;
