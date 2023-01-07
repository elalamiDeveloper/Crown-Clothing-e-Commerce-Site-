import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input {...otherProps} className="form-input" />
      <label
        htmlFor={otherProps.id}
        className={`${
          otherProps.value.length ? 'shrink' : ''
        } form-input-label`}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
