import React from "react";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchRegister } from "../../redux/slices/auth";
import Header from "../../components/Header/Header";

export default function Register() {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("Не удалось зарегистрироваться");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/me" />;
  }
  return (
    <div>
      <Header />
      <div className="text-center mt-5">
        <main className="form-signin w-100 m-auto">
          <form onSubmit={handleSubmit(onSubmit)} method="post">
            <div className="form-floating">
              <input
                type="text"
                className="form-control mb-3 fs-3"
                placeholder="Nick"
                id="floatingNickName"
                error={Boolean(errors.nickName?.message)}
                helperText={errors.nickName?.message}
                {...register("nickName", { required: "Укажите ник" })}
              />
              <label for="floatingNickName">NickName</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control mb-3 fs-3"
                placeholder="Email"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register("email", { required: "Укажите почту" })}
              />
              <label for="floatingEmail">Email</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control fs-3"
                placeholder="Пароль"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register("password", { required: "Введите пароль" })}
              />
              <label for="floatingPassword">Пароль</label>
            </div>

            <button
              disabled={!isValid}
              className="w-100 btn btn-lg btn-primary mt-3"
              type="submit"
            >
              Зарегистрироваться
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
