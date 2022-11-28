import classnames from "classnames"
import type { FC } from "react"
import { useState } from "react"

import { TUCMC } from "@/components/logo/TUCMC"

const Scissors = ({ ...restProps }) => {
  return (
    <svg
      viewBox="0 0 31 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.27501 0.100098C3.31236 0.100098 0.100006 3.31245 0.100006 7.2751C0.100006 11.2377 3.31236 14.4501 7.27501 14.4501C8.51066 14.4501 9.67336 14.1377 10.6885 13.5877L13.6009 16.5002L10.6886 19.4126C9.67344 18.8625 8.5107 18.5501 7.27501 18.5501C3.31236 18.5501 0.100006 21.7625 0.100006 25.7251C0.100006 29.6877 3.31236 32.9001 7.27501 32.9001C11.2376 32.9001 14.45 29.6877 14.45 25.7251C14.45 24.4895 14.1377 23.3268 13.5876 22.3117L30.2497 5.64967C31.0503 4.84909 31.0503 3.5511 30.2497 2.75053C29.4492 1.94995 28.1512 1.94995 27.3506 2.75053L16.5001 13.601L13.5876 10.6885C14.1377 9.67345 14.45 8.51075 14.45 7.2751C14.45 3.31245 11.2376 0.100098 7.27501 0.100098ZM4.20001 7.2751C4.20001 5.57682 5.57673 4.2001 7.27501 4.2001C8.97328 4.2001 10.35 5.57682 10.35 7.2751C10.35 8.97337 8.97328 10.3501 7.27501 10.3501C5.57673 10.3501 4.20001 8.97337 4.20001 7.2751ZM4.20001 25.7251C4.20001 24.0268 5.57673 22.6501 7.27501 22.6501C8.97328 22.6501 10.35 24.0268 10.35 25.7251C10.35 27.4234 8.97328 28.8001 7.27501 28.8001C5.57673 28.8001 4.20001 27.4234 4.20001 25.7251Z"
        fill="currentColor"
      />
      <path
        d="M22.2983 19.3992C21.4977 18.5987 20.1997 18.5987 19.3991 19.3992C18.5986 20.1998 18.5986 21.4978 19.3991 22.2984L27.3504 30.2497C28.151 31.0502 29.449 31.0502 30.2496 30.2497C31.0501 29.4491 31.0501 28.1511 30.2496 27.3505L22.2983 19.3992Z"
        fill="currentColor"
      />
    </svg>
  )
}

