import classes from './newsletter-registration.module.css';
import React,{useRef} from 'react'
function NewsletterRegistration() {
  const emailinputRef = useRef()
  function registrationHandler(event) {
    event.preventDefault();
    const enteredemail = emailinputRef.current.value
    fetch('/api/newslatter',{
      method:'POST',
      body:JSON.stringify({
        email:enteredemail
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((response) => {
       return response.json()
    }).then(result =>{
      console.log(result)
    })
    .catch((err) => {
      
    });
    
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailinputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
