import loaderImg from '../../assets/loader.gif'
import ReactDOM from 'react-dom'

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="fixed w-full h-full bg-loading z-10">
      <div className="fixed left-1/2 top-1/2 -translate-y-1/2 z-50">
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById('loader')
  )
}

export const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loaderImg} alt="Loading..." />
    </div>
  )
}

export default Loader
