import s from '../FormList/styles.module.css';
import { useForm } from "react-hook-form";
import { useState } from 'react';



function RegistrationForm({ sendData }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [type, setType] = useState(false)

  const onSubmit = (data) => {
    sendData(data)
    console.log(data);
  }

  return (
    <div className={s.wrapperForm}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <h2 className={s.title}>Registration</h2>
        <input className={s.input} type="text" placeholder="Name" {...register("name", {
          required: {
            value: true,
            message: 'The field is required'
          }, maxLength: {
            value: 20, message: 'At least 20 characters'
          }
        })} />
        {errors?.name && <span className={s.error} >{errors.name?.message}</span>}
        <input className={s.input} type="text" placeholder="Email" {...register("email")} />

        <div className={s.form__eye}>
          <input className={s.input} type={type ? 'text' : 'password'} placeholder="Password" {...register("password", {
            required: 'Enter the password',
            pattern: {
              value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              message: 'The password must contain more than 8 characters, one number and one special character'
            }
          })} />
          <span onClick={() => setType(!type)} className={s.eye}></span>
          {errors?.password && <span className={s.error} >{errors.password?.message}</span>}
        </div>
        <button type='submit' className="btn">Register</button>
      </form>
    </div>
  )
}

export default RegistrationForm;


/*пароль RRR!kju56565*/

/*емайл qwerty@trost12.com*/

/*UserNew*/