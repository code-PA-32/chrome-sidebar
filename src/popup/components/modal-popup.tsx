import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../shared-components/input'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { TypewriterEffect } from '../../shared-components/typing-text'
import { BottomGradient } from './bottom-gradient'

const text1 = [
  { text: 'Email' },
  { text: 'Address:' },
]

const loginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
})
type LoginSchema = z.infer<typeof loginSchema>


export const ModalPopup = ({ open, close }: { open: boolean, close: () => void }) => {
  const [message, setMessage] = React.useState('')
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '' },
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginSchema) => {
    setMessage('')
    const res = await fetch('https://api.retool.com/v1/workflows/70e84d2d-027c-4c36-9de1-75456358af94/startTrigger?workflowApiKey=retool_wk_f2cc0817edc74ec886391f6005eac1c6', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
      }),
    })
    const dataRes = await res.json()
    form.reset()
    if (!dataRes.success) {
      setMessage(dataRes.message)
    }
    if (dataRes.success) {
      setMessage(dataRes.message)
    }

  }

  return (
    <Modal open={open} onClose={close} center styles={{
      modal: {
        backgroundColor: 'rgb(229 231 235)',
      },
    }}>
      <div className="py-6 flex flex-col gap-2 bg-gray-200">
        <form className="flex flex-col gap-6 w-[400px]" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="email" className="py-10 text-center font-bold text-base">
                Enter Your Email Address to receive <br/> SMS with your password
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
          </div>
          {message &&
            <div className="text-center text-base font-semibold text-red-500">{message}</div>}
          <button
            className="text-xl hover:bg-black bg-lime-500 transition duration-300 ease-in-out text-white relative py-2 items-center justify-center font-semibold group/btn from-lime-500 to-lime-600 block w-full rounded-md shadow-[0px_1px_0px_0px_var(--lime-500)_inset,0px_-1px_0px_0px_var(--lime-500)_inset]"
            type="submit" disabled={form.formState.isSubmitting}><span>Send SMS</span>
            <BottomGradient/></button>
        </form>
      </div>
    </Modal>
  )
}