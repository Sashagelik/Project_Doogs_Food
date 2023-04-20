import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authApi from "../../../utils/authApi";
import { pattern } from "../../../utils/validation";
import BaseButton from "../../BaseButton/BaseButton";
import FormList from "../../FormList/formList";
import s from '../ResetPassword/styles.module.css';


const ResetPassword = ({ setActiveModal }) => {
  const [tokenResp, setTokenResp] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

  const emailRegister = register("email", { required: 'Введите email' })
  const navigate = useNavigate()

  useEffect(() => {
    setActiveModal(true)
  }, [setActiveModal])

  const sendData = async (data) => {

    if (!tokenResp) {
      try {
        const res = await authApi.resetPass(data)
        setTokenResp(true)
      } catch (error) {
        alert('Постарайтесь вспомнить пароль')
      }
    } else {
      try {
        const res = await authApi.changePass(data.token, { password: data.password })
        navigate('/')
        localStorage.setItem('token', res.token)
      } catch (error) {
        alert('Постарайтесь вспомнить пароль')
      }
    }
  }


  const passwordRegister = register("password", {
    required: tokenResp ? 'Пароль обязателен' : false,
    pattern: pattern,
  })


  return (
    <>
      <FormList submitForm={handleSubmit(sendData)} title='Восстановление пароля'>
        <div className={s.auth}>
          <a href="#" className={s.button} onClick={() => navigate(-1)} type="submit" color='white'>Назад</a>
          <span className={s.authInfo}>Для получения временного пароля необходимо ввести email, указанный при регистрации.</span>
          <input className={s.input} type="text" placeholder="Email" {...emailRegister} />
          {tokenResp && <>
            {errors?.email && <span className={s.error} >{errors.email?.message}</span>}
            <input className={s.input} type='password' placeholder="Password" {...passwordRegister} disabled={!tokenResp} />
            {errors?.password && <span className={s.error} >{errors.password?.message}</span>}
            <input className={s.input} type='text' placeholder="Token" {...register('token', { required: tokenResp ? 'Token обязателен' : false })} disabled={!tokenResp} />
            <span className={s.authInfo}>Срок действия временного пароля 24 ч.</span>
          </>}
          <BaseButton type="submit" color='yellow'>Отправить</BaseButton>
        </div>
      </FormList>
    </>
  )

}
export default ResetPassword;