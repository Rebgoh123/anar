import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    renderTextField(field){
        return (
            <div className="form-group has-danger">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                    />
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values){
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                  label="Title"
                  name="title"
                  component={this.renderTextField}
                  />
              <Field
                  label="Categories"
                  name="categories"
                  component={this.renderTextField}
              />

              <Field
                  label="Post Content"
                  name="content"
                  component={this.renderTextField}
              />

              <button type="submit" className="btn btn-primary"> Submit </button>
              <Link className="btn btn-danger" to="/">
                  Cancel
              </Link>
          </form>
        )
    }
}

function validate(values){
    const errors = {};

    //validate the inputs from 'values'
    if (!values.title){
        errors.title = "Enter a title!";
    }

    //if errors is empty, the form is fine to submit
    //if errors has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null,{ createPost})(PostsNew)
);