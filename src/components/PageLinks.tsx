import Link from "next/link"
import type { FC } from "react"

interface PageLinkProps {
  title: string
  link: string
}

const PageLink: FC<PageLinkProps> = ({ title, link }) => {
  return (
    <div className="w-full cursor-pointer rounded-3xl border border-[#333E51] bg-white bg-opacity-50 shadow-md">
      <Link href={link}>
        <div
          onClick={() => {
            // @ts-ignore
            window.gtag("event", "link_click", {
              event_category: "link_click",
              event_label: title,
              link
            })
          }}
          className="my-1 flex h-16 flex-col justify-center px-10 text-center text-[#333E51]"
        >
          <p>{title}</p>
        </div>
      </Link>
    </div>
  )
}

export default PageLink
