export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export interface ContactService {
  validateForm: (data: ContactFormData) => ContactResponse;
  submitForm: (data: ContactFormData) => Promise<ContactResponse>;
  sendEmail: (data: ContactFormData) => Promise<ContactResponse>;
}

class ContactServiceImpl implements ContactService {
  validateForm(data: ContactFormData): ContactResponse {
    const errors: Record<string, string> = {};

    // Validate name
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Validate email
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!this.isValidEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate message
    if (!data.message.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    // Validate phone (optional)
    if (data.phone && !this.isValidPhone(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Please fix the errors below',
        errors
      };
    }

    return {
      success: true,
      message: 'Form is valid'
    };
  }

  async submitForm(data: ContactFormData): Promise<ContactResponse> {
    // First validate the form
    const validation = this.validateForm(data);
    if (!validation.success) {
      return validation;
    }

    try {
      // In a real application, this would send to your backend
      // For now, we'll simulate a successful submission
      const response = await this.sendEmail(data);
      
      if (response.success) {
        return {
          success: true,
          message: 'Thank you for your message! We\'ll get back to you soon.'
        };
      }
      
      return response;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again.'
      };
    }
  }

  async sendEmail(data: ContactFormData): Promise<ContactResponse> {
    try {
      // In a real application, this would integrate with your email service
      // (SendGrid, Mailgun, AWS SES, etc.)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success (in real app, check actual response)
      return {
        success: true,
        message: 'Email sent successfully'
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: 'Failed to send email'
      };
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    // Basic phone validation - allows various formats
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  // Utility method to format contact data for logging/display
  formatContactData(data: ContactFormData): string {
    return `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
Message: ${data.message}
    `.trim();
  }
}

// Singleton instance
export const contactService = new ContactServiceImpl(); 