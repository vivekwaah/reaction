import React from 'react';

interface ButtonProps {
	disabled: boolean;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({ disabled, className }) => {
	return (
		<button
			type="submit"
			disabled={disabled}
			className={`${className} transition duration-200 ease-in-out`}
		>
			Submit
		</button>
	);
};

export default Button;
