document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  // Handle form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Check honeypot field
    const honeytrap = document.getElementById('honeytype').value;
    if (honeytrap !== '') {
      // Bot detected - silently ignore
      return;
    }
    const honeytrap2 = document.getElementById('id').value;
    if (honeytrap !== '0') {
      // Bot detected - silently ignore
      return;
    }


    // Get values from form
    const name = formData.get('name');
    const email = formData.get('email');
	const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

	// phone validation
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid Phone Number.');
      return;
    }

	if (submitData( name, email, phone, subject, message) ){
		alert('Message sent successfully! We will contact you soon.');
		
		// Reset form
    	contactForm.reset();
	} else {
		alert('Message failed successfully! Please Try Again.');
	}
    
    // In a real application, you would send the data to your server here
    // For demonstration, we'll just show an alert
  });

  function submitData(name, email, phone, subject, message){
		alert(name + email + phone + subject + message);
		return false;
  }
  
  // Input focus effects
  const inputs = document.querySelectorAll('.hk-input-group input, .hk-input-group textarea');
  
  inputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    // Remove focus effect
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      
      // If input is empty, remove the "active" class
      if (this.value === '') {
        this.parentElement.classList.remove('active');
      }
    });
    
    // Add active class when input has value
    input.addEventListener('input', function() {
      if (this.value !== '') {
        this.parentElement.classList.add('active');
      } else {
        this.parentElement.classList.remove('active');
      }
    });
  });

    
  // Set initial session ID
  if (!localStorage.getItem('contact_form_session_id')) {
    localStorage.setItem('contact_form_session_id', generateSessionId());
  }
});