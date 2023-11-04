const Card = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-100 ">
      <div>
        <div className="flex flex-col gap-4 bg-white w-96 p-6 text-slate-600 shadow-2xl rounded-lg">
          {children}
        </div>
      </div>
    </div>
  )
}
export default Card
