
const page = () => {
  return (
    <main className="root-container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-light-100 font-bebas-neue text-5xl font-bold">
        Whoa, slow down!
      </h1>
      <p className="text-light-400 max-w-xl text-center mt-3">You&apos;ve exceeded the allowed request limit. Please wait a moment and try again later.</p>
    </main>
  )
}

export default page