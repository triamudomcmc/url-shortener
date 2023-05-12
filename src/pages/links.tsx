export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/u/tucmc",
      permanent: false
    }
  }
}

const Page = () => {
  return <div></div>
}

export default Page
