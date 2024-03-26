import React from 'react'
import { EyeOff, Eye } from 'lucide-react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../shared-components/input'
import { TypewriterEffect } from '../../shared-components/typing-text'
import { BottomGradient } from './bottom-gradient'
import { ModalPopup } from './modal-popup'

const text1 = [
  { text: 'Email' },
  { text: 'Address:' },
]
const text2 = [
  {
    text: 'Password:',
  },
]

const errorText = [
  { text: 'Incorrect', className: 'text-red-600 text-xl' },
  { text: 'Email', className: 'font-semibold text-xl text-red-600' },
  { text: 'or', className: 'text-xl text-red-600' },
  { text: 'Password', className: 'font-semibold text-xl text-red-600' },
]
const enterCredText = [
  { text: 'Enter', className: 'italic' },
  { text: 'your', className: 'italic' },
  { text: 'FUB', className: 'italic' },
  { text: 'credentials', className: 'italic' },
]

const loginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password is required' }),
})
type LoginSchema = z.infer<typeof loginSchema>
export const Auth = ({ onAuthChange }) => {
  const [open, setOpen] = React.useState(false)
  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [type, setType] = React.useState('password')
  const [error, setError] = React.useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
    setType(showPassword ? 'password' : 'text')
  }
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  })
  const onSubmit = async (data: LoginSchema) => {
    setError(false)
    const res = await fetch('http://marketing.findbusinesses4sale.com:5005/auth/check-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: data.email,
        password: data.password,
      }),
    })
    if (!res.ok) {
      setError(true)
      return
    }
    const resData = await res.json()
    if (!resData.success) {
      setError(true)
      return
    }
    await chrome.storage.local.set({
      currentUser: {
        email: resData.data.email,
        name: resData.data.first_name,
        lastName: resData.data.last_name,
        isAuth: resData.success,
      },
    })
    onAuthChange(true)
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col relative">
      <div className="relative h-20 flex items-center justify-center w-screen overflow-y-hidden">
        <img src="head.webp" alt="head" className="absolute top-0 left-0 h-20 object-cover"/>
        <img src="logo.webp" alt="logo" className="h-12 mx-auto block relative z-10 pt-1"/>
      </div>
      <ModalPopup open={open} close={onCloseModal}/>
      <form onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 p-5 pt-20 bg-gray-200 h-screen w-screen items-center justify-between">
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="pb-2 pl-1">
              <TypewriterEffect words={enterCredText}
                                className="font-semibold text-base text-black"/>
            </label>
            <label htmlFor="email" className="pb-2 pl-1">
              <TypewriterEffect words={text1} className="font-semibold text-base text-black"/>
            </label>
            <Input type="email"
                   id="email"
                   name="email"
                   placeholder="willow@fb4s.com"
                   {...form.register('email')}/>
            {form.formState.errors.email && (
              <span
                className="text-red-500 text-sm pl-1 pt-1">{form.formState.errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password"
                   className="font-semibold text-base pb-2 pl-1"><TypewriterEffect
              words={text2} className="font-semibold text-base text-black"/></label>
            <Input type={type}
                   id="password"
                   name="password"
                   placeholder="your_FUB_password"
                   {...form.register('password')}
            />
            <button onClick={togglePassword} type="button" className="absolute right-0 top-7">
              {showPassword ? <Eye className="absolute right-3 top-3 text-black"/> :
                <EyeOff className="absolute right-3 top-3 text-black"/>}
            </button>
            {form.formState.errors.password && (
              <span
                className="text-red-500 text-sm pl-1 pt-1">{form.formState.errors.password.message}</span>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={onOpenModal}
              className="text-[#D28739] font-semibold text-base hover:underline pl-1">Forgot
              password?
            </button>
          </div>
        </div>
        {error && (
          <div className="mx-auto">
            <TypewriterEffect words={errorText}/>
          </div>
        )}
        <button type="submit"
                className="text-xl hover:bg-black bg-lime-500 transition duration-300 ease-in-out text-white relative py-2 items-center justify-center font-semibold group/btn from-lime-500 to-lime-600 block w-full rounded-md shadow-[0px_1px_0px_0px_var(--lime-500)_inset,0px_-1px_0px_0px_var(--lime-500)_inset]">
          <span>Log In</span>
          <BottomGradient/>
        </button>
      </form>
    </div>
  )
}

