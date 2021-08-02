const messages = {
  error: {
    onError: 'На сервере произошла ошибка',
  },
  card: {
    isValid: 'Введите корректные данные',
    isLinkValid: 'Некорректная ссылка',
    id: {
      cardNotFound: 'Нет файла с таким id',
      userNotFound: 'Id пользователя не совпадает с владельцем файла',
    },
    onDelete: 'Карточка удалена',
  },

  user: {
    isValid: 'Введите корректные данные',
    allFilled: 'Не передан email или пароль',
    isEmailValid: 'Некорректный email',
    password: 'Некорректный пароль',
    id: {
      userNotFound: 'Нет пользователя с таким id',
    },
    sameData: 'Пользователь с переданным email уже существует',
  },

  login: {
    notLogged: 'Необходима авторизация',
    isValid: 'Неправильные почта или пароль',
    onSuccess: 'Вход успешно выполнен',
  },
  logout: {
    onLogout: 'Выход успешно выполнен',
  },

  route: {
    isExist: 'Запрашиваемый ресурс не найден',
  },
};

module.exports = messages;
