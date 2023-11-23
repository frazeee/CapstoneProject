import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    toEmail: '',
    fromName: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: formData.toEmail,
      from_name: formData.fromName,
      message: formData.message,
    };

    emailjs.send('service_8r6eaxe', 'template_z1bvfv4', templateParams, '-fD_Lzps7ypbyVDAa')
      .then((response) => {
        console.log('Email sent successfully:', response);
        // You can update state or show a success message to the user here
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        // Handle errors and show an error message to the user
      });
  };

  return (
    <div>
      <h1>Email Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          To Email:
          <input
            type="email"
            name="toEmail"
            value={formData.toEmail}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Your Name:
          <input
            type="text"
            name="fromName"
            value={formData.fromName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default EmailForm;
