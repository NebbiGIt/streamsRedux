import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
	renderInput({ input, label, meta }) {
		console.log(meta);

		const renderError = ({ error, touched }) => {
			if (touched && error) {
				return (
					<div className="ui error message">
						<div className="header">{error}</div>
					</div>
				);
			}
		};
		return (
			<div className={meta.error && meta.touched ? 'field error' : 'field'}>
				<label>{label}</label>
				<input {...input} />
				{/* <div className="ui error message">{meta.error}</div> */}
				{renderError(meta)}
			</div>
		);
	}

	onSubmit = formValues => {
		// console.log(formValues);
		this.props.onSubmit(formValues);
	};

	render() {
		// console.log(this.props);
		return (
			<form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Field name="title" component={this.renderInput} label="Enter Title" />
				<Field name="description" component={this.renderInput} label="Enter Description" />
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

const validate = formValues => {
	const errors = {};
	if (!formValues.title) {
		// only ran if the user didn't run a title
		errors.title = 'You must enter a title!';
	}

	if (!formValues.description) {
		errors.description = 'You must enter a description!';
	}

	return errors;
};

export default reduxForm({
	form: 'streamForm',
	validate
})(StreamForm);
