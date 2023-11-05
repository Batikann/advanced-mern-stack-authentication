const InfoBox = ({ bgColor, title, count, icon }) => {
  return (
    <div
      className={`${bgColor} flex rounded-md  items-center py-3 px-6 gap-6 text-white`}
    >
      <div>{icon}</div>
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </div>
  )
}
export default InfoBox
