import { useForm } from "react-hook-form";
import BaseButton from "../../BaseButton/BaseButton";
import FormList from "../../FormList/formList";
import s from '../../Auth/Register/styles.module.css';
import openEye from "../Register/img/eye-open-svgrepo-com.svg";
import closeEye from "../Register/img/eye-close-svgrepo-com.svg";
import { useEffect, useState } from "react";
import { pattern } from "../../../utils/validation";
import { useNavigate } from "react-router-dom";
import authApi from "../../../utils/authApi";

const Register = ({ setActiveModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
  const [type, setType] = useState(false)

  const navigate = useNavigate()


  useEffect(() => {
    setActiveModal(true)
  }, [setActiveModal])

  const handleClick = (e) => {
    e.preventDefault()
    navigate('/login')
    console.log(e);
  }

  const sendData = async (data) => {
    try {
      await authApi.registerUser({ ...data, group: "group-10" })
      navigate('/login')
    } catch (error) {
      alert(error)
    }

  }

  const emailRegister = register("email", { required: 'Введите email' })

  const passwordRegister = register("password", {
    required: 'Введите пароль',
    pattern,
  })


  return (
    <>
      <FormList submitForm={handleSubmit(sendData)} title='Регистрация'>
        <div className={s.auth}>
          <input className={s.input} type="text" placeholder="Email" {...emailRegister} />
          <input className={s.input} type={type ? 'text' : 'password'} placeholder="Password" {...passwordRegister} />
          <span onClick={() => setType(!type)} className={s.eye}>{type
            ? <img src={openEye} alt="openEye" />
            : <img src={closeEye} alt="closeEye" />}</span>
          {errors?.password && <span className={s.error} >{errors.password?.message}</span>}
          <span className={s.authInfo}>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой
            конфиденциальности и соглашаетесь на информационную рассылку.</span>
          <BaseButton type="submit" color='yellow'>Зарегистрироваться</BaseButton>
          <BaseButton onClick={handleClick} color='white'>Войти</BaseButton>
        </div>
      </FormList>
    </>

  )
}

export default Register;