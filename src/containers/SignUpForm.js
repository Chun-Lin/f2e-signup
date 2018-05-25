import React, { Component } from 'react'
import axios from '../axiosBaseURL'
import styled from 'styled-components'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'

class SignUpForm extends Component {
  state = {
    participantData: {},
    totalPeople: 0,
    success: false,
  }

  componentDidMount() {
    axios
      .post('/isSignUp', {
        email: 'wulin40063@gmail.com',
      })
      .then(response => {
        console.log(response)
        this.setState({
          participantData: response.data,
          success: response.data.success,
        })
      })
      .catch(error => {
        this.setState({
          message: error.data.message,
        })
      })

    axios
      .get('/signUpTotal')
      .then(response => {
        console.log(response)
        this.setState({ totalPeople: response.data.total })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render({ values, errors, touched, isSubmitting, handleChange, handleBlur }) {
    return (
      <div>
        <Form className="form">
          <input
            id="email"
            placeholder="Enter your email"
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.email && touched.email ? 'text-input error' : 'text-input'
            }
          />
          {errors.email &&
            touched.email && (
              <div className="input-feedback">{errors.email}</div>
            )}
          {touched.email &&
            errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          <button disabled={isSubmitting}>Submit</button>
        </Form>
        <span>參加人數：{this.state.totalPeople}</span>
        <p>{this.state.participantData.message}</p>
      </div>
    )
  }
}

const FormikSignUpForm = withFormik({
  mapPropsToValues({ email }) {
    return {
      email: email || '',
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Email not valid')
      .required('Email is required'),
  }),
  handleSubmit(values, { setErrors, resetForm, setSubmitting }) {
    setTimeout(() => {
      if (values.email === 'wulin40063@gmail.com') {
        setErrors({ email: 'The email has been taken!' })
      } else {
        resetForm()
      }
      setSubmitting(false)
    }, 2000)
  },
})(SignUpForm)

export default FormikSignUpForm
