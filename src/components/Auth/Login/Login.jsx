import FormList from "../../FormList/formList";
import { useForm } from "react-hook-form";
import s from './styles.module.css';
import { useEffect, useState } from "react";
import openEye from "./img/eye-open-svgrepo-com.svg";
import closeEye from "./img/eye-close-svgrepo-com.svg";
import BaseButton from "../../BaseButton/BaseButton";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { pattern } from "../../../utils/validation";
import authApi from "../../../utils/authApi";

const Login = ({ setActiveModal }) => {

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
  const [type, setType] = useState(false)


  useEffect(() => {
    setActiveModal(true)
  }, [setActiveModal])

  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    navigate('/register')
  }

  const sendData = async (dataUser) => {
    try {
      const res = await authApi.login(dataUser);
      localStorage.setItem('token', res.token)
      navigate('/')
    } catch (error) {
      alert("Неправильный логин и пароль", error)
    }
  }

  const emailRegister = register("email", { required: 'Введите email' })

  const passwordRegister = register("password", {
    required: 'Введите пароль',
    pattern
  })

  return (
    <FormList submitForm={handleSubmit(sendData)} title='Вход'>
      <div className={s.auth}>
        <input className={s.input} type="text" placeholder="Email" {...emailRegister} />
        <input className={s.input} type={type ? 'text' : 'password'} placeholder="Password" {...passwordRegister} />
        <span onClick={() => setType(!type)} className={s.eye}>{type
          ? <img src={openEye} alt="openEye" />
          : <img src={closeEye} alt="closeEye" />}</span>
        {errors?.password && <span className={s.error} >{errors.password?.message}</span>}
        <span className={s.authInfo} onClick={() => navigate('/resetPassword')}>Восстановить пароль</span>
        <BaseButton type="submit" color='yellow'>Войти</BaseButton>
        <BaseButton onClick={handleClick} color='white'>Регистрация</BaseButton>
      </div>
    </FormList>
  )
}

export default Login;