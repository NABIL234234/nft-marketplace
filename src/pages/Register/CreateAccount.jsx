import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { postUsers } from "../../store/actions/asyncAction";
import { NavLink, useNavigate } from "react-router-dom";
import Inputs from "../../components/inputs/Inputs";

// images
import SingUpImg from "../../assets/IMAGE/SECTION/SingUpImg.png";
import User from "../../assets/IMAGE/PLAY.SVG/nav/User.png";
import Email from "../../assets/IMAGE/PLAY.SVG/nav/email.svg";
import Password from "../../assets/IMAGE/PLAY.SVG/nav/LockKey.svg";
import { FaUser, FaUnlockAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    minLength,
  } = useForm();
  const [showPassword, setShowPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(
        postUsers({ newUser: data, navigate })
      );
      console.log("Данные с сервера:", resultAction.payload);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  return (
    <section className="mdd:flex gap-[15px] md:gap-[40px] lg:gap-[60px] xl:gap-[180px] font-mono">
      <div>
        <img src={SingUpImg} alt="SingUpImg" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center p-[15px]"
      >
        <div className="flex flex-col">
          <div className="text-white pt-[20px]">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              Create account
            </h3>
            <p className="max-w-[410px] mdd:max-w-[400px] pt-[10px] lgg:pt-[20px]">
              Welcome! enter your details and start creating, collecting and
              selling NFTs.
            </p>
          </div>
          <div className="flex flex-col gap-[10px] md:gap-[30px] pt-[15px] mdd:pt-[20px]">
            <div className="relative">
              <FaUser className="absolute top-[29%] left-[4%] z-10 text-xl" />
              <Inputs
                type="text"
                icons={User}
                placeholder="Username"
                name="username"
                {...register("username", {
                  required: "Введи имя пользователя",
                })}
              />

              {errors.username && (
                <span className="error absolute text-red-500 font-sans">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="relative">
              <MdEmail className="absolute top-[29%] left-[4%] z-10 text-xl" />
              <Inputs
                type="email"
                icons={Email}
                placeholder="Email address"
                name="email"
                {...register("email", { required: "Введи свой @email " })}
              />

              {errors.email && (
                <span className="error absolute text-red-500 font-sans">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="relative">
              <FaUnlockAlt className="absolute top-[29%] left-[4%] z-10 text-xl" />
              <Inputs
                type={showPassword ? "text" : "password"}
                icons={Password}
                placeholder="Password"
                name="password"
                {...register("password", {
                  required: "Придумай новый пароль",
                  minLength: {
                    value: 6,
                    message: "Пароль должен содержать как минимум 6 символа!",
                  },
                })}
              />
              <div className="absolute top-[-6%] left-[84%] mb:left-[75%]">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{
                    color: "black",
                    position: "absolute",
                    right: 10,
                    top: 10,
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
              {errors.password && (
                <span className="error absolute text-red-500 font-sans">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="relative">
              <FaUnlockAlt className="absolute top-[29%] left-[4%] z-10 text-xl" />
              <Inputs
                type={showPassword ? "text" : "password"}
                icons={Password}
                placeholder="Confirm Password"
                name="confirmPassword"
                {...register("confirmPassword", {
                  required: "Подтверди пароль",
                  validate: (value) =>
                    value === password || "Пароли не совпадают!",
                })}
              />
              {errors.confirmPassword && (
                <span className="error absolute text-red-500 font-sans">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <button
                type="submit"
                className="w-[150px] h-[40px] rounded-xl bg-purple-500 text-white"
              >
                Create account
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}