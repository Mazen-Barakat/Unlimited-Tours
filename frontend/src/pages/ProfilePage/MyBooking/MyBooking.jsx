import classes from './MyBooking.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';

const MyBooking = () => {
  const bookings = [
    {
      id: 1,
      bookingId: '#12453',
      type: 'Hotel',
      date: 'Oct 22, 2024',
      price: '$11,569',
      status: 'Confirmed',
    },
    {
      id: 2,
      bookingId: '#12453',
      type: 'Flight',
      date: 'Oct 22, 2024',
      price: '$11,569',
      status: 'Confirmed',
    },
    {
      id: 3,
      bookingId: '#12453',
      type: 'Activity',
      date: 'Oct 22, 2024',
      price: '$11,569',
      status: 'Pending',
    },
    {
      id: 4,
      bookingId: '#12453',
      type: 'Car',
      date: 'Oct 22, 2024',
      price: '$11,569',
      status: 'Confirmed',
    },
    {
      id: 5,
      bookingId: '#12453',
      type: 'Cruise',
      date: 'Oct 22, 2024',
      price: '$11,569',
      status: 'Cancelled',
    },
    {
      id: 6,
      bookingId: '#12453',
      type: 'Flight',
      date: 'Oct 22, 2024',
      price: '$11,569',
      status: 'Confirmed',
    },
    {
      id: 7,
      bookingId: '#12453',
      type: 'Car',
      date: 'Oct 22, 2024',
      price: '$11,569',
      status: 'Cancelled',
    },
    {
      id: 8,
      bookingId: '#12453',
      type: 'Flight',
      date: 'Oct 22, 2024',
      price: '$11,569',
      status: 'Confirmed',
    },
  ];
  return (
    <div className={classes.wrapper}>
      <div className={classes.bookingCard}>
        <h4 className={classes.bookingTitle}>My Booking</h4>
        <div className={classes.bookingInfo}>
          <div className={classes.bookingTableWrapper}>
            <table className={classes.bookingTable}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Booking ID</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking.id} className={classes.bookingTableRow}>
                    <td>{index + 1}.</td>
                    <td>
                      <b>{booking.bookingId}</b>
                    </td>
                    <td>{booking.type}</td>
                    <td>{booking.date}</td>
                    <td>{booking.price}</td>
                    <td>
                      <span
                        className={
                          classes.badge +
                          ' ' +
                          classes[booking.status.toLowerCase()]
                        }
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <a href='#' className={classes.viewButton}>
                        <FontAwesomeIcon icon={faEye} />
                      </a>
                      <a href='#' className={classes.cancelButton}>
                        Cancel
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

export default MyBooking;
