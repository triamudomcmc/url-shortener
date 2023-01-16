import { motion } from "framer-motion"

export const LoginButton = ({ ...restProps }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="ml-0 w-full max-w-[342px] rounded-xl bg-lapis-600 py-[8px]
             text-[18px] font-semibold text-malt-200 shadow-md sm:ml-20 sm:w-[416px] sm:max-w-[unset] sm:text-[24px]"
      {...restProps}
    >
      Login with TUCMC
    </motion.button>
  )
}
