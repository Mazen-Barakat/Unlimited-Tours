import { useState, useEffect } from 'react';
import classes from './AuthenticationPage.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faFacebookF,
  faXTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { signIn } from '../../utils/getData';
import MainNavigation from '../../components/Header/MainNavigation';

// Define the social icons in an object
const socialIcons = [
  { icon: faGoogle, ariaLabel: 'Google' },
  { icon: faFacebookF, ariaLabel: 'Facebook' },
  { icon: faXTwitter, ariaLabel: 'Twitter' },
  { icon: faLinkedinIn, ariaLabel: 'LinkedIn' },
];

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(); // State to toggle between sign-in and sign-up
  const [formData, setFormData] = useState({
    signIn: { username: '', password: '' },
    signUp: { username: '', email: '', password: '', confirmPassword: '' },
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.pathname.includes('signin')) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [location.pathname]);

  const currentForm = active ? 'signUp' : 'signIn';

  // Handle input field changes
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [currentForm]: { ...formData[currentForm], [name]: value },
    });
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    if (currentForm === 'signIn') {
      // Handle Sign In submission
      const { username, password } = formData.signIn;
      try {
        const response = await signIn({ username, password });
        if (response.result.access) {
          localStorage.setItem('access_token', response.result.access);
          navigate('/');
          window.location.reload();
        }
      } catch (error) {
        setError('Failed to sign in. Please check your credentials.');
      }
    } else if (currentForm === 'signUp') {
      // Handle Sign Up submission
      const { username, email, password, confirmPassword } = formData.signUp;
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      // Call your sign-up API here (not implemented in this code)
      try {
        // Perform sign-up logic (e.g., call an API)
        // const response = await signUp(username, email, password);
        // Handle successful sign-up (e.g., redirect to sign-in page)
      } catch (error) {
        setError('Failed to create account. Please try again.');
      }
    }
  };

  const toggleForm = isSignUp => {
    setActive(isSignUp);
    navigate(isSignUp ? '/signup' : '/signin'); // Update URL without reload
  };

  const formConfig = {
    signUp: {
      title: 'Create Account',
      description: 'or use your email for registration',
      inputFields: [
        {
          type: 'text',
          placeholder: 'User Name',
          name: 'username',
          value: formData.signUp.username,
        },
        {
          type: 'email',
          placeholder: 'Email',
          name: 'email',
          value: formData.signUp.email,
        },
        {
          type: 'password',
          placeholder: 'Password',
          name: 'password',
          value: formData.signUp.password,
        },
        {
          type: 'password',
          placeholder: 'Confirm Password',
          name: 'confirmPassword',
          value: formData.signUp.confirmPassword,
        },
      ],
      buttonText: 'Sign Up',
    },
    signIn: {
      title: 'Sign In',
      description: 'or use your email password',
      inputFields: [
        {
          type: 'text',
          placeholder: 'User Name',
          name: 'username',
          value: formData.signIn.username,
        },
        {
          type: 'password',
          placeholder: 'Password',
          name: 'password',
          value: formData.signIn.password,
        },
      ],
      buttonText: 'Sign In',
      forgotPasswordLink: { text: 'Forget Your Password?', href: '#' },
    },
  };

  return (
		<div className={classes.authPageWrapper}>
			<MainNavigation className={classes.mainNav} />
      <div className={classes.containerWrapper}>
        <div className={`${classes.container} ${active ? classes.active : ''}`}>
          <section
            className={`${classes.formContainer} ${
              active ? classes.signUp : classes.signIn
            }`}
          >
            <form onSubmit={handleSubmit}>
              <h1 className={currentForm}>{formConfig[currentForm].title}</h1>

              {/* Social Icons */}
              <div className={classes.socialIcons}>
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href='#'
                    className={classes.icon}
                    aria-label={social.ariaLabel}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                ))}
              </div>

              <span>{formConfig[currentForm].description}</span>

              {/* Input Fields */}
              {formConfig[currentForm].inputFields.map((field, index) => (
                <input
                  key={index}
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={field.value}
                  onChange={handleInputChange}
                  aria-label={field.placeholder}
                  required
                />
              ))}

              {/* Error Message */}
              {error && <span className={classes.error}>{error}</span>}

              {/* Forgot Password Link for Sign In */}
              {formConfig[currentForm].forgotPasswordLink && (
                <a
                  className={classes.forgotPasswordLink}
                  href={formConfig[currentForm].forgotPasswordLink.href}
                >
                  {formConfig[currentForm].forgotPasswordLink.text}
                </a>
              )}

              <button type='submit'>
                {formConfig[currentForm].buttonText}
              </button>
            </form>
          </section>

          {/* Toggle Between Sign Up and Sign In */}
          <section className={classes.toggleContainer}>
            <div className={classes.toggle}>
              <div className={`${classes.togglePanel} ${classes.toggleLeft}`}>
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all site features</p>
                <button
                  className={classes.hidden}
                  onClick={() => toggleForm(false)}
                  aria-label='Sign In'
                >
                  Sign In
                </button>
              </div>
              <div className={`${classes.togglePanel} ${classes.toggleRight}`}>
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all site features
                </p>
                <button
                  className={classes.hidden}
                  onClick={() => toggleForm(true)}
                  aria-label='Sign Up'
                >
                  Sign Up
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
