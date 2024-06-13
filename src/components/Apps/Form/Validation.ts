export interface ValidationResult {
	field: string;
	errors: string[];
	hasError: boolean;
}

export const validateText = (text: string): ValidationResult => {
	let errors: string[] = [];
	let hasError = false;

	if (!text || text.trim() === "") {
		errors.push("Text area cannot be empty");
		hasError = true;
	}
	const numericRegex = /^[0-9]+$/;
	if (numericRegex.test(text)) {
		errors.push("Text area cannot contain only numbers");
		hasError = true;
	}

	return {
		field: 'text',
		errors,
		hasError,
	};
};

export const validateEmail = (email: string): ValidationResult => {
	let errors: string[] = [];
	let hasError = false;

	if (!email || email.trim() === "") {
		errors.push("Email cannot be empty");
		hasError = true;
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (email && !emailRegex.test(email)) {
		errors.push("Email format is invalid");
		hasError = true;
	}

	return {
		field: 'email',
		errors,
		hasError,
	};
};
