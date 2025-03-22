import classes from './Settings.module.css';
import { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faKey } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const Settings = () => {
  const { userProfile } = useOutletContext();
  const [profilePicture, setProfilePicture] = useState(
    userProfile.profile_picture
  );

  const fileInput = useRef(null);

  const handleImageUpload = ({
    target: {
      files: [file],
    },
  }) => {
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleCameraClick = () => fileInput.current.click();

  return (
    <div className={classes.settings}>
      <div className={classes.profileSettings}>
        <div className={classes.settingsCard}>
          <h4>Update Profile Information</h4>
          <div className={classes.profileImg}>
            <img
              src={
                profilePicture === 'null' || profilePicture === 'undefined'
                  ? 'src/assets/auth.png'
                  : profilePicture
              }
              alt='profile picture'
            />
            <button type='button' onClick={handleCameraClick}>
              <FontAwesomeIcon icon={faCamera} />
            </button>
            <input
              type='file'
              ref={fileInput}
              accept='image/*'
              onChange={handleImageUpload}
            />
          </div>
          <div className={classes.profileForm}>
            <form action='#'>
              <div className={classes.row}>
                <div className={classes.halfCol}>
                  <div className={classes.formGroup}>
                    <label>First Name</label>
                    <div className={classes.formControl}>
                      <input type='text' placeholder={userProfile.first_name} />
                    </div>
                  </div>
                </div>

                <div className={classes.halfCol}>
                  <div className={classes.formGroup}>
                    <label>Last Name</label>
                    <div className={classes.formControl}>
                      <input type='text' placeholder={userProfile.last_name} />
                    </div>
                  </div>
                </div>

                <div className={classes.halfCol}>
                  <div className={classes.formGroup}>
                    <label>Email</label>
                    <div className={classes.formControl}>
                      <input type='text' placeholder={userProfile.email} />
                    </div>
                  </div>
                </div>

                <div className={classes.halfCol}>
                  <div className={classes.formGroup}>
                    <label>Phone Number</label>
                    <div className={classes.formControl}>
                      <input
                        type='text'
                        placeholder={userProfile.phone_number_1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <button className={classes.themeBtn} type='submit'>
              Update Profile
              <FontAwesomeIcon icon={faUser} />
            </button>
          </div>
        </div>
        <div className={classes.settingsCard}>
          <h4>Change Password</h4>

          <div className={classes.profileForm}>
            <form action='#'>
              <div className={classes.row}>
                <div className={classes.fullCol}>
                  <div className={classes.formGroup}>
                    <label>Old Password</label>
                    <div className={classes.formControl}>
                      <input type='text' placeholder='Old Password' />
                    </div>
                  </div>
                </div>

                <div className={classes.fullCol}>
                  <div className={classes.formGroup}>
                    <label>New Password</label>
                    <div className={classes.formControl}>
                      <input type='text' placeholder='New Password' />
                    </div>
                  </div>
                </div>

                <div className={classes.fullCol}>
                  <div className={classes.formGroup}>
                    <label>Confirm Password</label>
                    <div className={classes.formControl}>
                      <input type='text' placeholder='Confirm Password' />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <button className={classes.themeBtn} type='submit'>
							Change Password
              <FontAwesomeIcon icon={faKey} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
