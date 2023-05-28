import React from "react";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import "./Login.css";

export default function Login() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться!");
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
                type="email"
                className="form-control mb-3 fs-3"
                placeholder="Email"
                id="floatingInput"
                error={errors.email?.message}
                helperText={errors.email?.message}
                {...register("email", { required: "Укажите почту" })}
              />
              <label for="floatingInput">Email</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control fs-3"
                placeholder="Пароль"
                id="floatingPassword"
                error={errors.password?.message}
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
              Войти
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
