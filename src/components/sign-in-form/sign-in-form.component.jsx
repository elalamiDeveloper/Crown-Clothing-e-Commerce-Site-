import { useState } from 'react';

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const SignInForm = () => {
  const [inputFields, setInputFields] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputFields;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputFields((lastInputFields) => ({
      ...lastInputFields,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      setInputFields({
        email: '',
        password: '',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account ?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={onSubmitHandler}>
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

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={'google'}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
