'use client';

import { useState } from 'react';
import { contactService, ContactFormData, ContactResponse } from '../services/contactService';

export interface ContactFormState {
  data: ContactFormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  response: ContactResponse | null;
}

export interface ContactFormActions {
  updateField: (field: keyof ContactFormData, value: string) => void;
  validateField: (field: keyof ContactFormData) => void;
  validateForm: () => boolean;
  submitForm: () => Promise<boolean>;
  resetForm: () => void;
  clearErrors: () => void;
}

export function useContactForm(initialData?: Partial<ContactFormData>) {
  const [state, setState] = useState<ContactFormState>({
    data: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      message: initialData?.message || '',
      company: initialData?.company || '',
      phone: initialData?.phone || '',
    },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
    response: null,
  });

  const updateField = (field: keyof ContactFormData, value: string) => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value,
      },
      // Clear error for this field when user starts typing
      errors: {
        ...prev.errors,
        [field]: '',
      },
    }));
  };

  const validateField = (field: keyof ContactFormData) => {
    const fieldData = { [field]: state.data[field] } as unknown as ContactFormData;
    const validation = contactService.validateForm(fieldData);
    
    if (!validation.success && validation.errors) {
      setState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [field]: validation.errors?.[field] || '',
        },
      }));
    }
  };

  const validateForm = (): boolean => {
    const validation = contactService.validateForm(state.data);
    
    if (!validation.success) {
      setState(prev => ({
        ...prev,
        errors: validation.errors || {},
      }));
      return false;
    }

    setState(prev => ({
      ...prev,
      errors: {},
    }));
    return true;
  };

  const submitForm = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false;
    }

    setState(prev => ({
      ...prev,
      isSubmitting: true,
      response: null,
    }));

    try {
      const response = await contactService.submitForm(state.data);
      
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: response.success,
        response,
      }));

      return response.success;
    } catch (error) {
      console.error('Error submitting form:', error);
      
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        response: {
          success: false,
          message: 'An unexpected error occurred. Please try again.',
        },
      }));

      return false;
    }
  };

  const resetForm = () => {
    setState({
      data: {
        name: '',
        email: '',
        message: '',
        company: '',
        phone: '',
      },
      errors: {},
      isSubmitting: false,
      isSubmitted: false,
      response: null,
    });
  };

  const clearErrors = () => {
    setState(prev => ({
      ...prev,
      errors: {},
      response: null,
    }));
  };

  const actions: ContactFormActions = {
    updateField,
    validateField,
    validateForm,
    submitForm,
    resetForm,
    clearErrors,
  };

  return {
    ...state,
    ...actions,
  };
}

// Utility hook for form field with validation
export function useFormField<T extends string>(
  initialValue: T,
  validator?: (value: T) => string | null
) {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string>('');
  const [isTouched, setIsTouched] = useState(false);

  const updateValue = (newValue: T) => {
    setValue(newValue);
    setError('');
    
    if (isTouched && validator) {
      const validationError = validator(newValue);
      if (validationError) {
        setError(validationError);
      }
    }
  };

  const validate = () => {
    if (!validator) return true;
    
    const validationError = validator(value);
    if (validationError) {
      setError(validationError);
      return false;
    }
    
    setError('');
    return true;
  };

  const handleBlur = () => {
    setIsTouched(true);
    validate();
  };

  return {
    value,
    error,
    isTouched,
    updateValue,
    validate,
    handleBlur,
  };
} 