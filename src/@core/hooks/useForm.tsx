import { useState, useEffect } from 'react';

const useForm = (callback: any, validate: any, formData?: any) => {
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmitEdit = (event: any) => {
    if (event) event.preventDefault();
    if (Object.keys(values).length > 0) {
      setErrors(validate(Object.assign({}, formData, values)));
      setIsSubmitting(true);
    } else {
      setErrors(validate(formData));
      setIsSubmitting(true);
    }
  };

  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();
    setErrors(validate(Object.assign({}, formData, values)));
    setIsSubmitting(true);
  };

  const handleChange = (event: any) => {
    // event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const onCancel = () => {
    setIsSubmitting(false);
    setErrors({});
    setValues({});
  }

  return {
    handleChange,
    handleSubmit,
    handleSubmitEdit,
    values,
    errors,
    onCancel,
  };
};

export default useForm;
