    // Function to get browser information
  function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    const browserName = getBrowserName(userAgent);
    const browserVersion = getBrowserVersion(userAgent);
    const os = getOperatingSystem(userAgent);
    const osVersion = getOperatingSystemVersion(userAgent);
    const deviceType = getDeviceType();
    const language = navigator.language || navigator.userLanguage;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    return {
      browser_name: browserName,
      browser_version: browserVersion,
      operating_system: os,
      operating_system_version: osVersion,
      device_type: deviceType,
      language: language,
      timezone: timezone
    };
  }
  
  // Function to get browser name
  function getBrowserName(userAgent) {
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('OPR') || userAgent.includes('Opera')) return 'Opera';
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Safari')) return 'Safari';
    return 'Unknown';
  }
  
  // Function to get browser version
  function getBrowserVersion(userAgent) {
    const browsers = {
      'Chrome': /Chrome\/(\d+)/,
      'Firefox': /Firefox\/(\d+)/,
      'Safari': /Version\/(\d+)/,
      'Edge': /Edge\/(\d+)/,
      'Opera': /Opera\/(\d+)/
    };
    
    for (const [browser, regex] of Object.entries(browsers)) {
      const match = userAgent.match(regex);
      if (match) return match[1];
    }
    return 'Unknown';
  }
  
  // Function to get operating system
  function getOperatingSystem(userAgent) {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'MacOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
    return 'Unknown';
  }
  
  // Function to get operating system version
  function getOperatingSystemVersion(userAgent) {
    if (userAgent.includes('Windows NT 10')) return '10';
    if (userAgent.includes('Windows NT 6.3')) return '8.1';
    if (userAgent.includes('Windows NT 6.2')) return '8';
    if (userAgent.includes('Windows NT 6.1')) return '7';
    if (userAgent.includes('Mac OS X')) {
      const match = userAgent.match(/Mac OS X (\d+_\d+)/);
      return match ? match[1].replace('_', '.') : 'Unknown';
    }
    if (userAgent.includes('Android')) {
      const match = userAgent.match(/Android (\d+\.\d+)/);
      return match ? match[1] : 'Unknown';
    }
    return 'Unknown';
  }
  
  // Function to get device type
  function getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return 'mobile';
    }
    if (/Tablet|iPad/i.test(userAgent)) {
      return 'tablet';
    }
    return 'desktop';
  }
  
  // Function to get screen resolution
  function getScreenResolution() {
    return `${screen.width}x${screen.height}`;
  }
  
  // Function to get IP address (requires server-side API)
  function getIPAddress() {
    // This would typically be obtained server-side for privacy reasons
    // You can implement this with a service like ipify.org
    return null; // Placeholder - implement server-side solution
  }
  
  // Function to generate session ID
  function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  // Function to get current URL
  function getCurrentURL() {
    return window.location.href;
  }
  
  // Function to get referrer URL
  function getReferrerURL() {
    return document.referrer || null;
  }


document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  // Handle form submission
  contactForm.addEventListener('submit', async function(e) {
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
    if (honeytrap2 !== '0') {
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

  let contactData = prepareData( name, email, phone, subject, message);

	if ( contactData ){
  
    // Send data to server
    try {
      const response = await fetch('http://nufire.ca/contact/submit-contact-form.php', {
        method: 'POST',
		mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact_data: contactData,
          name: name,
          email: email,
		  phone: phone,
          subject: subject,
          message: message
        })
      });
      
	  const data = await response.json(); // 👈 THIS is key

      if (response.ok) {
        alert('Message sent successfully! We will contact you soon.');
		//console.log(response)
        contactForm.reset();
        return true;
      } else {
		// console.log(data);            // see full response
		console.log(data.errors);      // if your PHP sends { error: "..." }
		throw new Error(data.errors.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
	  console.log(error);
      alert('There was an error sending your message. '+error+'. Please try again.');
      return false;
    }

		// alert('Message sent successfully! We will contact you soon.');
		// Reset form
    	// contactForm.reset();
	} else {
		alert('Message failed successfully! Please Try Again.');
	}
    
    // In a real application, you would send the data to your server here
    // For demonstration, we'll just show an alert
  });

  function prepareData(name, email, phone, subject, message){
		// console.log(name + email + phone + subject + message);

        // Simple validation
    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return flase;
    }
  
    // Get browser data
    const browserInfo = getBrowserInfo();
    const screenResolution = getScreenResolution();
    const ip_address = getIPAddress();
    const referrer_url = getReferrerURL();
    const landing_page_url = getCurrentURL();
    const session_id = localStorage.getItem('contact_form_session_id'); //generateSessionId();
    
    // Prepare data for submission
    const contactData = {
      contact_message_id: 0, // This will be set by your server
      ip_address: ip_address,
      user_agent: navigator.userAgent,
      ...browserInfo,
      screen_resolution: screenResolution,
      referrer_url: referrer_url,
      landing_page_url: landing_page_url,
      session_id: session_id
    };

    // console.log( contactData );
    
    return contactData;

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