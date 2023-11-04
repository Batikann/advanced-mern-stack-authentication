import { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

const PasswordInput = ({
  placeholder = 'Password',
  value,
  onChange,
  name = 'password',
  onPaste,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="relative">
      <input
        className="h-10 px-4 w-full text-black outline-none border border-slate-900"
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        name={name}
        value={value}
        required
        onChange={onChange}
        onPaste={onPaste}
      />
      <div
        className="absolute top-0 translate-y-1/2 right-3 cursor-pointer"
        onClick={togglePassword}
      >
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>
    </div>
  )
}
export default PasswordInput
