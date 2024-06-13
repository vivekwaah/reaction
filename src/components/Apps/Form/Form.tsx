import React, { useState } from 'react';
import Button from './FormElements/Button';
import { validateText, validateEmail, ValidationResult } from './Validation';

interface FormValues {
	text: string;
	email: string;
}

type FormField = keyof FormValues;

const Form: React.FC = () => {
	const [values, setValues] = useState<FormValues>({ text: '', email: '' });
	const [errors, setErrors] = useState<{ [key in FormField]?: string[] }>({});
	const [hasError, setHasError] = useState<boolean>(true);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		const newValues = { ...values, [name]: value };
		setValues(newValues);

		validateField(name as FormField, value);
	};

	const validateField = (name: FormField, value: string): ValidationResult => {
		let validationResult: ValidationResult;
		switch (name) {
			case 'text':
				validationResult = validateText(value);
				break;
			case 'email':
				validationResult = validateEmail(value);
				break;
			default:
				validationResult = { field: name, errors: [], hasError: false };
				break;
		}

		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: validationResult.errors,
		}));
		setHasError(validationResult.hasError);
		return validationResult;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let newErrors: { [key in FormField]?: string[] } = {};
		let hasAnyError = false;

		Object.keys(values).forEach((field: FormField) => {
			const value = values[field];
			const validationResult = validateField(field, value);
			newErrors[field] = validationResult.errors;
			if (validationResult.hasError) {
				hasAnyError = true;
			}
		});

		setErrors(newErrors);
		setHasError(hasAnyError);

		if (!hasAnyError) {
			console.log('Form submitted', values);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		validateField(name as FormField, value);
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
			<div className="mb-4">
				<textarea
					name="text"
					value={values.text}
					onChange={handleChange}
					onBlur={handleBlur}
					className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Enter your text here"
				/>
				{errors.text && (
					<ul className="mt-2 text-red-600">
						{errors.text.map((error, index) => (
							<li key={index}>
								{error}
							</li>
						))}
					</ul>
				)}
			</div>
			<div className="mb-4">
				<input
					type="text"
					name="email"
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
					className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Enter your email"
				/>
				{errors.email && (
					<ul className="mt-2 text-red-600">
						{errors.email.map((error, index) => (
							<li key={index}>
								{error}
							</li>
						))}
					</ul>
				)}
			</div>
			<Button disabled={hasError} className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400" />
		</form>
	);
};

export default Form;