const Copy = ({ ...restProps }) => {
  return (
    <svg
      viewBox="0 0 31 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M9 8.375V21.375C9 23.1699 10.4551 24.625 12.25 24.625H22M9 8.375V5.125C9 3.33007 10.4551 1.875 12.25 1.875H19.7019C20.1329 1.875 20.5462 2.0462 20.851 2.35095L28.024 9.52405C28.3288 9.8288 28.5 10.2421 28.5 10.6731V21.375C28.5 23.1699 27.0449 24.625 25.25 24.625H22M9 8.375H5.75C3.95507 8.375 2.5 9.83007 2.5 11.625V27.875C2.5 29.6699 3.95507 31.125 5.75 31.125H18.75C20.5449 31.125 22 29.6699 22 27.875V24.625"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const Back = ({ ...restProps }) => {
  return (
    <svg
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M1.25 5.5H8.75C12.0637 5.5 14.75 8.18629 14.75 11.5V13M1.25 5.5L5.75 10M1.25 5.5L5.75 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const URLBox: FC<{ onSubmit: () => any; shortened?: string | null }> = ({
  onSubmit,
  shortened
}) => {
  return (
    <div className="relative w-full min-w-[320px] sm:min-w-[540px]">
      <input
        placeholder={"https://example.com"}
        className={classnames(
          "w-full rounded-2xl border px-6 py-3.5 font-light shadow-md transition-colors delay-[10ms] sm:py-4 sm:text-xl",
          shortened
            ? "border-malt-100 bg-lapis-600 placeholder:text-malt-100"
            : "border-lapis-600 bg-malt-200 placeholder:text-lapis-600"
        )}
      />
      <div
        className={classnames(
          "absolute right-0 top-0 flex h-full pr-6",
          shortened ? "text-malt-100" : "text-lapis-600"
        )}
      >
        {shortened ? (
          <Copy className="w-[18px] cursor-pointer sm:w-[26px]" />
        ) : (
          <Scissors
            className="w-[18px] cursor-pointer sm:w-[26px]"
            onClick={onSubmit}
          />
        )}
      </div>
    </div>
  )
}

const LoginButton = ({ ...restProps }) => {
  return (
    <button
      className="ml-0 w-full max-w-[342px] rounded-xl bg-lapis-600 py-[8px]
             text-[18px] font-semibold text-malt-200 shadow-md sm:ml-20 sm:w-[416px] sm:max-w-[unset] sm:text-[24px]"
      {...restProps}
    >
      Login with TUCMC
    </button>
  )
}

const DefaultDescription = () => {
  return (
    <p className="ml-3 text-[12.4px] font-light italic sm:ml-4 sm:text-[20px]">
      a tool that converts your link to the format{" "}
      <span className="font-medium">https://tucm.cc</span>{" "}
      <br className="hidden md:block" />, click below to log in
    </p>
  )
}

const IdleDescription = () => {
  return (
    <div className="flex items-center">
      <p className="ml-3 text-[12.4px] font-light italic sm:ml-4 sm:text-[20px]">
        paste your link here
        <br className="hidden md:block" />
        <span className="flex items-center">
          <span>and click</span>{" "}
          <Scissors className="mx-2 h-[0.8rem] w-[0.8rem] sm:mx-3 sm:h-[1.2rem] sm:w-[1.2rem]" />
          <span>to shorten your link</span>
        </span>
      </p>
    </div>
  )
}

const ShortenedDescription = () => {
  return (
    <div className="flex items-center">
      <p className="ml-3 text-[12.4px] font-light italic sm:ml-4 sm:text-[20px]">
        your link has been shortened !
        <br className="hidden md:block" />
        <span className="flex items-center">
          <span>click</span>{" "}
          <Copy className="mx-2 h-[0.8rem] w-[0.8rem] sm:mx-3 sm:h-[1.2rem] sm:w-[1.2rem]" />
          <span>to copy</span>
        </span>
      </p>
    </div>
  )
}

const Index = () => {
  const [section, setSection] = useState("main")
  const [shortened, setShortened] = useState<string | null>(null)

  const shrink = () => {
    setShortened("mows")
    setSection("shortened")
  }

  const clear = () => {
    setShortened(null)
    setSection("idle")
  }

  return (
    <div
      className={classnames(
        "font-plus-jakarta-sans relative flex min-h-screen w-full flex-col justify-center transition-colors",
        shortened ? "bg-lapis-600" : "bg-malt-200"
      )}
    >
      <div className="relative flex w-full flex-col items-center justify-center px-6 sm:min-h-[600px]">
        <div
          className={classnames(
            "max-w-[342px] sm:max-w-[unset]",
            section === "main" ? "sm:ml-14 md:ml-24" : "sm:ml-14 md:ml-9"
          )}
        >
          <div className="mx-auto">
            <div
              className={classnames(
                shortened ? "text-malt-100" : "text-lapis-600"
              )}
            >
              <h1 className="font-antonio text-[60px] leading-[52px] sm:text-[84px] sm:leading-[72px]">
                URL
              </h1>
              <h2 className="text-[45.7px] font-bold leading-[40px] sm:text-[64px] sm:leading-[56px]">
                Shortener
              </h2>
            </div>
            <div
              className={classnames(
                "mt-2 flex items-center",
                shortened ? "text-malt-100" : "text-lapis-600"
              )}
            >
              <span className="ml-14 text-[38px] font-extralight sm:ml-20 sm:text-[64px]">
                /
              </span>
              {section === "main" && <DefaultDescription />}
              {section === "idle" && <IdleDescription />}
              {section === "shortened" && <ShortenedDescription />}
            </div>
          </div>
          <div className="mb-5 flex h-[6rem] flex-col items-center justify-center sm:h-[7rem] sm:items-start">
            {section === "main" && (
              <LoginButton
                onClick={() => {
                  setSection("idle")
                }}
              />
            )}
            {section !== "main" && (
              <URLBox onSubmit={shrink} shortened={shortened} />
            )}
          </div>
        </div>
        <div
          className={classnames(
            "absolute -bottom-3 max-w-[342px] sm:bottom-24 sm:max-w-[unset]",
            section === "main" ? "sm:ml-14 md:ml-24" : "sm:ml-14 md:ml-9"
          )}
        >
          {section === "shortened" && (
            <button
              onClick={() => {
                clear()
              }}
              className="flex items-center space-x-1.5 rounded-full border border-malt-100 px-3 py-0.5 text-malt-100"
            >
              <Back className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
              <span className="font-noto-sans-thai text-[0.65rem] font-light sm:text-[0.78rem]">
                ย้อนกลับ
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 mb-[66px] flex w-full items-center justify-center">
        <TUCMC
          className={classnames(
            "w-[132px] sm:w-[195px]",
            shortened ? "text-malt-100" : "text-lapis-600"
          )}
        />
      </div>
    </div>
  )
}

export default Index
