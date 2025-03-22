import classes from './Notifications.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const Notification = () => {
  const notifications = [
    {
      id: 1,
      notification: 'There are many variations of passages orem psum available',
      date: 'Oct 22, 2024',
      status: 'Unread',
    },
    {
      id: 2,
      notification: 'There are many variations of passages orem psum available',
      date: 'Oct 22, 2024',
      status: 'Read',
    },
    {
      id: 3,
      notification: 'There are many variations of passages orem psum available',
      date: 'Oct 22, 2024',
      status: 'Unread',
    },
    {
      id: 4,
      notification: 'There are many variations of passages orem psum available',
      date: 'Oct 22, 2024',
      status: 'Read',
    },
    {
      id: 5,
      notification: 'There are many variations of passages orem psum available',
      date: 'Oct 22, 2024',
      status: 'Read',
    },
  ];

  return (
    <div className={classes.wrapper}>
      <div className={classes.notification}>
        <h4 className={classes.notificationTitle}>My Notifications</h4>
        <div className={classes.notificationInfo}>
          <div className={classes.tableResponsive}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Notification</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr
                    key={notification.id}
                    className={classes.notificationCard}
                  >
                    <td>{index + 1}.</td>
                    <td>
                      <p>{notification.notification}</p>
                    </td>
                    <td>{notification.date}</td>
                    <td>
                      <span
                        className={
                          classes.badge +
                          ' ' +
                          (notification.status === 'Unread'
                            ? classes.warning
                            : classes.success)
                        }
                      >
                        {notification.status}
                      </span>
                    </td>
                    <td>
                      <a
                        href='#'
                        className={classes.viewButton}
                        onClick={() =>
                          notification.status === 'Unread'
                            ? (notification.status = 'Read')
                            : (notification.status = 'Unread')
                        }
                      >
                        {notification.status === 'Unread' ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        )}
                        {notification.status === 'Unread'
                          ? ' Mark As Read'
                          : ' Mark As Unread'}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
