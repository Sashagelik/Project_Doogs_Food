import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import api from '../../utils/api';
import FormList from '../FormList/formList';
import s from '../Profile/styles.module.css';


const Profile = () => {
  const { user, setCurrentUser } = useContext(UserContext)

  const { register, handleSubmit } = useForm({ mode: 'onBlur' });
  const navigate = useNavigate()

  const changeAvatarHandler = async () => {
    await api.updateAvatar({ avatar: 'https://a.d-cd.net/LkAAAgOwfuA-960.jpg' })

  }

  const required = {
    required: {
      value: true
    }
  }

  const sendProfileData = async ({ name, about }) => {

    try {
      const newUser = await api.updateUserInfo({ name, about })
      setCurrentUser({ ...newUser })
      alert('Данные успешно изменены');
    } catch (error) {
      alert(error + 'Проверьте пожалуйста введенные данные')
    }
  }

  const sendDataAvatar = async ({ avatar }) => {
    try {
      const newUser = await api.updateAvatar({ avatar: avatar })
      setCurrentUser({ ...newUser })
      alert('Аватар успешно изменен')
    } catch (error) {
      alert(error + 'Проверьте пожалуйста введенные данные')
    }

  }

  return (
    <>
      <div className={s.profile} onClick={() => navigate(-1)}>{'<'}Назад</div>
      <div>
        <h1>
          Мои данные
        </h1>
      </div>
      {user && <FormList submitForm={handleSubmit(sendProfileData)}>
        <div className={s.profile__user}>
          <input {...register('name', required)} defaultValue={user.name} className={s.input} type='text' placeholder='name' />
          <input className={s.input} defaultValue={user.about} {...register('about', required)} placeholder='about' />
          <input className={s.input} defaultValue={user.email} disabled placeholder='email' />
          <input className={s.input} disabled value={user._id} placeholder='id' />
          <button type='sybmit' className={s.btn}>Отправить</button>
        </div>
      </FormList>}
      <FormList submitForm={handleSubmit(sendDataAvatar)}>
        <div className={s.avatar}>
          <img className={s.avatar__image} src={user.avatar} alt="avatar" />
          <input {...register('avatar')} defaultValue={user.avatar} className={s.input} placeholder='avatar' />
          <button onClick={changeAvatarHandler} className={s.btn}>Изменить аватар</button>
        </div>
      </FormList>
    </>
  )
}

export default Profile;