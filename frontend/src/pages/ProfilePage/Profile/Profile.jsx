import classes from './Profile.module.css';
import { useOutletContext } from 'react-router-dom';
import { format } from 'date-fns';


const Profile = () => {
  const { userProfile } = useOutletContext();
  const joinedDate = new Date(userProfile.date_joined);

  const formattedJoinedDate = isNaN(joinedDate.getTime())
    ? 'Invalid Date'
    : format(joinedDate, 'dd/MM/yyyy');

  return (
    <div className={classes.wrapper}>
      <div className={classes.profileCard}>
        <h4 className={classes.profileTitle}>Profile Information</h4>
        <div className={classes.profileInfo}>
          <ul className={classes.profileList}>
            <li>
              First Name:
              <span className={classes.profileLabel}>
                {userProfile.first_name}
              </span>
            </li>
            <li>
              Last Name:
              <span className={classes.profileLabel}>
                {userProfile.last_name}
              </span>
            </li>
            <li>
              Email:
              <span className={classes.profileLabel}>
                {userProfile.email}
              </span>
            </li>
            <li>
              Phone:
              <span className={classes.profileLabel}>
                {userProfile.phone_number_1}
              </span>
            </li>
            <li>
              Joined Date:
              <span className={classes.profileLabel}>
                {formattedJoinedDate}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
