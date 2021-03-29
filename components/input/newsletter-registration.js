import classes from "./newsletter-registration.module.css";
import React, { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const emailinputRef = useRef();
  const notificationctx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    const enteredemail = emailinputRef.current.value;

    notificationctx.shownotification({
      title: "sign up",
      message: "Registering for newsletter",
      status: "pending",
    });

    fetch("/api/newslatter", {
      method: "POST",
      body: JSON.stringify({
        email: enteredemail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "somethink went wrong!");
        });
      })
      .then((result) => {
        notificationctx.shownotification({
          title: "Succes",
          message: "Succesfully registered for newsletter",
          status: "success",
        });
      })
      .catch((err) => {
        notificationctx.shownotification({
          title: "error",
          message: err.message || "somethink went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailinputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
