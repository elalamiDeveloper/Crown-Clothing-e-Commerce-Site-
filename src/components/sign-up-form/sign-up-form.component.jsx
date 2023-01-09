import { useState } from 'react';

import './sign-up-form.styles.scss';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const SignUpForm = () => {
  const [inputFields, setInputFields] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { displayName, email, password, confirmPassword } = inputFields;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputFields((lastInputFields) => ({
      ...lastInputFields,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
    } catch (err) {
      console.log(err);
    }

    setInputFields({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account ?</h2>

      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Display Name"
          type="text"
          id="displayName"
          name="displayName"
          value={displayName}
          required
          onChange={onChangeHandler}
        />

        <FormInput
          label="Email"
          type="email"
          id="email"
          name="email"
          value={email}
          required
          onChange={onChangeHandler}
        />

        <FormInput
          label="Password"
          type="text"
          id="password"
          name="password"
          value={password}
          required
          onChange={onChangeHandler}
        />

        <FormInput
          label="Confirm Password"
          type="text"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          required
          onChange={onChangeHandler}
        />

        <Button type="submit" buttonType={'google'}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
