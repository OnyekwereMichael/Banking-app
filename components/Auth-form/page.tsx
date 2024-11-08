'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import asset from '@/public/asset'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import CustomInput from '../CustomInput'
import { Loader2 } from 'lucide-react'
import { SignIn } from '@/lib/action/user.server'
import { SignUp } from '@/lib/action/user.server'
import { useRouter } from 'next/navigation'
import PlaidLink from '../PlaidLink'

// Define the form schema with zod


const Authform = ({ type }: { type: string }) => {
  const router = useRouter()
  const formSchema = z.object({
    // sign up 
    fname: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    lname: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    address1: type === 'sign-in' ? z.string().optional() : z.string().max(50).min(5),
    city: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    state: type === 'sign-in' ? z.string().optional() : z.string().max(5).min(2),
    postal: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
    dob: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    // sign in 
    email: z.string().email(),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
      .regex(/\d/, { message: "Password must contain at least one number." })
  })

  const [user, setUser] = useState<null>(null)
  const [isloading, setIsLoading] = useState(false)

  // Initialize useForm with schema validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // sign up 
      fname: "",
      lname: "",
      address1: "",
       city: "",
      state: "",
      postal: "",
      dob: "",
      ssn: "",
      // sign in 
      email: "",
      password: "",
    },
  })

  // Define a submit handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    // console.log(data)
    setIsLoading(false)

    try {
        if(type === 'sign-in'){
          // this is where the sign in auth takes place 
            const res = await  SignIn({
              email: data.email,
              password: data.password
            })

            if(res) router.push('/')    
        }else if (type === 'sign-up'){
          // this is where the sign up auth takes place 
          const userData = {
            fname: data.fname!,
            lname: data.lname!,
            address1: data.address1!,
            city: data.city!,
            state: data.state!,
            postal: data.postal!,
            dob: data.dob!,
            ssn: data.ssn!,
            email: data.email,
            password: data.password,
          }
             const newUsers = await SignUp(userData)
             setUser(newUsers)
        }
    } catch (error) {
       console.log(error)
    } finally {
    setIsLoading(false)
    }

    // You can add logic to handle the form submission here.
  }

  return (
    <div className='auth-form'>
      <header className='auth-header'>
        <Link href='/' className='flex items-center gap-4'>
          <Image src={asset.Logo} alt='Logo' className='size-[40px] max-xl-14' />
          <p className='font-bold text-[36px] text-black-1'>Horizon</p>
        </Link>

        <div className='text-16 lg:text-36 font-semibold text-gray-800'>
          {user
            ? 'Link Account'
            : type === 'sign-in' ? 'Sign in' : 'Sign Up'
          }

          <p className='text-16 text-gray-600 mt-2'>
            {user ? 'Link your account to get started' : 'Please enter your details'}
          </p>
        </div>
      </header>

      {/* {user ? ( */}
        <div>
          <PlaidLink user={user} variant='primary'/>
        </div>
      {/* // ) : ( */}
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8">

              {type === 'sign-up' && (
                <>
                  <div className='grid grid-cols-2 gap-3'>
                    <CustomInput
                      form={form}
                      name={'fname'}
                      placeHolder={'Enter your first name'}
                      label={'First name'}
                    />

                    <CustomInput
                      form={form}
                      name={'lname'}
                      placeHolder={'Enter your last name'}
                      label={'Last name'}
                    />
                  </div>
                  <CustomInput
                    form={form}
                    name={'address1'}
                    placeHolder={'Enter your specific address'}
                    label={'Address'}
                  />
                  <CustomInput
                    form={form}
                    name={'city'}
                    placeHolder={'Enter your city'}
                    label={'City'}
                  />
                  <div className='grid grid-cols-2 gap-3'>
                    <CustomInput
                      form={form}
                      name={'state'}
                      placeHolder={'Example: AB'}
                      label={'State'}
                    />
                    <CustomInput
                      form={form}
                      name={'postal'}
                      placeHolder={'Example: 11011'}
                      label={'Postal Code'}
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-3'>
                    <CustomInput
                      form={form}
                      name={'dob'}
                      placeHolder={'Example: YYYY-MM-DDN'}
                      label={'Date of birth'}
                    />
                    <CustomInput
                      form={form}
                      name={'ssn'}
                      placeHolder={'Example: 1234'}
                      label={'SSN'}
                    />
                  </div>
                </>
              )}
              <CustomInput
                form={form}
                name={'email'}
                placeHolder={'Enter your email'}
                label={'Email'}
              />
              <CustomInput
                form={form}
                name={'password'}
                placeHolder={'Enter your password'}
                label={'Password'}
              />
              <div className='flex flex-col gap-2'>
                <Button type="submit" className='form-btn' disabled={isloading}>
                  {isloading ? (
                    <>
                      <Loader2 size={20} className='animate-spin' />
                      Loading...
                    </>

                  ) : type === 'sign-in' ? 'Sign in' : 'Sign up'}
                </Button>
              </div>
            </form>
          </Form>

          <footer className='flex justify-center '>
            <p className='font-semibold text-gray-600 text-14'>
              {type === 'sign-in' ? "Dont't have an account" : "Already have an account"}

              <Link href={type === 'sign-in' ? "/sign-up" : "/sign-in"} className='ml-3 form-link'>
                {type === 'sign-in' ? 'Sign up' : 'Sign in'}
              </Link>
            </p>
          </footer>
        </>
      {/* )} */}
    </div>
  )
}

export default Authform
