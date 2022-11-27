import { TUCMC } from "@/components/logo/TUCMC"

const Index = () => {
  return (
    <div className="font-plus-jakarta-sans flex min-h-screen w-full flex-col justify-center bg-malt-200">
      <div className="flex w-full flex-col items-center justify-center px-6">
        <div className="max-w-[342px] sm:ml-14 sm:max-w-[unset] md:ml-24">
          <div className="mx-auto">
            <div className="text-lapis-600">
              <h1 className="font-antonio text-[60px] leading-[52px] sm:text-[84px] sm:leading-[74px]">
                URL
              </h1>
              <h2 className="text-[45.7px] font-bold leading-[40px] sm:text-[64px] sm:leading-[56px]">
                Shortener
              </h2>
            </div>
            <div className="mt-2 flex items-center text-lapis-600">
              <span className="ml-14 text-[38px] font-extralight sm:ml-20 sm:text-[64px]">
                /
              </span>
              <p className="ml-3 text-[12.4px] font-light italic sm:ml-4 sm:text-[20px]">
                a tool that converts your link to the format{" "}
                <span className="font-medium">https://tucm.cc</span>{" "}
                <br className="hidden md:block" />, click below to log in
              </p>
            </div>
          </div>
          <div className="flex h-[6rem] flex-col items-center justify-center sm:h-[7rem] sm:items-start">
            <button
              className="ml-0 w-full max-w-[342px] rounded-xl bg-lapis-600 py-[8px]
             text-[18px] font-semibold text-malt-200 shadow-md sm:ml-20 sm:w-[416px] sm:max-w-[unset] sm:text-[24px]"
            >
              Login with TUCMC
            </button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 mb-[66px] flex w-full items-center justify-center">
        <TUCMC className="w-[132px] text-lapis-600 sm:w-[195px]" />
      </div>
    </div>
  )
}

export default Index
