import { Scissors } from "@/components/icons/Scissors"

export const IdleDescription = () => {
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
