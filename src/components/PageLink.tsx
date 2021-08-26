import Link from "next/link";
import { FC } from "react";

interface PageLinkProps {
	title: string,
	link: string
}
  
const PageLink: FC<PageLinkProps> = ({ title, link }) => {
	return (
	  <div className="content-panel w-full rounded-2xl md:rounded-3xl hover:bg-pink-50 cursor-pointer">
		<Link href={link}>
		  <div className="flex flex-col justify-center text-center h-14 md:h-16 my-1">
			<h1>{title}</h1>
		  </div>
		</Link>
	  </div>
	);
}

export default PageLink;